import * as readlineSync from 'readline-sync';

// UC-1: Person class
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

    showDetails(): void {
        console.log(`Name: ${this.firstName} ${this.lastName}`);
        console.log(`Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}`);
        console.log(`Phone Number: ${this.phoneNumber}`);
        console.log(`Email: ${this.email}`);
    }
}

// UC-2, UC-3, UC-4, UC-7: ContactManager class
class ContactManager {
    private people: Person[] = [];

    addPerson(person: Person): void {
        if (this.isDuplicate(person.firstName, person.lastName)) {
            console.log("Duplicate entry detected. Person with the same name already exists in this Address Book.");
        } else {
            this.people.push(person);
            console.log("Person added successfully!");
        }
    }

    private isDuplicate(firstName: string, lastName: string): boolean {
        return this.people.some(person => person.firstName === firstName && person.lastName === lastName);
    }

    modifyPerson(firstName: string, lastName: string): void {
        const person = this.people.find(p => p.firstName === firstName && p.lastName === lastName);
        if (person) {
            console.log("Record found. Please provide new details:");
            person.address = readlineSync.question("Enter Address: ");
            person.city = readlineSync.question("Enter City: ");
            person.state = readlineSync.question("Enter State: ");
            person.zip = readlineSync.questionInt("Enter ZIP Code: ");
            person.phoneNumber = readlineSync.question("Enter Phone Number: ");
            person.email = readlineSync.question("Enter Email: ");
            console.log("Record updated successfully!");
        } else {
            console.log("Record not found.");
        }
    }

    removePerson(firstName: string, lastName: string): void {
        const index = this.people.findIndex(p => p.firstName === firstName && p.lastName === lastName);
        if (index !== -1) {
            this.people.splice(index, 1);
            console.log("Record deleted successfully!");
        } else {
            console.log("Record not found.");
        }
    }

    listPeople(): void {
        if (this.people.length === 0) {
            console.log("No records to display.");
        } else {
            this.people.forEach((person, index) => {
                console.log(`\nRecord ${index + 1}:`);
                person.showDetails();
            });
        }
    }
}

// UC-6: AddressBook class
class AddressBook {
    name: string;
    private contactManager: ContactManager;

    constructor(name: string) {
        this.name = name;
        this.contactManager = new ContactManager();
    }

    getContactManager(): ContactManager {
        return this.contactManager;
    }

    showAddressBookDetails(): void {
        console.log(`\nAddress Book: ${this.name}`);
        this.contactManager.listPeople();
    }
}

// UC-6: AddressBookManager class
class AddressBookManager {
    private addressBooks: AddressBook[] = [];

    createAddressBook(name: string): void {
        const newAddressBook = new AddressBook(name);
        this.addressBooks.push(newAddressBook);
        console.log(`Address Book '${name}' created successfully!`);
    }

    getAddressBook(name: string): AddressBook | undefined {
        return this.addressBooks.find(book => book.name === name);
    }

    listAddressBooks(): void {
        if (this.addressBooks.length === 0) {
            console.log("No address books found.");
        } else {
            console.log("\nAvailable Address Books:");
            this.addressBooks.forEach(book => console.log(`- ${book.name}`));
        }
    }
}

// Main class to manage program workflow
class AddressBookMain {
    private addressBookManager: AddressBookManager;

    constructor() {
        this.addressBookManager = new AddressBookManager();
    }

    // Start the program
    start(): void {
        let isActive = true;
        while (isActive) {
            console.log("\nMain Menu:");
            console.log("1. Create New Address Book (UC-6)");
            console.log("2. Select Address Book");
            console.log("3. View All Address Books");
            console.log("4. Exit");
            const choice = readlineSync.questionInt("Enter your choice: ");

            switch (choice) {
                case 1:
                    console.log("\n--- Create New Address Book (UC-6) ---");
                    const addressBookName = readlineSync.question("Enter the name of the new Address Book: ");
                    this.addressBookManager.createAddressBook(addressBookName);
                    break;

                case 2:
                    console.log("\n--- Select Address Book ---");
                    this.addressBookManager.listAddressBooks();
                    const selectedAddressBookName = readlineSync.question("Enter the name of the Address Book you want to work with: ");
                    const selectedAddressBook = this.addressBookManager.getAddressBook(selectedAddressBookName);

                    if (selectedAddressBook) {
                        this.manageSelectedAddressBook(selectedAddressBook);
                    } else {
                        console.log("Address Book not found.");
                    }
                    break;

                case 3:
                    console.log("\n--- View All Address Books ---");
                    this.addressBookManager.listAddressBooks();
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

    private manageSelectedAddressBook(addressBook: AddressBook): void {
        let isActive = true;
        const contactManager = addressBook.getContactManager();

        while (isActive) {
            console.log(`\nManaging Address Book: ${addressBook.name}`);
            console.log("1. Add Person");
            console.log("2. View All People");
            console.log("3. Edit Person");
            console.log("4. Delete Person");
            console.log("5. Exit to Main Menu");

            const choice = readlineSync.questionInt("Enter your choice: ");

            switch (choice) {
                case 1:
                    console.log("\n--- Add Person ---");
                    const firstName = readlineSync.question("Enter First Name: ");
                    const lastName = readlineSync.question("Enter Last Name: ");
                    const address = readlineSync.question("Enter Address: ");
                    const city = readlineSync.question("Enter City: ");
                    const state = readlineSync.question("Enter State: ");
                    const zip = readlineSync.questionInt("Enter ZIP Code: ");
                    const phoneNumber = readlineSync.question("Enter Phone Number: ");
                    const email = readlineSync.question("Enter Email: ");

                    const newPerson = new Person(firstName, lastName, address, city, state, zip, phoneNumber, email);
                    contactManager.addPerson(newPerson);
                    break;

                case 2:
                    console.log("\n--- View All People ---");
                    contactManager.listPeople();
                    break;

                case 3:
                    console.log("\n--- Edit Person ---");
                    const editFirstName = readlineSync.question("Enter First Name of the person to edit: ");
                    const editLastName = readlineSync.question("Enter Last Name of the person to edit: ");
                    contactManager.modifyPerson(editFirstName, editLastName);
                    break;

                case 4:
                    console.log("\n--- Delete Person ---");
                    const deleteFirstName = readlineSync.question("Enter First Name of the person to delete: ");
                    const deleteLastName = readlineSync.question("Enter Last Name of the person to delete: ");
                    contactManager.removePerson(deleteFirstName, deleteLastName);
                    break;

                case 5:
                    isActive = false;
                    break;

                default:
                    console.log("Invalid choice. Please select a valid option.");
            }
        }
    }
}

// Initialize and start the AddressBook application
const addressBookApp = new AddressBookMain();
addressBookApp.start();
