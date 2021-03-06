﻿// <auto-generated />
using System;
using JTemplate.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace JTemplate.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-preview3-35497")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("JTemplate.Data.Models.Authentication", b =>
                {
                    b.Property<int>("AuthenticationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<DateTime>("LastEmail");

                    b.Property<string>("Password");

                    b.Property<string>("Token");

                    b.Property<int>("Type");

                    b.Property<int>("UserId");

                    b.HasKey("AuthenticationId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Authentication");
                });

            modelBuilder.Entity("JTemplate.Data.Models.Profile", b =>
                {
                    b.Property<int>("ProfileId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateModified");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<int>("UserId");

                    b.HasKey("ProfileId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("JTemplate.Data.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Role");

                    b.Property<bool>("Verified");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("JTemplate.Data.Models.Authentication", b =>
                {
                    b.HasOne("JTemplate.Data.Models.User", "User")
                        .WithOne("Authentication")
                        .HasForeignKey("JTemplate.Data.Models.Authentication", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("JTemplate.Data.Models.Profile", b =>
                {
                    b.HasOne("JTemplate.Data.Models.User", "User")
                        .WithOne("Profile")
                        .HasForeignKey("JTemplate.Data.Models.Profile", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
