using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using data.Entities;

namespace data
{
    public class ParkingDbContext : DbContext
    {
        public DbSet<Booking> Booking { get; set; }
        public DbSet<Dashboard> Dashboard { get; set; }
        public DbSet<Owner> Owner { get; set; }
        public DbSet<ParkingSpace> ParkingSpace { get; set; }
        public DbSet<User> User { get; set; }
    }
	

}