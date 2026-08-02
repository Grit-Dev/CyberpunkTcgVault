# Cyberpunk TCG Vault

[![Continuous Integration](https://github.com/Grit-Dev/CyberpunkTcgVault/actions/workflows/ci.yml/badge.svg)](https://github.com/Grit-Dev/CyberpunkTcgVault/actions/workflows/ci.yml)
[![GitHub Pages Deployment](https://github.com/Grit-Dev/CyberpunkTcgVault/actions/workflows/pages.yml/badge.svg)](https://github.com/Grit-Dev/CyberpunkTcgVault/actions/workflows/pages.yml)

Cyberpunk TCG Vault is a fan-made trading-card collection-management application built as a C#/.NET and Angular portfolio project.

## Live Frontend Preview

[View the deployed Angular frontend](https://grit-dev.github.io/CyberpunkTcgVault/)

> The current deployment is a static frontend prototype. API and database-backed features currently run locally and will be connected after the ASP.NET Core API is publicly hosted.

---

## Project Status

### Backend API

The ASP.NET Core API has reached a secure MVP stage and is suitable as a standalone backend portfolio project.

Completed backend areas include:

- User registration and login
- ASP.NET Core password hashing
- JWT authentication
- Claims-based user identification
- Protected current-user endpoint
- Role-based Admin authorization
- User-owned private data
- Cross-user access prevention
- Entity Framework Core relationships
- SQL Server persistence
- Database migrations
- Request and response DTOs
- Swagger/OpenAPI testing
- Automated controller and authentication tests
- 56 passing automated tests at the current project checkpoint

### Angular Frontend

The Angular frontend is currently in its **initial development and visual-prototype stage**.

> **Important:** The current homepage is only an initial visual starting point. It is not the finished application UI.
>
> The homepage was introduced early to give the project a polished visual direction while the real Angular application is built incrementally underneath it.
>
> Some card names, collection values, statistics, buttons, dashboard information, and navigation controls are currently presentation-only placeholders. These will be replaced with reusable Angular components and real data from the ASP.NET Core API.

Current frontend progress includes:

- Angular and TypeScript project scaffolded
- Angular Router configured
- Standalone Home component created
- Home route connected through `router-outlet`
- Initial responsive homepage prototype added
- Initial global styling foundation added
- Frontend development isolated on a feature branch

The homepage design will change over time as the application gains:

- Shared layout components
- Reusable header and footer components
- Registration and login pages
- Reactive forms
- Angular services
- API integration
- Authentication state
- Route protection
- Real collection data
- Loading and error states
- Accessibility improvements
- Automated frontend tests

Cyberpunk TCG Vault remains an active project. Development will continue incrementally alongside focused C# coding challenges and a separate .NET API Gym repository.

---

## Frontend Prototype Status

The current homepage provides a visual target for the application rather than pretending that the complete frontend has already been implemented.

### Currently implemented

- Angular application structure
- Angular routing
- Home page component
- Responsive HTML and SCSS foundation
- Initial project-wide visual direction
- Reusable design values beginning to move into global styles
- A polished starting screen for the portfolio project

### Currently placeholder content

The following homepage elements are currently visual examples:

- Example collection value
- Example number of cards
- Example card names
- Example card rarities
- Vault completion percentage
- Dashboard information
- Login button behaviour
- Registration button behaviour
- Collection navigation behaviour

These placeholders are intentionally included to demonstrate the intended user experience.

They are not yet connected to the database or API.

### Planned replacement work

The placeholder content will be replaced incrementally with:

- Real API responses
- Real authenticated-user information
- User-specific collection records
- Reusable Angular components
- Angular services
- Reactive forms
- Route guards
- Loading indicators
- Validation messages
- Error handling
- Accessible controls
- Responsive behaviour tested across screen sizes

This approach provides a polished visual direction early while keeping the implementation status transparent and easy to explain.

---

## Tech Stack

### Backend

- C#
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server / LocalDB
- JWT Bearer Authentication
- ASP.NET Core Authorization
- Swagger / OpenAPI

### Frontend — In Progress

- Angular
- TypeScript
- Angular Router
- Standalone Angular components
- HTML
- SCSS
- Responsive layouts
- Planned Angular services
- Planned reactive forms
- Planned JWT-authenticated API requests
- Possible Progressive Web App support later

### Testing

- xUnit
- EF Core InMemory provider
- ASP.NET Core controller tests
- Authentication tests
- Authorization tests
- Ownership tests
- Cross-user access tests
- Frontend tests to be expanded as Angular features are implemented

### Development Tools

- Git
- GitHub
- Visual Studio
- Developer PowerShell
- Angular CLI
- Swagger
- SQL Server Management Studio
- AI-assisted development tools used selectively

---

## Current Features

---

## Development Evidence

The following screenshots capture key implementation milestones during development.

### Angular Card Catalogue API Integration

![Card catalogue API integration](docs/screenshots/card-catalogue-api-integration-success.png)

Demonstrates:

- Angular frontend successfully consuming the ASP.NET Core API
- Card catalogue data returned from `GET /api/Cards`
- Database-backed card records rendered dynamically
- Angular service and component integration

### Card Artwork Static File Hosting

![Card artwork serving](docs/screenshots/static-card-image-serving-success.png)

Demonstrates:

- ASP.NET Core serving static card assets from `wwwroot`
- Card image paths returned through API data
- Frontend-ready image hosting flow

### Authentication

Users can register and log in through the API.

Passwords are never stored as plain text. ASP.NET Core password hashing is used to generate and verify password hashes.

After a successful login, the API returns a signed JWT containing claims for:

- User ID
- Username
- Role

The Angular frontend will send this token with protected API requests.

---

### Current User Endpoint

The API includes a protected endpoint that returns the currently authenticated user:

```http
GET /api/Auth/me
```

Example response:

```json
{
  "userId": "00000000-0000-0000-0000-000000000000",
  "userName": "example-admin",
  "role": "Admin"
}
```

The Angular frontend will use this endpoint to:

- Restore login state after a page refresh
- Display the current username
- Determine whether Admin controls should be shown
- Confirm that the current JWT is still valid
- Keep authentication decisions based on backend data

The backend remains the source of truth for authentication and authorization.

---

### Shared Card Catalogue

The `Cards` area represents the shared master card catalogue.

Cards do not belong to individual users.

Anyone can read the catalogue:

```http
GET /api/Cards
GET /api/Cards/{id}
```

Only users with the `Admin` role can modify it:

```http
POST /api/Cards
PUT /api/Cards/{id}
DELETE /api/Cards/{id}
```

Admin-only actions are protected using role-based authorization:

```csharp
[Authorize(Roles = "Admin")]
```

---

### User-Owned Data

The API contains three areas of private user-owned data:

- Owned cards
- Wishlist items
- Collection products

The frontend does not provide the `UserId` when creating these records.

Instead, the backend reads the logged-in user’s ID from the JWT:

```csharp
User.FindFirstValue(ClaimTypes.NameIdentifier)
```

Database queries are then filtered using that user ID.

This prevents one user from viewing, updating, or deleting another user’s private data.

---

### Owned Cards

Owned cards represent cards in a user’s personal collection.

Each owned-card record links:

- One application user
- One card from the shared catalogue

Users can track information such as:

- Quantity owned
- Condition
- Master collection status
- Duplicate status
- Grading candidate status
- Trade availability
- Messaging availability
- Private notes

---

### Wishlist Items

Wishlist items represent cards that a user wants to obtain.

Each wishlist item belongs to one user and links to one card in the shared catalogue.

Users can track:

- Wanted quantity
- Priority
- Reason wanted
- Raw or graded preference
- Preferred grading company
- Trade interest
- Notes

---

### Collection Products

Collection products represent sealed products or other collection items, such as:

- Booster boxes
- Starter decks
- Kickstarter or pledge items
- Retail products
- Accessories

These records are private because they may contain information such as:

- Purchase cost
- Shipping cost
- VAT cost
- Estimated value
- Minimum sell price
- Storage location
- Private notes

---

## Authentication and Authorization

Authentication and authorization are handled separately.

### Authentication

Authentication answers:

> Who is making the request?

The API validates the JWT:

- Signature
- Issuer
- Audience
- Lifetime
- Signing key

Protected endpoints use:

```csharp
[Authorize]
```

### Authorization

Authorization answers:

> Is this user allowed to perform this action?

The project currently uses two authorization patterns:

1. **Role checks** for Admin catalogue actions
2. **Ownership checks** for private user data

For example, a user may only update a collection product when both its record ID and `UserId` match:

```csharp
product.Id == id &&
product.UserId == loggedInUserId
```

Requests for another user’s private records return:

```http
404 Not Found
```

Using `404 Not Found` avoids confirming whether another user’s private record exists.

---

## API Endpoint Overview

### Authentication

```http
POST /api/Auth/register
POST /api/Auth/login
GET  /api/Auth/me
```

### Cards

```http
GET    /api/Cards
GET    /api/Cards/{id}
POST   /api/Cards
PUT    /api/Cards/{id}
DELETE /api/Cards/{id}
```

`POST`, `PUT`, and `DELETE` require the `Admin` role.

### Owned Cards

```http
GET    /api/OwnedCards
GET    /api/OwnedCards/{id}
POST   /api/OwnedCards
PUT    /api/OwnedCards/{id}
DELETE /api/OwnedCards/{id}
```

All Owned Cards endpoints require authentication and operate only on the logged-in user’s records.

### Wishlist Items

```http
GET    /api/WishListItem
GET    /api/WishListItem/{id}
POST   /api/WishListItem
PUT    /api/WishListItem/{id}
DELETE /api/WishListItem/{id}
```

All Wishlist Item endpoints require authentication and operate only on the logged-in user’s records.

### Collection Products

```http
GET    /api/CollectionProducts
GET    /api/CollectionProducts/{id}
POST   /api/CollectionProducts
PUT    /api/CollectionProducts/{id}
DELETE /api/CollectionProducts/{id}
```

All Collection Product endpoints require authentication and operate only on the logged-in user’s records.

---

## Project Structure

```text
CyberpunkTcgVault/
│
├── CyberpunkTcgVault.Api/
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Migrations/
│   ├── Models/
│   ├── Program.cs
│   └── appsettings.json
│
├── CyberpunkTcgVault.Api.Tests/
│   ├── Controllers/
│   └── TestHelpers/
│
├── CyberpunkTcgVault.Web/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/
│   │   │   │   └── home/
│   │   │   ├── app.config.ts
│   │   │   ├── app.html
│   │   │   ├── app.routes.ts
│   │   │   └── app.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
│
├── docs/
│   └── screenshots/
│
├── README.md
└── CyberpunkTcgVault.sln
```

The `docs/screenshots` directory contains project evidence and development screenshots.

The images are kept separately from this README so that the main documentation remains focused and easy to read.

---

## Prerequisites

To run the complete project locally, install:

- .NET 8 SDK
- Node.js LTS
- npm
- Angular CLI
- SQL Server LocalDB or SQL Server
- SQL Server Management Studio, optional but recommended
- Git
- Entity Framework Core command-line tools

Install the EF Core command-line tool when required:

```bash
dotnet tool install --global dotnet-ef
```

If it is already installed, update it with:

```bash
dotnet tool update --global dotnet-ef
```

Install Angular CLI when required:

```bash
npm install --global @angular/cli
```

---

## Clone the Repository

```bash
git clone https://github.com/Grit-Dev/CyberpunkTcgVault.git
cd CyberpunkTcgVault
```

Restore the backend packages:

```bash
dotnet restore
```

Build the solution:

```bash
dotnet build
```

Run the backend tests:

```bash
dotnet test
```

---

## Local Database Configuration

The development database uses SQL Server LocalDB.

Example connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=CyberpunkTcgVaultDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

The local database name is:

```text
CyberpunkTcgVaultDb
```

The LocalDB server name is:

```text
(localdb)\MSSQLLocalDB
```

Do not commit production database credentials or private connection strings.

---

## JWT Configuration

The API requires a private JWT signing key.

The signing key must not be stored in `appsettings.json` or committed to GitHub.

From the API project folder, initialise .NET User Secrets if necessary:

```bash
cd CyberpunkTcgVault.Api
dotnet user-secrets init
```

Set a local JWT key:

```bash
dotnet user-secrets set "Jwt:Key" "replace-this-with-a-long-private-development-key"
```

A random Base64 key can also be generated in PowerShell:

```powershell
$key = [Convert]::ToBase64String(
    (1..32 | ForEach-Object { Get-Random -Maximum 256 })
)

dotnet user-secrets set "Jwt:Key" $key
```

The issuer and audience may be stored in `appsettings.json`:

```json
{
  "Jwt": {
    "Issuer": "CyberpunkTcgVault.Api",
    "Audience": "CyberpunkTcgVault.Client"
  }
}
```

Never add the real JWT signing key to GitHub.

---

## Create the Database

From the repository root, apply the Entity Framework Core migrations:

```bash
dotnet ef database update --project CyberpunkTcgVault.Api
```

Visual Studio Package Manager Console can also be used:

```powershell
Update-Database
```

This creates or updates:

```text
CyberpunkTcgVaultDb
```

---

## Run the API

From the repository root:

```bash
dotnet run --project CyberpunkTcgVault.Api
```

The API starts on the local URL displayed in the terminal.

When running in the Development environment, Swagger is available at:

```text
https://localhost:<port>/swagger
```

Use the actual port displayed when the API starts.

---

## Run the Angular Frontend

Open a second terminal and move into the Angular project:

```bash
cd CyberpunkTcgVault.Web
npm install
ng serve --open
```

The Angular development server normally opens at:

```text
http://localhost:4200
```

Keep the terminal running while developing.

Angular automatically refreshes the browser when frontend files are saved.

If port `4200` is already in use, another Angular development server may already be running.

Stop the existing server from its original terminal with:

```text
Ctrl+C
```

Alternatively, start the application using another port:

```bash
ng serve --open --port 4201
```

The current homepage is an initial visual prototype.

Its presentation-only values and controls will be replaced as real routes, services, forms, and API integrations are implemented.

---

## Using the API Through Swagger

### 1. Register a User

Open:

```http
POST /api/Auth/register
```

Example request:

```json
{
  "userName": "example-user",
  "password": "Password123!"
}
```

A new account is created with the default role:

```text
User
```

### 2. Log In

Open:

```http
POST /api/Auth/login
```

Example request:

```json
{
  "userName": "example-user",
  "password": "Password123!"
}
```

Example response:

```json
{
  "token": "eyJhbGciOi..."
}
```

### 3. Authorize Swagger

Click the **Authorize** button in Swagger.

Copy only the JWT value:

```text
eyJhbGciOi...
```

Do not include:

- Quotation marks
- The JSON property name
- The word `Bearer`

Swagger adds the `Bearer` prefix automatically.

### 4. Test the Current User

Call:

```http
GET /api/Auth/me
```

A valid token should return the current user’s ID, username, and role.

Without a valid token, the API returns:

```http
401 Unauthorized
```

### 5. Use Protected Endpoints

After authorizing Swagger, users can manage their own:

- Owned cards
- Wishlist items
- Collection products

The API automatically assigns records to the authenticated user’s ID.

---

## Testing Admin Access Locally

New accounts receive the default role:

```text
User
```

For local development, an account can be promoted manually through SQL Server:

```sql
UPDATE dbo.Users
SET Role = 'Admin'
WHERE UserName = 'example-user';
```

After changing the role, log in again.

A fresh JWT is required because the role is stored inside the token when it is generated.

Expected behaviour:

| Request | Authentication | Expected result |
|---|---|---:|
| `GET /api/Cards` | None | `200 OK` |
| `POST /api/Cards` | None | `401 Unauthorized` |
| `POST /api/Cards` | User token | `403 Forbidden` |
| `POST /api/Cards` | Admin token | `201 Created` |

---

## Running the Tests

Run all backend tests from the repository root:

```bash
dotnet test
```

The project currently includes 56 passing automated tests covering:

- Card controller behaviour
- Owned-card ownership
- Wishlist-item ownership
- Collection-product ownership
- Cross-user access prevention
- User registration
- Duplicate username handling
- Password hashing
- Successful login
- Unsuccessful login
- JWT generation
- JWT user ID claims
- JWT username claims
- JWT role claims
- Protected `/api/Auth/me` behaviour
- Role-based Admin access

The controller tests use an EF Core InMemory database.

Authentication claims are added manually to direct controller tests because direct controller tests do not execute the complete ASP.NET authentication middleware pipeline.

Frontend tests will be expanded as Angular components, forms, services, and authentication behaviour are introduced.

---

## Security Decisions

The project demonstrates the following security practices:

- Passwords are hashed rather than stored as plain text
- The JWT signing key is stored outside source control
- JWT issuer, audience, signature, and expiry are validated
- Protected endpoints require authentication
- Admin catalogue actions require the `Admin` role
- User-owned database queries are filtered by the authenticated user ID
- The frontend is not trusted to provide its own `UserId`
- Request DTOs prevent unwanted fields from being posted
- Response DTOs control what data is returned
- Private collection information is not exposed through public endpoints
- Cross-user record access is prevented

The Angular frontend may display authentication state and Admin controls, but it is not treated as a security boundary.

The API remains responsible for enforcing:

- Authentication
- Authorization
- Roles
- Ownership
- Data validation

This project is a portfolio and learning application.

A larger production system would require additional controls such as:

- Refresh-token handling
- Account recovery
- Rate limiting
- Email verification
- Audit logging
- A complete role-management process
- Production secrets management
- Additional monitoring and logging

---

## AI-Assisted Development

AI-assisted development tools are used selectively during the project.

The initial Angular homepage visual prototype was drafted with AI assistance to establish a polished design direction while the underlying Angular application is built incrementally.

AI assistance may be used for:

- Visual prototyping
- Implementation suggestions
- Code review
- Accessibility suggestions
- Debugging support
- Identifying duplicated styles
- Suggesting component boundaries
- Repetitive implementation tasks
- Explaining unfamiliar code

AI tools are not treated as a replacement for understanding the application.

Architecture decisions, backend security behaviour, testing, validation, Git history, and all final committed code changes are reviewed and owned by the author.

OpenAI Codex may also be introduced selectively for repository review, accessibility checks, testing suggestions, and controlled implementation tasks.

Codex is a development tool rather than an application dependency. Any Codex-generated changes must be reviewed, tested, and understood before being committed.

---

## Design and Asset Policy

The frontend uses an original visual direction built with:

- HTML
- SCSS
- CSS gradients
- Typography
- Reusable interface patterns

The project will not rely on copyrighted game artwork, logos, music, or other protected media.

Any future visual assets should be:

- Original
- Properly licensed
- Royalty-free
- Clearly attributed when the licence requires attribution

The homepage and wider visual design may change significantly as the application grows.

---

## Roadmap

## Backend Improvements Planned

As the application grows, some backend areas will be refactored to keep responsibilities separated and maintainable.

Planned improvements include:

- Introduce a CardService layer when catalogue functionality grows further.
- Move complex catalogue queries and business rules away from controllers.
- Add additional unit tests around card searching and filtering behaviour.
- Introduce pagination for larger card catalogues.
- Improve API response consistency across all endpoints.

The current implementation intentionally keeps the API simple while the feature set is still manageable. Architecture will evolve as complexity increases.

### Completed Backend MVP

- ASP.NET Core Web API
- SQL Server and EF Core integration
- Database migrations
- Shared card catalogue
- User registration
- Password hashing
- User login
- JWT authentication
- JWT user and role claims
- Protected current-user endpoint
- User-owned Owned Cards
- User-owned Wishlist Items
- User-owned Collection Products
- Role-based Admin card management
- Request and response DTOs
- Swagger/OpenAPI documentation
- Automated controller and authentication tests
- Cross-user access prevention

### Angular Frontend — In Progress

- Angular project scaffold
- Angular routing
- Initial Home component
- Initial visual homepage prototype
- Global styling foundation
- Shared application layout
- Reusable header and footer components
- Register page
- Login page
- Current-user `/me` check
- Authentication service
- HTTP configuration
- Card catalogue page
- My Collection page
- My Wishlist page
- My Products page
- Logout flow
- Route guards
- Admin-only card-management controls
- Responsive and accessible layouts
- Frontend tests

### Longer-Term Development

These are possible expansions rather than requirements for the initial portfolio MVP:

- Public user profiles
- Wishlist visibility settings
- Trading offers
- Private messaging
- Deck builder
- Azure deployment
- Progressive Web App support
- Possible Ionic and Capacitor mobile packaging
- AI-assisted collection features

---

## Development Approach

The project is being developed incrementally.

The current development approach is:

1. Establish a secure backend API.
2. Add automated tests around security and user ownership.
3. Create a small Angular application.
4. Establish an initial visual direction.
5. Return to Angular fundamentals.
6. Split the prototype into reusable components.
7. Implement authentication and API services.
8. Replace placeholders with real backend data.
9. Add loading, error, validation, and empty states.
10. Add frontend tests and accessibility improvements.

The initial homepage is therefore a starting template rather than a finished frontend.

Its purpose is to provide a visual target while the real application is implemented step by step.

---

## Related Learning Work

Alongside Cyberpunk TCG Vault, I am building smaller projects to reinforce the skills demonstrated here.

The related learning plan includes:

- C# coding challenges for fundamentals and problem-solving
- A `.NET API Gym` repository for focused API practice
- Smaller exercises covering controllers
- DTO exercises
- EF Core relationship exercises
- Authentication exercises
- JWT exercises
- Role-based authorization exercises
- Ownership-security exercises
- Automated testing exercises

Cyberpunk TCG Vault is the main portfolio application.

The smaller repositories are used for repetition, experimentation, and deeper understanding.

---

## Author

Built by **Paul McGinley** as a C#/.NET and Angular portfolio project.