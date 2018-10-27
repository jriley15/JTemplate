using Microsoft.EntityFrameworkCore;
using JTemplate.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JTemplate.Data
{
    public class DataContext : DbContext
    {

        //tables
        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Authentication> Authentication { get; set; }



        //security
        //public DbSet<Token> Tokens { get; set; }



        public DataContext (DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }


    }
}
