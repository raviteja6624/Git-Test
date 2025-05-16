public class ContactTriggerHandler implements TriggerHandlerInterface{
    public static Boolean triggerDisabled = false;
    public boolean isDisabled(){
        system.debug('ContactTriggerHandler.isDisabled is running...');
        return triggerDisabled;
       /* if(Trigger_Settings__c.getInstance('Contact').TriggerDisabled__c){
            return true;
        }else {
            return triggerDisabled;
        }*/
    }
    
    public void beforeInsert(List<SObject> newItems){
        system.debug('ContactTriggerHandler.beforeInsert is running...');
        
    }
    public void afterInsert(Map<Id, SObject> newItems){
        system.debug('ContactTriggerHandler.afterInsert is running...');

        
    }

}