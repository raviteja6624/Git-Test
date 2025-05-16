trigger updateLineItem on RFP_Line_Item__c (before insert, before update) {
    
    if(Trigger.isInsert && Trigger.isBefore || Trigger.isUpdate && Trigger.isBefore)
    {
        for(RFP_Line_Item__c item : Trigger.new){
        item.Total_Points__c	= item.BA_Points__c + item.Code_Review_Points__c + item.Deployment_Points__c + item.Dev_Points__c + item.Documentation_Points__c + item.QA_Points__c;
    }
    }
    

}