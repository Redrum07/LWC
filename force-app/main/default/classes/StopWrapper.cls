public  class StopWrapper {
    
    public class Blogs{
        public  String id ;
        public String title ;
        public String url;
    }

    public String author;
    public List<Blogs> blogs;

    public static StopWrapper parse(String json){

        return (StopWrapper) System.JSON.deserialize(json, StopWrapper.class);
    }

}