public with sharing class RestaurantFinder {
    
    @auraEnabled(cacheable=true)
    public static List<YelpResponseWrapper.Businesses> getRestaurants(Id ContactId){
        
        List<YelpResponseWrapper.Businesses> business = new List<YelpResponseWrapper.Businesses>();
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
        YelpResponseWrapper restaurants = YelpResponseWrapper.parse(res.getBody());
        business = restaurants.businesses;
        System.debug(business);
        return business;
    }
}