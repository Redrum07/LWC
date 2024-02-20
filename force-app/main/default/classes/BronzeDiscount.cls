public with sharing class BronzeDiscount implements IDiscount{
    public Decimal calculateDiscount(Decimal oppAmount) {
        return oppAmount - (oppAmount*0.025);
    }
}