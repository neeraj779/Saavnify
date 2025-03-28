# Saavnify

Saavnify is a comprehensive RESTful API that provides access to music data, including songs, albums, artists, playlists, and search functionality. It serves as a wrapper around Jiosaavn's API, making it easier to access and manipulate music data.

## 🚀 Features

- **Music Search**: Search for songs, albums, artists, and playlists
- **Song Management**: Get song details, lyrics, and recommendations
- **Artist Information**: Access artist details, songs, and albums
- **Album Details**: Retrieve album information and tracks
- **Playlist Access**: Get playlist details and songs
- **Interactive API Documentation**: Powered by Scalar

## 🛠️ Tech Stack

- **Bun**: JavaScript runtime & package manager
- **Hono**: Fast, lightweight web framework
- **TypeScript**: Type-safe JavaScript
- **Zod**: Schema validation
- **ESLint & Prettier**: Code quality and formatting
- **Husky & lint-staged**: Git hooks for code quality

## 🔧 Installation

```sh
# Install dependencies
bun install

# Run development server
bun run dev

# Or with Wrangler
bun run dev:wrangler
```

## 🚀 Deployment

```sh
# Build the application
bun run build

# Deploy with Wrangler (Cloudflare Workers)
bun run deploy:wrangler
```

## 📚 API Documentation

The API documentation is available at the root endpoint `/` when running the application. It provides interactive documentation for all available endpoints.

### API Endpoints

- **Search**: `/api/v1/search` - Search songs, albums, artists, and playlists
- **Songs**: `/api/v1/songs` - Get song details, lyrics, and suggestions
- **Albums**: `/api/v1/albums` - Access album information
- **Artists**: `/api/v1/artists` - Get artist details, songs, and albums
- **Playlists**: `/api/v1/playlists` - Access playlist information

## 🧪 Development

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

## 📝 Commit Guidelines

This project uses commitlint to enforce consistent commit messages. Please follow the conventional commit format:

```
<type>(<scope>): <description>
```

## 🔒 License

![License](https://img.shields.io/badge/License-MIT-blue.svg)
