const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 't6pf4kyu',
  api_key: process.env.CLOUDINARY_API_KEY || '683952475537554',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'SeCrA1OZ6g7oqKLPEfBFZ9L8XvY',
});

// Helper to extract resourceType and publicId from a Cloudinary URL
const extractCloudinaryInfo = (url) => {
  if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) return null;
  const match = url.match(/\/([a-z0-9_-]+)\/upload\/(?:v\d+\/)?(.+)$/i);
  if (!match) return null;
  const resourceType = match[1]; // 'image', 'raw', or 'video'
  const publicIdWithExt = match[2];
  let publicId = publicIdWithExt;
  if (resourceType === 'image') {
    const extIdx = publicIdWithExt.lastIndexOf('.');
    if (extIdx > -1) {
      publicId = publicIdWithExt.substring(0, extIdx);
    }
  }
  return { resourceType, publicId, publicIdWithExt };
};

// Returns string URL (for backwards compatibility with existing controllers)
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

    // Clean up temporary local file from backend disk
    try {
      fs.unlinkSync(filePath);
    } catch (e) {}

    return fileUrl;
  } catch (error) {
    console.error('⚠️ Cloudinary upload error:', error.message || error);
    return null;
  }
};

// Detailed uploader returning { fileUrl, publicId, resourceType } and deleting local file
const uploadFileToCloudinary = async (filePath, folder = 'ginera-announcements') => {
  if (!filePath || !fs.existsSync(filePath)) return null;
  try {
    console.log(`📤 Uploading document to Cloudinary folder "${folder}"...`);
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
    });

    const fileUrl = result.secure_url || result.url;
    console.log(`✅ Uploaded document to Cloudinary (${result.resource_type}): ${fileUrl}`);

    // Clean up temporary local file from backend disk immediately
    try {
      fs.unlinkSync(filePath);
    } catch (e) {}

    return {
      fileUrl,
      publicId: result.public_id,
      resourceType: result.resource_type,
    };
  } catch (error) {
    console.error('⚠️ Cloudinary upload error:', error.message || error);
    // Even on error, clean up the temp file if it exists
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (e) {}
    throw error;
  }
};

// Delete a document or asset from Cloudinary by publicId or URL
const deleteFromCloudinary = async (publicIdOrUrl, resourceType = 'image') => {
  if (!publicIdOrUrl) return false;
  try {
    let publicId = publicIdOrUrl;
    let type = resourceType || 'image';

    if (publicIdOrUrl.includes('cloudinary.com')) {
      const extracted = extractCloudinaryInfo(publicIdOrUrl);
      if (extracted) {
        publicId = extracted.publicId;
        type = extracted.resourceType || type;
      }
    }

    console.log(`🗑️ Deleting from Cloudinary (${type}): ${publicId}...`);
    let res = await cloudinary.uploader.destroy(publicId, { resource_type: type });
    
    // Fallback: if not found, check the alternative resource_type ('raw' vs 'image')
    if (res.result !== 'ok') {
      const altType = type === 'raw' ? 'image' : 'raw';
      res = await cloudinary.uploader.destroy(publicId, { resource_type: altType });
    }

    console.log(`✅ Cloudinary delete result for "${publicId}":`, res.result);
    return res.result === 'ok';
  } catch (error) {
    console.error('⚠️ Cloudinary delete error:', error.message || error);
    return false;
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  uploadFileToCloudinary,
  deleteFromCloudinary,
  extractCloudinaryInfo,
};
