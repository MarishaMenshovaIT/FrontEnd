import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Comment, Recipe, Category } from "@/types/interfaces";
import Menu from "@/component/menu";

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
        console.error("Error fetching recipe:", error);
      }
    };

    getRecipeFromApi();
  }, [recipeIdFromUrl]);

  if (getRecipe === null) {
    return <p>Loading recipe, please wait...</p>;
  }

  const servesIcons = ["", "👩‍🍳", "👩‍🍳👨‍🍳", "👩‍🍳👨‍🍳👩‍🍳", "👩‍🍳👨‍🍳👩‍🍳👨‍🍳"];

  return (
    <>
      <Menu background={true} />
      <div
        style={{ backgroundImage: `url(${getRecipe.img_url})` }}
        className="recipe-header"
      >
        <div>
          <h1>{getRecipe.name}</h1>
          {getRecipe.category.map((indexCat: Category) => (
            <p key={indexCat.id}>{indexCat.name}</p>
          ))}
          <p>recipe rating here!</p>
        </div>
      </div>

      <div className="recipe-box">
        <div className="recipe-box-top">
          <div className="recipe-box-name">
            <p>{getRecipe.name}</p>
          </div>
          <div className="recipe-box-serving">
            <p>
              Serves{" "}
              <span className="serves-emojis">
                {servesIcons[getRecipe.serves]}
              </span>
            </p>
          </div>
          <div className="recipe-box-time">
            <span>Prep Time </span>
            <span className="time-for-recipe"> {getRecipe.prep_time} m</span>
          </div>
        </div>

        <div className="recipe-box-body">
          <p>
            <h3>Instructions</h3>
            {getRecipe.instructions}
          </p>
        </div>
        <div className="recipe-box-ingredients">
          <h3>Ingredients</h3>
          <p>{getRecipe.ingredients}</p>
        </div>
      </div>

      <div className="add-comment">
        <h1>Add a comment</h1>
      </div>

      <span className="comment-field">
        <div>
          <label className="name-user">
            <h3>Name</h3>
            <input id="name-user" name="name-user" type="text" />
          </label>
        </div>
        <div>
          <label className="review">
            <h3>Review</h3>
            <textarea id="review" name="review" />
          </label>
        </div>
        <div>
          <span>
            <button className="button">Save</button>
          </span>
        </div>
      </span>

      <div className="comment-section">
        <h2>Comments</h2>
        <div className="comment-container">
          {getRecipe.comments.map((comment: Comment) => (
            <div className="comment-body" key={comment.id}>
              <p>{comment.name}</p>
              <p>{comment.message}</p>
              <p>{comment.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipePage;
