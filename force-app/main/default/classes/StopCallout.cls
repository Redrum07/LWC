public with sharing class StopCallout {
    
    public static void getBlogs(){
        Http http = new Http();
        HttpRequest Request = new HttpRequest();
        Request.setEndpoint('https://sfdcstop.herokuapp.com/blogs');
        Request.setMethod('GET');

        HttpResponse response = http.send(Request);

        if(response.getStatusCode() == 200){
            StopWrapper wrapper = StopWrapper.parse(response.getBody());

            System.debug('Author:-' + wrapper.author);
            if((wrapper.blogs != null) && (!wrapper.blogs.isEmpty())){
                for(integer i=0; i<wrapper.blogs.size(); i++){

                    StopWrapper.Blogs blog = wrapper.blogs.get(i);
                    System.debug('id: ' + blog.id);
                    System.debug('Blog Title: ' + blog.title);
                    System.debug('Blog URL: ' + blog.url);
                }
            }
        }
        else if (response.getStatusCode() == 404){
            System.debug(response.getStatus().toString());
        }

    }

}