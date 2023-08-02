import { Category, Recipe } from "@/types/interfaces";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const RecipeFilterPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Fetch all categories from the server
    axios
      .get<Category[]>("http://localhost:3001/categories")
      .then((response: AxiosResponse<Category[]>) => {
        setCategories(response.data);
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch all recipes from the server
    axios
      .get<Recipe[]>("http://localhost:3001/recipes")
      .then((response: AxiosResponse<Recipe[]>) => {
        setFilteredRecipes(response.data);
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  // Function to handle category filter change
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);

    // Filter recipes based on the selected category
    if (event.target.value === "All") {
      setFilteredRecipes(recipes); // Should be setFilteredRecipes instead of setRecipes
    } else {
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.category.some((cat: Category) => cat.name === event.target.value)
      );
      setFilteredRecipes(filteredRecipes);
    }
  };

  return (
    <div>
      <h2>Recipe Filter</h2>
      <div>
        <label>
          Filter by Category:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p>{recipe.instructions}</p>
            <p>Category: {recipe.category[0].name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFilterPage;
