# AppWriter

A React + Vite blog app using Appwrite for authentication, database, and file storage.

## Prerequisites

- Node.js 18+
- npm (this project uses npm lockfile)
- An Appwrite project with a database, collection, and bucket

## Environment variables

Create a `.env` file in the project root:

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

## Install and run

```bash
npm install
npm run dev
```

## Useful scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint checks
