public with sharing class addMultipleContactsController {

    @AuraEnabled
    public static ResponseWrapper saveMultipleContacts(List<Contact> contacts){
        ResponseWrapper response = new ResponseWrapper();
        try {
            insert contacts;
            response.isSuccess = true;
            response.message = 'Contacts saved successfully';
        } catch (Exception e) {
            response.isSuccess = false;
            response.message = e.getMessage();
            throw new AuraHandledException(e.getMessage());
        }
        return response;
    }


    public  class ResponseWrapper{
        @AuraEnabled
        public Boolean isSuccess{get;set;}
        @AuraEnabled
        public string message{get;set;}
}
}