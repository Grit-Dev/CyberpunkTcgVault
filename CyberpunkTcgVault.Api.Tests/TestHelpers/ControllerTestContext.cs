using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace CyberpunkTcgVault.Api.Tests.TestHelpers
{
    internal static class ControllerTestContext
    {
        private static readonly IServiceProvider ServiceProvider =
            CreateServiceProvider();

        public static T Configure<T>(T controller)
            where T : ControllerBase
        {
            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    RequestServices = ServiceProvider
                }
            };

            return controller;
        }

        private static IServiceProvider CreateServiceProvider()
        {
            var services = new ServiceCollection();

            services.AddLogging();
            services.AddControllers();

            return services.BuildServiceProvider();
        }
    }
}
