trigger LeadTrigger on Lead (before insert, before update, before delete, 
                             after insert,  after update, after delete, 
                             after undelete) {
        System.debug('Lead Trigger Runinng....');
        new LeadTriggerHandler().run();
	
}