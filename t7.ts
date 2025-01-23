import * as readlineSync from 'readline-sync';

// UC-1: Create Contact Class (Person)
class Person {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    phoneNumber: string;
    email: string;

    constructor(firstName: string, lastName: string, address: string, city: string, state: string, zip: number, phoneNumber: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    // Show Person details
    showDetails(): void {
        console.log(`Name: ${this.firstName} ${this.lastName}`);
        console.log(`Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}`);
        console.log(`Phone Number: ${this.phoneNumber}`);
        console.log(`Email: ${this.email}`);
    }
}

// UC-2: AddressBook Class to manage Contacts
class AddressBook {
    private contacts: Person[] = [];

    // Add a new contact
    addPerson(person: Person): void {
        this.contacts.push(person);
        console.log("Contact added successfully!");
    }

    // View all contacts
    listContacts(): void {
        if (this.contacts.length === 0) {
            console.log("No contacts available.");
        } else {
            this.contacts.forEach((contact, index) => {
                console.log(`\nRecord ${index + 1}:`);
                contact.showDetails();
            });
        }
    }

    // UC-3: Edit an existing contact by name
    editContact(firstName: string, lastName: string): void {
        const contact = this.contacts.find(c => c.firstName === firstName && c.lastName === lastName);
        if (contact) {
            console.log("Contact found. Please enter new details:");
            contact.address = readlineSync.question("Enter Address: ");
            contact.city = readlineSync.question("Enter City: ");
            contact.state = readlineSync.question("Enter State: ");
            contact.zip = readlineSync.questionInt("Enter ZIP Code: ");
            contact.phoneNumber = readlineSync.question("Enter Phone Number: ");
            contact.email = readlineSync.question("Enter Email: ");
            console.log("Contact updated successfully!");
        } else {
            console.log("Contact not found.");
        }
    }
}

// Main Class to manage AddressBook and Contacts
class AddressBookManager {
    private addressBook: AddressBook;

    constructor() {
        this.addressBook = new AddressBook();
    }

    // Start the Address Book program
    start(): void {
        console.log("Welcome to the Address Book Program!");
        let isActive = true;

        while (isActive) {
            console.log("\nMain Menu:");
            console.log("1. Add a New Contact (UC-1)");
            console.log("2. View All Contacts (UC-2)");
            console.log("3. Edit an Existing Contact (UC-3)");
            console.log("4. Exit");

            const choice = readlineSync.questionInt("Enter your choice: ");
            switch (choice) {
                case 1:
                    console.log("\n--- Add New Contact (UC-1) ---");
                    const firstName = readlineSync.question("Enter First Name: ");
                    const lastName = readlineSync.question("Enter Last Name: ");
                    const address = readlineSync.question("Enter Address: ");
                    const city = readlineSync.question("Enter City: ");
                    const state = readlineSync.question("Enter State: ");
                    const zip = readlineSync.questionInt("Enter ZIP Code: ");
                    const phoneNumber = readlineSync.question("Enter Phone Number: ");
                    const email = readlineSync.question("Enter Email: ");
                    const newContact = new Person(firstName, lastName, address, city, state, zip, phoneNumber, email);
                    this.addressBook.addPerson(newContact);
                    break;
                
                case 2:
                    console.log("\n--- View All Contacts (UC-2) ---");
                    this.addressBook.listContacts();
                    break;
                
                case 3:
                    console.log("\n--- Edit Existing Contact (UC-3) ---");
                    const editFirstName = readlineSync.question("Enter First Name of the contact to edit: ");
                    const editLastName = readlineSync.question("Enter Last Name of the contact to edit: ");
                    this.addressBook.editContact(editFirstName, editLastName);
                    break;
                
                case 4:
                    console.log("Exiting the program. Goodbye!");
                    isActive = false;
                    break;

                default:
                    console.log("Invalid choice. Please select a valid option.");
            }
        }
    }
}

// Start the AddressBookManager to begin the program
const addressBookManager = new AddressBookManager();
addressBookManager.start();
