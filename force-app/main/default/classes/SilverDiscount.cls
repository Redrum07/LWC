public with sharing class SilverDiscount implements IDiscount {
    public Decimal calculateDiscount(Decimal oppAmount){
        return oppAmount - (oppAmount*0.05);
    }
}