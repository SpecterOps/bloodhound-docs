# export-power-platform-environments.ps1 — export the static environment fallback
# consumed by the OpenHound Entra ID collector.
#
# This script is read-only. Run it as a Global Administrator or Power Platform
# Administrator signed in to Azure CLI:
#
#   az login --tenant <tenant-guid> `
#     --scope https://api.powerplatform.com/.default
#   ./export-power-platform-environments.ps1 `
#     -OutputPath .dlt/power-platform-environments.json
#
# The output includes every visible environment. Review and remove environments
# outside the collection scope before configuring the file in the collector.

[CmdletBinding()]
param(
    [string]$OutputPath
)

$ErrorActionPreference = "Stop"

$azCommand = Get-Command az -ErrorAction SilentlyContinue
if (-not $azCommand) {
    throw "Azure CLI ('az') is not installed or not on PATH."
}

$accountJson = (& az account show --output json) -join [Environment]::NewLine
if ($LASTEXITCODE -ne 0) {
    throw "Not signed in to Azure CLI."
}
$account = $accountJson | ConvertFrom-Json

$apiUrl = "https://api.powerplatform.com/environmentmanagement/environments?api-version=2022-03-01-preview"
$environments = [Collections.Generic.List[object]]::new()
$azUsesBatch = $azCommand.Source -match '\.(cmd|bat)$'
do {
    # Windows batch launchers need explicit quotes around URLs containing '&'.
    $requestUrl = if ($azUsesBatch) { '"' + $apiUrl + '"' } else { $apiUrl }
    $environmentJson = (& az rest `
        --method get `
        --resource https://api.powerplatform.com `
        --url $requestUrl `
        --output json) -join [Environment]::NewLine

    if ($LASTEXITCODE -ne 0) {
        throw @"
Modern Power Platform environment discovery failed. No inventory was written.
Refresh the resource-specific sign-in and retry:
az login --tenant $($account.tenantId) --scope https://api.powerplatform.com/.default
"@
    }

    $response = $environmentJson | ConvertFrom-Json
    foreach ($environment in $response.value) {
        $environments.Add($environment)
    }
    $apiUrl = $response.'@odata.nextLink'
} while ($apiUrl)
$inventory = @(
    $environments | ForEach-Object {
        [ordered]@{
            environment_id = $_.id
            display_name    = if ($_.displayName) { $_.displayName } else { $_.id }
            has_dataverse   = $null -ne $_.dataverseId -and $null -ne $_.url
            dataverse_url   = $_.url
        }
    } | Sort-Object display_name
)

$inventoryJson = ConvertTo-Json -InputObject $inventory -Depth 4
if ($OutputPath) {
    $resolvedOutputPath = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($OutputPath)
    $parentDirectory = Split-Path -Parent $resolvedOutputPath
    if (-not (Test-Path -LiteralPath $parentDirectory -PathType Container)) {
        throw "Output directory does not exist: $parentDirectory"
    }
    [System.IO.File]::WriteAllText(
        $resolvedOutputPath,
        $inventoryJson,
        [System.Text.UTF8Encoding]::new($false)
    )
} else {
    $inventoryJson
}
