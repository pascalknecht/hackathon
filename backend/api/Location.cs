namespace api
{
	public class Location
	{
		public Location(double latitude, double longitude)
		{
			lat = latitude;
			lng = longitude;
		}

		public double lat { get; set; }
		public double lng { get; set; }
	}
}