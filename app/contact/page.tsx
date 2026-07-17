// app/contact/page.tsx
"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Container from "@/components/Container";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API pipeline intake
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <Container className="py-12 max-w-5xl space-y-8">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Contact Our Support Team</h1>
        <p className="text-sm text-gray-500">
          Have a question about an order, store validation metrics, or custom business logistics? Drop us a note.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Left Columns: Core Info Details */}
        <div className="md:col-span-1 bg-gray-50 rounded-2xl p-6 border space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Direct Channels</h3>
            
            <div className="flex items-start gap-3.5 text-sm">
              <Mail className="w-5 h-5 text-emerald-600 shrink-0 pt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Email Address</p>
                <p className="text-xs text-gray-500">support@marketplace.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-sm">
              <Phone className="w-5 h-5 text-emerald-600 shrink-0 pt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Phone Support</p>
                <p className="text-xs text-gray-500">+62 21-555-0199</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-sm">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0 pt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Headquarters</p>
                <p className="text-xs text-gray-500">Sudirman Central Business District, Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 text-xs text-gray-400">
            Operating Hours:<br />Monday – Friday, 09:00 – 18:00 WIB
          </div>
        </div>

        {/* Right Columns: Intake Form Elements */}
        <div className="md:col-span-2 border rounded-2xl p-6 bg-white shadow-xs">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold">✓</div>
              <h3 className="text-lg font-bold text-gray-900">Message Received!</h3>
              <p className="text-sm text-gray-500 max-w-xs">We've logged your support ticket. A customer service member will follow up shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Your Name</label>
                  <input required type="text" placeholder="Jane Doe" className="w-full p-2.5 border rounded-lg text-sm focus:outline-emerald-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                  <input required type="email" placeholder="jane@example.com" className="w-full p-2.5 border rounded-lg text-sm focus:outline-emerald-600" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
                <input required type="text" placeholder="Order Shipment Question" className="w-full p-2.5 border rounded-lg text-sm focus:outline-emerald-600" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Message Body</label>
                <textarea required rows={4} placeholder="Type your details here..." className="w-full p-2.5 border rounded-lg text-sm focus:outline-emerald-600 resize-none" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300"
              >
                {loading ? "Transmitting..." : <><Send className="w-4 h-4" /> Dispatch Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
}