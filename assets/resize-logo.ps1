# Downscale hero logo and generate square favicon
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

$img = [System.Drawing.Image]::FromFile((Join-Path $dir 'logo.png'))
Write-Output ("original: {0}x{1}" -f $img.Width, $img.Height)

# square favicon: crop center square from original, 128px
$sq = [Math]::Min($img.Width, $img.Height)
$cx = [int](($img.Width - $sq) / 2); $cy = [int](($img.Height - $sq) / 2)
$crop = New-Object System.Drawing.Bitmap(128, 128)
$g2 = [System.Drawing.Graphics]::FromImage($crop)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = New-Object System.Drawing.Rectangle($cx, $cy, $sq, $sq)
$dstRect = New-Object System.Drawing.Rectangle(0, 0, 128, 128)
$g2.DrawImage($img, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g2.Dispose()
$crop.Save((Join-Path $dir 'favicon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$crop.Dispose()

$w = 1400
$h = [int]($img.Height * $w / $img.Width)
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = 'HighQuality'
$g.DrawImage($img, 0, 0, $w, $h)
$g.Dispose()
$bmp.Save((Join-Path $dir 'logo-web.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
Move-Item -Force (Join-Path $dir 'logo-web.png') (Join-Path $dir 'logo.png')
Write-Output ("logo.png -> {0}x{1}" -f $w, $h)
