using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace CyberpunkTcgVault.Api.Tests.TestHelpers
{
    internal static class ProblemDetailsAssert
    {
        public static ProblemDetails IsProblem(
            IActionResult result,
            int expectedStatusCode,
            string expectedTitle,
            string? expectedDetail = null)
        {
            var objectResult = Assert.IsType<ObjectResult>(result);

            Assert.Equal(
                expectedStatusCode,
                objectResult.StatusCode);

            var problem = Assert.IsType<ProblemDetails>(objectResult.Value);

            Assert.Equal(
                expectedStatusCode,
                problem.Status);

            Assert.Equal(
                expectedTitle,
                problem.Title);

            if (expectedDetail is not null)
            {
                Assert.Equal(
                    expectedDetail,
                    problem.Detail);
            }

            return problem;
        }
    }
}
