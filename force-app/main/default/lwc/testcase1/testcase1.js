import { LightningElement, api,wire,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertCSVData from '@salesforce/apex/rfpCSVController.insertCSVData';

/*import {fields} from './rfpUtil';
import { CloseActionScreenEvent } from 'lightning/actions';
import insertCSVData from '@salesforce/apex/rfpCSVController.insertCSVData';*/


export default class Testcase1 extends LightningElement {
        @api recordId;
        fileData;
        @track records = []; // to store rows / records of file for record creation in salesforce
        
        fieldMapping = {
            "Account Name" : "Name",
            "Account Currency" : "CurrencyIsoCode",
            "Support Tier" : "Support_Tier__c",
        } // Define mapping between CSV headers and Salesforce object fields


        handleFileChange(event) {
            const file = event.target.files[0]; // Get the first file
            if (file && file.type === 'text/csv') { // check for only csv file
                let reader = new FileReader();
                reader.onload = () => { // fires when file is fully loaded
                    console.log('onload fired');
                    this.fileData = reader.result;
                    console.log('filedata : ', this.fileData);
                    //let headers = allRows[0].split(',').map(header => header.trim());
                    let allRows = this.fileData.split(/\r\n|\n/); // Remove empty rows & Split into rows
                    console.log('All Rows:', allRows);
                    let headers = allRows[0].split(',');  // Extract headers from the first row
                    console.log('Headers:', headers);
                    // if (headers.length <= 1 ) {
                    //     this.showToast('Error', 'CSV file has no headers.', 'Error');
                    //     return;
                    // }
                    allRows = allRows.filter(row => row.trim() !== "");
                    //let allRows = this.fileData.split(/\r\n|\n/).filter(row => row.trim() !== ""); // Remove empty rows & Split into rows
                    console.log('allRows after trim space : ',allRows);
                    let tableData = [];
                    for (let i = 1; i < allRows.length; i++) {
                        let row = allRows[i].split(','); // Split each row into columns
                        let record = {};
                        headers.forEach((header, index) => {
                        let sfField = this.fieldMapping[header] || header; // Map CSV header to Salesforce field
                        console.log('sfField : ',sfField);
                        record[sfField] = row[index] ? row[index].trim() : ''; // Assign value
                    });
                    //     headers.forEach((header, index) => {
                    //     record[header] = row[index] ? row[index].trim() : ''; // Map CSV columns to object fields
                    // });
                    tableData.push(record);
                    }
                    this.records = tableData // Store formatted records
                    console.log('Parsed CSV tableData:', tableData);
                  
                                       
                    }                
                    reader.readAsText(file);
            } else {
                alert('Please upload a valid CSV file.');
                }
        }

        async handleUpload() {
            if (!this.fileData) {
                alert('No file selected');
                return;
            }
            if (this.records.length === 0) {
            this.showToast('Error', 'No records to upload.', 'error');
            return;
        }

        insertCSVData({ records: this.records })
            .then(() => {
                this.showToast('Success', 'Records inserted successfully!', 'success');
                this.records = []; // Clear records after successful insertion
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }


}