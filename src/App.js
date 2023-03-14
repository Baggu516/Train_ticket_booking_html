import './App.css';
import * as React from 'react';
import {  useState,createContext} from "react";
import TotalTicket from "./components/TotalTicket"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TabContext } from '@material-ui/lab';
import TabList from '@mui/lab/TabList';
import DirectionsSubwayFilledIcon from '@mui/icons-material/DirectionsSubwayFilled';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Button, Container,TextField, Divider, IconButton, Toolbar, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from "@mui/icons-material/Refresh";
import Data from "./components/Data"
// import TotalTicket from "./components/TotalTicket"
import Model from './components/Model';
//..............Autocomplete........
import { Autocomplete } from '@mui/material';

//...............................

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
//.......................store.........
export const store=createContext()


//....................

function App() {
  //......................search.......................
  const [startCity, setStartCity] = React.useState('');
  const [endCity, setEndCity] = React.useState('');
  const [dateOfJourney, setDateOfJourney] = React.useState('');
  const handleStartCityChange = (event, value) => {
    setStartCity(value);
  };

  const handleEndCityChange = (event, value) => {
    setEndCity(value);
  };

  const handleDateOfJourneyChange = (event) => {
    setDateOfJourney(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // search()
    console.log({
      startCity,
      endCity,
      dateOfJourney,
    });
    // handle form submission here
    if(value==0){
      if(event){
        let sc= startCity
        let ec=endCity
        let dt=dateOfJourney.slice(0,10).split("-").reverse().join("-")
        var t=dateOfJourney.slice(-5,-3)
        if(t>=12){
          t=t-12
        }

        console.log(t)
        console.log(dt)
        let data = tata
        let filterData = data.filter((item)=>{
          return item.destination.toLowerCase().includes(ec.toLowerCase()) && item.source.toLowerCase().includes(sc.toLowerCase()) && item.date==dt && item.sourcetime.includes(t)
        })
        setSearchData([...filterData])
        return filterData
      }
      else{
        setSearchData([...tata])
        return tata
      }
    }
    else{
      if(event){
        let sc= startCity
        let ec=endCity
        let dt=dateOfJourney.slice(0,10).split("-").reverse().join("-")
        let filterData = bookedData.filter((item)=>{
          return item.destination.toLowerCase().includes(ec.toLowerCase()) && item.source.toLowerCase().includes(sc.toLowerCase()) && item.date==dt&& item.date==dt && item.sourcetime.includes(t)
        })
        setSearchData([...filterData])
        return filterData
      }
      else{
        setSearchData([...bookedData])
        return bookedData
      }
    }
  };
  //.................................................
  const inputRef = React.useRef(null);
  const [search,setSearch]=useState("")
  const [tata,setTata]=useState(Data?.rows)
  const [bookedData,setBookedData] = useState([])
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    inputRef.current.value = ""
    setValue(newValue);
  };
  const stored=(data)=>{
    setBookedData(data)
    setValue(1)
  }
  const [searchData,setSearchData] = useState([]);
  const [searchValue,setSearchValue] = useState();
  const Search=(event)=>{
    event?.preventDefault()
    if(value==0){
      if(event){
        let inputFilterData = event.target.value
        let data = tata
        let filterData = data.filter((item)=>{
          return item.endingtime.toLowerCase().includes(inputFilterData.toLowerCase()) || item.sourcetime.toLowerCase().includes(inputFilterData.toLowerCase()) || item.trainName.toLowerCase().includes(inputFilterData.toLowerCase()) || item.date.toLowerCase().includes(inputFilterData.toLowerCase()) ||item.source.toLowerCase().includes(inputFilterData.toLowerCase()) || item.destination.toLowerCase().includes(inputFilterData.toLowerCase()) || item.price.toString().includes(inputFilterData)
        })
        setSearchData([...filterData])
        return filterData
      }
      else{
        setSearchData([...tata])
        return tata
      }
    }
    else{
      if(event){
        let inputFilterData = event.target.value
        let filterData = bookedData.filter((item)=>{
          return item.phoneNumber.toLowerCase().includes(inputFilterData.toLowerCase()) || item.email.toLowerCase().includes(inputFilterData.toLowerCase()) || item.name.toLowerCase().includes(inputFilterData.toLowerCase()) || item.endingtime.toLowerCase().includes(inputFilterData.toLowerCase()) || item.sourcetime.toLowerCase().includes(inputFilterData.toLowerCase()) || item.trainName.toLowerCase().includes(inputFilterData.toLowerCase()) || item.date.toLowerCase().includes(inputFilterData.toLowerCase()) ||item.source.toLowerCase().includes(inputFilterData.toLowerCase()) || item.destination.toLowerCase().includes(inputFilterData.toLowerCase()) || item.price.toString().includes(inputFilterData)
        })
        setSearchData([...filterData])
        return filterData
      }
      else{
        setSearchData([...bookedData])
        return bookedData
      }
    }
  }
  

  React.useEffect(()=>{
    setTata(Data?.rows)
    Search()
    setStartCity(" ")
    setEndCity(" ")
    setStartCity(" ")
  },[value])
  
  return (
    <>
   
      <Container fixed sx={{hieght:'100vh',width:'85vw'}}>
      <Toolbar>
        <IconButton>
        <DirectionsSubwayFilledIcon/>
        </IconButton>
        <Typography variant='h6'>
          Railway Ticket Booking
        </Typography>
      </Toolbar>
      <Divider/>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <span style={{display:'flex'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Available Trains" {...a11yProps(0)} />
                <Tab label="Booked Tickets" {...a11yProps(1)} />
        </Tabs>
        <span  style={{position:'absolute',right:200}}>
        <IconButton type="button" aria-label="search" onClick={() => Search()}>
            {<RefreshIcon />}
        </IconButton>
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 ,paddingTop:2}}
            placeholder="Search For Data"
            value={searchValue} 
            inputRef={inputRef}
            style={{borderBottom:'1px solid black',width:'25vw'}}
            onChange={(e)=>e?Search(e):null}
          /> 

        </span>
     

        </span>
      </Box>
      <Box sx={{ width: '100%' }}> 
        
        <form onSubmit={handleSubmit}>
        {/* <form> */}
          <span style={{display:'flex',margin:"10px",marginLeft:"10px",width:"60%"}}>
            <span style={{width:"30%"}}>
            <Autocomplete
        className="inputFieldSearch"
        id="start-city"
        options={['vayalpadu',
        'hyderabad',
        'Rajam',
        'anathapur',
        'kalikiri',
        'renigunta',
        'madanapall',
        'kakinada',
        'chennai', ]}
        freeSolo
        onChange={handleStartCityChange}
        renderInput={(params) => (
          <TextField {...params} label="Start City" variant="outlined" />
        )}
      />
            </span>
         &nbsp;
       {/* </span> */}
      {/* <span style={{position:'absolute',right:50}}> */}
      <span style={{width:"30%"}}>
      <Autocomplete
        className="inputFieldSearch"
        id="end-city"
        options={["madanapalle",
        "vayalpadu",
        "madanapalle",
       "angallu",
        "Tamilnadu",
        "chittor",
        "Bangalore" ,
        "goa",
        "madhyapradesh",]}
        freeSolo
        onChange={handleEndCityChange}
        renderInput={(params) => (
          <TextField {...params} label="End City" variant="outlined" />
        )}
      />
      </span>&nbsp;
      {/* <span style={{position:'absolute',right:100}}> */}
      <TextField
        className="inputFieldSearch"
        id="date-of-journey"
        label="Date Of Journey"
        type="datetime-local"
        value={dateOfJourney}
        onChange={handleDateOfJourneyChange}
        InputLabelProps={{
          shrink: true,
        }}
      />&nbsp;
      {/* </span> */}
      {/* <span style={{position:'absolute',right:150}}> */}
      <Button type="submit" className='inputFieldSearch' variant="contained" color="primary">
        Search
      </Button>
      </span>
      
    </form>
      </Box>
      <TabPanel value={value}  index={0}>
        <TotalTicket value={value} availableData={searchData} bookedData={bookedData} stored={stored}/>
      </TabPanel>
      <TabPanel value={value}   index={1}>
        <TotalTicket value={value} bookedData={searchData} stored={stored} />
      </TabPanel>
    </Box>
    <span className="footer">
      <Model/>
    </span>
   
      </Container>
      <h1>hello</h1>
      <table>
        <thead>
             <tr>
             <th>ghjkkk
             </th>
             </tr>
        </thead>
      </table>
      
      {/* <store.Provider value={globaldata}>
        {/* <TotalTicket/> 
      </store.Provider> */}
    </>
  );
}

export default App;
