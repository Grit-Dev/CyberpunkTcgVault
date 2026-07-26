# Cyberpunk Vault

Cyberpunk Vault is a fan-made Cyberpunk TCG collection-management application built as a C#/.NET portfolio project.

The current backend allows users to register, log in, browse a shared card catalogue, and securely manage their own card collection, wishlist, and sealed-product collection.

The project demonstrates practical ASP.NET Core development, Entity Framework Core relationships, SQL Server persistence, JWT authentication, role-based authorization, user-ownership security, DTOs, migrations, Swagger documentation, and automated controller tests.

> **Disclaimer:** This is a fan-made collection project and is not affiliated with Cyberpunk TCG, WeirdCo, CD Projekt, Cyberpunk 2077, or any official partners.

---

## Project Status

The backend API has reached a secure MVP stage and is suitable as a backend portfolio project.

Completed areas include:

- User registration and login
- Password hashing
- JWT authentication
- Claims-based user identification
- Protected current-user endpoint
- Role-based Admin access
- User-owned private data
- EF Core relationships and migrations
- SQL Server persistence
- Request and response DTOs
- Swagger/OpenAPI testing
- Automated controller and authentication tests

The next planned stage is a small Angular and TypeScript frontend MVP.

Cyberpunk Vault remains an active project, but future development will continue incrementally alongside focused C# coding challenges and a separate .NET API Gym repository.

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

### Testing

- xUnit
- EF Core InMemory provider
- ASP.NET Core controller tests
- Authentication and authorization tests

### Planned Frontend

- Angular
- TypeScript
- Angular Router
- Angular services
- Reactive forms
- JWT-authenticated API requests
- Responsive UI
- Possible PWA support later

---

## Current Features

### Authentication

Users can register and log in through the API.

Passwords are never stored as plain text. ASP.NET Core password hashing is used to generate and verify password hashes.

After a successful login, the API returns a signed JWT containing claims for:

- User ID
- Username
- Role

The client sends this token with protected API requests.

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

This endpoint can be used by a frontend to:

- Restore login state after a page refresh
- Display the current username
- Determine whether Admin controls should be shown
- Confirm that the current JWT is still accepted by the API

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

Instead, the backend reads the logged-in user's ID from the JWT:

```csharp
User.FindFirstValue(ClaimTypes.NameIdentifier)
```

Database queries are then filtered using that user ID.

This prevents one user from viewing, updating, or deleting another user's private data.

---

### Owned Cards

Owned cards represent cards in a user's personal collection.

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

The API validates the JWT signature, issuer, audience, lifetime, and signing key.

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

Requests for another user's private records return `404 Not Found`.

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

All Owned Cards endpoints require authentication and operate only on the logged-in user's records.

### Wishlist Items

```http
GET    /api/WishListItem
GET    /api/WishListItem/{id}
POST   /api/WishListItem
PUT    /api/WishListItem/{id}
DELETE /api/WishListItem/{id}
```

All Wishlist Item endpoints require authentication and operate only on the logged-in user's records.

### Collection Products

```http
GET    /api/CollectionProducts
GET    /api/CollectionProducts/{id}
POST   /api/CollectionProducts
PUT    /api/CollectionProducts/{id}
DELETE /api/CollectionProducts/{id}
```

All Collection Product endpoints require authentication and operate only on the logged-in user's records.

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
├── docs/
│   └── screenshots/
│
├── README.md
└── CyberpunkTcgVault.sln
```

The `docs/screenshots` folder may be added when project screenshots are available.

---

## Prerequisites

To run the project locally, install:

- .NET 8 SDK
- SQL Server LocalDB or SQL Server
- SQL Server Management Studio, optional but recommended
- Git
- Entity Framework Core command-line tools

Install the EF Core command-line tool when required:

```bash
dotnet tool install --global dotnet-ef
```

If it is already installed, it can be updated with:

```bash
dotnet tool update --global dotnet-ef
```

---

## Clone the Repository

```bash
git clone https://github.com/Grit-Dev/CyberpunkTcgVault.git
cd CyberpunkTcgVault
```

Restore NuGet packages:

```bash
dotnet restore
```

Build the solution:

```bash
dotnet build
```

Run the tests:

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

The API should start on the local URL shown in the terminal.

When running in the Development environment, Swagger is available at:

```text
https://localhost:<port>/swagger
```

Use the actual port displayed when the API starts.

---

## Using the API Through Swagger

### 1. Register a user

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

---

### 2. Log in

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

---

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

---

### 4. Test the current user

Call:

```http
GET /api/Auth/me
```

A valid token should return the current user's ID, username, and role.

Without a valid token, the API returns:

```text
401 Unauthorized
```

---

### 5. Use protected endpoints

After authorizing Swagger, users can manage their own:

- Owned cards
- Wishlist items
- Collection products

The API automatically assigns the records to the authenticated user's ID.

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

Run all tests from the repository root:

```bash
dotnet test
```

The project includes tests covering:

- Card controller behaviour
- Owned-card ownership
- Wishlist-item ownership
- Collection-product ownership
- Cross-user access prevention
- User registration
- Duplicate username handling
- Password hashing
- Successful and unsuccessful login
- JWT generation
- JWT user ID claims
- JWT username claims
- JWT role claims
- Protected `/api/Auth/me` behaviour

The controller tests use an EF Core InMemory database.

Authentication claims are added manually to direct controller tests because direct controller tests do not execute the full ASP.NET authentication middleware pipeline.

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

This project is a portfolio and learning application. A larger production system would require additional controls such as refresh-token handling, account recovery, rate limiting, email verification, audit logging, and a more complete role-management process.

---

## Screenshots

Project screenshots will be stored in:

```text
docs/screenshots/
```

Planned screenshots include:

- Swagger endpoint overview
- Successful login response
- Protected `/api/Auth/me` response
- Passing automated tests
- Angular cards catalogue
- Angular collection page
- Angular wishlist page
- Angular products page

Example README image syntax:

```md
![Swagger API Overview](docs/screenshots/swagger-overview.png)
```

---

## Roadmap

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
- Swagger documentation
- Automated controller and authentication tests

### Next Planned Stage

- Angular and TypeScript frontend
- Register screen
- Login screen
- Current-user `/me` check
- Cards catalogue page
- My Collection page
- My Wishlist page
- My Products page
- Logout flow
- Admin-only card management controls
- Responsive page layout

### Longer-Term Development

These are planned expansions rather than requirements for the initial portfolio MVP:

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

## Related Learning Work

Alongside Cyberpunk Vault, I am building smaller projects to reinforce the skills demonstrated here.

The related learning plan includes:

- C# coding challenges for fundamentals and problem-solving
- A `.NET API Gym` repository for focused API practice
- Smaller exercises covering controllers, DTOs, EF Core relationships, authentication, JWTs, roles, ownership checks, and tests

Cyberpunk Vault is the main portfolio application, while the smaller repositories are used for repetition and deeper understanding.

---

## Author

Built by **Paul McGinley** as a C#/.NET portfolio project.