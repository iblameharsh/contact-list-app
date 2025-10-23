// src/utils/storage.js
export const STORAGE_KEY = 'contacts_v1';

export function loadContacts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveContacts(contacts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch {
    // ignore
  }
}
