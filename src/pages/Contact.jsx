import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Breadcrumb } from "../components/ui/Misc";
import { useToast } from "../context/ToastContext";

const INFO = [
  { icon: Phone, label: "Call Us", value: "+91 72000 82596", href: "tel:+917200082596" },
  { icon: Mail, label: "Email Us", value: "solgreensolar@yahoo.in", href: "mailto:solgreensolar@yahoo.in" },
  { icon: MapPin, label: "Visit Us", value: "Plot No. 3, 4th Right Cross Street, Saravana Nagar, Main Road, Paravai, Madurai – 625402", href: "#map" },
  { icon: Clock, label: "Business Hours", value: "Anytime (Proprietor: C. Prakash)", href: null },
];

export default function Contact() {
  const toast = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast?.push("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-sand-50 pb-24">
      <div className="border-b border-ink-900/8 bg-gradient-to-b from-sand-100 to-sand-50 py-16 sm:py-20">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
          <h1 className="mt-4 max-w-xl font-display text-4xl font-medium text-ink-900 sm:text-5xl">
            Let's talk solar
          </h1>
          <p className="mt-4 max-w-lg text-ink-900/60">
            Questions about products, pricing or custom solar installation? Contact C. Prakash & our expert team anytime.
          </p>
        </div>
      </div>

      <div className="container-page mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {INFO.map((item) => {
          const Card = item.href ? "a" : "div";
          return (
            <Card key={item.label} href={item.href ?? undefined} className="card flex flex-col items-start gap-3 p-6 transition hover:-translate-y-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-800/8 text-primary-800">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/45">{item.label}</p>
                <p className="mt-1 text-xs font-semibold text-ink-900 leading-snug">{item.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="container-page mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="card p-7 sm:p-9">
          <h2 className="font-heading text-xl font-bold text-ink-900">Send us a message</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field">Full Name</label>
                <input required value={form.name} onChange={update("name")} className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="label-field">Phone Number</label>
                <input required value={form.phone} onChange={update("phone")} className="input-field" placeholder="+91 72000 82596" />
              </div>
            </div>
            <div>
              <label className="label-field">Email Address</label>
              <input required type="email" value={form.email} onChange={update("email")} className="input-field" placeholder="you@email.com" />
            </div>
            <div>
              <label className="label-field">Subject</label>
              <select value={form.subject} onChange={update("subject")} className="input-field">
                <option value="">Select a topic</option>
                <option>Product Enquiry</option>
                <option>Get a Quote</option>
                <option>Installation Support</option>
                <option>Warranty Claim</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="label-field">Message</label>
              <textarea required value={form.message} onChange={update("message")} rows={5} className="input-field resize-none" placeholder="Tell us what you need…" />
            </div>
            <button type="submit" className="btn-primary w-full">
              {submitted ? "Message Sent!" : <>Send Message <Send className="h-4 w-4" /></>}
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div id="map" className="overflow-hidden rounded-3xl shadow-soft">
            <iframe
              title="Sol Green Solar Location"
              src="https://maps.google.com/maps?q=Paravai%2C%20Madurai%2C%20Tamil%20Nadu%20625402&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="340"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
          <div className="card flex flex-col items-center gap-4 p-8 text-center">
            <MessageCircle className="h-8 w-8 text-[#25D366]" />
            <div>
              <h3 className="font-heading text-lg font-bold text-ink-900">Prefer WhatsApp?</h3>
              <p className="mt-1 text-sm text-ink-900/55">Chat directly with C. Prakash & our team anytime.</p>
            </div>
            <a
              href="https://wa.me/917200082596"
              target="_blank"
              rel="noreferrer"
              className="btn w-full bg-[#25D366] text-white hover:bg-[#1ebe5a]"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp (+91 72000 82596)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
