import { LightningElement,wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getLineItemList from '@salesforce/apex/dataTableClass.getLineItemList';
import updateLineItems from '@salesforce/apex/dataTableClass.updateLineItems';
import createLineItems from '@salesforce/apex/dataTableClass.createLineItems';
const columns = [
    
    {
        label: 'Epic',
        fieldName: 'Epic__c',
        type: 'text',
        editable: true
    },
    {
        label: 'Capability',
        fieldName: 'Capability__c',
        type: 'text',
        editable: true
    },
    {
        label: 'Priority',
        fieldName: 'Priority__c',
        type: 'text',
        editable: true
    },
    {
        label: 'Use Case',
        fieldName:'Use_Case__c',
        type: 'text',
        editable: true
    },
    {
        label: 'Tech Approach',
        fieldName: 'Tech_Approach__c',
        type:'text',
        editable:true
    },
    {
        label: 'Dev Efforts',
        fieldName: 'Dev_Efforts__c',
        type: 'text',
        editable: true
    },
    {
        label: 'QA Efforts',
        fieldName: 'QA_Efforts__c',
        type: 'text',
        editable: true
    },
    {
        label: 'BA Efforts',
        fieldName: 'BA_Efforts__c',
        type: 'text',
        editable: true
    },
    {
        label: 'Deployment Efforts',
        fieldName: 'Deployment_Efforts__c',
        type: 'text',
        editable: true
    },
    {
        label: 'Documentation Efforts',
        fieldName: 'Documentation_Efoorts__c',
        type: 'text',
        editable: true
    },
    {
        label: 'Code Review Efforts',
        fieldName: 'Code_Review_Efforts__c',
        type: 'text',
        editable: true
    },
    
]
export default class DataTable extends LightningElement {
    columns = columns;
    data = [];
    saveDraftValues = [];
// Fetch data from Apex when the component is loaded
    @wire(getLineItemList)
    lineItems(result){
        console.log("Result : "+ JSON.stringify(result));
        if(result.error){
            this.data = undefined;
        }else if (result.data) {
            this.data = result.data;
            console.log("this.data"+ JSON.stringify(this.data));
        }
    }

// Handle Save button click event
handleSave(event) {
        const updatedFields = event.detail.draftValues;
        const createRecords = [];
        const updateRecords = [];

        updatedFields.forEach(row => {
            if (row.Id.includes('row')) {
                const { Id, ...recordWithoutId } = row;
                createRecords.push(recordWithoutId);
            } else {
                updateRecords.push(row); // If the row has an Id, it's an update
            }
        });
        console.log('Create Records:', JSON.stringify(createRecords));
        console.log('Update Records:', JSON.stringify(updateRecords));

        // If there are rows to update
        if (updateRecords.length > 0) {
            updateLineItems({ lineItemData: updateRecords })
                .then(result => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Records updated successfully.',
                            variant: 'success'
                        })
                    );
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
        }

        // If there are rows to create
        if (createRecords.length > 0) {
            createLineItems({ lineItemData: createRecords })
                .then(result => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: result,
                            message: result,
                            variant: 'success'
                        })
                    );
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
        }
    }


    /*handleSave(event) {
        const createRecords = [];
        // If there are rows to update
        const updatedFields = event.detail.draftValues;
        console.log("Updated Fields: "+ JSON.stringify(updatedFields));
        updateLineItems({lineItemData: updatedFields})
        .then( result =>{
            console.log("Result: "+ JSON.stringify(result))

            this.dispatchEvent(
                new ShowToastEvent({
                title: result,
                message: result,
                variant: 'success'})
            );
        })
        .catch(error =>{
            console.log("Error: "+ JSON.stringify(error))
        })

    }*/
    // Handle Add Row button click event
    handleAddRow() {
        const newRow = {
            Epic__c: '',
            Capability__c: '',
            Priority__c: '',
            Use_Case__c: '',
            Tech_Approach__c: '',
            Dev_Efforts__c: '',
            QA_Efforts__c: '',
            BA_Efforts__c: '',
            Deployment_Efforts__c: '',
            Documentation_Efoorts__c: '',
            Code_Review_Efforts__c: ''
        };
        this.data = [...this.data, newRow];
    }

    // Handle Delete Row button click event
    handleDeleteRows() {
        // Get the selected rows
        const selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
        const selectedIds = selectedRows.map(row => row.Id);

        // Filter out the selected rows from the data array
        this.data = this.data.filter(row => !selectedIds.includes(row.Id));

        // Optionally, show a toast notification for successful deletion
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Rows deleted successfully',
                variant: 'success'
            })
        );
    }
}