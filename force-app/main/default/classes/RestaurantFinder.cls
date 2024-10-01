public with sharing class RestaurantFinder {
    
    @AuraEnabled(cacheable=true)
    public static List<Object> getRestaurants(Id ContactId){
        
        Contact contact = [Select name, MailingLatitude , MailingLongitude from Contact where id = :ContactId];
        
        HttpRequest req = new HttpRequest();
        String url = 'https://api.yelp.com/v3/businesses/search?latitude=' + contact.MailingLatitude +
                        '&longitude=' + contact.MailingLongitude + '&term=restaurants&radius=10000&limit=5';
    
        
        Http http = new Http();
        req.setMethod('GET');
        req.setEndpoint(url);
        req.setHeader('Authorization' , 
        'Bearer mh9BX_y0G8IxBT1D3OYBnzrF0jV-D9cbC9eq3RvhcQY_jBjBadeuVXnWPpA6nUzoJF6JQWx3Yf6JcJ63PqhqiK-S_0v_FcgkgWGeoC566ir8f-sMV7SjATWtLkrUZnYx');

        HTTPResponse res = http.send(req);
        
        Map<String,Object> bizMap = (Map<String,Object>) JSON.deserializeUntyped(res.getBody());
        
        return (List<Object>) bizMap.get('businesses');
    }


    @AuraEnabled
    public static void createAppointment(DateTime dt, Id contactId, String duration , String res){

        Event evt = new Event();

        evt.Subject = 'Casual Meeting';
        evt.WhoId = contactId;
        evt.StartDateTime = dt;
        evt.EndDateTime = dt.addHours(Integer.valueOf(duration));
        evt.Location = res;

        insert evt;
    }   
}