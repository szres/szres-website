# Convert Shenzhen GeoJSON (DataV areas_v3) to Ingress-style SVG path data.
$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

$city = Get-Content (Join-Path $dir 'sz-geo-city.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$full = Get-Content (Join-Path $dir 'sz-geo-full.json') -Raw -Encoding UTF8 | ConvertFrom-Json

function Get-Rings($geometry) {
    # returns list of rings; each ring is list of [lon,lat] pairs
    $rings = New-Object System.Collections.Generic.List[object]
    if ($geometry.type -eq 'MultiPolygon') {
        foreach ($poly in $geometry.coordinates) { foreach ($ring in $poly) { $rings.Add($ring) } }
    } elseif ($geometry.type -eq 'Polygon') {
        foreach ($ring in $geometry.coordinates) { $rings.Add($ring) }
    }
    return ,$rings
}

# overall bounds from city file
$lonMin = 999; $lonMax = -999; $latMin = 999; $latMax = -999
foreach ($f in $city.features) {
    foreach ($ring in (Get-Rings $f.geometry)) {
        foreach ($pt in $ring) {
            if ($pt[0] -lt $lonMin) { $lonMin = $pt[0] }
            if ($pt[0] -gt $lonMax) { $lonMax = $pt[0] }
            if ($pt[1] -lt $latMin) { $latMin = $pt[1] }
            if ($pt[1] -gt $latMax) { $latMax = $pt[1] }
        }
    }
}
$cosLat = [Math]::Cos(($latMin + $latMax) / 2 * [Math]::PI / 180)
$w = ($lonMax - $lonMin) * $cosLat
$h = ($latMax - $latMin)
$margin = 25; $boxW = 970; $boxH = 570
$scale = [Math]::Min(($boxW - 2 * $margin) / $w, ($boxH - 2 * $margin) / $h)
$offX = ($boxW - $w * $scale) / 2
$offY = ($boxH - $h * $scale) / 2

function Convert-Ring($ring) {
    $n = $ring.Count
    $step = 1
    if ($n -gt 380) { $step = [Math]::Ceiling($n / 380) }
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.Append('M')
    for ($i = 0; $i -lt $n; $i += $step) {
        $x = [Math]::Round((($ring[$i][0] - $lonMin) * $cosLat) * $scale + $offX, 1)
        $y = [Math]::Round(($latMax - $ring[$i][1]) * $scale + $offY, 1)
        [void]$sb.Append($x.ToString()).Append(',').Append($y.ToString()).Append(' ')
    }
    # always close with the last point so shape edges are kept
    $xe = [Math]::Round((($ring[$n - 1][0] - $lonMin) * $cosLat) * $scale + $offX, 1)
    $ye = [Math]::Round(($latMax - $ring[$n - 1][1]) * $scale + $offY, 1)
    [void]$sb.Append($xe.ToString()).Append(',').Append($ye.ToString()).Append('Z')
    return $sb.ToString()
}

# city outline path
$citySb = New-Object System.Text.StringBuilder
foreach ($f in $city.features) {
    foreach ($ring in (Get-Rings $f.geometry)) { [void]$citySb.Append((Convert-Ring $ring)) }
}
Set-Content -Path (Join-Path $dir 'city-path.txt') -Value $citySb.ToString() -Encoding ASCII

# district paths: "name|path|cx|cy"
$lines = New-Object System.Collections.Generic.List[string]
foreach ($f in $full.features) {
    $name = $f.properties.name
    $dsb = New-Object System.Text.StringBuilder
    $sx = 0.0; $sy = 0.0; $cnt = 0
    foreach ($ring in (Get-Rings $f.geometry)) {
        [void]$dsb.Append((Convert-Ring $ring))
        foreach ($pt in $ring) { $sx += $pt[0]; $sy += $pt[1]; $cnt++ }
    }
    $cx = [Math]::Round((($sx / $cnt - $lonMin) * $cosLat) * $scale + $offX, 1)
    $cy = [Math]::Round(($latMax - $sy / $cnt) * $scale + $offY, 1)
    $lines.Add("$name|$($dsb.ToString())|$cx|$cy")
}
Set-Content -Path (Join-Path $dir 'districts-path.txt') -Value ($lines -join "`n") -Encoding UTF8

Write-Output ("bounds: lon {0}..{1}  lat {2}..{3}" -f $lonMin, $lonMax, $latMin, $latMax)
Write-Output ("city path length: " + $citySb.Length)
Write-Output ("districts: " + $lines.Count)
