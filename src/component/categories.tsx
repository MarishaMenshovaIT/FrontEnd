import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "./recipes";
import { count } from "console";

interface Categories {
  id: number;
  name: string;
  img_url: string;
}

const Categories = () => {
  const [getCategories, setCategories] = useState<Categories[] | null>(null);
  const [getFilter, setFilter] = useState<string>("all");

  useEffect(() => {
    //Define async function for axios
    const getCategories = async () => {
      const categories = await axios.get("http://localhost:3001/categories");
      //   console.log(response.data);
      setCategories(categories.data);
    };
    getCategories();
  }, []);

  const handleCategory = (category: string) => {
    setFilter(category);
    // console.log("Recipes");
  };

  return (
    <div>
      <p>Current Category: {getFilter}</p>
      {getCategories === null ? (
        <p>Loading...</p>
      ) : (
        getCategories.map((category) => {
          return (
            <button
              onClick={() => handleCategory(category.name)}
              key={category.id}
            >
              <p>{category.name}</p>
              <p>{category.img_url}</p>
            </button>
          );
        })
      )}
    </div>
  );
};

export default Categories;
