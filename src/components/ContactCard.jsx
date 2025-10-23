import React from "react";

export default function ContactCard({ contact, onEdit, onDelete, query }) {
  const initials = contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const highlight = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="contact-card">
      <div className="avatar">{initials}</div>
      <div className="contact-info">
        <h3>{highlight(contact.name)}</h3>
        {contact.company && <p>{highlight(contact.company)}</p>}
        {contact.email && <p>{highlight(contact.email)}</p>}
        {contact.phone && <p>{contact.phone}</p>}
      </div>
      <div className="contact-actions">
        <button className="edit-btn" onClick={onEdit}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(contact.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
