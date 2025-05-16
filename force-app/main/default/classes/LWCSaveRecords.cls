public class LWCSaveRecords {
	@AuraEnabled
    public static void saveRecords(List<Account> records) {
        try {
            insert records;
        } catch (Exception e) {
            throw new AuraHandledException('Error: ' + e.getMessage());
        }
    }
}