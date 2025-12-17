export const optimizeImage = (imagePath: string, width: number = 800, quality: number = 80): string => {
  return process.env.PUBLIC_URL + imagePath;
};

export const getImageDimensions = (imagePath: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = reject;
    img.src = imagePath;
  });
};

export const preloadImages = (imagePaths: string[]): void => {
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = process.env.PUBLIC_URL + path;
  });
};

export const validateImage = async (imagePath: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = process.env.PUBLIC_URL + imagePath;
  });
}; 