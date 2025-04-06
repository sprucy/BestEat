# BestEat Restaurant Finder Application

## Project Overview
To address potential performance issues under high concurrent user access, we decided to develop a new BestEat frontend application using React and TypeScript to help users quickly find nearby restaurant information.

## Features
- Restaurant Search: Search restaurants by location or name.
- Map Display: Visualize restaurant locations on a map.
- Sorting: Sort by rating, distance and other criteria.

## Technology Stack
- React
- TypeScript
- Vite
- Material UI
- CSS Modules

## Development Environment Requirements
- Node.js v16 or higher
- npm v8 or higher

## Installation Steps
1. Install dependencies: `npm install`
2. Start the project: `npm run dev`
3. Open browser and visit: `http://localhost:5173`

## API Documentation
The application uses API service to fetch restaurant data:
- API endpoint: `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}`
- Response format: JSON

## Deployment Guide
1. Build production version: `npm run build`
2. Deploy to static file server

## Directory Structure
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
- `src/main.tsx`: Application entry file, renders root component
- `src/App.tsx`: Main application component with core logic
- `src/types.ts`: Main TypeScript type definitions
- `vite.config.ts`: Vite build tool configuration
- `tsconfig.json`: TypeScript compiler options

## Version Information

<<<<<<< HEAD
### Version 1.0
=======
### Version 1.0.0

>>>>>>> 539e58e435dfd5430d35cb75728711ab07dc3aa6
- Initial release of the BestEat Restaurant Finder Application.
- Implemented the API data loading and map loading processes functions.
- Implemented UK postcode validation functions.
- Implemented the sorting algorithm for the top ten restaurants, sorting by `rating.starRating` and `rating.count`.
- Implemented the function to display the filtered restaurant information points on the map.
- Implemented the function to display restaurant information through map interaction, including name, address, rating, star rating, etc.

<<<<<<< HEAD
### Version 1.1
=======
### Version 1.0.1

>>>>>>> 539e58e435dfd5430d35cb75728711ab07dc3aa6
- Added version information and change logs to the README.md.
- Added text labels of restaurant names on the map, optimized the map interaction effect, and changed the color of the label points when the user clicks on the markers on the map.
- Optimized the code structure by setting the API from the configuration file, improving the readability and maintainability of the code.
- Fixed known bugs to ensure the stability and reliability of the application.

<<<<<<< HEAD
### Version 1.2
- Added cuisine preference filtering: the system filters all restaurants that offer the user's preferred dishes, sorts them by rating, and displays the top 10 on the map.
- Improved restaurant marker display on the map with ranking icons.
- Enhanced rating display by showing ratings with 1 decimal place.
- Improved restaurant icon interaction on the map with color change when clicked for better visual feedback.
=======
>>>>>>> 539e58e435dfd5430d35cb75728711ab07dc3aa6
