public with sharing class AccountController {

    @AuraEnabled(cacheable=true)
    public static List<AccountWrapper> getAccountData(Id accountId) {
        // Query for Accounts, child Accounts and related Contacts
        List<Account> accounts = [SELECT Id, Name, 
                                  (SELECT Id, Name FROM Contacts), 
                                  (SELECT Id, Name FROM ChildAccounts) 
                                  FROM Account 
                                  WHERE ParentId =: accountId];
        
        // Create a list of AccountWrapper to hold the data
        List<AccountWrapper> accountData = new List<AccountWrapper>();
        
        for (Account acc : accounts) {
            AccountWrapper wrapper = new AccountWrapper();
            wrapper.account = acc;
            wrapper.childAccounts = acc.ChildAccounts;
            wrapper.contacts = acc.Contacts;
            accountData.add(wrapper);
        }
        
        return accountData;
    }

    // Wrapper class to structure data for LWC
    public class AccountWrapper {
        @AuraEnabled public Account account;
        @AuraEnabled public List<Account> childAccounts;
        @AuraEnabled public List<Contact> contacts;
    }
}