import { LightningElement, wire,track } from 'lwc';
import getContactObjectData from '@salesforce/apex/lookUpController.getContactObjectData';

export default class UseCase6Lookup extends LightningElement {
    @track data = [];
    @track draftValues = [];
    @track columns = [
        {
            label: 'Account Lookup',
            fieldName: 'Name',
            type: 'url',
            typeAttributes: {
                label: { fieldName: 'Name' },
                target: '_blank'
            }
        },
        {
            type: 'button-icon',
            typeAttributes: {
                iconName: 'utility:delete',
                title: 'Delete',
                variant: 'border-filled',
                alternativeText: 'Delete',
            },
            cellAttributes: { alignment: 'center' }
        }
        // Add other columns as needed
    ];
    handleAddRow() {
        const newRow = {
            id: String(this.data.length + 1),
            accountName: '',
            accountId: '',
            customField: '',
        };
        this.data = [...this.data, newRow];
    }
    // Delete a row from the datatable
    handleRowAction(event) {
        const rowId = event.detail.row.id;
        this.data = this.data.filter((row) => row.id !== rowId);
    }
    handleCellChange(event) {
        const { draftValues } = event.detail;
        this.draftValues = draftValues;
    }
    handleSave(event) {
        const updatedFields = event.detail.draftValues;

        // Merge draft values into the original data
        this.data = this.data.map((row) => {
            const draft = updatedFields.find((draft) => draft.id === row.id);
            return draft ? { ...row, ...draft } : row;
        });

        // Clear draft values after save
        this.draftValues = [];
    }

    @wire(getContactObjectData)
    wiredData({ error, data }) {
        if (data) {
            this.data = data.map(record => ({
                id: record.Id,
                accountName: `/lightning/r/Account/${record.Account__c}/view`,  // Linking to Account record
            }));
        } else if (error) {
            console.error(error);
        }
    }
}