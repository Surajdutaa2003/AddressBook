import * as readlineSync from 'readline-sync';

// Person class representing a single individual
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

    // Display person details
    showDetails(): void {
        console.log(`Name: ${this.firstName} ${this.lastName}`);
        console.log(`Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}`);
        console.log(`Phone Number: ${this.phoneNumber}`);
        console.log(`Email: ${this.email}`);
    }
}

// AddressBook class to manage people
class AddressBook {
    private people: Person[] = [];

    // Method to check for duplicate person by name
    private isDuplicate(firstName: string, lastName: string): boolean {
        return this.people.some(person => person.firstName === firstName && person.lastName === lastName);
    }

    // Method to add a new person to the address book
    addPerson(person: Person): void {
        if (this.isDuplicate(person.firstName, person.lastName)) {
            console.log("Duplicate entry detected. Person with the same name already exists.");
        } else {
            this.people.push(person);
            console.log("Person added successfully!");
        }
    }

    // Method to display all people in the address book
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

// Main class to manage the AddressBook
class AddressBookMain {
    private addressBook: AddressBook;

    constructor() {
        this.addressBook = new AddressBook(); // Initialize AddressBook
    }

    // Method to start the AddressBook program
    start(): void {
        console.log("Welcome to the Address Book!");

        let isActive = true;
        while (isActive) {
            console.log("\nMain Menu:");
            console.log("1. Add a New Contact");
            console.log("2. View All Contacts");
            console.log("3. Exit");

            const choice = readlineSync.questionInt("Enter your choice: ");

            switch (choice) {
                case 1:
                    this.addNewContact();
                    break;
                case 2:
                    this.viewAllContacts();
                    break;
                case 3:
                    console.log("Exiting the program. Goodbye!");
                    isActive = false;
                    break;
                default:
                    console.log("Invalid choice. Please select a valid option.");
            }
        }
    }

    // Method to add a new contact (UC-2)
    private addNewContact(): void {
        console.log("\n--- Add New Contact ---");
        const firstName = readlineSync.question("Enter First Name: ");
        const lastName = readlineSync.question("Enter Last Name: ");
        const address = readlineSync.question("Enter Address: ");
        const city = readlineSync.question("Enter City: ");
        const state = readlineSync.question("Enter State: ");
        const zip = readlineSync.questionInt("Enter ZIP Code: ");
        const phoneNumber = readlineSync.question("Enter Phone Number: ");
        const email = readlineSync.question("Enter Email: ");

        // Create new Person instance
        const newPerson = new Person(firstName, lastName, address, city, state, zip, phoneNumber, email);

        // Add new person to the address book
        this.addressBook.addPerson(newPerson);
    }

    // Method to view all contacts
    private viewAllContacts(): void {
        console.log("\n--- View All Contacts ---");
        this.addressBook.listPeople();
    }
}

// Start the AddressBook program
const addressBookMain = new AddressBookMain();
addressBookMain.start();
