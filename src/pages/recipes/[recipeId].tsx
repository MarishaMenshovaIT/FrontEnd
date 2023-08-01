import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Comment, Recipe, Category } from "@/types/interfaces";

const RecipePage = () => {
  const [getRecipe, setRecipe] = useState<null | Recipe>(null);
  const router = useRouter();
  const recipeIdFromUrl = router.query.recipeId;

  useEffect(() => {
    if (recipeIdFromUrl === undefined) {
      return;
    }

    const getRecipeFromApi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/${recipeIdFromUrl}`
        );
        setRecipe(response.data);
      } catch (error) {
        // Handle the error
        console.error("Error fetching recipe:", error);
      }
    };

    getRecipeFromApi();
  }, [recipeIdFromUrl]);

  if (getRecipe === null) {
    return <p>Loading recipe, please wait...</p>;
  }

  return (
    <>
      <div className="container">
        <h1>{getRecipe.name}</h1>
        {getRecipe.category.map((indexCat: Category) => (
          <p key={indexCat.id}>{indexCat.name}</p>
        ))}
        <p>serves: {getRecipe.serves}</p>
        <p>prep time: {getRecipe.prep_time}</p>
        <p>{getRecipe.instructions}</p>
        <p>{getRecipe.ingredients}</p>
      </div>
    </>
  );
};

export default RecipePage;
