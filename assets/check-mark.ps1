$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$mark = [System.Drawing.Bitmap]::new((Join-Path $dir 'logo-white-full.png'))

# spot-check pixels
$pts = @(@(700,150), @(700,460), @(200,200), @(100,100))
foreach ($p in $pts) {
  $c = $mark.GetPixel($p[0], $p[1])
  Write-Output ("px {0},{1} = R{2} G{3} B{4} A{5}" -f $p[0], $p[1], $c.R, $c.G, $c.B, $c.A)
}

# composite over blue background for unambiguous preview
$bg = [System.Drawing.Bitmap]::new($mark.Width, $mark.Height)
$g = [System.Drawing.Graphics]::FromImage($bg)
$g.Clear([System.Drawing.Color]::FromArgb(255, 20, 60, 120))
$g.DrawImage($mark, 0, 0, $mark.Width, $mark.Height)
$g.Dispose()
$bg.Save((Join-Path $dir 'preview-blue.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$bg.Dispose(); $mark.Dispose()
Write-Output 'preview-blue.png written'
