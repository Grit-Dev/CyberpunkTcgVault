namespace CyberpunkTcgVault.Api.Options
{
    public class ProductCapabilitiesOptions
    {
        public const string SectionName = "ProductCapabilities";

        public bool PublicRegistrationEnabled { get; set; }

        public bool DemoAccessEnabled { get; set; }
    }
}
