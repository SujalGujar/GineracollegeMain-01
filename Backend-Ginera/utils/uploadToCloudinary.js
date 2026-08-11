const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 't6pf4kyu',
  api_key: process.env.CLOUDINARY_API_KEY || '683952475537554',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'SeCrA1OZ6g7oqKLPEfBFZ9L8XvY',
});

const uploadToCloudinary = async (filePath, folder = 'ginera-college') => {
  if (!filePath || !fs.existsSync(filePath)) return null;
  try {
    console.log(`📤 Uploading file to Cloudinary folder "${folder}"...`);
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
    });
    const fileUrl = result.secure_url || result.url;
    console.log(`✅ Uploaded to Cloudinary: ${fileUrl}`);

    // Clean up temporary local file
    try {
      fs.unlinkSync(filePath);
    } catch (e) {}

    return fileUrl;
  } catch (error) {
    console.error('⚠️ Cloudinary upload error, falling back to local file:', error.message || error);
    return null;
  }
};

module.exports = { cloudinary, uploadToCloudinary };
