'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '../../../types/products';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import Image from 'next/image';
import { addToCart } from '@/app/actions/actions';
import Swal from 'sweetalert2';
import { allproducts } from '@/sanity/lib/qurries';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const fetchedProducts: Product[] = await client.fetch(allproducts);
        setProducts(fetchedProducts.slice(0, 4)); // Show only 4 products initially
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };

  const handleViewCollection = async () => {
    try {
      const fetchedProducts: Product[] = await client.fetch(allproducts);
      setProducts(fetchedProducts); // Load all products
    } catch (error) {
      console.error('Failed to fetch more products:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Latest Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-4 text-center text-xl text-gray-600">Loading products...</div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-300 rounded-xl shadow-lg p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-50 hover:border-blue-800"
            >
              <Link href={`/product/${product.slug.current}`}>
                <div className="relative">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).url()}
                      width={500}
                      height={500}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-md transition-all duration-300"
                    />
                  )}
                  <h2 className="text-xl font-semibold mt-4 text-gray-800">{product.name}</h2>
                  <h3 className="text-lg text-gray-500 mt-2">${product.price.toFixed(2)}</h3>
                  <p className="text-gray-700 mt-2">{product.description}</p>

                  <button
                    className="bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out mt-6"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* View Collection Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleViewCollection}
          className="bg-slate-700 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-xl hover:scale-110 transition duration-300 ease-in-out"
        >
          View Full Collection
        </button>
      </div>
    </div>
  );
};

export default ProductList;
