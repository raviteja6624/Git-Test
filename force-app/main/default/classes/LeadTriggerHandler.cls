public class LeadTriggerHandler extends TriggerHandler{
    
    public LeadTriggerHandler(){}
    public override void beforeInsert(){
        System.debug('LeadTriggerHandler.beforeInsert is running ...');
    }

}