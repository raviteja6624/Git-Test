import { LightningElement, wire, track,api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import PRIORITY_FIELD from '@salesforce/schema/RFP_Line_Item__c.Priority__c';
import DEVEFFORTS_FIELD from '@salesforce/schema/RFP_Line_Item__c.Dev_Efforts__c';
import saveLineItems from '@salesforce/apex/addRfpLineItems.saveLineItems';

export default class TableInput extends LightningElement
{
    @api recordId;
    PriorityValues = [];
    EffortValues = [];

    //for PriorityValues
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: PRIORITY_FIELD })
    getPriorityValues({ error, data }) {
        if (data) {
            this.PriorityValues = [...data.values];
        } else if (error) {
            // TODO: Error handling
            console.error(error)
          }
    }
    //for EffortValues
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: DEVEFFORTS_FIELD })
    getDEVEffortValues({ error, data }) {
        if (data) {
            this.EffortValues = [...data.values];
        } else if (error) {
            // TODO: Error handling
            console.error(error)
          }
    }
    //rows is an array of objects
    //The rows variable is initialized with a single row, and the handleAddRow() method allows adding more rows to the table. Each new row is given a unique id based on the current timestamp.
    @track rows = [
        { id: 1, 
            epic: '',
            capability: '',
            priority: '',
            usecase: '',
            techapproach: '',
            DEVEfforts: '',
            BAEfforts: '',
            QAEfforts: '',
            DeploymentEfforts: '',
            DocumentationEfforts:'',
            CodeReviewfforts: '',
        }
    ];
    // Getter to add serial numbers dynamically
    get rowsWithIndex() {
    return this.rows.map((row, index) => ({
        ...row,
        index: index + 1 // Add the serial number
    }));
    }
    handleAddRow() {
        const newRow = {
            id: Date.now(), // Unique ID based on timestamp
            epic: '',
            capability: '',
            priority: '',
            usecase: '',
            techapproach: '',
            DEVEfforts: '',
            BAEfforts: '',
            QAEfforts: '',
            DeploymentEfforts:'',
            DocumentationEfforts: '',
            CodeReviewfforts: '',

        };
        this.rows = [...this.rows, newRow];
    }
    handleDeleteRow(event) {
        const idToDelete = parseInt(event.target.dataset.id, 10);
        this.rows = this.rows.filter(row => row.id !== idToDelete);
    }
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
            epic:row.epic,
            capability: row.capability,
            priority: row.priority,
            usecase: row.usecase,
            techapproach: row.techapproach,
            DEVEfforts: row.DEVEfforts,
            BAEfforts: row.BAEfforts,
            QAEfforts: row.QAEfforts,
            DeploymentEfforts: row.DeploymentEfforts,
            DocumentationEfforts: row.DocumentationEfforts,
            CodeReviewfforts: row.CodeReviewfforts,
            RFP__c: this.recordId
        }));
            

        // Call Apex method
        saveLineItems({ data: dataToSend })
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
    /*elementChangeHandler(event){
        let recordRow = this.rows.find(row => row.id == event.target.dataset.id);
        if(recordRow)
        {
            recordRow[event.target.name] = event.target.value;
            console.log(recordRow);
        }

    }*/

     /*submitClickHandler(event) {
        if (this.rows.length > 0) {
            this.isLoading = true;
            this.rows.forEach(row => row.RFP__c = this.recordId);
            let response =  saveLineItems({ items: this.rows });
            if (response.isSuccess) {
                this.showToast('Contacts saved successfully', 'Success', 'success');
                this.dispatchEvent(new CloseActionScreenEvent());
            }
            else {
                this.showToast('Something went wrong while saving contacts - ' + response.message);
            }
            this.isLoading = false;
        }
        else {
            this.showToast('Please correct below errors to procced further.');
        }
    }
    showToast(message, title = 'Error', variant = 'error') {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }

  /*  handleInputChange(event) 
    {
        const field  = event.target.dataset.field; // get the field name
        this.rows[field] = event.target.value; // Update the corresponding field
        
    }
    handleSave()
    {
        console.log(this.rows);
    }

    */