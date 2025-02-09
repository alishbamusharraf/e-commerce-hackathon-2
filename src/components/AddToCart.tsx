'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/app/actions/actions'
// import { Product } from '@/types/product'
import { ShoppingCart } from 'lucide-react'
import { Product } from '../../types/products'
import Swal from 'sweetalert2'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await addToCart(product)
    setIsAdding(false)
    Swal.fire({
        position: 'top-right',
        icon: 'success',
        title: `${product.name} added to cart`,
        showConfirmButton: false,
        timer: 1000,
    })
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full bg-black text-white hover:bg-black/90 text-xl py-6 flex items-center justify-center gap-3"
    >
      <ShoppingCart className="w-6 h-6" />
      {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
    </Button>
  )
}

