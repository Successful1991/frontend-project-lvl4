import React from 'react';
import { filterTextContext } from './contexts';

const FilterTextProvider = ({ children, value }) => (
  <filterTextContext.Provider value={value}>
    {children}
  </filterTextContext.Provider>
);

export default FilterTextProvider;
