const load = async function () {
  let images: Record<string, () => Promise<unknown>> | undefined = undefined;
  try {
    images = import.meta.glob("/src/assets/images/**");
  } catch (e) {
    // continue regardless of error
  }
  return images;
};

let _images: Promise<Record<string, () => Promise<unknown>> | undefined>;

export const fetchLocalImages = async () => {
  _images = _images || load();
  return await _images;
};

type ImageModule = {
  default: string;
};

export const findImage = async (imagePath?: string): Promise<string | null> => {
  if (typeof imagePath !== "string") {
    return null;
  }

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("/")
  ) {
    return imagePath;
  }

  if (!imagePath.startsWith("~/assets")) {
    return imagePath; // FIXME: Fix relative images
  }

  const images = await fetchLocalImages();
  if (!images) {
    return null; // or throw new Error('Images could not be loaded');
  }

  const key = imagePath.replace("~/", "/src/");
  const imageImport = images[key];

  if (typeof imageImport === "function") {
    const module = (await imageImport()) as ImageModule;
    return module.default;
  }

  return null;
};
