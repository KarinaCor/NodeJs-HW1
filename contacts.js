const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { allowedNodeEnvironmentFlags } = require("node:process");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  
    return JSON.parse(data);
  }
  
  function addContact(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  }
  
  async function getAll() {
    const contacts = await listContacts();
  
    return contacts;
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
  
    const contact = contacts.find((contact) => contact.id === contactId);
  
    return contact || null;
  }
  
  async function createContact(contact) {
    const contacts = await listContacts();
    const newContact = { ...contact, id: crypto.randomUUID() };
  
    contacts.push(newContact);
  
    await addContact(contacts);
  
    return newContact;
  }
  
  async function updateContact(id, contact) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
  
    if (index === -1) {
      return undefined;
    }
  
    const newContact = { ...contact, id };
    const newContacts = [
      ...contacts.slice(0, index),
      newContact,
      ...contacts.slice(index + 1),
      
    ];
    
  
    await addContact(newContacts);
  
    return newContact;
  }
  
  async function removeContact(id) {
    const contacts = await listContacts();
        const index = contacts.findIndex((contact) => contact.id === id);
      
        if (index === -1) {
          return null;
        }
  
    const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];
  
    await addContact(newContacts);
  
    return contacts[index];
   
  }
 
  
  module.exports = {
    getAll,
    getContactById,
    createContact,
    updateContact,
    removeContact,
  };