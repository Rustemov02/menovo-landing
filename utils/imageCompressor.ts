/**
 * Compress an image file to a data URL with reduced quality/size
 * This helps prevent 413 "Payload Too Large" errors when sending base64 images
 */

export function compressImage(
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.7,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Zəhmət olmasa, təsvir faylı seçin."));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        // Create canvas and draw resized image
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context yaradıla bilmədi"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Export as compressed JPEG (or PNG for transparency)
        const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        reject(new Error("Şəkil yüklənərkən xəta baş verdi"));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Fayl oxunarkən xəta baş verdi"));
    };
    reader.readAsDataURL(file);
  });
}