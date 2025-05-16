import { LightningElement, api, wire } from 'lwc';
import  getContact  from '@salesforce/apex/ContactTableController1.getContacts';
import  deleteContact  from '@salesforce/apex/ContactTableController1.deleteContact';
import  saveContacts  from '@salesforce/apex/ContactTableController1.saveContacts';

export default class ContactTable extends LightningElement {
    @wire(getContact)
    contacts;

    columns = [
        { label: 'Contact Name', fieldName: 'Name', editable: true, type: 'text' },
        { label: 'Contact Id', fieldName: 'Id', editable: false, type: 'text' }
    ];

    handleAddRow(event) {
        const newContact = new Contact();
        this.contacts.data.push(newContact);
    }

    handleRemoveRow(event) {
        const { rowKey } = event.detail;
        const contactToDelete = this.contacts.data[rowKey];
        deleteContact({ contactId: contactToDelete.Id });
        this.contacts.data.splice(rowKey, 1);
    }

    handleChange(event) {
        const { fieldName, rowKey, value } = event.detail;
        const contactToUpdate = this.contacts.data[rowKey];
        contactToUpdate[fieldName] = value;
        saveContacts({ contacts: this.contacts.data });
    }
}