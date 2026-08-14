namespace CyberpunkTcgVault.Api.Services.Results
{
    public enum CardDeleteResult
    {
        Success,
        NotFound,
        ReferencedByCollectorData
    }
}
