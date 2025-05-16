import { LightningElement, track, api } from 'lwc';
import getLineItemList from '@salesforce/apex/LineItemController.getLineItemList';
import createLineItems from '@salesforce/apex/LineItemController.createLineItems';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LineItemDatatable extends LightningElement {
    @api recordId; // Automatically injected when placed on a record page
    @track data = []; // Data for the datatable
    @track columns = [
        { label: 'Epic', fieldName: 'Epic__c', type: 'text', editable: true },
        { label: 'Capability', fieldName: 'Capability__c', type: 'text', editable: true },
        { label: 'Priority', fieldName: 'Priority__c', type: 'text', editable: true },
        { label: 'Use Case', fieldName: 'Use_Case__c', type: 'text', editable: true },
        { label: 'Tech Approach', fieldName: 'Tech_Approach__c', type: 'text', editable: true },
        { label: 'Dev Efforts', fieldName: 'Dev_Efforts__c', type: 'number', editable: true },
        { label: 'QA Efforts', fieldName: 'QA_Efforts__c', type: 'number', editable: true },
        { label: 'BA Efforts', fieldName: 'BA_Efforts__c', type: 'number', editable: true },
        { label: 'Deployment Efforts', fieldName: 'Deployment_Efforts__c', type: 'number', editable: true },
        { label: 'Documentation Efforts', fieldName: 'Documentation_Efforts__c', type: 'number', editable: true },
        { label: 'Code Review Efforts', fieldName: 'Code_Review_Efforts__c', type: 'number', editable: true },
        { label: 'Actions', type: 'button', 
            typeAttributes: { 
                label: 'Delete', 
                name: 'delete', 
                variant: 'destructive' 
            } 
        }
    ];
    @track draftValues = []; // Stores changes made during inline editing

    connectedCallback() {
        // Fetch initial data
        if (this.recordId) {
            this.fetchData();
        }
    }

    fetchData() {
        getLineItemList({ recordId: this.recordId })
            .then(result => {
                this.data = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.data = [];
            });
    }

    handleSave(event) {
        // Extract draft values (modified rows)
        const updatedFields = event.detail.draftValues.map(draft => ({
            ...draft
        }));

        // Call Apex to create records
        createLineItems({ lineItems: updatedFields, rfpId: this.recordId })
            .then(() => {
                this.showToast('Success', 'Records created successfully under RFP', 'success');
                this.draftValues = []; // Clear draft values
                return this.fetchData(); // Refresh data
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'delete') {
            this.deleteRow(row.Id);
        }
    }

    deleteRow(rowId) {
        this.data = this.data.filter(row => row.Id !== rowId);
    }

    handleAddRow() {
        const newRow = {
            Id: `row-${Date.now()}`, // Temporary ID for new row
            Epic__c: '',
            Capability__c: '',
            Priority__c: '',
            Use_Case__c: '',
            Tech_Approach__c: '',
            Dev_Efforts__c: 0,
            QA_Efforts__c: 0,
            BA_Efforts__c: 0,
            CodeReviewfforts:0,
            DocumentationEfforts:0,
            DeploymentEfforts: 0,
        };
        this.data = [...this.data, newRow];
    }
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(evt);
    }
}