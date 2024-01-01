import React from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (event) => {
    const newPage = event.target.value;
    onPageChange(newPage);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <Select
        value={currentPage}
        onChange={handlePageChange}
        style={{ margin: '0 10px' }}
      >
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <MenuItem key={page} value={page}>
            {page}
          </MenuItem>
        ))}
      </Select>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
