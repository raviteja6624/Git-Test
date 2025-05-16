public with sharing class MyApexClass {
    @AuraEnabled
    public static void saveData(List<Contact> data) {
        // Validate and process data
        if (data == null || data.isEmpty()) {
            throw new AuraHandledException('No data to save.');
        }

        // Insert records into a custom object or process them
        try {
            insert data;
        } catch (Exception e) {
            throw new AuraHandledException('Error saving data: ' + e.getMessage());
        }
    }
}