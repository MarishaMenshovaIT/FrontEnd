import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Recipe, Category } from "@/types/interfaces";

function RecipeList() {
  const router = useRouter();
  const [getRecipe, setRecipes] = useState<null | Recipe[]>(null);
  const [activeCategory, setActiveCategory] = useState<null | string>(null);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await axios.get("http://localhost:3001/recipes");
      setRecipes(response.data);
    };
    fetchRecipeData();
  }, []);

  if (getRecipe === null) {
    return <p>Loading recipes...</p>;
  }

  let uniqueCategories = Array.from(
    new Set(
      getRecipe.flatMap((recipes) =>
        recipes.category.map((category) => category.name)
      )
    )
  );

  const clickHandler = (category: string) => {
    setActiveCategory(category);
  };

  const filteredRecipes = activeCategory
    ? getRecipe.filter((recipe) =>
        recipe.category.some((category) =>
          category.name.includes(activeCategory)
        )
      )
    : getRecipe;

  function clickHandleForRecipeId(id: number) {
    router.push(`recipes/${id}`);
    console.log(id);
  }

  return (
    <>
      <h1>FUCKING RECIPES!</h1>
      <input type="search" placeholder="Search for recipes"></input>
      <div className="recipe-button">
        <button
          className={` recipe-button ${!activeCategory ? "active-button" : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {uniqueCategories.map((category) => {
          return (
            <button
              key={category}
              className={` recipe-button
                ${activeCategory === category ? "active-button" : ""}
                `}
              onClick={() => clickHandler(category)}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div>
        {filteredRecipes.map((recipe) => {
          return (
            <section
              key={recipe.id}
              onClick={() => clickHandleForRecipeId(recipe.id)}
            >
              <h2>{recipe.name}</h2>
              <img src={recipe.img_url} />
              <p>{recipe.serves}</p>
              <p>{recipe.prep_time}</p>
            </section>
          );
        })}
      </div>
    </>
  );
}

export default RecipeList;
