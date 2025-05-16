public class TriggerDispatcher {
    
    public static void run(TriggerHandlerInterface handler){
                system.debug('TriggerDispatcher.run() is running...');
			
        if(handler.isDisabled()){
            return;
        }
        if(Trigger.isBefore){
            system.debug(' Trigger.isBefore  running');
            if(Trigger.isInsert){
                handler.beforeInsert(Trigger.new);
            }
        }
        if(Trigger.isAfter){
            system.debug(' Trigger.isAfter  running');
            if(Trigger.isInsert){
                handler.afterInsert(Trigger.newMap);
            }
        }
        
    }

}