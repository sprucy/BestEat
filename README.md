# BestEat Restaurant Finder Application

## Project Overview
<<<<<<< HEAD
The previous Comprest project was a restaurant finder application developed with Python and Streamlit. To address potential performance issues under high concurrent user access, we decided to develop a new BestEat frontend application using React and TypeScript, following the Comprest model, to help users quickly find nearby restaurant information.

## Features
=======
=======
To address potential performance issues under high concurrent user access, we decided to develop a BestEat frontend application using React and TypeScript, following the Comprest model, to help users quickly find nearby restaurant information.

## Features
=======
>>>>>>> 276e23511711c9a05b954377c077add2155415d4
- Restaurant Search: Search restaurants by location or name
- Map Display: Visualize restaurant locations on a map
- Sorting: Sort by rating, distance, and other criteria

## Technology Stack
<<<<<<< HEAD
=======
=======
>>>>>>> 276e23511711c9a05b954377c077add2155415d4
- React
- TypeScript
- Vite
- Material UI
- CSS Modules

## Development Environment Requirements
<<<<<<< HEAD
=======
=======
>>>>>>> 276e23511711c9a05b954377c077add2155415d4
- Node.js v16 or higher
- npm v8 or higher

## Installation Steps
<<<<<<< HEAD
=======
=======
>>>>>>> 276e23511711c9a05b954377c077add2155415d4
1. Install dependencies: `npm install`
2. Start the project: `npm run dev`
3. Open browser and visit: `http://localhost:3000`

## API Documentation
The application uses API service to fetch restaurant data:
- API endpoint: `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}`
- Response format: JSON

## Deployment Guide
<<<<<<< HEAD
=======
=======
>>>>>>> 276e23511711c9a05b954377c077add2155415d4
1. Build production version: `npm run build`
2. Deploy to static file server

## Directory Structure
<<<<<<< HEAD
=======
=======
>>>>>>> 276e23511711c9a05b954377c077add2155415d4
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
=======

>>>>>>> 276e23511711c9a05b954377c077add2155415d4
- `src/main.tsx`: Application entry file, renders root component
- `src/App.tsx`: Main application component with core logic
- `src/types.ts`: Main TypeScript type definitions
- `vite.config.ts`: Vite build tool configuration
<<<<<<< HEAD
- `tsconfig.json`: TypeScript compiler options
=======
- `tsconfig.json`: TypeScript compiler options

## Version Information

### Version 1.0.0

- Initial release of the BestEat Restaurant Finder Application.
- Implemented the API data loading and map loading processes functions.
- Implemented UK postcode validation functions.
- Implemented the sorting algorithm for the top ten restaurants, sorting by `rating.starRating` and `rating.count`.
- Implemented the function to display the filtered restaurant information points on the map.
- Implemented the function to display restaurant information through map interaction, including name, address, rating, star rating, etc.

### Version 1.0.1

- Added version information and change logs to the README.md.
- Added text labels of restaurant names on the map, optimized the map interaction effect, and changed the color of the label points when the user clicks on the markers on the map.
- Optimized the code structure by setting the API from the configuration file, improving the readability and maintainability of the code.
- Fixed known bugs to ensure the stability and reliability of the application.

