import {Stack, Grid, TextField, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import { fetchDonations } from '../../api/donations';
import { useDispatch } from 'react-redux';
import { fetchDonationsAction } from '../../store/slices/donation';

export const Search = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')

    useEffect(() => {
      if (searchTerm !== '' || selectedCategory !== '' || selectedLocation !== '') {
        const getData = setTimeout(() => {
          dispatch(fetchDonationsAction({ category: selectedCategory, item: searchTerm, location: selectedLocation, is_claimed: false }))
        }, 1000);
        return () => clearTimeout(getData)
      } else {
        dispatch(fetchDonationsAction({ category: selectedCategory, item: searchTerm, location: selectedLocation, is_claimed: false }))
      }
    }, [selectedCategory, searchTerm, selectedLocation])

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
  };

    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value)
    }

    const handleLocationChange = (e) => {
      setSelectedLocation(e.target.value)
    }

    const handleSearch = () => {
      fetchDonations(searchTerm)
      .then(data => console.log(data))
    }

    const debouncedCategoryChange = (e) => {
      debounceFunction(handleCategoryChange, 500)
    }

    const debouncedLocationChange = (e) => {
      debounceFunction(handleLocationChange, 500)
    }

    const debounceFunction = (func, delay) => {
      let timer;
      return function(...args) {
        const context = this;
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay)
      }
    }



    return (
      <Stack 
        direction="row" 
        spacing={{ xs: 1, sm: 2, md: 2 }}
        justifyContent="center"
        alignItems="center"
        my={2}
        >
          <Grid item xs={4}>
            <TextField
              label="Search"
              placeholder="Search here"
              className="inputField"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <IconButton color="primary" sx={{fontSize:{xs:"medium", sm:"large"}}}>
                    <SearchIcon fontSize="inherit"/>
                  </IconButton>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField size='small' label='Category' value={selectedCategory} onChange={handleCategoryChange} />
          </Grid>
          <Grid item>
            <TextField size='small' label='Location' value={selectedLocation} onChange={handleLocationChange}/>
          </Grid>
      </Stack>
      );
}
