using Microsoft.AspNetCore.Identity;

namespace ShowMasterApp.Core.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
    }
}
