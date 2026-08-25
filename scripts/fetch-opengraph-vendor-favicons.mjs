import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const faviconDir = join(repoRoot, 'docs/assets/icons/vendor-favicons');
const vendorIconFile = join(
  repoRoot,
  'docs/snippets/opengraph/library/data/vendor-icons.json',
);

const vendors = [
  { type: 'onepassword', siteUrl: 'https://1password.com' },
  {
    type: 'ansible',
    siteUrl: 'https://www.ansible.com',
    faviconUrl: 'https://www.redhat.com/favicon.ico',
  },
  { type: 'microsoft', siteUrl: 'https://www.microsoft.com' },
  { type: 'aws', siteUrl: 'https://aws.amazon.com' },
  { type: 'atlassian', siteUrl: 'https://www.atlassian.com' },
  { type: 'cisco', siteUrl: 'https://duo.com' },
  {
    type: 'cyberark',
    siteUrl: 'https://www.cyberark.com',
    faviconUrl: 'https://www.paloaltonetworks.com/favicon.ico',
  },
  { type: 'freeipa', siteUrl: 'https://www.freeipa.org' },
  { type: 'github', siteUrl: 'https://github.com' },
  { type: 'gitlab', siteUrl: 'https://gitlab.com' },
  { type: 'gcp', siteUrl: 'https://cloud.google.com' },
  { type: 'jamf', siteUrl: 'https://www.jamf.com' },
  { type: 'kubernetes', siteUrl: 'https://kubernetes.io' },
  {
    type: 'npm',
    siteUrl: 'https://www.npmjs.com',
    faviconUrl: 'https://raw.githubusercontent.com/npm/logos/master/npm%20square/n-large.png',
  },
  { type: 'okta', siteUrl: 'https://www.okta.com' },
  { type: 'oracle', siteUrl: 'https://www.oracle.com' },
  { type: 'ping', siteUrl: 'https://www.pingidentity.com' },
  { type: 'mainframe', siteUrl: 'https://www.ibm.com' },
  { type: 'runzero', siteUrl: 'https://www.runzero.com' },
  { type: 'salesforce', siteUrl: 'https://www.salesforce.com' },
  { type: 'servicenow', siteUrl: 'https://www.servicenow.com' },
  { type: 'snowflake', siteUrl: 'https://www.snowflake.com' },
  { type: 'splunk', siteUrl: 'https://www.splunk.com' },
  { type: 'tailscale', siteUrl: 'https://tailscale.com' },
  { type: 'vmware', siteUrl: 'https://www.vmware.com' },
  { type: 'xsoar', siteUrl: 'https://www.paloaltonetworks.com' },
];

const requestHeaders = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
};

const fetchBuffer = async (url) => {
  const response = await fetch(url, {
    headers: requestHeaders,
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';
  const buffer = Buffer.from(await response.arrayBuffer());

  if (buffer.length === 0) {
    throw new Error('empty response body');
  }

  const hasImageSignature =
    buffer.subarray(0, 4).equals(Buffer.from([0x00, 0x00, 0x01, 0x00])) ||
    buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) ||
    buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])) ||
    buffer.toString('ascii', 8, 12) === 'WEBP' ||
    buffer.toString('utf8', 0, 128).includes('<svg');
  const looksLikeImage = contentType.includes('image') || hasImageSignature;

  if (!looksLikeImage) {
    throw new Error(`unexpected content type: ${contentType || 'none'}`);
  }

  return { buffer, contentType };
};

const readVendorIconMap = () => {
  if (!existsSync(vendorIconFile)) {
    throw new Error('Vendor icon map is missing. Add data/vendor-icons.json.');
  }

  const data = JSON.parse(readFileSync(vendorIconFile, 'utf8'));
  const entries = Object.entries(data);

  if (entries.length === 0) {
    throw new Error('Vendor icon map must include at least one entry.');
  }

  for (const [type, icon] of entries) {
    if (!icon?.src) {
      throw new Error(`Vendor icon "${type}" must include a src.`);
    }
  }

  return new Map(entries.map(([type, icon]) => [type, icon.src]));
};

const getImageExtension = ({ buffer, contentType }) => {
  if (contentType.includes('svg') || buffer.toString('utf8', 0, 128).includes('<svg')) {
    return 'svg';
  }

  if (contentType.includes('png') || buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return 'png';
  }

  if (contentType.includes('jpeg') || contentType.includes('jpg') || buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) {
    return 'jpg';
  }

  if (contentType.includes('webp') || buffer.toString('ascii', 8, 12) === 'WEBP') {
    return 'webp';
  }

  if (contentType.includes('icon') || buffer.subarray(0, 4).equals(Buffer.from([0x00, 0x00, 0x01, 0x00]))) {
    return 'ico';
  }

  return 'ico';
};

const getAttribute = (tag, name) => {
  const pattern = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const match = tag.match(pattern);

  return match?.[2] || match?.[3] || match?.[4] || '';
};

const findIconCandidates = async (siteUrl) => {
  const response = await fetch(siteUrl, {
    headers: {
      ...requestHeaders,
      Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const tags = html.match(/<link\s+[^>]*>/gi) || [];

  return tags
    .map((tag) => ({
      href: getAttribute(tag, 'href'),
      rel: getAttribute(tag, 'rel').toLowerCase(),
      sizes: getAttribute(tag, 'sizes').toLowerCase(),
    }))
    .filter((link) => link.href && link.rel.includes('icon') && !link.rel.includes('mask'))
    .map((link) => {
      const sizeMatch = link.sizes.match(/(\d+)x(\d+)/);
      const size = sizeMatch ? Number(sizeMatch[1]) * Number(sizeMatch[2]) : 0;

      return {
        url: new URL(link.href, siteUrl).toString(),
        size,
        isAppleTouch: link.rel.includes('apple-touch-icon'),
      };
    })
    .sort((left, right) => {
      if (left.isAppleTouch !== right.isAppleTouch) {
        return left.isAppleTouch ? 1 : -1;
      }

      return right.size - left.size;
    });
};

const fetchFavicon = async ({ type, siteUrl, faviconUrl: explicitFaviconUrl }) => {
  const faviconUrl = explicitFaviconUrl || new URL('/favicon.ico', siteUrl).toString();

  try {
    const favicon = await fetchBuffer(faviconUrl);
    return { type, siteUrl, sourceUrl: faviconUrl, favicon };
  } catch (error) {
    console.warn(`${type}: ${faviconUrl} failed (${error.message}); checking HTML icons.`);
  }

  const candidates = await findIconCandidates(siteUrl);

  for (const candidate of candidates) {
    try {
      const favicon = await fetchBuffer(candidate.url);
      return { type, siteUrl, sourceUrl: candidate.url, favicon };
    } catch (error) {
      console.warn(`${type}: ${candidate.url} failed (${error.message}).`);
    }
  }

  throw new Error(`No favicon found for ${type} (${siteUrl}).`);
};

mkdirSync(faviconDir, { recursive: true });

const vendorIconMap = readVendorIconMap();
const failures = [];

for (const vendor of vendors) {
  try {
    const { type, sourceUrl, favicon } = await fetchFavicon(vendor);
    const extension = getImageExtension(favicon);
    const mappedIcon = vendorIconMap.get(type);

    if (!mappedIcon) {
      throw new Error(`No vendorIconMap entry found for "${type}".`);
    }

    const mappedFileName = basename(mappedIcon);

    if (mappedFileName !== `${type}.${extension}`) {
      throw new Error(
        `Fetched ${extension} asset for "${type}", but vendorIconMap points to ${mappedFileName}. Update vendorIconMap before replacing cached assets.`,
      );
    }

    const outputPath = join(faviconDir, `${type}.${extension}`);

    for (const fileName of readdirSync(faviconDir)) {
      if (fileName.startsWith(`${type}.`) && fileName !== `${type}.${extension}`) {
        unlinkSync(join(faviconDir, fileName));
      }
    }

    writeFileSync(outputPath, favicon.buffer);
    console.log(`${type}: ${sourceUrl}`);
  } catch (error) {
    failures.push(`${vendor.type}: ${error.message}`);
    console.error(`${vendor.type}: failed (${error.message})`);
  }
}

if (failures.length > 0) {
  throw new Error(`Failed to fetch ${failures.length} favicons:\n${failures.join('\n')}`);
}
