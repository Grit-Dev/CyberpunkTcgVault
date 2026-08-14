using CyberpunkTcgVault.Api.Services.Interfaces;

namespace CyberpunkTcgVault.Api.Tests.TestHelpers
{
    public class TestCurrentUserService : ICurrentUserService
    {
        private readonly Guid _userId;

        public TestCurrentUserService(Guid userId)
        {
            _userId = userId;
        }

        public Guid GetUserId()
        {
            return _userId;
        }
    }
}
