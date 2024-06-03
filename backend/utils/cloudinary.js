import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "ds7pcbkx4",
  api_key: "647537793727767",
  api_secret: "TyVP76xnjegbeVM5KBTJz8kuoYY",
});

export const upload_file = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: "auto",
        folder,
      }
    );
  });
};

export const delete_file = async (file) => {
  const res = await cloudinary.uploader.destroy(file);

  if (res?.result === "ok") return true;
};
