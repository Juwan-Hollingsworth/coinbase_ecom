// At the top of your file
"use client";

import { useState } from 'react';
import axios from 'axios';
import { products } from '../data/data';

export default function Home() {
  return (
    <>
    <h1 className='text-center'>Cloth Season: 02 Sample Gallery</h1>
    <div className={"container mx-auto max-w-6xl px-4"}>
      
      {
        products.map( (product, index) => {
          return (<Products key={index} product={product} />)
        })
      }
    </div>
    </>
  )
  
}

const Products = ({product}) => {
  const [loading, setLoading] =  useState(false);

  const coinbase = async () => {
    setLoading(true)
    try {
      const data = await axios.post('/api/init', { id: product.id })
      setLoading(false)
      window.open(data.data.hosted_url, '_blank');
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <div>
      {product.image && <img class="h-[400px]" src={product.image} alt={product.name} />}
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      
      <p>Price: {product.price} {product.currency}</p>
      <button onClick={coinbase} disabled={loading}   class="bg-transparent border-2 border-black text-black hover:bg-gray-500 hover:text-white py-2 px-4  focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" > Pay With Crypto </button>
    </div>
  )
  
}