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
    private cityDictionary: { [key: string]: Person[] } = {}; // Key: city name, Value: array of persons in that city
    private stateDictionary: { [key: string]: Person[] } = {}; // Key: state name, Value: array of persons in that state

    addPerson(person: Person): void {
        if (this.isDuplicate(person.firstName, person.lastName)) {
            console.log("Duplicate entry detected. Person with the same name already exists in this Address Book.");
        } else {
            this.people.push(person);
            // Add to city dictionary
            if (!this.cityDictionary[person.city]) {
                this.cityDictionary[person.city] = [];
            }
            this.cityDictionary[person.city].push(person);

            // Add to state dictionary
            if (!this.stateDictionary[person.state]) {
                this.stateDictionary[person.state] = [];
            }
            this.stateDictionary[person.state].push(person);

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

            // Update dictionaries if city/state changed
            this.updateCityAndStateDictionaries(person);
            console.log("Record updated successfully!");
        } else {
            console.log("Record not found.");
        }
    }

    removePerson(firstName: string, lastName: string): void {
        const index = this.people.findIndex(p => p.firstName === firstName && p.lastName === lastName);
        if (index !== -1) {
            const person = this.people[index];
            this.people.splice(index, 1);

            // Remove from city dictionary
            const cityIndex = this.cityDictionary[person.city].indexOf(person);
            if (cityIndex !== -1) {
                this.cityDictionary[person.city].splice(cityIndex, 1);
            }

            // Remove from state dictionary
            const stateIndex = this.stateDictionary[person.state].indexOf(person);
            if (stateIndex !== -1) {
                this.stateDictionary[person.state].splice(stateIndex, 1);
            }

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

    searchByCityOrState(query: string): Person[] {
        return this.people.filter(person => person.city.toLowerCase() === query.toLowerCase() || person.state.toLowerCase() === query.toLowerCase());
    }

    viewPeopleByCity(city: string): void {
        if (this.cityDictionary[city]) {
            console.log(`\nPeople in City: ${city}`);
            console.log(`Total People: ${this.cityDictionary[city].length}`);
            this.cityDictionary[city].forEach(person => person.showDetails());
        } else {
            console.log(`No people found in the city: ${city}`);
        }
    }

    viewPeopleByState(state: string): void {
        if (this.stateDictionary[state]) {
            console.log(`\nPeople in State: ${state}`);
            console.log(`Total People: ${this.stateDictionary[state].length}`);
            this.stateDictionary[state].forEach(person => person.showDetails());
        } else {
            console.log(`No people found in the state: ${state}`);
        }
    }

    countPeopleByCity(city: string): number {
        return this.cityDictionary[city] ? this.cityDictionary[city].length : 0;
    }

    countPeopleByState(state: string): number {
        return this.stateDictionary[state] ? this.stateDictionary[state].length : 0;
    }

    private updateCityAndStateDictionaries(person: Person): void {
        // Remove from old city and state if changed
        if (!this.cityDictionary[person.city]) {
            this.cityDictionary[person.city] = [];
        }
        if (!this.stateDictionary[person.state]) {
            this.stateDictionary[person.state] = [];
        }

        // Add to new city and state
        if (!this.cityDictionary[person.city]) {
            this.cityDictionary[person.city] = [];
        }
        this.cityDictionary[person.city].push(person);

        if (!this.stateDictionary[person.state]) {
            this.stateDictionary[person.state] = [];
        }
        this.stateDictionary[person.state].push(person);
    }

    // UC-11: Sort the entries alphabetically by person's name
    sortPeopleByName(): void {
        this.people.sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        console.log("People sorted successfully by name.");
    }

    // UC-12: Sort the entries by City, State, or Zip
    sortByCity(): void {
        this.people.sort((a, b) => a.city.localeCompare(b.city));
        console.log("People sorted successfully by city.");
    }

    sortByState(): void {
        this.people.sort((a, b) => a.state.localeCompare(b.state));
        console.log("People sorted successfully by state.");
    }

    sortByZip(): void {
        this.people.sort((a, b) => a.zip - b.zip);
        console.log("People sorted successfully by ZIP.");
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

    searchAcrossAddressBooks(query: string): void {
        let found = false;
        this.addressBooks.forEach(book => {
            const results = book.getContactManager().searchByCityOrState(query);
            if (results.length > 0) {
                console.log(`\nFound in Address Book: ${book.name}`);
                results.forEach(person => person.showDetails());
                found = true;
            }
        });

        if (!found) {
            console.log(`No contacts found in city or state: ${query}`);
        }
    }

    viewPeopleByCityAcrossAddressBooks(city: string): void {
        let found = false;
        this.addressBooks.forEach(book => {
            book.getContactManager().viewPeopleByCity(city);
            found = true;
        });

        if (!found) {
            console.log(`No contacts found in city: ${city}`);
        }
    }

    viewPeopleByStateAcrossAddressBooks(state: string): void {
        let found = false;
        this.addressBooks.forEach(book => {
            book.getContactManager().viewPeopleByState(state);
            found = true;
        });

        if (!found) {
            console.log(`No contacts found in state: ${state}`);
        }
    }

    countPeopleByCityAcrossAddressBooks(city: string): void {
        let count = 0;
        this.addressBooks.forEach(book => {
            count += book.getContactManager().countPeopleByCity(city);
        });
        console.log(`Total number of people in city "${city}": ${count}`);
    }

    countPeopleByStateAcrossAddressBooks(state: string): void {
        let count = 0;
        this.addressBooks.forEach(book => {
            count += book.getContactManager().countPeopleByState(state);
        });
        console.log(`Total number of people in state "${state}": ${count}`);
    }
}

// UC-12: Main Program
class AddressBookMain {
    private addressBookManager: AddressBookManager;

    constructor() {
        this.addressBookManager = new AddressBookManager();
    }

    start(): void {
        let isActive = true;
        while (isActive) {
            console.log("\nWelcome to Address Book System");
            console.log("1. Create New Address Book (UC-6)");
            console.log("2. View Address Books");
            console.log("3. Manage Address Book");
            console.log("4. Exit");
            const choice = readlineSync.questionInt("Enter your choice: ");

            switch (choice) {
                case 1:
                    const name = readlineSync.question("Enter Address Book Name: ");
                    this.addressBookManager.createAddressBook(name);
                    break;

                case 2:
                    this.addressBookManager.listAddressBooks();
                    break;

                case 3:
                    console.log("\nSelect Address Book:");
                    const addressBookName = readlineSync.question("Enter Address Book Name: ");
                    const selectedAddressBook = this.addressBookManager.getAddressBook(addressBookName);

                    if (selectedAddressBook) {
                        this.manageSelectedAddressBook(selectedAddressBook);
                    } else {
                        console.log(`Address Book with name '${addressBookName}' not found.`);
                    }
                    break;

                case 4:
                    isActive = false;
                    console.log("\nExiting Address Book System...");
                    break;

                default:
                    console.log("\nInvalid option. Please try again.");
            }
        }
    }

    private manageSelectedAddressBook(selectedAddressBook: AddressBook): void {
        let isActive = true;
        while (isActive) {
            console.log("\nSelect Operation for Address Book: " + selectedAddressBook.name);
            console.log("1. Add Contact (UC-2)");
            console.log("2. Modify Contact (UC-3)");
            console.log("3. Delete Contact (UC-4)");
            console.log("4. View All Contacts");
            console.log("5. Search by City or State");
            console.log("6. Sort People by Name (UC-11)");
            console.log("7. Sort People by City (UC-12)");
            console.log("8. Sort People by State (UC-12)");
            console.log("9. Sort People by Zip (UC-12)");
            console.log("10. Back to Main Menu");

            const choice = readlineSync.questionInt("Enter your choice: ");

            switch (choice) {
                case 1:
                    this.addContactToAddressBook(selectedAddressBook);
                    break;

                case 2:
                    this.modifyContactInAddressBook(selectedAddressBook);
                    break;

                case 3:
                    this.deleteContactInAddressBook(selectedAddressBook);
                    break;

                case 4:
                    selectedAddressBook.showAddressBookDetails();
                    break;

                case 5:
                    this.searchContactInAddressBook(selectedAddressBook);
                    break;

                case 6:
                    selectedAddressBook.getContactManager().sortPeopleByName();
                    break;

                case 7:
                    selectedAddressBook.getContactManager().sortByCity();
                    break;

                case 8:
                    selectedAddressBook.getContactManager().sortByState();
                    break;

                case 9:
                    selectedAddressBook.getContactManager().sortByZip();
                    break;

                case 10:
                    isActive = false;
                    break;

                default:
                    console.log("\nInvalid option. Please try again.");
            }
        }
    }

    private addContactToAddressBook(addressBook: AddressBook): void {
        console.log("\n--- Add Contact ---");
        const firstName = readlineSync.question("Enter first name: ");
        const lastName = readlineSync.question("Enter last name: ");
        const address = readlineSync.question("Enter address: ");
        const city = readlineSync.question("Enter city: ");
        const state = readlineSync.question("Enter state: ");
        const zip = readlineSync.questionInt("Enter ZIP code: ");
        const phoneNumber = readlineSync.question("Enter phone number: ");
        const email = readlineSync.question("Enter email: ");

        const person = new Person(firstName, lastName, address, city, state, zip, phoneNumber, email);
        addressBook.getContactManager().addPerson(person);
    }

    private modifyContactInAddressBook(addressBook: AddressBook): void {
        console.log("\n--- Modify Contact ---");
        const modifyFirstName = readlineSync.question("Enter the first name of the person to modify: ");
        const modifyLastName = readlineSync.question("Enter the last name of the person to modify: ");
        addressBook.getContactManager().modifyPerson(modifyFirstName, modifyLastName);
    }

    private deleteContactInAddressBook(addressBook: AddressBook): void {
        console.log("\n--- Delete Contact ---");
        const deleteFirstName = readlineSync.question("Enter the first name of the person to delete: ");
        const deleteLastName = readlineSync.question("Enter the last name of the person to delete: ");
        addressBook.getContactManager().removePerson(deleteFirstName, deleteLastName);
    }

    private searchContactInAddressBook(addressBook: AddressBook): void {
        console.log("\n--- Search by City or State ---");
        const query = readlineSync.question("Enter city or state to search: ");
        const searchResults = addressBook.getContactManager().searchByCityOrState(query);
        if (searchResults.length > 0) {
            searchResults.forEach(person => person.showDetails());
        } else {
            console.log("No results found.");
        }
    }
}

// Run the Address Book Main program
const addressBookMain = new AddressBookMain();
addressBookMain.start();
