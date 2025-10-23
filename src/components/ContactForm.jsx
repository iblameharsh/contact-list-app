import React, { useState } from "react";

export default function ContactForm({ initial, onCancel, onSubmit }) {
  const [name, setName] = useState(initial?.name || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [phone, setPhone] = useState(initial?.phone || "");
  const [company, setCompany] = useState(initial?.company || "");
  const [error, setError] = useState("");

  // ✅ simple regex for phone validation
  const phoneRegex = /^\+?[0-9]{10}$/; 
  // allows optional + and 10–15 digits

  const handle = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone) {
      setError("Name and phone are required");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number (10 digits)");
      return;
    }

    onSubmit({ name, email, phone, company });
  };

  return (
    <form onSubmit={handle}>
      <h2>{initial ? "Edit Contact" : "New Contact"}</h2>
      <div className="form-group">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} // restrict to digits only
          placeholder="Phone (e.g. +919876543210)"
          type="tel"
          maxLength={15}
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
      </div>

      {error && (
        <p style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>{error}</p>
      )}

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="save-btn">
          {initial ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}
