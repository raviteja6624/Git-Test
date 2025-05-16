public with sharing class ContactTableController1 {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id, Name FROM Contact];
    }

    @AuraEnabled
    public static void saveContacts(List<Contact> contacts) {
        upsert contacts;
    }

    @AuraEnabled
    public static void deleteContact(String contactId) {
        delete [SELECT Id FROM Contact WHERE Id = :contactId];
    }
}