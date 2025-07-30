import { Navbar } from "@/components/Navbar";
import Footer from "@/components/footer";
import { useWishlist } from "@/components/wishlistcontext";

export default function Checkout() {
  // ✅ Correct usage: Hook is called at the top level
  const wishlist = useWishlist();

  return (
    <>
      <Navbar />

      <div className="min-h-screen p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>

        {/* ✅ Sample wishlist rendering */}
        {wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <ul className="space-y-4">
            {wishlist.map((item) => (
              <li key={item._id} className="p-4 bg-white rounded shadow">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </>
  );
}
