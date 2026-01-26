// From https://github.com/Mayyhem/FETCH
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;
using Newtonsoft.Json.Linq;

namespace BloodHound
{
    /// <summary>
    /// A self-contained client for making signed API calls to the BloodHound API.
    /// Combines HTTP client functionality with HMAC-SHA256 request signing.
    /// </summary>
    public class BloodHoundApiClient : IDisposable
    {
        private const string AuthorizationHeader = "Authorization";
        private const string DateHeader = "RequestDate";
        private const string SignatureHeader = "Signature";
        private const string AuthSignature = "bhesignature";

        private readonly HttpClient _httpClient;
        private readonly string _tokenId;
        private readonly string _tokenKey;
        private readonly string _baseUrl;

        public string Id { get; private set; }
        public string Name { get; private set; }

        /// <summary>
        /// Creates a new BloodHound API client with request signing.
        /// </summary>
        /// <param name="scheme">HTTP scheme (http or https)</param>
        /// <param name="host">API host</param>
        /// <param name="port">API port</param>
        /// <param name="tokenId">Authentication token ID</param>
        /// <param name="tokenKey">Authentication token key (secret)</param>
        /// <param name="proxy">Optional proxy URL</param>
        public BloodHoundApiClient(string scheme, string host, int port, string tokenId, string tokenKey, string proxy = null)
        {
            _tokenId = tokenId;
            _tokenKey = tokenKey;
            _baseUrl = $"{scheme}://{host}:{port}";

            var handler = new HttpClientHandler();

            if (!string.IsNullOrEmpty(proxy))
            {
                ServicePointManager.ServerCertificateValidationCallback = (sender, cert, chain, errors) => true;
                handler.Proxy = new WebProxy(proxy);
                handler.UseProxy = true;
            }

            _httpClient = new HttpClient(handler);
            _httpClient.DefaultRequestHeaders.UserAgent.Add(
                new ProductInfoHeaderValue("BloodHoundClient", "1.0.0"));
        }

        /// <summary>
        /// Makes a signed GET request to the /api/v2/self endpoint.
        /// </summary>
        /// <returns>The user data from the API response</returns>
        public async Task<JToken> GetSelfAsync()
        {
            Console.WriteLine($"[*] Getting ID for token {_tokenId}");

            var response = await SendSignedRequestAsync(HttpMethod.Get, "/api/v2/self");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var data = JObject.Parse(content)["data"];
                Id = data["id"]?.ToString();
                Name = data["name"]?.ToString();
                Console.WriteLine("[*] Successfully authenticated with BloodHound API");
                return data;
            }

            Console.WriteLine($"[!] GetSelf failed with status: {response.StatusCode}");
            return null;
        }

        /// <summary>
        /// Sends a signed HTTP request to the BloodHound API.
        /// </summary>
        private async Task<HttpResponseMessage> SendSignedRequestAsync(HttpMethod method, string path, byte[] body = null)
        {
            var uri = path.StartsWith("/") ? path : "/" + path;
            var request = new HttpRequestMessage(method, _baseUrl + uri);

            if (body != null)
            {
                request.Content = new ByteArrayContent(body);
                request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            }

            // Sign the request
            await SignRequestAsync(request);

            try
            {
                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"[!] Request failed: {response.StatusCode}");
                }

                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[!] Request error: {ex.Message}");
                throw;
            }
        }

        /// <summary>
        /// Signs an HTTP request using the BloodHound HMAC-SHA256 signature scheme.
        /// Signature = HMAC(HMAC(HMAC(token, method+path), datetime[0:13]), body)
        /// </summary>
        private async Task SignRequestAsync(HttpRequestMessage request)
        {
            // Generate timestamp in required format
            var timestamp = DateTime.Now.ToString("yyyy-MM-dd'T'HH:mm:sszzz");

            // Step 1: Sign operation key = HMAC(tokenKey, method + path)
            var operationKey = ComputeHmac(
                Encoding.UTF8.GetBytes(_tokenKey),
                Encoding.UTF8.GetBytes($"{request.Method}{request.RequestUri.AbsolutePath}")
            );

            // Step 2: Sign date key = HMAC(operationKey, datetime[0:13])
            // Only uses first 13 chars of timestamp (e.g., "2024-01-15T14")
            var dateKey = ComputeHmac(
                operationKey,
                Encoding.UTF8.GetBytes(timestamp.Substring(0, 13))
            );

            // Step 3: Sign body = HMAC(dateKey, body)
            var bodyBytes = request.Content != null
                ? await request.Content.ReadAsByteArrayAsync()
                : Array.Empty<byte>();

            var signature = ComputeHmac(dateKey, bodyBytes);

            // Add authentication headers
            request.Headers.Add(AuthorizationHeader, $"{AuthSignature} {_tokenId}");
            request.Headers.Add(DateHeader, timestamp);
            request.Headers.Add(SignatureHeader, Convert.ToBase64String(signature));
        }

        /// <summary>
        /// Computes HMAC-SHA256 hash.
        /// </summary>
        private static byte[] ComputeHmac(byte[] key, byte[] data)
        {
            using (var hmac = new HMACSHA256(key))
            {
                return hmac.ComputeHash(data);
            }
        }

        public void Dispose()
        {
            _httpClient?.Dispose();
        }

        /// <summary>
        /// Creates a client from environment variables in a .env file.
        /// Expected variables: SCHEME, DOMAIN, PORT, TOKEN_ID, TOKEN_KEY
        /// </summary>
        public static async Task<BloodHoundApiClient> CreateFromEnvFileAsync(string envFilePath = null, string proxy = null)
        {
            // Default to ~/.env if not specified
            if (string.IsNullOrEmpty(envFilePath))
            {
                envFilePath = System.IO.Path.Combine(Environment.CurrentDirectory, ".env");
            }

            if (!System.IO.File.Exists(envFilePath))
            {
                Console.WriteLine($"[!] Environment file not found in current directory: {envFilePath}");
                return null;
            }

            Console.WriteLine($"[*] Loading config from {envFilePath}");

            // Parse .env file
            foreach (var line in System.IO.File.ReadAllLines(envFilePath))
            {
                var parts = line.Split(new[] { '=' }, 2, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length == 2)
                {
                    Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());
                }
            }

            var scheme = Environment.GetEnvironmentVariable("SCHEME") ?? "https";
            var domain = Environment.GetEnvironmentVariable("DOMAIN");
            int.TryParse(Environment.GetEnvironmentVariable("PORT"), out int port);
            var tokenId = Environment.GetEnvironmentVariable("TOKEN_ID");
            var tokenKey = Environment.GetEnvironmentVariable("TOKEN_KEY");

            if (string.IsNullOrEmpty(tokenId) || string.IsNullOrEmpty(tokenKey))
            {
                Console.WriteLine("[!] TOKEN_ID and TOKEN_KEY must be specified");
                return null;
            }

            var client = new BloodHoundApiClient(scheme, domain, port, tokenId, tokenKey, proxy);

            // Validate credentials with GetSelf
            var result = await client.GetSelfAsync();
            if (result == null)
            {
                Console.WriteLine("[!] Failed to validate credentials");
                client.Dispose();
                return null;
            }

            return client;
        }
        static async Task Main(string[] args)
        {
            // Create client from .env file
            // Expected .env format:
            //   SCHEME=http
            //   DOMAIN=bloodhound.localhost
            //   PORT=80
            //   TOKEN_ID=your-token-id
            //   TOKEN_KEY=your-token-key

            string envFilePath = String.Empty;
            if (args.Length == 1)
            {
                envFilePath = args[0];
            } 
            var envClient = await BloodHoundApiClient.CreateFromEnvFileAsync(envFilePath);
            if (envClient != null)
            {
                Console.WriteLine($"[*] Client ID: {envClient.Id}");
                var self = await envClient.GetSelfAsync();
                if (self != null)
                {
                    Console.WriteLine($"[*] Authenticated as: {envClient.Id}");
                    Console.WriteLine($"[*] User data: \n{self}");
                }
                envClient.Dispose();
            }
        }
    }
}