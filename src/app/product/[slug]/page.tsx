import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { Product } from '../../../../types/products';
import AddToCartButton from '@/components/AddToCart';

interface ProductPageProps {
  params: { slug: string };
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const product = await client.fetch(
      groq`*[_type == "product" && slug.current == $slug][0]{
        _id,
        productName,
        _type,
        image,
        price,
        description,
        quantity,
        tags,
        features,
        dimensions,
      }`,
      { slug }
    );
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return <div>Product not found!</div>; // You can return a 404 page or custom error page here
  }

  return (
    <div className="max-w-7xl mt-28 mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Product Image */}
        <div className="flex justify-center">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              width={700}  // Increased image size to 700px
              height={700} // Increased image size to 700px
              alt={product.productName}
              className="rounded-lg shadow-lg border-2 border-gray-200 hover:scale-105 transition-all duration-300"
            />
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">{product.productName}</h1>
          <p className="text-xl font-semibold text-gray-700">${product.price}</p>
          <p className="text-lg text-gray-600 mt-2">{product.description}</p>

          <div className="flex flex-col gap-4 mt-6">
            {/* Features Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {product.features?.length ? (
                  product.features.map((feature, index) => (
                    <li key={index} className="text-lg">{feature}</li>
                  ))
                ) : (
                  <li>No features available</li>
                )}
              </ul>
            </div>

            {/* Tags Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Tags</h2>
              <div className="flex flex-wrap gap-3 mt-2">
                {product.tags?.length ? (
                  product.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-sm font-medium text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span>No tags available</span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
