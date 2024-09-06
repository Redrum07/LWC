public class YelpResponseWrapper {

	public List<Businesses> businesses;

	public class Businesses {
		public String name;
		public String image_url;
		public Double rating;
        public Double distance;
	}

	
	public static YelpResponseWrapper parse(String json) {
		return (YelpResponseWrapper) System.JSON.deserialize(json, YelpResponseWrapper.class);
	}
}