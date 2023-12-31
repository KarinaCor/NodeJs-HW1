const Contacts = require("./contacts.js")
const { Command } = require("commander");

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await Contacts.getAll();
      console.table(allContacts);
      break;

    case 'get':
     const Contact = await Contacts.getContactById(id)
     console.table(Contact);
      break;

    case 'add':
     const newContact = await Contacts.createContact({ name, email, phone })
     console.table(newContact);
      break;

      case 'update':
     const updatedContactById  = await Contacts.updateContact(id, {name,email,phone});
     console.table(updatedContactById);

    case 'remove':
      const deleteContact = await Contacts.removeContact(id)
      console.table(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);