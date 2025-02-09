import { Navbar} from "@/components/Navbar"
import Footer from "@/components/footer"
import { useWishlist } from "@/components/wishlistcontext";


export default function Checkout() {
    return (
        <>
        <Navbar/>
      {/* Use the useWishlist hook here */}
      {(() => {
          const wishlist = useWishlist();
          return <div>{/* Render wishlist items here */}</div>;
      })()}
        <Footer/>
        </>
    )
}