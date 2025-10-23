import React, { useEffect, useState } from "react";
import { loadContacts, saveContacts } from "../utils/storage";
import ContactCard from "../components/ContactCard";
import ContactForm from "../components/ContactForm";

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const SAMPLE = [
  { id: uid(), name: "Aisha Khan", email: "aisha@example.com", phone: "98765 43210", company: "Neoteric Labs" },
  { id: uid(), name: "Rohit Verma", email: "rohit@example.com", phone: "91234 56789", company: "BlueWave" },
];

export default function ContactListPage() {
  const [contacts, setContacts] = useState(() => loadContacts().length ? loadContacts() : SAMPLE);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => saveContacts(contacts), [contacts]);

  const add = (c) => setContacts((p) => [{ ...c, id: uid() }, ...p]);
  const update = (id, c) => setContacts((p) => p.map((x) => (x.id === id ? { ...x, ...c } : x)));
  const remove = (id) => setContacts((p) => p.filter((x) => x.id !== id));

  const filtered = contacts
    .filter((c) => (c.name + c.email + c.company + c.phone).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  const handleSubmit = (data) => {
    editing ? update(editing.id, data) : add(data);
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="contact-page">
      <div className="header">
        <div>
          <h1>Contacts</h1>
          <p>Your personal contact list</p>
        </div>
      </div>

      <div className="search-sort">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="company">Company</option>
        </select>
      </div>

      <div className="contact-list">
        {filtered.length ? (
          filtered.map((c) => (
            <ContactCard
                key={c.id}
                contact={c}
                query={query}
                onEdit={() => { setEditing(c); setShowForm(true); }}
                onDelete={remove}
            />
            ))
        ) : (
          <p style={{ textAlign: "center", color: "#888", marginTop: "40px" }}>No contacts found</p>
        )}
      </div>

      <button className="fab" onClick={() => { setEditing(null); setShowForm(true); }}>+</button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <ContactForm
              initial={editing}
              onCancel={() => setShowForm(false)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
