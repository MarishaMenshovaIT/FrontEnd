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

  const person = "👤";

  const getRating = getRecipe.flatMap((recipe) =>
    recipe.comments.map((rating) => rating.rating.valueOf())
  );

  const totalRatings = getRating.length;

  const sumOfRatings = getRating.reduce((sum, rating) => sum + rating, 0);
  const averageRating = sumOfRatings / totalRatings;
  console.log(averageRating);

  const getStarRating = (averageRating: number) => {
    const roundedRating = Math.ceil(averageRating * 2) / 2;
    return "⭐️".repeat(roundedRating) + "✩".repeat(5 - roundedRating);
  };

  return (
    <div className="homepage-container">
      <h2 className="homepage-heading-recipes">Recipes</h2>
      <input
        className="homepage-search-bar"
        type="search"
        placeholder="Search for recipes"
      ></input>
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

      <div className="homepage-recipes">
        {filteredRecipes.map((recipe) => {
          return (
            <section
              className="homepage-recipe-item"
              key={recipe.id}
              onClick={() => clickHandleForRecipeId(recipe.id)}
            >
              <div className="recipe-box-left">
                <img className="recipe-box-img" src={recipe.img_url} />
              </div>
              <div className="recipe-box-right">
                <h2>{recipe.name}</h2>
                <span>{getStarRating(averageRating)}</span>
                <div className="recipe-serve-prep">
                  <div className="recipe-detail">
                    <span>serves</span>
                    <p>{person.repeat(recipe.serves)}</p>
                  </div>
                  <div className="recipe-detail">
                    <span>prep time</span>
                    <p>{recipe.prep_time}</p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default RecipeList;
