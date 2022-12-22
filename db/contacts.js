const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function readContacts() {
  try {
    const rawData = await fs.readFile(contactsPath);
    const data = await JSON.parse(rawData);
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

async function listContacts() {
  return await readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  console.log(filteredContacts);
  await writeContacts(filteredContacts);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const contacts = await readContacts();
  contacts.push(contact);
  console.log(contacts);
  await writeContacts(contacts);
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
