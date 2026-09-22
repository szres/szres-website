# Step 2: crop the eagle emblem (drop V-frame, wordmark, corner slashes), then trim transparent edges
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

$src = [System.Drawing.Bitmap]::new((Join-Path $dir 'logo-white-full.png'))
$w = $src.Width; $h = $src.Height

# hard-clear zones: V-frame arms lower corners (wordmark/V-frame already outside crop below)
$cx = 140; $cy = 25; $cw = 1120; $ch = 593   # crop x 140-1260, y 25-618
$clearL_w = 430 - $cx; $clearR_x = 970 - $cx
$clearY = 588 - $cy

$dst = [System.Drawing.Bitmap]::new($cw, $ch, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($dst)
$g.DrawImage($src, ([System.Drawing.Rectangle]::new(0, 0, $cw, $ch)), ([System.Drawing.Rectangle]::new($cx, $cy, $cw, $ch)), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

# clear zones in crop-local coords
for ($y = $clearY; $y -lt $ch; $y++) {
  for ($x = 0; $x -lt $clearL_w; $x++) { $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0,0,0,0)) }
  for ($x = $clearR_x; $x -lt $cw; $x++) { $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0,0,0,0)) }
}

# precise clear: leftover V-frame slash decorations
foreach ($r in @(@(270,460,105,70), @(790,460,90,70), @(215,470,70,80), @(800,480,70,60))) {
  for ($y = $r[1]; $y -lt ($r[1] + $r[3]); $y++) {
    for ($x = $r[0]; $x -lt ($r[0] + $r[2]); $x++) { $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0,0,0,0)) }
  }
}
# sweep lower corners clean, well clear of the tassel arrows (x 370-745)
for ($y = 470; $y -lt $ch; $y++) {
  for ($x = 0; $x -lt 350; $x++) { $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0,0,0,0)) }
  for ($x = 760; $x -lt $cw; $x++) { $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0,0,0,0)) }
}

# trim transparent margins
$minX = $cw; $minY = $ch; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $ch; $y++) {
  for ($x = 0; $x -lt $cw; $x++) {
    if ($dst.GetPixel($x, $y).A -gt 10) {
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
$tw = $maxX - $minX + 1; $th = $maxY - $minY + 1
$final = [System.Drawing.Bitmap]::new($tw, $th)
$g2 = [System.Drawing.Graphics]::FromImage($final)
$g2.DrawImage($dst, ([System.Drawing.Rectangle]::new(0, 0, $tw, $th)), ([System.Drawing.Rectangle]::new($minX, $minY, $tw, $th)), [System.Drawing.GraphicsUnit]::Pixel)
$g2.Dispose()
$final.Save((Join-Path $dir 'logo-mark.png'), [System.Drawing.Imaging.ImageFormat]::Png)

Write-Output ("logo-mark.png: {0}x{1} (cropped from {2}x{3} at {4},{5})" -f $tw, $th, $cw, $ch, $minX, $minY)
$src.Dispose(); $dst.Dispose(); $final.Dispose()

# composite over blue for visual check
$bg = [System.Drawing.Bitmap]::new($tw, $th)
$g3 = [System.Drawing.Graphics]::FromImage($bg)
$g3.Clear([System.Drawing.Color]::FromArgb(255, 20, 60, 120))
$g3.DrawImage($final, ([System.Drawing.Rectangle]::new(0, 0, $tw, $th)), ([System.Drawing.Rectangle]::new(0, 0, $tw, $th)), [System.Drawing.GraphicsUnit]::Pixel)
$g3.Dispose()
$bg.Save((Join-Path $dir 'preview-mark.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$bg.Dispose()
Write-Output 'preview-mark.png written'
