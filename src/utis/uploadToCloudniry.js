// export const uploadToCloudinary = async (pics,fileType) => {
    
//     if (pics && fileType) {

//         console.log("pics",pics,fileType)
      
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "zosh-social");
//       data.append("cloud_name", "dcpesbd8q");
  
//       const res = await 
//       fetch(`https://api.cloudinary.com/v1_1/dcpesbd8q/${fileType}/upload`, {
//         method: "post",
//         body: data,
//       })
        
//         const fileData=await res.json();
//         console.log("url : ", fileData.url);
//         return fileData.url
  
//     } else {
//       console.log("error");
//     }
//   };
export const uploadToCloudinary = async (pics, fileType) => {
  if (!pics || !fileType) {
    console.error("Missing file or file type");
    return null;
  }

  try {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "zosh-social");  // 👈 Your working preset
    data.append("cloud_name", "dgqvxtayn");       // 👈 Your cloud name

    const res = await fetch(`https://api.cloudinary.com/v1_1/dgqvxtayn/${fileType}/upload`, {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();

    if (!res.ok) {
      console.error("Cloudinary error:", fileData);
      return null;
    }

    console.log("Uploaded image URL:", fileData.secure_url);
    return fileData.secure_url;
  } catch (err) {
    console.error("Upload failed", err);
    return null;
  }
};
