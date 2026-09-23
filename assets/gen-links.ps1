# Regenerate the intel-map decoration layer:
#   1. pick a few large field triangles from the major portals (area-desc, planar-safe)
#   2. seed their edges as links, then greedily fill the rest of the link web (shortest edge first,
#      reject any crossing) -> the whole graph stays planar, exactly like Ingress
#   3. portals / labels / chrome blocks are carried over from the previous svg-deco.txt
$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

$P = @(
  @(347,377),@(378,380),@(411,378),@(224,410),@(202,444),@(218,396),@(93,295),@(310,262),@(223,131),@(545,184),@(507,215),@(629,217),@(534,359),@(782,331),
  @(366,401),@(335,390),@(360,372),@(371,392),@(340,408),@(390,372),@(352,362),@(322,360),@(411,393),@(425,370),@(398,365),@(440,352),@(468,340),
  @(237,383),@(209,415),@(193,430),@(245,398),@(260,390),@(168,370),@(150,340),@(128,310),@(183,352),@(112,268),@(290,240),@(330,285),@(250,155),
  @(560,230),@(585,210),@(530,250),@(650,240),@(457,284),@(856,519),@(820,420),@(750,380)
)
$n = $P.Count

function Cross($ax,$ay,$bx,$by,$cx,$cy) {
  return ($bx-$ax)*($cy-$ay) - ($by-$ay)*($cx-$ax)
}
function SegsCross($p1,$p2,$p3,$p4) {
  $d1 = Cross $p3[0] $p3[1] $p4[0] $p4[1] $p1[0] $p1[1]
  $d2 = Cross $p3[0] $p3[1] $p4[0] $p4[1] $p2[0] $p2[1]
  $d3 = Cross $p1[0] $p1[1] $p2[0] $p2[1] $p3[0] $p3[1]
  $d4 = Cross $p1[0] $p1[1] $p2[0] $p2[1] $p4[0] $p4[1]
  return ((($d1 -gt 0 -and $d2 -lt 0) -or ($d1 -lt 0 -and $d2 -gt 0)) -and
          (($d3 -gt 0 -and $d4 -lt 0) -or ($d3 -lt 0 -and $d4 -gt 0)))
}
function PointInTri($pt,$tri) {
  $A=$P[$tri[0]]; $B=$P[$tri[1]]; $C=$P[$tri[2]]
  $d1 = Cross $A[0] $A[1] $B[0] $B[1] $pt[0] $pt[1]
  $d2 = Cross $B[0] $B[1] $C[0] $C[1] $pt[0] $pt[1]
  $d3 = Cross $C[0] $C[1] $A[0] $A[1] $pt[0] $pt[1]
  $hasNeg = ($d1 -lt 0) -or ($d2 -lt 0) -or ($d3 -lt 0)
  $hasPos = ($d1 -gt 0) -or ($d2 -gt 0) -or ($d3 -gt 0)
  return (-not ($hasNeg -and $hasPos))
}
function EdgeInSet($a,$b,$set) {
  return ($set.Contains("$a-$b") -or $set.Contains("$b-$a"))
}

$links = New-Object System.Collections.Generic.List[object]
$edgeSet = New-Object 'System.Collections.Generic.HashSet[string]'
$deg = [int[]]::new($n)

function Try-AddEdge($i,$j) {
  if (EdgeInSet $i $j $edgeSet) { return $true }
  foreach ($l in $links) {
    if ($l.i -eq $i -or $l.i -eq $j -or $l.j -eq $i -or $l.j -eq $j) { continue }
    if (SegsCross $P[$i] $P[$j] $P[$l.i] $P[$l.j]) { return $false }
  }
  [void]$links.Add(@{ i=$i; j=$j })
  [void]$edgeSet.Add("$i-$j")
  $script:deg[$i]++; $script:deg[$j]++
  return $true
}

# ---- step 1: large fields from major portals ----
$major = @(0..13)
$fieldCands = New-Object System.Collections.Generic.List[object]
for ($a=0; $a -lt 14; $a++) {
  for ($b=$a+1; $b -lt 14; $b++) {
    for ($c=$b+1; $c -lt 14; $c++) {
      $area = [Math]::Abs((Cross $P[$a][0] $P[$a][1] $P[$b][0] $P[$b][1] $P[$c][0] $P[$c][1])) / 2
      if ($area -lt 15000) { continue }
      [void]$fieldCands.Add([pscustomobject]@{ t=@($a,$b,$c); area=$area })
    }
  }
}
$fieldCands = @($fieldCands | Sort-Object area -Descending)
$fields = New-Object System.Collections.Generic.List[object]
foreach ($fc in $fieldCands) {
  if ($fields.Count -ge 4) { break }
  $t = $fc.t
  # overlapping / nested fields are legal in-game and look like layered ops; only planarity matters
  $ok = (Try-AddEdge $t[0] $t[1]) -and (Try-AddEdge $t[1] $t[2]) -and (Try-AddEdge $t[2] $t[0])
  if (-not $ok) { continue }
  [void]$fields.Add($t)
}

# ---- step 2: greedy fill of the remaining web ----
$maxDeg = 6; $maxLinks = 85
$cands = New-Object System.Collections.Generic.List[object]
for ($i=0; $i -lt $n; $i++) {
  for ($j=$i+1; $j -lt $n; $j++) {
    if (EdgeInSet $i $j $edgeSet) { continue }
    $dx=$P[$i][0]-$P[$j][0]; $dy=$P[$i][1]-$P[$j][1]
    [void]$cands.Add([pscustomobject]@{ i=$i; j=$j; d=[Math]::Sqrt($dx*$dx+$dy*$dy) })
  }
}
$cands = @($cands | Sort-Object d)
foreach ($c in $cands) {
  if ($links.Count -ge $maxLinks) { break }
  if ($deg[$c.i] -ge $maxDeg -or $deg[$c.j] -ge $maxDeg) { continue }
  [void](Try-AddEdge $c.i $c.j)
}

# ---- verify planarity (must be zero) ----
$crossCount = 0
for ($x=0; $x -lt $links.Count; $x++) {
  for ($y=$x+1; $y -lt $links.Count; $y++) {
    $l1=$links[$x]; $l2=$links[$y]
    if ($l1.i -eq $l2.i -or $l1.i -eq $l2.j -or $l1.j -eq $l2.i -or $l1.j -eq $l2.j) { continue }
    if (SegsCross $P[$l1.i] $P[$l1.j] $P[$l2.i] $P[$l2.j]) { $crossCount++ }
  }
}

# ---- static layers (portals / labels / chrome) ----
$static = Get-Content (Join-Path $dir 'svg-static.txt') -Raw -Encoding UTF8

# ---- emit ----
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('<g id="fields">')
foreach ($f in $fields) {
  $A=$P[$f[0]]; $B=$P[$f[1]]; $C=$P[$f[2]]
  [void]$sb.AppendLine(('<path class="fld" d="M{0},{1} {2},{3} {4},{5}Z"/>' -f @($A[0],$A[1],$B[0],$B[1],$C[0],$C[1])))
}
[void]$sb.AppendLine('</g>')
[void]$sb.AppendLine('<g id="links">')
$idx = 0
foreach ($l in $links) {
  $cls = if (($idx % 6) -eq 0) { 'lk2' } else { 'lk' }
  [void]$sb.AppendLine(('<line class="{0}" x1="{1}" y1="{2}" x2="{3}" y2="{4}"/>' -f @($cls,$P[$l.i][0],$P[$l.i][1],$P[$l.j][0],$P[$l.j][1])))
  $idx++
}
[void]$sb.AppendLine('</g>')
[void]$sb.AppendLine($static)
# static block leaves portals/labels groups open on purpose; close labels then portals
[void]$sb.AppendLine('</g>')
[void]$sb.AppendLine('</g>')
[void]$sb.AppendLine('</svg>')

$out = Join-Path $dir 'svg-deco.txt'
[System.IO.File]::WriteAllText($out, $sb.ToString(), [System.Text.UTF8Encoding]::new($false))
Write-Output ("portals: {0}  links: {1}  fields: {2}  link-crossings: {3}" -f $n, $links.Count, $fields.Count, $crossCount)
