import React from 'react';
import  './pagination.css'

function Pagination() {
  return(
      <div className='pagination  flex justify-between'>
            <p>Previous</p>

            <div>
                  1 of 14
            </div>

            <p>Next </p>
      </div>
  );
}

export default Pagination;
