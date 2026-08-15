using CyberpunkTcgVault.Api.DTOs;

namespace CyberpunkTcgVault.Api.Services.Results
{
    public enum CollectionProductCreateStatus
    {
        Created,
        InvalidProductName
    }

    public class CollectionProductCreateResult
    {
        public CollectionProductCreateStatus Status { get; init; }

        public CollectionProductResponse? Item { get; init; }
    }
}
