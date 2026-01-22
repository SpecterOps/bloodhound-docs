# From https://github.com/SadProcessor/BloodHoundOperator
function Get-BloodHoundAPISignature{
    [Alias('BHSignature')]
    Param(
        [Parameter(Mandatory=1,Position=0)][String]$URI,
        [ValidateSet('GET','POST','PUT','DELETE')]
        [Parameter(Mandatory=0,Position=1)][String]$Method='GET',
        [Parameter(Mandatory=0,Position=2)][string]$Body,
        [Parameter(Mandatory=1,Position=3)][String]$Key,
        [Parameter(Mandatory=0,Position=4)][Datetime]$Date
        )
    # Timestamp
    $Stamp=if($Date){$Date.tostring('o')}else{[Datetime]::utcnow.tostring('o')}
    $Content = if($Body){$Body | Convertto-json -Depth 21}else{'{}'}
    # Data
    $Params = [PSCustomObject]@{
        stamp  = $Stamp
        method = $Method
        uri    = $URI
        body   = $Content
        key    = $Key
        }
    if($URI -match "^/"){$URI=$URI.trimstart('/')}
    # Signature
    $KeyByte   = [Text.Encoding]::UTF8.GetBytes($Key)
    $OpByte    = [Text.Encoding]::UTF8.GetBytes("$Method/$URI")
    $DateByte  = [Text.Encoding]::UTF8.GetBytes(-join $Stamp[0..12])
    $BodyByte  = [Text.Encoding]::UTF8.GetBytes("$Body")
    $HMAC      = [Security.Cryptography.HMACSHA256]::new($KeyByte).ComputeHash($OpByte)
    $HMAC      = [Security.Cryptography.HMACSHA256]::new($HMAC).ComputeHash($DateByte)
    $HMAC      = [Security.Cryptography.HMACSHA256]::new($HMAC).ComputeHash($BodyByte)
    $Signature = [Convert]::ToBase64String($HMAC)
    ## Output
    [PSCustomObject]@{Signature=$Signature;Stamp=$Stamp}
    }
#End