public with sharing class lwcDataController {
    
    /*
        The @AuraEnabled annotation allows a public or global static method to be used in
            a Lightning Web Component or Lightning Aura Component
        
        - A @AuraEnabled method that has the cacheable parameter set to true can be used as a
            wire adapter
            - As a result, that method can NOT use any DML
        - REMEMBER : Server side security is on us!
    */
    @AuraEnabled(cacheable=true)
    public static List<Account> getTopAccounts() {
        return [SELECT Name FROM Account ORDER BY AnnualRevenue DESC NULLS LAST LIMIT 5];
    }
}