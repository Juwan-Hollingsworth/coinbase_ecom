// At the top of your file
"use client";

import { useState } from 'react';
import axios from 'axios';
import { products } from '../data/data';

export default function Home() {
  return (
    <>
    <h1 className='text-center uppercase font-bold'>Cloth Season: 02 Crypto Gallery concept</h1>
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
      window.location.href = data.data.hosted_url;
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <div>
      {product.image && <img class=" max-h-[400px]w-auto" src={product.image} alt={product.name} />}
      <h4 class="uppercase">{product.name}</h4>
      <p class="uppercase">{product.description}</p>
      
      <p class="uppercase">Price: {product.price} {product.currency}</p>
      <div className="flex justify-center items-center">
      <button onClick={coinbase} onTouchStart={coinbase} disabled={loading}   class="bg-transparent border-2 border-black text-black hover:bg-gray-500 hover:text-white py-2 px-4  focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed uppercase" > Pay With Crypto </button>
      </div>
     
    </div>
  )
  
}