import React, { useEffect, useState } from 'react'
import '../css/pagination.css'

const ProductCard = ({image, title}) => {
    return (
        <div className='product-details'>
            <img className='product-img' src={image} alt={title} />
            <span className='product-title'>{title}</span>
        </div>
    )

}

const Pagination = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE=10;
    const noOfPages = Math.ceil(products.length/PAGE_SIZE);
    
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async() =>{
    const apiCall = "https://dummyjson.com/products?limit=500";
    try {
        const res = await fetch(apiCall); // response object - has all the headers, body, api status data
        const data = await res.json(); // json object
        console.log(data," - DATA")
        setProducts(data.products);
    }
    catch(error){
        console.log("error",error)
    }
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <>
      <h2>Pagination Example</h2>

      {/* Products */}
      {currentProducts.length > 0 && (
        <div className="products-list">
          {currentProducts.map((item) => (
            <ProductCard
              key={item.id}
              image={item.thumbnail}
              title={item.title}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls" style={{marginBottom:"50px"}}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {noOfPages}
        </span>

        <button
          disabled={currentPage === noOfPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination