public class rfpCSVController {
	@AuraEnabled
    public static void insertCSVData(List<Account> records) {
        system.debug('Account records from LWC :'+ records);
        try {
            insert records;
        } catch (Exception e) {
            throw new AuraHandledException('Error inserting records: ' + e.getMessage());
        }
    }
}