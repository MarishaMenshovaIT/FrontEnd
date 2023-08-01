import { useEffect, useState } from "react";
import axios from "axios";

interface Recipes {
  id: number;
  name: string;
  img_url: string;
  prep_time: number;
  serves: number;
}

const Recipes = () => {
  const [getRecipes, setRecipes] = useState<Recipes[] | null>(null);
  useEffect(() => {
    //Define async function for axios
    const getRecipesFromApi = async () => {
      const response = await axios.get("http://localhost:3001/recipes");
      //   console.log(response.data);
      setRecipes(response.data);
    };
    getRecipesFromApi();
  }, []);

  return (
    <div>
      {getRecipes === null ? (
        <p>Loading...</p>
      ) : (
        getRecipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <p>
                {recipe.id}:{recipe.name}
              </p>
              <p>{recipe.img_url}</p>
              <p>{recipe.prep_time}</p>
              <p>{recipe.serves}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Recipes;
