# Saavnify

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat&logo=bun&logoColor=white)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-black?style=flat&logo=hono&logoColor=white)](https://hono.dev/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=flat&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![CI/CD](https://github.com/neeraj779/Saavnify/actions/workflows/deploy.yml/badge.svg)](https://github.com/neeraj779/Saavnify/actions/workflows/deploy.yml)

</div>

Saavnify is a comprehensive RESTful API that provides access to music data, including songs, albums, artists, playlists, and search functionality. It serves as a wrapper around Jiosaavn's API.
## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Architecture](#-architecture)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Deployment](#deployment)
- [API Documentation](#-api-documentation)
  - [Endpoints](#endpoints)
  - [Examples](#examples)
- [Contributing](#-contributing)
- [Code of Conduct](#-code-of-conduct)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 🚀 Features

- **Music Search**: Search for songs, albums, artists, and playlists
- **Song Management**: Get song details, lyrics, and recommendations
- **Artist Information**: Access artist details, songs, and albums
- **Album Details**: Retrieve album information and tracks
- **Playlist Access**: Get playlist details and songs
- **Interactive API Documentation**: Powered by Scalar
- **Type-Safe**: Built with TypeScript for robust type checking
- **Validation**: Request validation using Zod
- **Error Handling**: Comprehensive error handling system
- **CI/CD**: Automated deployment using GitHub Actions
- **Serverless**: Deployed on Cloudflare Workers

## 🌐 Demo

Experience the API documentation at [saavnify.processx.workers.dev](https://saavnify.processx.workers.dev) (replace with your actual deployment URL).

## 🏗 Architecture

Saavnify follows a clean architecture design, separating concerns into different layers:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic and interact with external APIs
- **Mappers**: Transform data between different formats
- **Schemas**: Define data structures and validation rules
- **Types**: Define TypeScript types for the application
- **Middleware**: Handle cross-cutting concerns like error handling and authentication
- **Utils**: Provide utility functions for common operations

The application is built on top of Hono, a lightweight web framework, and uses Zod for schema validation. It's designed to be deployed on serverless platforms like Cloudflare Workers.

## 🛠️ Tech Stack

- **Runtime and Package Manager**
  - [Bun](https://bun.sh/): Fast JavaScript runtime and package manager

- **Framework and Libraries**
  - [Hono](https://hono.dev/): Lightweight web framework
  - [Zod](https://zod.dev/): Schema validation
  - [Scalar API Reference](https://scalar.com/): Interactive API documentation

- **Development Tools**
  - [TypeScript](https://www.typescriptlang.org/): Type-safe JavaScript
  - [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/): Code quality and formatting
  - [Husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/okonet/lint-staged): Git hooks
  - [Commitlint](https://commitlint.js.org/): Commit message linting

- **Deployment**
  - [Cloudflare Workers](https://workers.cloudflare.com/): Serverless platform
  - [Wrangler](https://developers.cloudflare.com/workers/wrangler/): Cloudflare Workers CLI
  - [GitHub Actions](https://github.com/features/actions): CI/CD

## 📂 Project Structure

```
saavnify/
├── .github/                   # GitHub configuration
│   └── workflows/             # GitHub Actions workflows
│       └── deploy.yml         # Deployment workflow
├── .husky/                    # Git hooks
│   ├── _/                     # Husky scripts
│   ├── commit-msg             # Commit message hook
│   └── pre-commit             # Pre-commit hook
├── .vscode/                   # VS Code settings
├── public/                    # Static assets
├── src/                       # Source code
│   ├── constants/             # Application constants
│   │   ├── endpoint.constant.ts  # API endpoints
│   │   └── error.constant.ts     # Error messages
│   ├── controllers/           # Request handlers
│   │   ├── album.controller.ts
│   │   ├── artist.controller.ts
│   │   ├── playlist.controller.ts
│   │   ├── search.controller.ts
│   │   └── song.controller.ts
│   ├── mappers/               # Data transformers
│   │   ├── album.mapper.ts
│   │   ├── artist.mapper.ts
│   │   ├── playlist.mapper.ts
│   │   ├── search.mapper.ts
│   │   └── song.mapper.ts
│   ├── middleware/            # HTTP middleware
│   │   └── error.middleware.ts
│   ├── routes/                # API routes
│   │   ├── album.routes.ts
│   │   ├── api-doc.routes.ts
│   │   ├── artist.routes.ts
│   │   ├── index.ts
│   │   ├── playlist.routes.ts
│   │   ├── search.routes.ts
│   │   └── song.routes.ts
│   ├── schemas/               # Data schemas
│   │   ├── album.schema.ts
│   │   ├── artist/
│   │   ├── download.schema.ts
│   │   ├── playlist.schema.ts
│   │   ├── search/
│   │   ├── song/
│   │   └── validation/
│   ├── services/              # Business logic
│   │   ├── album.service.ts
│   │   ├── artist.service.ts
│   │   ├── playlist.service.ts
│   │   ├── search.service.ts
│   │   └── song.service.ts
│   ├── types/                 # TypeScript types
│   │   ├── artist.types.ts
│   │   ├── error.types.ts
│   │   ├── link.type.ts
│   │   ├── playlist.types.ts
│   │   ├── search.types.ts
│   │   └── song.types.ts
│   ├── utils/                 # Utility functions
│   │   ├── fetch.util.ts
│   │   └── link.util.ts
│   └── index.ts               # Application entry point
├── .eslintrc.js               # ESLint configuration
├── .gitignore                 # Git ignore rules
├── .prettierrc                # Prettier configuration
├── bun.lock                   # Bun lock file
├── commitlint.config.js       # Commitlint configuration
├── esbuild.config.mjs         # ESBuild configuration
├── package.json               # Project dependencies and scripts
├── README.md                  # Project documentation
├── tsconfig.json              # TypeScript configuration
└── wrangler.jsonc             # Cloudflare Workers configuration
```

## 🚦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0
- [Node.js](https://nodejs.org/) >= 18.x (optional, for some tooling)
- [Cloudflare](https://cloudflare.com/) account (for deployment)

### Installation

1. Clone the repository

```sh
git clone https://github.com/username/saavnify.git
cd saavnify
```

2. Install dependencies

```sh
bun install
```


### Development

Start the development server:

```sh
# Run with Bun (hot module reloading)
bun run dev

# Or with Wrangler (Cloudflare Workers local development)
bun run dev:wrangler
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the API documentation.

### Code Quality

The project includes several tools to ensure code quality:

```sh
# Lint code
bun run lint

# Fix linting issues
bun run lint:fix

# Format code
bun run format

# Type check
bun run typecheck

# Run all validations
bun run validate
```

### Deployment

The project can be deployed to Cloudflare Workers:

```sh
# Build the application
bun run build

# Deploy with Wrangler
bun run deploy:wrangler
```

Alternatively, push to the `main` branch to trigger the GitHub Actions workflow that will automatically deploy to Cloudflare Workers.

## 📚 API Documentation

The API documentation is available at the root endpoint `/` when running the application. It provides interactive documentation for all available endpoints using Scalar API Reference.

### Endpoints

#### Search

- `GET /api/v1/search` - Search all categories
- `GET /api/v1/search/songs` - Search for songs
- `GET /api/v1/search/albums` - Search for albums
- `GET /api/v1/search/artists` - Search for artists
- `GET /api/v1/search/playlists` - Search for playlists

#### Songs

- `GET /api/v1/songs` - Get songs by IDs or link
- `GET /api/v1/songs/:id` - Get song by ID
- `GET /api/v1/songs/:id/lyrics` - Get song lyrics
- `GET /api/v1/songs/:id/suggestions` - Get song suggestions

#### Albums

- `GET /api/v1/albums/:id` - Get album by ID
- `GET /api/v1/albums` - Get album by link

#### Artists

- `GET /api/v1/artists/:id` - Get artist by ID
- `GET /api/v1/artists` - Get artist by link
- `GET /api/v1/artists/:id/songs` - Get artist songs
- `GET /api/v1/artists/:id/albums` - Get artist albums

#### Playlists

- `GET /api/v1/playlists/:id` - Get playlist by ID
- `GET /api/v1/playlists` - Get playlist by link

### Examples

#### Search for a song

```sh
curl -X GET "https://saavnify.processx.workers.dev/api/v1/search/songs?query=shape%20of%20you&limit=5"
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "abcdef12",
      "name": "Shape of You",
      "album": {
        "id": "album123",
        "name": "÷ (Divide)"
      },
      "artists": [
        {
          "id": "artist456",
          "name": "Ed Sheeran"
        }
      ],
      "duration": "3:54",
      "image": "https://example.com/image.jpg",
      "url": "https://example.com/song.mp3"
    },
    // More songs...
  ]
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure your code follows the project's style guidelines and passes all tests.

### Commit Guidelines

This project uses commitlint to enforce consistent commit messages. Please follow the conventional commit format:

```
<type>(<scope>): <description>
```

Types include:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools

### Branch Naming Convention

- `feat/` - Features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or changes
- `chore/` - Chores and improvements to auxiliary tools

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
