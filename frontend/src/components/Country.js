import React, { useState } from 'react';
import Select from 'react-select';
import { useCountryList } from 'react-select-country-list';

const CountryPicker = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { getCountryList } = useCountryList();
  const countryList = getCountryList();

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <div>
      <Select
        value={selectedCountry}
        onChange={handleChange}
        options={countryList}
        placeholder="Select a country"
      />
    </div>
  );
};

export default CountryPicker;
