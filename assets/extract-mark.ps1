# Step 1: extract white marks from the flag logo -> transparent PNG
# Keep near-white pixels as pure white with luminance-based alpha; everything else transparent.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

$src = [System.Drawing.Bitmap]::new((Join-Path $dir 'logo.png'))   # 1400x933
$w = $src.Width; $h = $src.Height
$dst = [System.Drawing.Bitmap]::new($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$rect = [System.Drawing.Rectangle]::new(0, 0, $w, $h)
$sd = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dd = $dst.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$sBuf = [System.Byte[]]::new($sd.Stride * $h)
$dBuf = [System.Byte[]]::new($dd.Stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($sd.Scan0, $sBuf, 0, $sBuf.Length)
[System.Runtime.InteropServices.Marshal]::Copy($dd.Scan0, $dBuf, 0, $dBuf.Length)
$src.UnlockBits($sd); $dst.UnlockBits($dd)
# thresholds on luminance: below lo -> transparent, above hi -> opaque white, between -> ramp
$lo = 150; $hi = 235
$rowCount = [System.Int32[]]::new($h)
$colCount = [System.Int32[]]::new($w)
$total = 0
for ($y = 0; $y -lt $h; $y++) {
  $rowOff = $y * $sd.Stride
  $dOff = $y * $dd.Stride
  for ($x = 0; $x -lt $w; $x++) {
    $i = $rowOff + $x * 4
    $b = [int]$sBuf[$i]; $g = [int]$sBuf[$i + 1]; $r = [int]$sBuf[$i + 2]
    $lum = ($r * 299 + $g * 587 + $b * 114) / 1000
    if ($lum -gt $lo) {
      $a = if ($lum -ge $hi) { 255 } else { [int](255 * ($lum - $lo) / ($hi - $lo)) }
      $j = $dOff + $x * 4
      $dBuf[$j] = 255; $dBuf[$j + 1] = 255; $dBuf[$j + 2] = 255; $dBuf[$j + 3] = [byte]$a
      if ($a -gt 40) { $rowCount[$y]++; $colCount[$x]++; $total++ }
    }
  }
}

[System.Runtime.InteropServices.Marshal]::Copy($dBuf, 0, $dd.Scan0, $dBuf.Length)
$dst.Save((Join-Path $dir 'logo-white-full.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose(); $dst.Dispose()

# report coverage per 5% band so we can pick crop bounds
Write-Output ("total kept px: {0} of {1} ({2}%)" -f $total, ($w * $h), [Math]::Round(100 * $total / ($w * $h), 1))
Write-Output "--- rows (band: firstY-lastY where band has >5 px) ---"
$bands = [System.Int32[]]::new(20)
for ($y = 0; $y -lt $h; $y++) { $bands[[Math]::Min(19, [int]($y * 20 / $h))] += $rowCount[$y] }
for ($b = 0; $b -lt 20; $b++) { Write-Output ("row band {0,2} ({1,3}-{2,3}%): {3}" -f $b, ($b * 5), (($b + 1) * 5), $bands[$b]) }
$cbands = [System.Int32[]]::new(20)
for ($x = 0; $x -lt $w; $x++) { $cbands[[Math]::Min(19, [int]($x * 20 / $w))] += $colCount[$x] }
Write-Output "--- cols ---"
for ($b = 0; $b -lt 20; $b++) { Write-Output ("col band {0,2} ({1,3}-{2,3}%): {3}" -f $b, ($b * 5), (($b + 1) * 5), $cbands[$b]) }
