import * as readlineSync from 'readline-sync';

// UC-1: Create Contact
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

// UC-2: Ability to add contact
class ContactManager {
    private people: Person[] = [];

    // UC-4: Add person and check for duplicates
    addPerson(person: Person): void {
        if (this.isDuplicate(person.firstName, person.lastName)) {
            console.log("Duplicate entry detected. Person with the same name already exists.");
        } else {
            this.people.push(person);
            console.log("Person added successfully!");
        }
    }

    private isDuplicate(firstName: string, lastName: string): boolean {
        return this.people.some(person => person.firstName === firstName && person.lastName === lastName);
    }

    // UC-5: Add multiple persons to Address Book
    addMultiplePeople(): void {
        let addAnother = true;
        while (addAnother) {
            const firstName = readlineSync.question("Enter First Name: ");
            const lastName = readlineSync.question("Enter Last Name: ");
            const address = readlineSync.question("Enter Address: ");
            const city = readlineSync.question("Enter City: ");
            const state = readlineSync.question("Enter State: ");
            const zip = readlineSync.questionInt("Enter ZIP Code: ");
            const phoneNumber = readlineSync.question("Enter Phone Number: ");
            const email = readlineSync.question("Enter Email: ");

            const newPerson = new Person(firstName, lastName, address, city, state, zip, phoneNumber, email);
            this.addPerson(newPerson);

            addAnother = readlineSync.keyInYNStrict("Do you want to add another person? ");
        }
    }

    // UC-3: Modify Person by Name
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

    // UC-4: Delete Person by Name
    removePerson(firstName: string, lastName: string): void {
        const index = this.people.findIndex(p => p.firstName === firstName && p.lastName === lastName);
        if (index !== -1) {
            this.people.splice(index, 1);
            console.log("Record deleted successfully!");
        } else {
            console.log("Record not found.");
        }
    }

    // Display all people
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

// Main class to manage program workflow
class AddressBookMain {
    private contactManager: ContactManager;

    constructor() {
        this.contactManager = new ContactManager();
    }

    // Start the program
    start(): void {
        let isActive = true;
        while (isActive) {
            console.log("\nMain Menu:");
            console.log("1. Add Multiple Persons to Address Book (UC-5)");
            console.log("2. View All Persons (UC-2)");
            console.log("3. Edit Person Details (UC-3)");
            console.log("4. Delete Person (UC-4)");
            console.log("5. Exit");
            const choice = readlineSync.questionInt("Enter your choice: ");

            switch (choice) {
                case 1:
                    console.log("\n--- Add Multiple Persons to Address Book (UC-5) ---");
                    this.contactManager.addMultiplePeople();
                    break;

                case 2:
                    console.log("\n--- View All People (UC-2) ---");
                    this.contactManager.listPeople();
                    break;

                case 3:
                    console.log("\n--- Edit Person Details (UC-3) ---");
                    const editFirstName = readlineSync.question("Enter First Name of the person to edit: ");
                    const editLastName = readlineSync.question("Enter Last Name of the person to edit: ");
                    this.contactManager.modifyPerson(editFirstName, editLastName);
                    break;

                case 4:
                    console.log("\n--- Delete Person (UC-4) ---");
                    const deleteFirstName = readlineSync.question("Enter First Name of the person to delete: ");
                    const deleteLastName = readlineSync.question("Enter Last Name of the person to delete: ");
                    this.contactManager.removePerson(deleteFirstName, deleteLastName);
                    break;

                case 5:
                    console.log("Exiting the program. Goodbye!");
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
