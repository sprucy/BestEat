import { useState, useEffect } from 'react'
import './App.css'
import { Restaurant,Cuisine } from './types'
import { API_CONFIG } from './config'
import MapComponent from './components/MapComponent'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import SearchIcon from '@mui/icons-material/Search';
import GppBadIcon from '@mui/icons-material/GppBad';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Checkbox } from '@mui/material';
import CheckboxIcon from '@mui/icons-material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Import React's state and side-effect hooks
function App() {
  const [postcode, setPostcode] = useState('')
  const [oldPostcode, setOldPostcode] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [rankedRestaurants, setRankedRestaurants] = useState<Restaurant[]>([])
  const [cuisines, setCuisines] = useState<Cuisine[]>([])
  const [loading, setLoading] = useState(false)
  const [anyCuisines, setAnyCuisines] = useState(true);
  const [error, setError] = useState('')
  // Define the state in which the Customer Preferences dialog is open, initially false.
  const [customerPreferenceDialogOpen, setCustomerPreferenceDialogOpen] = useState(false);
  const [minStar, setMinStar] = useState<number>(0);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckboxIcon fontSize="small" />;


  const fetchRestaurants = async () => {
    // Clear the error message
    setError('')
    // Trying to get restaurant data
    try {
      const response = await fetch(`/api${API_CONFIG.DISCOVERY_ENDPOINT}${postcode}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      // Throw an error if the response status code is not 200
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      // Parsing the response data
      const data = await response.json();
      // Extract the list of dishes 
      // Specify the type for the item to avoid the implicit any type
      const cuisinesAll = data.metaData?.cuisineDetails?.map((item: { name: string }) => item.name) || [];
      setCuisines(cuisinesAll)
      // Extract restaurant listings
      const restaurantsAll = data.restaurants || [];
      await new Promise<void>((resolve) => {
        setRestaurants(restaurantsAll);
        setLoading(true);
        setOldPostcode(postcode);
        resolve();
      });

      return restaurantsAll;
    } catch (err) {
      // If an error occurs, set the error message
      setError(err instanceof Error ? `Request failed: ${err.message}` : 'Failed to obtain data. Please try again.')
      setLoading(false)
      return [];
    }
  }
  // Define the function that ranks restaurants
  const rankRestaurants = async () => {
    // If the zip code is empty, return it directly
    if (!postcode) return
    // Validate UK zip code format
    const ukPostcodeRegex = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/;
    // If the zip code format is not legal, set error message and return
    if (!ukPostcodeRegex.test(postcode)) {
      setError('Please enter a valid UK postal code format.');
      return;
    }
    let fetchedRestaurants: Restaurant[] = [];
    if (!loading || oldPostcode !== postcode) {
      fetchedRestaurants = await fetchRestaurants()
    }
    else {
      fetchedRestaurants = restaurants;
    }  // Ensure that the sorting is done after the data has been loaded
    if (fetchedRestaurants.length > 0) {
      // Sort the restaurant list by star rating and number of ratings in descending order.
      const sorted = fetchedRestaurants
        .sort((a: Restaurant, b: Restaurant) => {
          if (b.rating.starRating !== a.rating.starRating) {
            return b.rating.starRating - a.rating.starRating;
          }
          return b.rating.count - a.rating.count;
        })
        .slice(0, 10)
      // Print a list of ranked restaurants
      console.log('Sorted restaurants:', sorted);
      // Set the status of the restaurant list after ranking
      setRankedRestaurants(sorted)
    }
  }  
  const anyCuisinesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnyCuisines(event.target.checked);
  };
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  
  const handleFavoriteCuisines = () => {
    if (!anyCuisines) {
      const selected = document.querySelectorAll('.MuiAutocomplete-root .MuiChip-root');
      const selectedValues = Array.from(selected).map(chip => chip.textContent);
      // Filter out null values in selectedValues
      const validSelectedValues = selectedValues.filter((value): value is string => value !== null);
      setSelectedCuisines(validSelectedValues);
      
      console.log('Selected cuisines:', selectedValues);
      
      // Filtering out restaurants that intersect with the chosen cuisine
      const filteredRestaurants = restaurants.filter(restaurant => {
        const restaurantCuisines = restaurant.cuisines.map(c => c.name);
        return restaurant.rating.starRating >= minStar && 
               selectedValues.some(selectedCuisine => 
                 typeof selectedCuisine === 'string' && restaurantCuisines.includes(selectedCuisine)
               );
      });
      
      // Sort the filtered restaurants, first by star rating in descending order, then by number of reviews in descending order.
      const sorted = filteredRestaurants
        .sort((a: Restaurant, b: Restaurant) => {
          if (b.rating.starRating !== a.rating.starRating) {
            return b.rating.starRating - a.rating.starRating;
          }
          return b.rating.count - a.rating.count;
        })
        .slice(0, 10);
      
      setRankedRestaurants(sorted);
    }
    else {
      setRankedRestaurants(restaurants.slice(0, 10));
    }
    setCustomerPreferenceDialogOpen(false);
  };

  return (
    <div className="app-container">
      <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <img src="/banner.jpg" alt="Restaurant banner" className="banner" />
        <h1>Best Restaurant Recommendations</h1>

      </div>
      <div className="search-container">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Input British postal code"
        />
        <Button 
          variant="contained" 
          color="primary" 
          endIcon={<SearchIcon />}
          onClick={rankRestaurants} 
          disabled={!postcode}
        >
          Query
        </Button>
        <Fab 
          size="medium"
          variant="extended"
          color="primary"
          style={{ position: 'absolute', right: '16px' }}
          onClick={() => setCustomerPreferenceDialogOpen(true)}
          disabled={!loading}
          >
          <FavoriteIcon color="warning" sx={{ mr: 1 }} />
          Favorites
        </Fab>

      </div>
      
      <Dialog
        open={!!error}
        onClose={() => setError('')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="error">
             Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <GppBadIcon color="error"/> {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError('')} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={customerPreferenceDialogOpen}
        onClose={() => setCustomerPreferenceDialogOpen(false)}
        aria-labelledby="customer-preference-dialog-title"
        aria-describedby="customer-preference-dialog-description"
        PaperProps={{ style: { width: '500px' } }}
      >
        <DialogTitle id="customer-preference-dialog-title">
          Customer Favorites
        </DialogTitle>
        <DialogContent>

            <Typography id="non-linear-slider" gutterBottom>
              <b>Rating</b>・at least <span style={{color: '#1976d2'}}>{minStar.toFixed(1)}</span>&nbsp;⭐
            </Typography>
          <Box sx={{ width: 430, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '100px' }}>
            <Slider
              value={minStar}
              min={0}
              step={0.1}
              max={5.0}
              marks
              getAriaValueText={() => `${minStar.toFixed(1)}`}
              onChange={(event: Event, newValue: number) => {setMinStar(newValue)}}
              valueLabelDisplay="auto"
              aria-labelledby="discrete-slider"
            />
          </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="body2"
                onClick={() => setMinStar(0)}
                sx={{ cursor: 'pointer' }}
              >
                {0.0} min
              </Typography>
              <Typography
                variant="body2"
                onClick={() => setMinStar(5.0)}
                sx={{ cursor: 'pointer' }}
              >
                {5.0} max
              </Typography>
            </Box>      

          <Box sx={{ gap: '30px' }}>
          <FormControlLabel
            control={
              <Switch
                checked={anyCuisines}
                onChange={anyCuisinesChange}
              />
            }
            label="Any Cuisines"
          />
            <Autocomplete
              size="small"
              multiple
              disabled={anyCuisines}
              options={cuisines}
              disableCloseOnSelect
              value={selectedCuisines}
              onChange={(event, newValue) => {
                setSelectedCuisines(newValue);
              }}
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select cuisines"
                  placeholder="Cuisines"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomerPreferenceDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleFavoriteCuisines} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>      
      <div className="map-container">
        <MapComponent restaurants={rankedRestaurants} />
      </div>
    </div>
  )
}
// Export App Components
export default App


