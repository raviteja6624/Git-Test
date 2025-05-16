public with sharing class lookUpController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactObjectData() {
        return [SELECT Id, AccountId FROM Contact];
    }
}