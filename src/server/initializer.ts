/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { REACT_APP_SERVER_URL } from "../configs";
import { initialCategories, initialTags } from "../data/seed";
import { Category, HttpMethod, Tag } from "../definitions/datatypes";

export const sendRequestEx = async (
  url: string,
  method: HttpMethod = "GET",
  body: any = null,
  headers: Record<string, string> = {}
) => {
  try {
    const response = await fetch(`${REACT_APP_SERVER_URL}${url}`, {
      method,
      body,
      headers,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err: any) {
    throw err;
  }
};

export const catagoryInitializer = async () => {
  // For now lets seed data from the seed.ts

  try {
    // Fetch all categories from the server
    const { data: existingCategories } = (await sendRequestEx(
      "/categories"
    )) as { data: Category[] };

    // Create an array to store promises for adding missing categories
    const addCategoryPromises: Promise<any>[] = [];

    // Iterate over each initial category
    for (const category of initialCategories) {
      // Check if the category doesn't exist in existingCategories
      const categoryExists = existingCategories.some(
        (existingCategory) => existingCategory.name === category.name
      );

      // If the category doesn't exist, add it to the database
      if (!categoryExists) {
        // Construct the request body
        const body = JSON.stringify({
          name: category.name,
          imageSrc: category.imageSrc,
        });

        // Send a POST request to add the category and push the promise to the array
        addCategoryPromises.push(
          sendRequestEx("/categories/addone", "POST", body, {
            "Content-Type": "application/json",
          })
        );
      }
    }

    // Wait for all promises to resolve
    await Promise.all(addCategoryPromises);
  } catch (error) {
    console.log("Error: ", JSON.stringify(error));
  }
};

export const tagInitializer = async () => {
  try {
    // Fetch all tags from the server
    const { data: existingTags } = (await sendRequestEx("/products/tags")) as {
      data: Tag[];
    };

    // Create an array to store promises for adding missing tags
    const addTagPromises: Promise<any>[] = [];

    // Iterate over each initial tag
    for (const tag of initialTags) {
      // Check if the tag doesn't exist in existingTags
      const tagExists = existingTags.some(
        (existingTag) => existingTag.name === tag.name
      );

      // If the tag doesn't exist, add it to the database
      if (!tagExists) {
        // Construct the request body
        const body = JSON.stringify({ name: tag.name });

        // Send a POST request to add the tag and push the promise to the array
        addTagPromises.push(
          sendRequestEx("/products/addtag", "POST", body, {
            "Content-Type": "application/json",
          })
        );
      }
    }

    // Wait for all promises to resolve
    await Promise.all(addTagPromises);
  } catch (error) {
    console.log("Error: ", JSON.stringify(error));
  }
};
