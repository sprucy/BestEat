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

// 导入React的状态和副作用钩子
function App() {
  const [postcode, setPostcode] = useState('')
  const [oldPostcode, setOldPostcode] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [rankedRestaurants, setRankedRestaurants] = useState<Restaurant[]>([])
  const [cuisines, setCuisines] = useState<Cuisine[]>([])
  const [loading, setLoading] = useState(false)
  const [anyCuisines, setAnyCuisines] = useState(true);
  const [error, setError] = useState('')
  // 定义客户偏好对话框打开状态，初始为false
  const [customerPreferenceDialogOpen, setCustomerPreferenceDialogOpen] = useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckboxIcon fontSize="small" />;


  const fetchRestaurants = async () => {
    // 清空错误信息
    setError('')
    // 尝试获取餐厅数据
    try {
      const response = await fetch(`/api${API_CONFIG.DISCOVERY_ENDPOINT}${postcode}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      // 如果响应状态码不是200，抛出错误
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      // 解析响应数据
      const data = await response.json();
      // 提取菜系列表
      // 为item指定类型，避免隐式any类型
      const cuisinesAll = data.metaData?.cuisineDetails?.map((item: { name: string }) => item.name) || [];
      setCuisines(cuisinesAll)
      // 提取餐厅列表
      const restaurantsAll = data.restaurants || [];
      await new Promise<void>((resolve) => {
        setRestaurants(restaurantsAll);
        setLoading(true);
        setOldPostcode(postcode);
        resolve();
      });

      return restaurantsAll;
    } catch (err) {
      // 如果发生错误，设置错误信息
      setError(err instanceof Error ? `Request failed: ${err.message}` : 'Failed to obtain data. Please try again.')
      setLoading(false)
      return [];
    }
  }
  // 定义对餐厅进行排名的函数
  const rankRestaurants = async () => {
    // 如果邮政编码为空，直接返回
    if (!postcode) return
    // 验证英国邮编格式
    const ukPostcodeRegex = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/;
    // 如果邮编格式不合法，设置错误信息并返回
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
    }  // 确保在数据加载完成后再进行排序
    if (fetchedRestaurants.length > 0) {
      // 对餐厅列表进行排序，按星级评分和评分数量降序排列
      const sorted = fetchedRestaurants
        .sort((a: Restaurant, b: Restaurant) => {
          if (b.rating.starRating !== a.rating.starRating) {
            return b.rating.starRating - a.rating.starRating;
          }
          return b.rating.count - a.rating.count;
        })
        .slice(0, 10)
      // 打印排名后的餐厅列表
      console.log('Sorted restaurants:', sorted);
      // 设置排名后的餐厅列表状态
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
      // 过滤掉selectedValues中的null值
      const validSelectedValues = selectedValues.filter((value): value is string => value !== null);
      setSelectedCuisines(validSelectedValues);
      
      console.log('Selected cuisines:', selectedValues);
      
      // 筛选出与选择菜系有交集的餐厅
      const filteredRestaurants = restaurants.filter(restaurant => {
        const restaurantCuisines = restaurant.cuisines.map(c => c.name);
        return selectedValues.some(selectedCuisine => 
          typeof selectedCuisine === 'string' && restaurantCuisines.includes(selectedCuisine)
        );
      });
      
      // 对筛选后的餐厅进行排序，先按星级评分降序，再按评论数降序
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
// 导出App组件
export default App


