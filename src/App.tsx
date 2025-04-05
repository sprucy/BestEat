import { useState, useEffect } from 'react'
import './App.css'
import { Restaurant } from './types'
import MapComponent from './components/MapComponent'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import SearchIcon from '@mui/icons-material/Search';
import GppBadIcon from '@mui/icons-material/GppBad';


function App() {
  const [postcode, setPostcode] = useState('')
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchRestaurants = async () => {
    if (!postcode) return
    
    // 验证英国邮编格式
    const ukPostcodeRegex = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/;
    if (!ukPostcodeRegex.test(postcode)) {
      setError('Please enter a valid UK postal code format.');
      return;
    }
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/discovery/uk/restaurants/enriched/bypostcode/${postcode}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.restaurants) {
        const sorted = data.restaurants
          .sort((a: Restaurant, b: Restaurant) => {
            if (b.rating.starRating !== a.rating.starRating) {
              return b.rating.starRating - a.rating.starRating;
            }
            return b.rating.count - a.rating.count;
          })
          .slice(0, 10)
        console.log(sorted);     
        setRestaurants(sorted)
      }
    } catch (err) {
      setError(err instanceof Error ? `Request failed: ${err.message}` : 'Failed to obtain data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
          onClick={fetchRestaurants} 
          disabled={!postcode || loading}
        >
          {loading ? 'Querying...' : 'query'}
        </Button>
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
      
      <div className="map-container">
        <MapComponent restaurants={restaurants} />
      </div>
    </div>
  )
}

export default App
