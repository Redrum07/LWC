public with sharing class GoldDiscount implements IDiscount {
    
    public Decimal calculateDiscount(Decimal oppAmount){
        return oppAmount - (oppAmount * 0.10);
    }

}