public class dataTableClass {
    @AuraEnabled(cacheable=true)
    public static List<RFP_Line_Item__c> getLineItemList() {
        List<RFP_Line_Item__c> items = [SELECT Id,Epic__c, Capability__c, Priority__c, Use_Case__c, Tech_Approach__c, Dev_Efforts__c, BA_Efforts__c, QA_Efforts__c, Deployment_Efforts__c, Documentation_Efoorts__c, Code_Review_Efforts__c FROM RFP_Line_Item__c LIMIT 10];
    if(!items.isEmpty())
    {
        return items;
    }
        return Null;
    }
    
    @AuraEnabled
    public static String createLineItems(Object lineItemData) {
     List<RFP_Line_Item__c> lineItemList = (List<RFP_Line_Item__c>) JSON.deserialize(JSON.serialize(lineItemData), List<RFP_Line_Item__c>.class);
        if(!lineItemList.isEmpty())
        {
            insert lineItemList;
            return 'Success';
        }return 'Failed';
    }

    @AuraEnabled
    public static String updateLineItems(Object lineItemData){
        system.debug('lineItemData:'+lineItemData);
        List<RFP_Line_Item__c> lineItemList = (List<RFP_Line_Item__c>) JSON.deserialize(JSON.serialize(lineItemData), List<RFP_Line_Item__c>.class);
        system.debug('lineItemList :' + lineItemList);
        if(!lineItemList.isEmpty())
        {
            update lineItemList;
            return 'Success';
        }return 'Failed';
    }
}