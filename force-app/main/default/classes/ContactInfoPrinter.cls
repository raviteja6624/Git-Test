public class ContactInfoPrinter {

    public static void printContactNamesAndEmails() {
        // Query Name and Email from Contact records (limit added for safety)
        List<Contact> contactList = [SELECT Name, Email FROM Contact LIMIT 100];

        // Loop through each contact and print Name and Email
        for (Contact con : contactList) {
            System.debug('Name: ' + con.Name + ', Email: ' + con.Email);
        }
    }
}