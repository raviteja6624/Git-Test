public interface TriggerHandlerInterface {
    void beforeInsert(List<SObject> newItems);
    void afterInsert(Map<Id, SObject> newItems);
    
    Boolean isDisabled();

}