public with sharing class DiscountFactory {
    public static IDiscount getDiscount(String customerTier) {

         Discount__mdt discountMeta = [SELECT Class_To_Instantiate__c from Discount__mdt where Customer_Tier__c =: customerTier];
        Type t = Type.forName(discountMeta.Class_To_Instantiate__c);
        IDiscount discount = (IDiscount)t.newInstance();
        return discount;
    }
}  