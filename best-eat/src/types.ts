interface Cuisine {
    name: string;
    //uniqueName: string;
}
export interface Restaurant {
  name: string;
  cuisines: Cuisine[];
  rating: {
    starRating: number;
    count: number;
  };
  address: {
    firstLine: string;
    city: string;
    postalCode: string;
    location: {
      coordinates: [number, number];
    };
  };
  logoUrl: string;
}

export interface ApiResponse {
  restaurants: Restaurant[];
}