namespace CyberpunkTcgVault.Api.Security
{
    public static class AuthorizationPolicies
    {
        // User, Demo and Admin may manage collector-owned data where the
        // service also scopes every operation to the authenticated UserId.
        public const string CollectorWrite = "CollectorWrite";

        // Demo can edit seeded sealed products, but creating/deleting sealed
        // products remains limited to normal users and admins for the MVP.
        public const string CollectorProductCreateDelete =
            "CollectorProductCreateDelete";

        // Shared Demo accounts must never change account security settings.
        public const string AccountSecurityWrite = "AccountSecurityWrite";

        public const string AccountDelete = "AccountDelete";

        // Privileged catalogue mutation requires both Admin role membership
        // and proof that this application session completed MFA.
        public const string AdminWithMfa = "AdminWithMfa";
    }
}
