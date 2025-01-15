import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function CartScreen() {
  const { id } = useParams();  // Extracts the product id from the URL
  const location = useLocation();  // Access the location object to extract query parameters

  // Extract qty from the search query using URLSearchParams
  const queryParams = new URLSearchParams(location.search);
  const qty = queryParams.get('qty') ? Number(queryParams.get('qty')) : 1;  // Default to 1 if qty is not provided

  return (
    <div>
      {id} -- {qty}
    </div>
  );
}
