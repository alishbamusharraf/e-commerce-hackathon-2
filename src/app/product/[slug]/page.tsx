import { getProduct } from "@/lib/firebase/product"; // adjust path if needed
import { AddToCartButton } from "@/components/AddToCartButton";
import Image from "next/image";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return <div className="text-center text-red-500">Product not found!</div>;
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>

          <div>
            <p className="text-xl font-semibold text-indigo-600 mb-4">
              Rs. {product.price}
            </p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
