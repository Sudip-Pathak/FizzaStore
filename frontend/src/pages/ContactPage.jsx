import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Meta from "../components/Meta";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Meta title="Contact Us – FizzaStore" />

      {/* Hero */}
      <div className="bg-primary text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="opacity-80 max-w-xl mx-auto">
            Have a question, concern, or just want to say hi? We'd love to hear from you. Our support team is here 24/7.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Info Cards */}
          <div className="space-y-5">
            {[
              { icon: <MapPin className="text-primary" size={22} />, title: "Our Address", detail: "123 Commerce St, Tech City, TC 10101" },
              { icon: <Phone className="text-primary" size={22} />, title: "Phone", detail: "+1 (800) 123-4567" },
              { icon: <Mail className="text-primary" size={22} />, title: "Email", detail: "support@fizzastore.com" },
              { icon: <Clock className="text-primary" size={22} />, title: "Working Hours", detail: "Mon–Sat: 9am – 6pm" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-sm shadow-sm border border-base-200 p-5 flex items-start gap-4"
              >
                <div className="p-2 bg-primary/10 rounded-full">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">{item.title}</h3>
                  <p className="font-medium text-gray-800 mt-0.5">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-sm shadow-sm border border-base-200 p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <MessageSquare className="text-green-600" size={40} />
                </div>
                <h2 className="text-2xl font-bold">Message Sent!</h2>
                <p className="text-gray-500 max-w-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="btn btn-primary btn-sm rounded-sm text-white mt-2">
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Your Name</span></label>
                      <input type="text" placeholder="John Doe" className="input input-bordered rounded-sm w-full" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Email Address</span></label>
                      <input type="email" placeholder="john@example.com" className="input input-bordered rounded-sm w-full" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Subject</span></label>
                    <input type="text" placeholder="How can we help?" className="input input-bordered rounded-sm w-full" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Message</span></label>
                    <textarea rows={5} placeholder="Type your message here..." className="textarea textarea-bordered rounded-sm w-full" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn btn-primary rounded-sm text-white gap-2">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
