public with sharing class ShowChildAccountsAndContacts {
  @AuraEnabled(cacheable=true)
  public static Response loadChildAccountsAndContacts(Id accountId) {
    Response response = new Response();

    List<Account> childAccounts = [
      SELECT Id, Name
      FROM Account
      WHERE ParentId = :accountId
    ];
    response.childAccounts = childAccounts;

    List<Contact> relatedContacts = [
      SELECT Id, Name
      FROM Contact
      WHERE AccountId = :accountId
    ];
    response.relatedContacts = relatedContacts;

    return response;
  }

  public class Response {
    @AuraEnabled
    public List<Account> childAccounts;
    @AuraEnabled
    public List<Contact> relatedContacts;
  }
}