public virtual class TriggerHandler {
    
    private TriggerContext context;
    public TriggerHandler(){
        System.debug('Trigger Handler constructor running ...');
        this.setTriggerContext();
    }
    public void run(){
        
        //System.debug('context'+ this.context);
        
        System.debug('Trigger Handler.run() running... ');
        
        //Dispatch to the correct handler method
        if(this.context == TriggerContext.BEFORE_INSERT){
            this.beforeInsert();
        }
    }
    private void setTriggerContext(){
        this.setTriggerContext(false);
    }
    private void setTriggerContext(Boolean testMode){
        system.debug('TriggerHandler.setTriggerContext is running ...');
        if(Trigger.isExecuting && Trigger.isBefore && Trigger.isInsert){
            this.context = TriggerContext.BEFORE_INSERT;
            system.debug('context - '+  this.context);

        }
    }
    protected virtual void beforeInsert(){
        
    }
    private enum TriggerContext {
        BEFORE_INSERT, BEFORE_UPDATE, BEFORE_DELETE, 
            AFTER_INSERT, AFTER_UPDATE, AFTER_DELETE, 
            AFTER_UNDELETE
            }
    
}