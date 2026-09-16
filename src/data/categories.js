export const categories = [
  {
    id: "water-heaters",
    slug: "solar-water-heaters",
    name: "Solar Water Heaters",
    tagline: "Hot water, powered by sunlight",
    icon: "waterHeater",
    productCount: 6,
    description:
      "ETC & FPC solar water heating systems engineered for year-round hot water with minimal electricity backup.",
  },
  {
    id: "street-lights",
    slug: "solar-street-lights",
    name: "Solar Street Lights",
    tagline: "Illuminate streets, off the grid",
    icon: "streetLight",
    productCount: 5,
    description:
      "All-in-one integrated street lighting with smart dusk-to-dawn sensors and motion-adaptive brightness.",
  },
  {
    id: "lanterns",
    slug: "solar-lanterns",
    name: "Solar Lanterns",
    tagline: "Portable light, anywhere",
    icon: "lantern",
    productCount: 4,
    description:
      "Rugged, rechargeable solar lanterns for homes, camping and emergency backup lighting.",
  },
  {
    id: "power-systems",
    slug: "solar-power-systems",
    name: "Solar Power Systems",
    tagline: "Complete rooftop energy systems",
    icon: "powerSystem",
    productCount: 5,
    description:
      "On-grid, off-grid and hybrid rooftop solar systems sized for homes, offices and industry.",
  },
  {
    id: "inverters",
    slug: "solar-inverters",
    name: "Solar Inverters",
    tagline: "The brain of your solar system",
    icon: "inverter",
    productCount: 4,
    description:
      "High-efficiency MPPT & hybrid inverters with smart monitoring and pure sine wave output.",
  },
  {
    id: "panels",
    slug: "solar-panels",
    name: "Solar Panels",
    tagline: "Monocrystalline. Built to last.",
    icon: "panel",
    productCount: 4,
    description:
      "High-density monocrystalline PERC panels engineered for maximum yield per square foot.",
  },
  {
    id: "batteries",
    slug: "solar-batteries",
    name: "Solar Batteries",
    tagline: "Store every ray you capture",
    icon: "battery",
    productCount: 3,
    description:
      "Lithium & tubular battery banks for reliable, long-cycle-life solar energy storage.",
  },
  {
    id: "accessories",
    slug: "solar-accessories",
    name: "Solar Accessories",
    tagline: "The details that matter",
    icon: "accessory",
    productCount: 5,
    description:
      "Mounting structures, cables, charge controllers and the hardware that ties it all together.",
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);
