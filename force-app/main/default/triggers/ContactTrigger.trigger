trigger ContactTrigger on Contact (before insert,after insert) {

    system.debug('ContactTrigger is running ...');
    TriggerDispatcher.run(new ContactTriggerHandler());
}