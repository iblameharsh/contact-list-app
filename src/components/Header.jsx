import React from 'react';

export default function Header({ onAdd }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <p className="text-gray-500 text-sm">
          Manage your contact list — add, edit, delete, search, and sort.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        + New
      </button>
    </header>
  );
}
