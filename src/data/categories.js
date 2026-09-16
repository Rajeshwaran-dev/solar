import { products } from "./products";

export const categories = [
  {
    id: "water-heaters",
    slug: "solar-water-heaters",
    name: "Solar Water Heaters",
    tagline: "Hot water, powered by sunlight",
    icon: "waterHeater",
    description:
      "ETC & FPC solar water heating systems engineered for year-round hot water with minimal electricity backup.",
  },
  {
    id: "street-lights",
    slug: "solar-street-lights",
    name: "Solar Street Lights",
    tagline: "Illuminate streets, off the grid",
    icon: "streetLight",
    description:
      "All-in-one integrated street lighting with smart dusk-to-dawn sensors and motion-adaptive brightness.",
  },
  {
    id: "lanterns",
    slug: "solar-lanterns",
    name: "Solar Lanterns",
    tagline: "Portable light, anywhere",
    icon: "lantern",
    description:
      "Rugged, rechargeable solar lanterns for homes, camping and emergency backup lighting.",
  },
  {
    id: "power-systems",
    slug: "solar-power-systems",
    name: "Solar Power Systems",
    tagline: "Complete rooftop energy systems",
    icon: "powerSystem",
    description:
      "On-grid, off-grid and hybrid rooftop solar systems sized for homes, offices and industry.",
  },
  {
    id: "inverters",
    slug: "solar-inverters",
    name: "Solar Inverters",
    tagline: "The brain of your solar system",
    icon: "inverter",
    description:
      "High-efficiency MPPT & hybrid inverters with smart monitoring and pure sine wave output.",
  },
  {
    id: "panels",
    slug: "solar-panels",
    name: "Solar Panels",
    tagline: "Monocrystalline. Built to last.",
    icon: "panel",
    description:
      "High-density monocrystalline PERC panels engineered for maximum yield per square foot.",
  },
  {
    id: "batteries",
    slug: "solar-batteries",
    name: "Solar Batteries",
    tagline: "Store every ray you capture",
    icon: "battery",
    description:
      "Lithium & tubular battery banks for reliable, long-cycle-life solar energy storage.",
  },
  {
    id: "accessories",
    slug: "solar-accessories",
    name: "Solar Accessories",
    tagline: "The details that matter",
    icon: "accessory",
    description:
      "Mounting structures, cables, charge controllers and the hardware that ties it all together.",
  },
].map((cat) => ({
  ...cat,
  productCount: products.filter((p) => p.category === cat.slug).length,
}));

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);
