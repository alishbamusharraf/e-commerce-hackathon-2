import { groq } from "next-sanity";

export const allproducts = groq`*[_type == "product"]`