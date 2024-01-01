import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import BootcampCard from "../components/BootcampCard";
import Pagination from "../components/Pagination";
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Checkboxes from "../components/Checkboxes";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Styles for Material UI components~~~~~~~~~~~~~~~~~~~~~~~~

const useStyles = styled({
  root: {
    marginTop: 20,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginBottom: "1rem",
    padding: "13px",
  },
  filters: {
    padding: "0 1.5rem",
  },
  priceRangeInputs: {
    display: "flex",
    justifyContent: "space-between",
  },
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Main component for Bootcamps page~~~~~~~~~~~~~~~~~~~

const BootcampsPage = () => {

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Navigation hook~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const history = useNavigate();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Material UI Styles~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const classes = useStyles();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ React Router hook to get the current location~~~~~~~~~~~~~~~

  const location = useLocation();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~ Extracting query parameters from the location~~~~~~~~~~~~~~~~~~~~~~

  const params = location.search ? location.search : null;

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Component State~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~ State for price slider~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [sliderMax, setSliderMax] = useState(1000);
  const [priceRange, setPriceRange] = useState([25, 75]);
  const [priceOrder, setPriceOrder] = useState("descending");

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~ State for additional filters`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~ Add state for selected companies~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedPet, setSelectedPet] = useState([]);
  const [selectedbedroom, setselectedbedroom] = useState([]);
  const [selectedbathroom, setselectedbathroom] = useState([]);

  //~~~~~~~~~~~~~~~~~~~~ Function to update UI values based on fetched data`~~~~~~~~~~~~~~~~~~~~

  const upateUIValues = (uiValues) => {
    setSliderMax(uiValues.maxPrice);

    if (uiValues.filtering.price) {
      let priceFilter = uiValues.filtering.price;
      setPriceRange([Number(priceFilter.gte), Number(priceFilter.lte)]);
    }

    if (uiValues.sorting.price) {
      let priceSort = uiValues.sorting.price;
      setPriceOrder(priceSort);
    }
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~ Side effects using useEffect~~~~~~~~~~~~~~~~~~~~

  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      setLoading(true);
      try {
        let query;

        //~~~~~~~~~~~~~~~~~ Constructing the query based on filter, sorting, and current page~~~~~~~~

        if (params && !filter) {
          query = params;
        } else {
          query = filter;
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~ Include the checkbox filter in the query~~~~~~~~~~~~~~~~~~~~~~~

        if (selectedProperties.length > 0) {
          const propertyFilter = selectedProperties.map((property) => `propertytype=${property}`).join('&');
          query = query ? `${query}&${propertyFilter}` : `?${propertyFilter}`;
        }

        if (selectedPet.length > 0) {
          const petFilter = selectedPet.map((pet) => `pet=${pet}`).join('&');
          query = query ? `${query}&${petFilter}` : `?${petFilter}`;
        }
        if (selectedbedroom.length > 0) {
          const bedroomFilter = selectedbedroom.map((bedroom) => `bedroom=${bedroom}`).join('&');
          query = query ? `${query}&${bedroomFilter}` : `?${bedroomFilter}`;
        }

        if (selectedbathroom.length > 0) {
          const bathroomFilter = selectedbathroom.map((bathroom) => `bathroom=${bathroom}`).join('&');
          query = query ? `${query}&${bathroomFilter}` : `?${bathroomFilter}`;
        }
        console.log(query);

        if (sorting) {
          if (query.length === 0) {
            query = `?sort=${sorting}`;
          } else {
            query = query + "&sort=" + sorting;
          }
        }
        query = query.replace(/&?page=\d+/g, '');

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Adding the page parameter to the query~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        const pageSeparator = query ? '&' : '?';
        query += `${pageSeparator}page=${currentPage}`;

        //~~~~~~~~~~~~~~~~~~~~~` Fetching data from the server using axios~~~~~~~~~~~~~~~~~~~~~`

        const { data } = await axios({
          method: "GET",
          url: `/products${query}`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        //~~~~~~~~~~~~~~~~~~~~~~~~~ Updating component state with fetched data~~~~~~~~~~~~~~~~~~~~~~~~

        setBootcamps(data.data);
        setLoading(false);
        upateUIValues(data.uiValues);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.log(error.response.data);
      }
    };

    //~~~~~~~~~~~~~~~~~~~~~~~~ Fetch data when component mounts and when dependencies change~~~~~~~~~~~~~~

    fetchData();

    //~~~~~~~~~~~~~~~~~~~ Cleanup function to cancel ongoing axios requests~~~~~~~~~~~~~~~~~~~~~

    return () => cancel();
  }, [filter, params, sorting, sliderMax, currentPage, selectedProperties, selectedPet,
    selectedbedroom, selectedbathroom]);

  //~~~~~~~~~~~~~~~~~~~~~~~ Handlers for price input changes~~~~~~~~~~~~~~~~~~~~~~~

  const handlePriceInputChange = (e, type) => {
    let newRange;

    if (type === "lower") {
      newRange = [...priceRange];
      newRange[0] = Number(e.target.value);
      setPriceRange(newRange);
    }

    if (type === "upper") {
      newRange = [...priceRange];
      newRange[1] = Number(e.target.value);
      setPriceRange(newRange);
    }
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Handler for slider value commit`~~~~~~~~~~~~~~~~~~~

  const onSliderCommitHandler = (e, newValue) => {
    buildRangeFilter(newValue);
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~ Handler for textfield value commit`~~~~~~~~~~~~~~~~~~~~~~~~~~

  const onTextfieldCommitHandler = () => {
    buildRangeFilter(priceRange);
  };

  //~~~~~~~~~~~~~~~~~ Build range filter and update URL~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`;
    setFilter(urlFilter);
    history(urlFilter);
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Handler for sorting change~~~~~~~~~~~~~~~~~

  const handleSortChange = (e) => {
    setPriceOrder(e.target.value);

    if (e.target.value === "ascending") {
      setSorting("price");
    } else if (e.target.value === "descending") {
      setSorting("-price");
    }
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Clear all filters`~~~~~~~~~~~~~~~~~~~~

  const clearAllFilters = () => {
    setFilter("");
    setSorting("");
    setPriceRange([0, sliderMax]);
    history('/');
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Update the function to handle checkboxes`~~~~~~~~~~~~~~~~~~~~


  const handlePropertyChange = (properties) => {
    setSelectedProperties(properties);
  };

  const handlePetChange = (pet) => {
    setSelectedPet(pet);
  };
  const handleBedroomChange = (bedroom) => {
    setselectedbedroom(bedroom);
  };

  const handleBathroomChange = (bathroom) => {
    setselectedbathroom(bathroom);
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` Render the component~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (

    <Container className={classes.root}>

      {/*~~~~~~~~~~~~~~~~~~` Filtering and Sorting Section~~~~~~~~~~~~~~~~~~~~ */}

      <Paper className={classes.paper}>
        <Grid container>

          {/*~~~~~~~~~~~~~~~~~~~ Price Range Slider and Inputs`~~~~~~~~~~~~~~~~~~~~~ */}

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Filters</Typography>

            <div className={classes.filters}>
              <Slider
                min={0}
                max={sliderMax}
                value={priceRange}
                valueLabelDisplay="auto"
                disabled={loading}
                onChange={(e, newValue) => setPriceRange(newValue)}
                onChangeCommitted={onSliderCommitHandler}
              />

              <div className={classes.priceRangeInputs}>

                {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Min Price Input~~~~~~~~~~~~~~~~~~~~~~~~ */}
                <TextField
                  size="small"
                  id="lower"
                  label="Min Price"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceInputChange(e, "lower")}
                  onBlur={onTextfieldCommitHandler}
                />

                {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~ Max Price Input~~~~~~~~~~~~~~ */}

                <TextField
                  size="small"
                  id="upper"
                  label="Max Price"
                  variant="outlined"
                  type="number"
                  disabled={loading}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceInputChange(e, "upper")}
                  onBlur={onTextfieldCommitHandler}
                />
              </div>
            </div>
          </Grid>

          {/*~~~~~~~~~~~~~~~~~~~~~~~~ Sorting Options~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sort By</Typography>

            <FormControl component="fieldset" className={classes.filters}>
              <RadioGroup
                aria-label="price-order"
                name="price-order"
                value={priceOrder}
                onChange={handleSortChange}
              >
                <FormControlLabel
                  value="descending"
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Highest - Lowest"
                />

                <FormControlLabel
                  value="ascending"
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Lowest - Highest"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        {/*~~~~~~~~~~~~~~~~~~~~~~ Clear All Filters Button~~~~~~~~~~~~~ */}

        <Button size="small" color="primary" onClick={clearAllFilters}>
          Clear All
        </Button>
      </Paper>
      {/*~~~~~~~~~~~~~~~~~~~~~~Pass the handleCompanyChange function to the Checkboxes component~~~~~~~~~~~~~ */}


      <Checkboxes
        onPropertyChange={handlePropertyChange}
        onpetChange={handlePetChange}
        onBedroomChange={handleBedroomChange}
        onBathroomChange={handleBathroomChange}
      />

      {/*~~~~~~~~~~~~~~~~~~~~~~~~~ Bootcamps Listing ~~~~~~~~~~~~~~~~~~~~~~~*/}

      <Grid container spacing={2}>

        {/*~~~~~~~~~~ Display loading spinner or bootcamp cards based on loading state~~ */}

        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : (
          bootcamps.map((bootcamp) => (
            <Grid item key={bootcamp._id} xs={12} sm={6} md={4} lg={3}>
              <BootcampCard bootcamp={bootcamp} />
            </Grid>
          ))
        )}
      </Grid>

      {/*~~~~~~~~~~~~~~~~~~~~~~~~ Pagination Component~~~~~~~~~~~~~~~~ */}`
      `
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default BootcampsPage;
