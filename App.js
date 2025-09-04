import React, { useState } from "react";
import "./App.css";

const flow = {
  start: {
    message: "Hey, what you are looking for?",
    options: [
      { text: "Shop our Product", next: "shop" },
      { text: "Explore our Services", next: "services" },
      { text: "Common Questions", next: "faq" },
      { text: "Talk to an Agent", next: "agent" }
    ]
  },
  shop: {
    message: "Choose a category:",
    options: [
      { text: "Apparel & Fashion", next: "apparel" },
      { text: "Bags, Shoes & Accessories", next: "bags" }
    ]
  },
  apparel: {
    message: "Please share your preferences (all optional):",
    inputs: ["Size", "Colour", "Price", "Brand"],
    next: "summary"
  },
  bags: {
    message: "Please share your preferences (all optional):",
    inputs: ["Size", "Colour", "Price", "Brand"],
    next: "summary"
  },
  services: {
    message: "Explore our Services:",
    options: [
      { text: "Order status & tracking", next: "order" },
      { text: "Return & Exchanges", next: "returns" }
    ]
  },
  order: {
    message: "Please enter your order number:",
    input: "Order Number",
    next: "orderConfirm"
  },
  orderConfirm: {
    message: "📦 Tracking info will be shared soon!",
    options: [{ text: "Back to Main Menu", next: "start" }]
  },
  returns: {
    message:
      "🔄 To return a product, visit our Return Center or call support.",
    options: [{ text: "Back to Main Menu", next: "start" }]
  },
  faq: {
    message: "Common Questions:",
    faqs: [
      {
        q: "What is your return policy?",
        a: "You can return items within 30 days."
      },
      { q: "Do you ship internationally?", a: "Yes, worldwide 🌍." },
      { q: "How long is delivery?", a: "3-5 business days." }
    ],
    options: [{ text: "Back to Main Menu", next: "start" }]
  },
  agent: {
    message:
      "☎️ Connecting you to an agent... or call 1800-123-456 for faster help.",
    options: [{ text: "Back to Main Menu", next: "start" }]
  },
  summary: {
    message: "✅ Preferences saved! Thanks for sharing.",
    options: [{ text: "Back to Main Menu", next: "start" }]
  }
};

export default function App() {
  const [node, setNode] = useState("start");
  const [formData, setFormData] = useState({});

  const handleSubmit = (nextNode) => {
    setNode(nextNode);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const current = flow[node];

  return (
    <div className="chat-container">
      <h2>Flowchart Chatbot</h2>
      <p>{current.message}</p>

      {/* Options */}
      {current.options &&
        current.options.map((opt, i) => (
          <button key={i} onClick={() => setNode(opt.next)}>
            {opt.text}
          </button>
        ))}

      {/* Multiple inputs */}
      {current.inputs && (
        <div>
          {current.inputs.map((field, i) => (
            <div key={i}>
              <label>{field}: </label>
              <input
                type="text"
                placeholder={`Enter ${field} (optional)`}
                value={formData[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            </div>
          ))}
          <button onClick={() => handleSubmit(current.next)}>Submit</button>
        </div>
      )}

      {/* Single input */}
      {current.input && (
        <div>
          <input
            type="text"
            placeholder={current.input}
            onChange={(e) => handleInputChange(current.input, e.target.value)}
          />
          <button onClick={() => handleSubmit(current.next)}>Submit</button>
        </div>
      )}

      {/* FAQs */}
      {current.faqs &&
        current.faqs.map((faq, i) => (
          <div key={i}>
            <strong>Q: {faq.q}</strong>
            <p>A: {faq.a}</p>
          </div>
        ))}
    </div>
  );
}
