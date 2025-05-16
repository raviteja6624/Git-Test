import { LightningElement } from 'lwc';
import sendDataToApex from '@salesforce/apex/MyApexClass.saveData';

export default class DataInput extends LightningElement {
    rows = [
        { id: 1, name: '', age: '', email: '' },
        { id: 2, name: '', age: '', email: '' }
    ];

    handleInputChange(event) {
        const { id, field } = event.target.dataset; // Get row ID and field name
        const value = event.target.value; // Get the new value

        // Update the specific field in the corresponding row
        this.rows = this.rows.map(row =>
            row.id === parseInt(id, 10) ? { ...row, [field]: value } : row
        );
    }

    handleSubmit() {
        // Prepare data for Apex call
        const dataToSend = this.rows.map(row => ({
            Name: row.name,
            Age: parseInt(row.age, 10),
            Email: row.email
        }));

        // Call Apex method
        sendDataToApex({ data: dataToSend })
            .then(result => {
                console.log('Data saved successfully:', result);
                alert('Data saved successfully!');
            })
            .catch(error => {
                console.error('Error saving data:', error);
                alert('Error saving data!');
            });
    }
}