public class LineItemController {
    @AuraEnabled(cacheable=true)
    public static List<RFP_Line_Item__c> getLineItemList(Id recordId) {
        return [SELECT Epic__c, Capability__c, Priority__c, Use_Case__c, Tech_Approach__c, Dev_Efforts__c, BA_Efforts__c, QA_Efforts__c, Deployment_Efforts__c, Documentation_Efoorts__c, Code_Review_Efforts__c FROM RFP_Line_Item__c WHERE Id = :recordId];
    }
    @AuraEnabled(cacheable=true)
    public static void createLineItems(List<RFP_Line_Item__c> lineItems) {
        
}}