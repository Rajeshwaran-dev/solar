export const orders = [
  {
    id: "SGS241087",
    date: "2026-08-28",
    status: "Delivered",
    payment: "UPI",
    total: 27498,
    items: [
      { slug: "sunflow-etc-100lpd", qty: 1, price: 18999 },
      { slug: "luminex-allinone-40w", qty: 1, price: 8499 },
    ],
    address: "123 MG Road, Indiranagar, Bengaluru, Karnataka 560038",
    timeline: [
      { label: "Order Placed", date: "2026-08-28", done: true },
      { label: "Processed", date: "2026-08-29", done: true },
      { label: "Shipped", date: "2026-08-31", done: true },
      { label: "Delivered", date: "2026-09-03", done: true },
    ],
  },
  {
    id: "SGS240952",
    date: "2026-08-14",
    status: "Shipped",
    payment: "Credit Card",
    total: 42999,
    items: [{ slug: "voltcore-3kw-mppt", qty: 1, price: 42999 }],
    address: "44 Lake View Apartments, Kothrud, Pune, Maharashtra 411038",
    timeline: [
      { label: "Order Placed", date: "2026-08-14", done: true },
      { label: "Processed", date: "2026-08-15", done: true },
      { label: "Shipped", date: "2026-08-17", done: true },
      { label: "Delivered", date: "Expected 2026-09-20", done: false },
    ],
  },
  {
    id: "SGS240711",
    date: "2026-07-22",
    status: "Processing",
    payment: "Net Banking",
    total: 189999,
    items: [{ slug: "homegrid-3kw-ongrid", qty: 1, price: 189999 }],
    address: "7 Palm Grove, Anna Nagar, Chennai, Tamil Nadu 600040",
    timeline: [
      { label: "Order Placed", date: "2026-07-22", done: true },
      { label: "Processed", date: "2026-07-24", done: true },
      { label: "Shipped", date: "Pending", done: false },
      { label: "Delivered", date: "Pending", done: false },
    ],
  },
  {
    id: "SGS239884",
    date: "2026-06-30",
    status: "Cancelled",
    payment: "Cash on Delivery",
    total: 2299,
    items: [{ slug: "trekker-lantern-400", qty: 1, price: 2299 }],
    address: "12 Sector 21, Rohini, New Delhi 110085",
    timeline: [
      { label: "Order Placed", date: "2026-06-30", done: true },
      { label: "Cancelled", date: "2026-07-01", done: true },
    ],
  },
  {
    id: "SGS239502",
    date: "2026-06-05",
    status: "Delivered",
    payment: "UPI",
    total: 16999,
    items: [{ slug: "durapower-tubular-150ah", qty: 1, price: 16999 }],
    address: "123 MG Road, Indiranagar, Bengaluru, Karnataka 560038",
    timeline: [
      { label: "Order Placed", date: "2026-06-05", done: true },
      { label: "Processed", date: "2026-06-06", done: true },
      { label: "Shipped", date: "2026-06-08", done: true },
      { label: "Delivered", date: "2026-06-11", done: true },
    ],
  },
];

export const addresses = [
  {
    id: 1,
    label: "Home",
    default: true,
    name: "Ramesh Iyer",
    phone: "+91 98765 43210",
    line: "123 MG Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
  },
  {
    id: 2,
    label: "Office",
    default: false,
    name: "Ramesh Iyer",
    phone: "+91 98765 43210",
    line: "4th Floor, GreenTech Tower, Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560066",
  },
];

export const currentUser = {
  name: "Ramesh Iyer",
  email: "ramesh.iyer@example.com",
  phone: "+91 98765 43210",
  since: "2023-11-02",
};

export const getOrderById = (id) => orders.find((o) => o.id === id);
