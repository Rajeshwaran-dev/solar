import { Routes, Route } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Offers from "./pages/Offers";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import AccountLayout from "./pages/account/AccountLayout";
import Dashboard from "./pages/account/Dashboard";
import Profile from "./pages/account/Profile";
import Orders from "./pages/account/Orders";
import OrderDetail from "./pages/account/OrderDetail";
import Wishlist from "./pages/account/Wishlist";
import Addresses from "./pages/account/Addresses";
import Settings from "./pages/account/Settings";
import NotFound from "./pages/NotFound";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/Dashboard";
import ProductList from "./admin/pages/products/ProductList";
import ProductForm from "./admin/pages/products/ProductForm";
import CategoryList from "./admin/pages/categories/CategoryList";
import Inventory from "./admin/pages/Inventory";
import OrderList from "./admin/pages/orders/OrderList";
import AdminOrderDetail from "./admin/pages/orders/OrderDetail";
import CustomerList from "./admin/pages/customers/CustomerList";
import CustomerDetail from "./admin/pages/customers/CustomerDetail";
import Reviews from "./admin/pages/Reviews";
import Coupons from "./admin/pages/Coupons";
import OffersAdmin from "./admin/pages/OffersAdmin";
import AdminProjectList from "./admin/pages/projects/ProjectList";
import AdminProjectForm from "./admin/pages/projects/ProjectForm";
import Enquiries from "./admin/pages/Enquiries";
import Reports from "./admin/pages/Reports";
import SettingsAdmin from "./admin/pages/SettingsAdmin";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id" element={<ProductForm />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<AdminOrderDetail />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="offers" element={<OffersAdmin />} />
        <Route path="projects" element={<AdminProjectList />} />
        <Route path="projects/new" element={<AdminProjectForm />} />
        <Route path="projects/:id" element={<AdminProjectForm />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
