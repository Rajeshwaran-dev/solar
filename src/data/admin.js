// Mock data for the admin dashboard — frontend-only, no backend.

export const adminCustomers = [
  { id: "C-1001", name: "Ramesh Iyer", email: "ramesh.iyer@example.com", phone: "+91 98765 43210", city: "Bengaluru", orders: 5, spent: 277495, status: "Active", joined: "2023-11-02" },
  { id: "C-1002", name: "Priya Nair", email: "priya.nair@example.com", phone: "+91 98221 11223", city: "Kochi", orders: 3, spent: 94997, status: "Active", joined: "2024-02-14" },
  { id: "C-1003", name: "Arvind Menon", email: "arvind.menon@example.com", phone: "+91 97654 22110", city: "Bengaluru", orders: 8, spent: 156320, status: "Active", joined: "2022-06-19" },
  { id: "C-1004", name: "Sunita Rao", email: "sunita.rao@example.com", phone: "+91 96543 33221", city: "Nashik", orders: 1, spent: 149999, status: "Active", joined: "2025-01-08" },
  { id: "C-1005", name: "Deepak Shah", email: "deepak.shah@example.com", phone: "+91 95432 44332", city: "Ahmedabad", orders: 2, spent: 1489998, status: "VIP", joined: "2021-09-25" },
  { id: "C-1006", name: "Kiran Mehta", email: "kiran.mehta@example.com", phone: "+91 94321 55443", city: "Pune", orders: 4, spent: 68996, status: "Active", joined: "2024-05-30" },
  { id: "C-1007", name: "Anjali Desai", email: "anjali.desai@example.com", phone: "+91 93210 66554", city: "Surat", orders: 0, spent: 0, status: "Inactive", joined: "2025-03-11" },
  { id: "C-1008", name: "Rohit Sharma", email: "rohit.sharma@example.com", phone: "+91 92109 77665", city: "Jaipur", orders: 6, spent: 212450, status: "Active", joined: "2023-08-04" },
  { id: "C-1009", name: "Fatima Khan", email: "fatima.khan@example.com", phone: "+91 91098 88776", city: "Hyderabad", orders: 2, spent: 37998, status: "Active", joined: "2024-11-20" },
  { id: "C-1010", name: "Vikram Patel", email: "vikram.patel@example.com", phone: "+91 90987 99887", city: "Chennai", orders: 1, spent: 10999, status: "Inactive", joined: "2025-05-02" },
];

export const adminReviews = [
  { id: "R-1", product: "SunFlow ETC 100 LPD Water Heater", customer: "Kiran M.", rating: 5, date: "2026-08-02", status: "Approved", text: "Excellent build quality, installation team was very professional." },
  { id: "R-2", product: "Luminex All-in-One 40W Street Light", customer: "Anjali D.", rating: 4, date: "2026-07-19", status: "Approved", text: "Works great, took a couple of days longer to deliver than expected." },
  { id: "R-3", product: "VoltCore 3kW MPPT Hybrid Inverter", customer: "Rohit S.", rating: 5, date: "2026-07-02", status: "Pending", text: "Noticeable drop in my electricity bill from month one. Highly recommend." },
  { id: "R-4", product: "GlowMate Lantern 200", customer: "Fatima K.", rating: 4.5, date: "2026-06-14", status: "Approved", text: "Good product, customer support resolved my query quickly." },
  { id: "R-5", product: "HomeGrid 5kW Hybrid System", customer: "Vikram P.", rating: 5, date: "2026-05-28", status: "Pending", text: "Exactly as described. The app monitoring feature is a nice bonus." },
  { id: "R-6", product: "SunMax 375W Mono PERC Panel", customer: "Rakesh T.", rating: 2, date: "2026-05-11", status: "Rejected", text: "Delivery was delayed by two weeks with no communication." },
  { id: "R-7", product: "PowerCell LiFePO4 150Ah Battery", customer: "Meera J.", rating: 5, date: "2026-04-30", status: "Approved", text: "Battery holds charge really well, very happy with this purchase." },
  { id: "R-8", product: "Luminex Pro 100W Street Light", customer: "Sanjay B.", rating: 3, date: "2026-04-18", status: "Pending", text: "Decent brightness but the remote control stopped working after a month." },
];

export const adminCoupons = [
  { id: "CPN-1", code: "MONSOON25", type: "Percentage", value: "25%", minOrder: 5000, usage: 342, limit: 1000, start: "2026-08-01", end: "2026-09-30", status: "Active" },
  { id: "CPN-2", code: "WELCOME500", type: "Flat", value: "₹500", minOrder: 2000, usage: 891, limit: 2000, start: "2026-01-01", end: "2026-12-31", status: "Active" },
  { id: "CPN-3", code: "FESTBUNDLE", type: "Free Gift", value: "MPPT Controller", minOrder: 100000, usage: 47, limit: 200, start: "2026-09-01", end: "2026-10-15", status: "Active" },
  { id: "CPN-4", code: "SOCIETY10", type: "Percentage", value: "18%", minOrder: 50000, usage: 12, limit: 100, start: "2026-08-15", end: "2026-11-01", status: "Active" },
  { id: "CPN-5", code: "UPGRADE10", type: "Percentage", value: "10%", minOrder: 10000, usage: 156, limit: 500, start: "2026-09-10", end: "2026-09-25", status: "Expiring Soon" },
  { id: "CPN-6", code: "SUMMER15", type: "Percentage", value: "15%", minOrder: 5000, usage: 1000, limit: 1000, start: "2026-04-01", end: "2026-05-31", status: "Expired" },
];

export const adminBanners = [
  { id: "BN-1", title: "Monsoon Mega Sale", placement: "Homepage Hero", tint: "sky", status: "Active", startDate: "2026-08-01", endDate: "2026-09-30" },
  { id: "BN-2", title: "Festive Power Bundle", placement: "Offers Page Top", tint: "green", status: "Active", startDate: "2026-09-01", endDate: "2026-10-15" },
  { id: "BN-3", title: "New Season Street Lights", placement: "Category Page", tint: "amber", status: "Active", startDate: "2026-09-05", endDate: "2026-10-05" },
  { id: "BN-4", title: "Diwali Solar Fest", placement: "Homepage Hero", tint: "amber", status: "Scheduled", startDate: "2026-10-20", endDate: "2026-11-10" },
  { id: "BN-5", title: "Summer Clearance", placement: "Homepage Hero", tint: "sky", status: "Inactive", startDate: "2026-04-01", endDate: "2026-05-31" },
];

export const adminEnquiries = [
  { id: "ENQ-1", customer: "Nikhil Verma", phone: "+91 98111 22334", email: "nikhil.verma@example.com", product: "HomeGrid 5kW Hybrid System", requirement: "Site survey for 4BHK independent house", date: "2026-09-14", status: "New" },
  { id: "ENQ-2", customer: "Pooja Reddy", phone: "+91 97222 33445", email: "pooja.reddy@example.com", product: "Solar Water Heaters", requirement: "Bulk quote for 12-unit apartment complex", date: "2026-09-13", status: "In Progress" },
  { id: "ENQ-3", customer: "Manoj Kumar", phone: "+91 96333 44556", email: "manoj.kumar@example.com", product: "Luminex Street Lights", requirement: "40 units for society internal roads", date: "2026-09-11", status: "In Progress" },
  { id: "ENQ-4", customer: "Divya Iyer", phone: "+91 95444 55667", email: "divya.iyer@example.com", product: "PowerMax 25kW Industrial", requirement: "Feasibility check for factory rooftop", date: "2026-09-09", status: "Resolved" },
  { id: "ENQ-5", customer: "Sameer Ali", phone: "+91 94555 66778", email: "sameer.ali@example.com", product: "General Enquiry", requirement: "Subsidy eligibility questions", date: "2026-09-08", status: "Resolved" },
  { id: "ENQ-6", customer: "Neha Kapoor", phone: "+91 93666 77889", email: "neha.kapoor@example.com", product: "RuralPower 2kW Off-Grid", requirement: "Farmhouse power for irrigation pump", date: "2026-09-06", status: "New" },
];

export const adminOrders = [
  { id: "SGS241102", customer: "Nikhil Verma", email: "nikhil.verma@example.com", date: "2026-09-14", items: ["HomeGrid 5kW Hybrid System"], total: 329999, payment: "UPI", status: "Processing" },
  { id: "SGS241098", customer: "Pooja Reddy", email: "pooja.reddy@example.com", date: "2026-09-13", items: ["SunFlow ETC 100 LPD Water Heater", "SunFlow ETC 100 LPD Water Heater"], total: 37998, payment: "Credit Card", status: "Processing" },
  { id: "SGS241087", customer: "Ramesh Iyer", email: "ramesh.iyer@example.com", date: "2026-08-28", items: ["SunFlow ETC 100 LPD Water Heater", "Luminex All-in-One 40W Street Light"], total: 27498, payment: "UPI", status: "Delivered" },
  { id: "SGS241075", customer: "Manoj Kumar", email: "manoj.kumar@example.com", date: "2026-08-25", items: ["Luminex All-in-One 40W Street Light (x40)"], total: 339960, payment: "Net Banking", status: "Shipped" },
  { id: "SGS241060", customer: "Divya Iyer", email: "divya.iyer@example.com", date: "2026-08-20", items: ["PowerMax 25kW Industrial System"], total: 1399999, payment: "Net Banking", status: "Delivered" },
  { id: "SGS240952", customer: "Ramesh Iyer", email: "ramesh.iyer@example.com", date: "2026-08-14", items: ["VoltCore 3kW MPPT Hybrid Inverter"], total: 42999, payment: "Credit Card", status: "Shipped" },
  { id: "SGS240911", customer: "Kiran Mehta", email: "kiran.mehta@example.com", date: "2026-08-10", items: ["DuraPower Tubular 150Ah Battery"], total: 16999, payment: "COD", status: "Delivered" },
  { id: "SGS240884", customer: "Rohit Sharma", email: "rohit.sharma@example.com", date: "2026-08-05", items: ["SunMax 375W Mono PERC Panel (x8)"], total: 87992, payment: "UPI", status: "Delivered" },
  { id: "SGS240711", customer: "Ramesh Iyer", email: "ramesh.iyer@example.com", date: "2026-07-22", items: ["HomeGrid 3kW On-Grid System"], total: 189999, payment: "Net Banking", status: "Processing" },
  { id: "SGS240650", customer: "Fatima Khan", email: "fatima.khan@example.com", date: "2026-07-15", items: ["GlowMate Lantern 200", "Micro Solar Lantern 100"], total: 2298, payment: "UPI", status: "Delivered" },
  { id: "SGS240588", customer: "Sunita Rao", email: "sunita.rao@example.com", date: "2026-07-10", items: ["RuralPower 2kW Off-Grid System"], total: 149999, payment: "Net Banking", status: "Delivered" },
  { id: "SGS239884", customer: "Vikram Patel", email: "vikram.patel@example.com", date: "2026-06-30", items: ["Trekker Solar Lantern 400"], total: 2299, payment: "COD", status: "Cancelled" },
];

export const monthlySales = [
  { month: "Apr", revenue: 2840000, orders: 312 },
  { month: "May", revenue: 3120000, orders: 348 },
  { month: "Jun", revenue: 2950000, orders: 329 },
  { month: "Jul", revenue: 3410000, orders: 378 },
  { month: "Aug", revenue: 3980000, orders: 421 },
  { month: "Sep", revenue: 4260000, orders: 452 },
];

export const categoryPerformance = [
  { category: "Power Systems", value: 38 },
  { category: "Water Heaters", value: 22 },
  { category: "Inverters", value: 16 },
  { category: "Street Lights", value: 12 },
  { category: "Batteries", value: 7 },
  { category: "Others", value: 5 },
];

export const weeklyVisitors = [
  { day: "Mon", visitors: 1240 },
  { day: "Tue", visitors: 1380 },
  { day: "Wed", visitors: 1510 },
  { day: "Thu", visitors: 1420 },
  { day: "Fri", visitors: 1680 },
  { day: "Sat", visitors: 2010 },
  { day: "Sun", visitors: 1790 },
];
