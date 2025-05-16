import { LightningElement, wire } from 'lwc';
import getAccountData from '@salesforce/apex/AccountController.getAccountData';

export default class AccountAccordion extends LightningElement {
    accountData = [];

    @wire(getAccountData)
    wiredAccountData({ error, data }) {
        if (data) {
            this.accountData = data;
        } else if (error) {
            console.error(error);
        }
    }
}