using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIProject.Models.WebModels.User
{
    public class GetUserModels
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public Nullable<System.DateTime> LockoutEndDateUtc { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public string UserName { get; set; }
        public string MaNV { get; set; }
        public string CMND { get; set; }
        public string HoTen { get; set; }
        public Nullable<System.DateTime> NgaySinh { get; set; }
        public Nullable<bool> GioiTinh { get; set; }
        public string DiaChi { get; set; }
        public string Avatar { get; set; }
        public Nullable<byte> RoleId { get; set; }
        public Nullable<int> IS_ACTIVE { get; set; }
    }
}