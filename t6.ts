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

// ContactManager class to manage people
class ContactManager {
    private people: Person[] = [];

    // Method to check for duplicate person by name
    private isDuplicate(firstName: string, lastName: string): boolean {
        return this.people.some(person => person.firstName === firstName && person.lastName === lastName);
    }

    // Method to add a new person
    addPerson(person: Person): void {
        if (this.isDuplicate(person.firstName, person.lastName)) {
            console.log("Duplicate entry detected. Person with the same name already exists.");
        } else {
            this.people.push(person);
            console.log("Person added successfully!");
        }
    }
}

// Main code to handle UC-1 (Create Contact)
const contactManager = new ContactManager();

// UC-1: Create Contact
console.log("\n--- Add Person (UC-1) ---");
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

// Add person to the contact manager
contactManager.addPerson(newPerson);
