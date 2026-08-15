namespace CyberpunkTcgVault.Api.Services.Interfaces
{
    public interface IDemoVaultService
    {
        Task ResetDemoCollectorDataAsync(
            Guid userId,
            CancellationToken cancellationToken = default);
    }
}
