import { defineType,defineField } from "sanity";

export const Category = defineType({
    name: "category",
    title: "Category",
    type: "document",
    fields:[
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
              source: "name", // Replace 'name' with the field you want to use as the source for slug generation
              maxLength: 200, // Optional: Limit the length of the generated slug
              slugify: (input) => 
                input
                  .toLowerCase()
                  .replace(/\s+/g, '-') // Replace spaces with dashes
                  .replace(/[^a-z0-9-]/g, ''), // Remove special characters
            },
            validation: (rule) => rule.required(),
          }),
    ]
})