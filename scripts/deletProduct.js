import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31',
});

async function deleteAllProducts() {
  try {
    console.log('Fetching all products from Sanity...');
    const products = await client.fetch('*[_type == "product"]{_id}');
    console.log(`Found ${products.length} products to delete.`);

    for (const product of products) {
      console.log(`Deleting product: ${product._id}`);
      await client.delete(product._id);
      console.log(`✅ Deleted product: ${product._id}`);
    }

    console.log('All products deleted successfully!');
  } catch (error) {
    console.error('Error deleting products:', error);
  }
}

deleteAllProducts();