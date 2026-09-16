import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronLeft, ChevronRight, CreditCard, Wallet, Landmark, Truck, Zap,
  ShieldCheck, PackageCheck, MapPin,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProductBySlug } from "../data/products";
import { formatPrice } from "../lib/format";
import ProductArt from "../components/illustrations/ProductArt";

const STEPS = ["Information", "Shipping", "Payment", "Review"];

const SHIPPING_METHODS = [
  { id: "standard", label: "Standard Delivery", desc: "5–7 business days", price: 0, icon: Truck },
  { id: "express", label: "Express Delivery", desc: "2–3 business days", price: 349, icon: Zap },
];

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Wallet },
  { id: "netbanking", label: "Net Banking", icon: Landmark },
  { id: "cod", label: "Cash on Delivery", icon: PackageCheck },
];

export default function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
  });

  const lineItems = items.map((i) => ({ ...i, product: getProductBySlug(i.slug) })).filter((i) => i.product);
  const subtotal = useMemo(() => lineItems.reduce((s, i) => s + i.product.price * i.qty, 0), [lineItems]);
  const shippingCost = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.price ?? 0;
  const total = subtotal + shippingCost;

  if (lineItems.length === 0 && !placed) {
    navigate("/cart");
    return null;
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const canProceed = () => {
    if (step === 0) return form.name && form.email && form.phone && form.address && form.city && form.pincode;
    return true;
  };

  const placeOrder = () => {
    setOrderNumber(`SGS${Math.floor(100000 + Math.random() * 900000)}`);
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-800/10">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-800">
              <Check className="h-7 w-7 text-accent-400" />
            </span>
          </div>
          <h1 className="mt-6 font-display text-3xl font-medium text-ink-900">Order Confirmed!</h1>
          <p className="mt-3 text-ink-900/60">
            Thank you — your order <span className="font-semibold text-ink-900">#{orderNumber}</span> has
            been placed. A confirmation email is on its way to {form.email || "you"}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/account/orders" className="btn-primary">Track Your Order</Link>
            <Link to="/products" className="btn-outline">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-sand-50 pb-24">
      <div className="container-page pt-8">
        <h1 className="font-display text-3xl font-medium text-ink-900">Checkout</h1>

        <div className="mt-8 flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                    i < step ? "bg-primary-800 text-sand-50" : i === step ? "bg-accent-500 text-ink-950" : "bg-sand-200 text-ink-900/40"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className={`hidden text-xs font-semibold sm:block ${i <= step ? "text-ink-900" : "text-ink-900/40"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 h-0.5 flex-1 ${i < step ? "bg-primary-800" : "bg-sand-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container-page mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              {step === 0 && (
                <div className="card space-y-5 p-6 sm:p-8">
                  <h2 className="font-heading text-lg font-bold text-ink-900">Customer Information</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Full Name" value={form.name} onChange={update("name")} placeholder="Ramesh Iyer" />
                    <Field label="Phone Number" value={form.phone} onChange={update("phone")} placeholder="+91 98765 43210" />
                  </div>
                  <Field label="Email Address" type="email" value={form.email} onChange={update("email")} placeholder="you@email.com" />
                  <h2 className="pt-3 font-heading text-lg font-bold text-ink-900">Delivery Address</h2>
                  <Field label="Address" value={form.address} onChange={update("address")} placeholder="House no, street, area" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Field label="City" value={form.city} onChange={update("city")} placeholder="Bengaluru" />
                    <Field label="State" value={form.state} onChange={update("state")} placeholder="Karnataka" />
                    <Field label="Pincode" value={form.pincode} onChange={update("pincode")} placeholder="560066" />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="card space-y-4 p-6 sm:p-8">
                  <h2 className="font-heading text-lg font-bold text-ink-900">Shipping Method</h2>
                  {SHIPPING_METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                        shippingMethod === m.id ? "border-primary-700 bg-primary-800/5" : "border-ink-900/10"
                      }`}
                    >
                      <input type="radio" name="shipping" checked={shippingMethod === m.id} onChange={() => setShippingMethod(m.id)} className="h-4 w-4 text-primary-700" />
                      <m.icon className="h-5 w-5 text-primary-700" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink-900">{m.label}</p>
                        <p className="text-xs text-ink-900/45">{m.desc}</p>
                      </div>
                      <span className="font-heading text-sm font-bold text-ink-900">{m.price === 0 ? "Free" : formatPrice(m.price)}</span>
                    </label>
                  ))}
                  <div className="mt-2 flex items-start gap-2.5 rounded-2xl bg-sand-100/70 p-4 text-xs text-ink-900/55">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
                    Delivering to: {form.address}, {form.city}, {form.state} {form.pincode}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="card space-y-4 p-6 sm:p-8">
                  <h2 className="font-heading text-lg font-bold text-ink-900">Payment Method</h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {PAYMENT_METHODS.map((m) => (
                      <label
                        key={m.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                          paymentMethod === m.id ? "border-primary-700 bg-primary-800/5" : "border-ink-900/10"
                        }`}
                      >
                        <input type="radio" name="payment" checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} className="h-4 w-4 text-primary-700" />
                        <m.icon className="h-5 w-5 text-primary-700" />
                        <span className="text-sm font-semibold text-ink-900">{m.label}</span>
                      </label>
                    ))}
                  </div>
                  {paymentMethod === "card" && (
                    <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                      <Field label="Card Number" placeholder="1234 5678 9012 3456" className="sm:col-span-2" />
                      <Field label="Expiry" placeholder="MM/YY" />
                      <Field label="CVV" placeholder="123" />
                    </div>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-xs text-ink-900/45">
                    <ShieldCheck className="h-4 w-4 text-primary-700" /> Your payment information is encrypted and secure.
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div className="card space-y-4 p-6 sm:p-8">
                    <h2 className="font-heading text-lg font-bold text-ink-900">Review Your Order</h2>
                    <div className="space-y-3">
                      {lineItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand-100">
                            <ProductArt icon={item.product.icon} tint={item.product.tint} uid={`rev-${item.id}`} className="h-full w-full p-2" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-ink-900">{item.product.name}</p>
                            <p className="text-xs text-ink-900/45">Qty: {item.qty}</p>
                          </div>
                          <span className="text-sm font-bold text-ink-900">{formatPrice(item.product.price * item.qty)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card p-6 text-sm text-ink-900/60 sm:p-8">
                    <p><span className="font-semibold text-ink-900">Deliver to:</span> {form.name}, {form.address}, {form.city}, {form.state} {form.pincode}</p>
                    <p className="mt-1.5"><span className="font-semibold text-ink-900">Shipping:</span> {SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.label}</p>
                    <p className="mt-1.5"><span className="font-semibold text-ink-900">Payment:</span> {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`btn-outline btn-sm ${step === 0 ? "invisible" : ""}`}
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => canProceed() && setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="btn-primary btn-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={placeOrder} className="btn-accent">
                Place Order <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="card h-fit p-6">
          <h3 className="font-heading text-base font-bold text-ink-900">Order Summary</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-ink-900/60"><span>Subtotal</span><span className="font-semibold text-ink-900">{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-ink-900/60"><span>Shipping</span><span className="font-semibold text-ink-900">{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span></div>
            <div className="my-2 h-px bg-ink-900/8" />
            <div className="flex justify-between"><span className="font-heading font-bold text-ink-900">Total</span><span className="font-heading text-xl font-extrabold text-ink-900">{formatPrice(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="label-field">{label}</label>
      <input className="input-field" {...props} />
    </div>
  );
}
