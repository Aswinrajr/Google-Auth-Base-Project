import axios from "axios";

export const uploadToCloudinary = async (file, inputName) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "YOUR_CLOUD_NAME"); // Replace with your Cloudinary cloud name

    // Generate the timestamp and set the public_id with input name and timestamp
    const timestamp = new Date().toISOString();
    const publicId = `${inputName}_${timestamp}`;

    formData.append("public_id", publicId); // Assign public_id to the file

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, 
      formData, 
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data.secure_url;  // Return the secure URL of the uploaded image
  } catch (error) {
    console.error("Cloudinary upload error", error);
    throw new Error("Failed to upload image. Please try again.");
  }
};
