$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

$src = [System.Drawing.Bitmap]::new((Join-Path $dir 'logo-original.png'))
$w = 1200
$h = [int][Math]::Round($src.Height * $w / $src.Width)
$bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = 'HighQuality'
$g.DrawImage($src, 0, 0, $w, $h)
$g.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = [System.Drawing.Imaging.EncoderParameters]::new(1)
$ep.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]88)
$bmp.Save((Join-Path $dir 'logo.jpg'), $codec, $ep)
$bmp.Dispose(); $src.Dispose()

$jpg = [Math]::Round((Get-Item (Join-Path $dir 'logo.jpg')).Length / 1KB)
$orig = [Math]::Round((Get-Item (Join-Path $dir 'logo-original.png')).Length / 1KB)
Write-Output ("logo.jpg: {0}x{1} q88 = {2} KB (original png {3} KB)" -f $w, $h, $jpg, $orig)
