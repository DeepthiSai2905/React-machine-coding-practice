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

  return (
    <>
    <div>Pagination</div>
    {products.length>0 && <div className='products-list'>
        {products.map((item)=>(
            <span key={item.id}><ProductCard image={item.thumbnail} title={item.title} /></span>
            
        ))
       }
       </div>
    }
    <div>
        
    </div>
    </>
  )
}

export default Pagination