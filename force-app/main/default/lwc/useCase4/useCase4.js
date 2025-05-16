import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import CUSTOM_OBJECT from '@salesforce/schema/Account'; // Your custom object
import FIELD_1 from '@salesforce/schema/Account.Industry'; // Picklist field 1
//import FIELD_2 from '@salesforce/schema/RFP_Line_Item__c.Dev_Ef'; // Picklist field 2

export default class DisplayPicklistValues extends LightningElement {
    picklistOptions1 = [];
    picklistOptions2 = [];
    error;

    @wire(getObjectInfo, { objectApiName: CUSTOM_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectinfo.data.defaultRecordTypeId', fieldApiName: FIELD_1 })
    wiredPicklistValues1({ error, data }) {
        if (data) {
            this.picklistOptions1 = data.values.map((option) => ({
                label: option.label,
                value: option.value,
            }));
        } else if (error) {
            this.error = error;
        }
    }

    /*@wire(getPicklistValues, { fieldApiName: FIELD_2 })
    wiredPicklistValues2({ error, data }) {
        if (data) {
            this.picklistOptions2 = data.values.map((option) => ({
                label: option.label,
                value: option.value,
            }));
        } else if (error) {
            this.error = error;
        }
    }*/
}