Add-Type -AssemblyName System.Drawing

function Compress-ToJpeg($inputPath, $outputPath, $quality = 80, $maxWidth = 1920) {
    $img = [System.Drawing.Image]::FromFile($inputPath)
    $w = $img.Width
    $h = $img.Height

    if ($w -gt $maxWidth) {
        $newW = $maxWidth
        $newH = [int]($h * ($maxWidth / $w))
    } else {
        $newW = $w
        $newH = $h
    }

    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $newW, $newH)
    $img.Dispose()

    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)

    $bmp.Save($outputPath, $codec, $encoderParams)
    $bmp.Dispose()
    $g.Dispose()

    $origSize = (Get-Item $inputPath).Length / 1MB
    $newSize = (Get-Item $outputPath).Length / 1KB
    Write-Host ("Optimized {0} ({1:N2} MB) -> {2} ({3:N1} KB)" -f $inputPath, $origSize, $outputPath, $newSize)
}

Compress-ToJpeg "src/images/backgroundImage(4).png" "src/images/backgroundImage4_opt.jpg" 82 1920
Compress-ToJpeg "src/images/library.jpg" "src/images/library_opt.jpg" 80 1600
Compress-ToJpeg "src/images/laboratory.jpg" "src/images/laboratory_opt.jpg" 80 1600
