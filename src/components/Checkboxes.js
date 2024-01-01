import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Data Arrays:~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const properties = ["House", "Apartment", "Retirement Living", "Townhouse", "Studio", "Carpark", "Section", "Unit", "Boatshed"];
const pet = ["Yes", "No"];
const bedrooms = ["Three Bedroom", "Studio", "Not available", "Two Bedroom", "One Bedroom"];
const bathrooms = ["Shared Bathroom", "Half Bathroom", "Full Bathroom"];

export default function Checkboxes({ onPropertyChange, onpetChange,
  onBedroomChange, onBathroomChange }) {

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~State Hooks:~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [selectedProperties, setSelectedProperties] = React.useState([]);
  const [selectedpet, setSelectedpet] = React.useState([]);
  const [selectedbedroom, setSelectedbedroom] = React.useState([]);
  const [selectedbathroom, setSelectedbathroom] = React.useState([]);

 // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Handlers:~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  const handlePropertyChange = (property) => {
    const updatedProperties = [...selectedProperties];
    if (updatedProperties.includes(property)) {
      updatedProperties.splice(updatedProperties.indexOf(property), 1);
    } else {
      updatedProperties.push(property);
    }
    setSelectedProperties(updatedProperties);
    onPropertyChange(updatedProperties);
  };

  const handlepetChange = (pet) => {
    const updatedpet = [...selectedpet];
    if (updatedpet.includes(pet)) {
      updatedpet.splice(updatedpet.indexOf(pet), 1);
    } else {
      updatedpet.push(pet);
    }
    setSelectedpet(updatedpet);
    onpetChange(updatedpet);
  };

  const handleBedroomChange = (bedroom) => {
    const updatedBedrooms = [...selectedbedroom];
    if (updatedBedrooms.includes(bedroom)) {
      updatedBedrooms.splice(updatedBedrooms.indexOf(bedroom), 1);
    } else {
      updatedBedrooms.push(bedroom);
    }
    setSelectedbedroom(updatedBedrooms);
    onBedroomChange(updatedBedrooms);
  };

  const handleBathroomChange = (bathroom) => {
    const updatedBathrooms = [...selectedbathroom];
    if (updatedBathrooms.includes(bathroom)) {
      updatedBathrooms.splice(updatedBathrooms.indexOf(bathroom), 1);
    } else {
      updatedBathrooms.push(bathroom);
    }
    setSelectedbathroom(updatedBathrooms);
    onBathroomChange(updatedBathrooms);
  };

  return (
    <Grid container spacing={2}>

      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PROPERTY TYPE`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` */}
      
      <Grid item xs={2}>
        <FormControl component="fieldset" style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px' }}>
          <FormLabel component="legend" style={{ color: "blue", marginLeft: "8rem" }}>PROPERTY TYPE</FormLabel>
          {properties.map((property) => (
            <Grid >
            <FormControlLabel
              key={property}
              control={
                <Checkbox
                  checked={selectedProperties.includes(property)}
                  onChange={() => handlePropertyChange(property)}
                />
              
              }
              label={property}
              labelPlacement="end"
            />
              </Grid>
          ))}
        </FormControl>
      </Grid>

      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~` PET~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

      <Grid item xs={3}>
        <FormControl component="fieldset" style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px', marginLeft: "8rem" }}>
          <FormLabel component="legend" style={{ color: "blue", marginLeft: "4rem" }}>PET</FormLabel>
          <FormGroup>
            {pet.map((pet) => (
              <FormControlLabel
                key={pet}
                control={
                  <Checkbox
                    checked={selectedpet.includes(pet)}
                    onChange={() => handlepetChange(pet)}
                  />
                }
                label={pet}
                labelPlacement="end"
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>

      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ BATHROOM ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}

      <Grid item xs={3}>
        <FormControl component="fieldset" style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px' }}>
          <FormLabel component="legend" style={{ color: "blue", marginLeft: "8rem" }}>BATHROOM</FormLabel>
          {bathrooms.map((bathroom) => (
            <FormControlLabel
              key={bathroom}
              control={
                <Checkbox
                  checked={selectedbathroom.includes(bathroom)}
                  onChange={() => handleBathroomChange(bathroom)}
                />
              }
              label={bathroom}
              labelPlacement="end"
            />
          ))}
        </FormControl>
      </Grid>

      {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ BEDROOM ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~``*/}

      <Grid item xs={3}>
        <FormControl component="fieldset" style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px' }}>
          <FormLabel component="legend" style={{ color: "blue", marginLeft: "8rem" }}>BEDROOM</FormLabel>
          {bedrooms.map((bedroom) => (
            <FormControlLabel
              key={bedroom}
              control={
                <Checkbox
                  checked={selectedbedroom.includes(bedroom)}
                  onChange={() => handleBedroomChange(bedroom)}
                />
              }
              label={bedroom}
              labelPlacement="end"
            />
          ))}
        </FormControl>
      </Grid>
    </Grid>
  );
}
