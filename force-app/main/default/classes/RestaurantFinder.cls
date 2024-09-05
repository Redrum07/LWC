public with sharing class RestaurantFinder {
    
    public static void getRestaurants(Id ContactId){

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
        String response = res.getBody();
        System.debug(response);
    }
}