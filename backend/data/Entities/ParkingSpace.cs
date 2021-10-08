using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace data.Entities
{
	public enum ChargerType
	{
		None, Slow, Fast, TurboCharge
	}


	public class ParkingSpace
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int ID { get; set; }
		public long Longitude { get; set; }
		public long Latitude { get; set; }
		public ChargerType ChargerType { get; set; }

	}
}
