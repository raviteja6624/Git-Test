public with sharing class addRfpLineItems {
    @AuraEnabled
    public static ResponseWrapper saveLineItems(List<RFP_Line_Item__c> items){
		ResponseWrapper response = new ResponseWrapper();
    try {
        insert items;
        response.isSuccess = true;
    	}
    catch(Exception e)
    {
        response.isSuccess = false;
        response.message = e.getMessage();
    }
         return response;
    }
public class ResponseWrapper
{
    @AuraEnabled
    public Boolean isSuccess{get;set;}
    @AuraEnabled
    public String message{get;set;}
    
}

}