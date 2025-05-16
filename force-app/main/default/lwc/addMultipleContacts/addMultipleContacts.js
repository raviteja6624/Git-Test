import { LightningElement, wire,track,api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';

import saveMultipleContacts from '@salesforce/apex/addMultipleContactsController.saveMultipleContacts';

import CONTACT_OBJECT from '@salesforce/schema/Contact';
import GENDER_IDENTITY_FIELD from '@salesforce/schema/Contact.GenderIdentity';


export default class AddMultipleContacts extends LightningElement {

    // genders = [
    //     { label: 'Male', value: 'Male' },
    //     { label: 'Female', value: 'Female' }
    // ]
    @api recordId;
    @track contacts = [];
    connectedCallback(){
        console.log("connectedCallback triggered");
        this.addNewClickHandler();
    }

    @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
    contactobjectInfo;

    @wire(getPicklistValues, { recordTypeId: '$contactobjectInfo.data.defaultRecordTypeId', fieldApiName: GENDER_IDENTITY_FIELD })
    getPicklistValues;

    get getGenderPicklistValues(){
        return this.getPicklistValues?.data?.values;
    }
        
    addNewClickHandler(event){

        console.log("addNewClickHandler triggered");
        console.log(this.contacts);
        this.contacts.push({
            tempId: Date.now()
        });

    }
  
    deleteClickHandler(event){

        console.log("deleteClickHandler triggered");
        console.log(event.target.dataset.tempId);
        if(this.contacts.length == 1){
            this.ShowToastEvent("Cannot delete all the contacts",'Error','error');
            return;
        }
        let tempId = event.currentTarget?.dataset.tempId;

        this.contacts = this.contacts.filter(a => a.tempId != tempId);

    }
     ShowToastEvent(title,message,variant){
    //const event = new ShowToastEvent({ title, message, variant });

        const event = new ShowToastEvent({
            title: title, // Use title or label
            message: message,
            variant: variant // or 'info', 'warning', 'error'
          
        });
        this.dispatchEvent(event);
    }
    elementChangeHandler(event){
       // let firstName = event.target?.value;
        let contactRow = this.contacts.find(a=> a.tempId == event.target.dataset.tempId);
        if(contactRow){
            contactRow[event.target.name] = event.target.value;
            console.log(event.target.name,':', event.target.value); //FirstName =>  Ravi
        }
        console.log('contactRow =>',contactRow); //contactRow => FirstName:"Ravi" tempId:1746600689599
        console.log('JSON contactRow => ',JSON.stringify(contactRow)); //  JSON contactRow =>  {"tempId":1746601270907,"FirstName":"Ravi","LastName":"Teja","Email":"fdf","GenderIdentity":"Female"}
    }


    async submitClickHandler(event){
        console.log("handleSubmit triggered"); 
        const allValid = this.checkControlsValidity();
        console.log('allValid -> ',allValid);
        if(allValid){
            this.contacts.forEach(a => a.AccountId = this.recordId);
            let response = await saveMultipleContacts({contacts: this.contacts});
            if(response.isSuccess){
                this.ShowToastEvent('Success', 'Contacts saved Successfully', 'success');
                this.dispatchEvent(new CloseActionScreenEvent()); // ✅ closes the modal action

            } else {
                this.ShowToastEvent('Error', response.error, 'error');
            }
        } else {
            this.ShowToastEvent('Error', 'Please fill all the required fields', 'error');
            return;
        } 
        console.log(this.contacts); 
        console.log('JSON contacts => ', JSON.stringify(this.contacts)); 
    }

    checkControlsValidity(){
        console.log("checkControlsValidity triggered");
        let isValid = true;
        const controls = this.template.querySelectorAll('lightning-input, lightning-combobox');
        console.log('controls => ',controls);
        controls.forEach(field => {
            if(!field.checkValidity()){ // Returns a boolean: true if the field is valid, false if not.Does not show any error messages on the UI.
                console.log('entered if block');
                field.reportValidity(); //❌ "This field is required" Also displays validation error messages on the UI (like red borders, error text).
                isValid = false;
            }
        });
        return isValid;

    }


// END OF CODE ------------------------------------
    }

    // elementChangeHandler(event){ 
    //     console.log("elementChangeHandler triggered");
    //     let tempId = event.currentTarget?.dataset.tempId;

    //     let contactRow = this.contacts.find(a => a.tempId == tempId);
    //     if(contactRow){
    //         contactRow[event.target.name] = event.target?.value;
    //     }
    
    //     console.log('contactRow => ',contactRow); // this.contactRow is undefined
    //     console.log('JSON contactRow => ',JSON.stringify(this.contactRow)); // same here


    // }