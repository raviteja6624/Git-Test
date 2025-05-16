//Account Trigger V2
trigger AccountTrigger on Account (before update) {
    System.debug('AccountTrigger - before update FIRED...');
    for(Account acc : Trigger.new) {
        System.debug('Entered a for loop and updating the field Description...');
        // This update will cause the trigger to fire again
        acc.Description = 'Updated by trigger';
        System.debug('Description update is done...');
    }
}