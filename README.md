# Zon Dashboard

**Zon Dashboard** is a React.js project tailored for managing Zon's categories and products as part of the assessment. It focuses on essential functionalities, such as seeding the database with required categories upon project load. Notably, images are not stored in the database or any external storage; instead, they are locally saved within the Zon application's files, with image paths stored as strings.

## Technical Details

This project is predominantly built using TypeScript, React.js, and Tailwind CSS.

## Project Structure

The structure within the "src" folder illustrates the project's architecture. Designed as a minimally featured web application, the project lacks router integration. The root file, "App.js," serves as the only page within this Single Page Application (SPA) setup. Conditional rendering is employed to display four distinct pages. Ensure that the correct server path is defined at "configs/index.ts" with the export:

```typescript
export const REACT_APP_SERVER_URL = "http://localhost:3999";
```

## Requirements

The project is scaffolded using the "vite react-ts" template and is intended to function in a Node.js environment seamlessly.

## Getting Started

To get started:

1. Clone the Zon Dashboard repository.
2. Run `npm install`.
3. Execute `npm run dev` to run the Node.js Express server on port 5173.
