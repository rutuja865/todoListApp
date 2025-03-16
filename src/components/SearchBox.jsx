import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/todoSlice';

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      onChange={handleSearch}
    />
  );
};

export default SearchBox;
