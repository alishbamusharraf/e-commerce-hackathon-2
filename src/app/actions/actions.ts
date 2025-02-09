import { Item } from "@radix-ui/react-dropdown-menu";
import { Product } from "../../../types/products";


export const addToCart = (product : Product) => {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')

    const existingProductIndex = cart.findIndex(item => item._id === product. _id)

    if(existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1
    }
    else {
        cart.push({
            ...product, quantity:1
        })
    }

    localStorage.setItem('cart',JSON.stringify(cart))
}

export const RemoveFromCart = (productID : string, quantity: number) => {
     let cart : Product[] =JSON.parse(localStorage.getItem('cart') || '[]')
     cart = cart.filter(Item => Item._id !== productID)
        localStorage.setItem('cart', JSON.stringify(cart))
}

export const underCartQuantity = (productID : string, quantity: number) => {
    const cart : Product[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const productIndex = cart.findIndex(item => item._id === productID)

    if (productIndex > -1) {
        cart[productIndex].quantity =  quantity
        localStorage.setItem('cart', JSON.stringify(cart))
     }
}

export const getCartItems = () : Product[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]')
}