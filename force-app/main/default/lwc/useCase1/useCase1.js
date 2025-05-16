import { LightningElement, track } from 'lwc';

export default class UserDataTable extends LightningElement {
    @track data = []; // Holds table data
    @track draftValues = []; // Holds draft values (data that has not been saved yet)

    // Define columns for the table
    columns = [
        {
            label: 'First Name',
            fieldName: 'firstName',
            type: 'text',
            editable: true
        },
        {
            label: 'Last Name',
            fieldName: 'lastName',
            type: 'text',
            editable: true
        },
        {
            label: 'Email',
            fieldName: 'email',
            type: 'email',
            editable: true
        }
    ];

    // Initialize some sample data
    connectedCallback() {
        this.data = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
            { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' }
        ];
    }

    // Handle save action
    handleSave(event) {
        const draftValues = event.detail.draftValues;

        // For now, just log the saved data
        console.log('Draft Values:', draftValues);

        // You can also process the data here, e.g., calling an Apex method to save the data.

        // Reset the draft values
        this.draftValues = [];

        // Optionally show a success message or a toast
        this.showToast('Success', 'Data saved successfully!', 'success');
    }

    // Utility method to show a toast message
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}