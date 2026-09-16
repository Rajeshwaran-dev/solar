// Product visual renderer — renders actual client-provided product images across all products & categories.

const ICON_IMAGE_MAP = {
  waterHeater: "/product-1.jpeg",
  streetLight: "/product-3.jpeg",
  lantern: "/product-4.jpeg",
  powerSystem: "/product-5.jpeg",
  inverter: "/product-6.jpeg",
  panel: "/product-7.jpeg",
  battery: "/product-8.jpeg",
  accessory: "/product-9.jpeg",
};

export default function ProductArt({ icon, tint, uid, className, image, alt = "Product" }) {
  const imgSrc = image || ICON_IMAGE_MAP[icon] || "/product-1.jpeg";

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`h-full w-full object-cover object-center ${className || ""}`}
    />
  );
}
