# BestEat Restaurant Finder Application

## Project Overview
<<<<<<< HEAD
The previous Comprest project was a restaurant finder application developed with Python and Streamlit. To address potential performance issues under high concurrent user access, we decided to develop a new BestEat frontend application using React and TypeScript, following the Comprest model, to help users quickly find nearby restaurant information.

## Features
=======

The previous Comprest project was a restaurant finder application developed with Python and Streamlit. To address potential performance issues under high concurrent user access, we decided to develop a new BestEat frontend application using React and TypeScript, following the Comprest model, to help users quickly find nearby restaurant information.

## Features

>>>>>>> c9a77c55da47399c0802472e60829b3e7d6ad337
- Restaurant Search: Search restaurants by location or name
- Map Display: Visualize restaurant locations on a map
- Sorting: Sort by rating, distance and other criteria

## Technology Stack
<<<<<<< HEAD
=======

>>>>>>> c9a77c55da47399c0802472e60829b3e7d6ad337
- React
- TypeScript
- Vite
- Material UI
- CSS Modules

## Development Environment Requirements
<<<<<<< HEAD
=======

>>>>>>> c9a77c55da47399c0802472e60829b3e7d6ad337
- Node.js v16 or higher
- npm v8 or higher

## Installation Steps
<<<<<<< HEAD
=======

>>>>>>> c9a77c55da47399c0802472e60829b3e7d6ad337
1. Install dependencies: `npm install`
2. Start the project: `npm run dev`
3. Open browser and visit: `http://localhost:5173

## API Documentation
<<<<<<< HEAD
The application uses API service to fetch restaurant data:
=======

The application uses API service to fetch restaurant data:

>>>>>>> c9a77c55da47399c0802472e60829b3e7d6ad337
- API endpoint: `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}`
- Response format: JSON

## Deployment Guide
<<<<<<< HEAD
=======

>>>>>>> c9a77c55da47399c0802472e60829b3e7d6ad337
1. Build production version: `npm run build`
2. Deploy to static file server

## Directory Structure
<<<<<<< HEAD
=======

>>>>>>> c9a77c55da47399c0802472e60829b3e7d6ad337
```
best-eat/
├── public/                  # Static resources
│   ├── banner.jpg           # Website banner
│   └── logo.png            # Website logo
├── src/                     # Source code
│   ├── assets/             # Static assets
│   ├── components/         # React components
│   ├── App.css             # Global styles
│   ├── App.tsx             # Main application component
│   ├── index.css           # Entry styles
│   ├── main.tsx            # Application entry file
│   ├── types.ts            # TypeScript type definitions
│   └── vite-env.d.ts       # Vite environment variables
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML file
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## Key Files
<<<<<<< HEAD
=======

>>>>>>> c9a77c55da47399c0802472e60829b3e7d6ad337
- `src/main.tsx`: Application entry file, renders root component
- `src/App.tsx`: Main application component with core logic
- `src/types.ts`: Main TypeScript type definitions
- `vite.config.ts`: Vite build tool configuration
<<<<<<< HEAD
- `tsconfig.json`: TypeScript compiler options
=======
- `tsconfig.json`: TypeScript compiler options
>>>>>>> c9a77c55da47399c0802472e60829b3e7d6ad337
