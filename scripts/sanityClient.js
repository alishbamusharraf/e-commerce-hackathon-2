import { createClient } from '@sanity/client';


const client = createClient({
  projectId: '5aazjvyw', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  useCdn: false,
  token: 'NEXT_PUBLIC_SANITY_TOKEN', // Replace with your Sanity API token
});


export default client;