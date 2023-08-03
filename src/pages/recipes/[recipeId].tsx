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

  const getRating = getRecipe.comments.map((amountOfRatings) =>
    amountOfRatings.rating.valueOf()
  );
  console.log(getRating);

  const totalRatings = getRating.length;
  console.log(totalRatings);

  const averageRating =
    getRating.reduce((sum: number, rating: number) => sum + rating, 0) /
    totalRatings;
  console.log(averageRating);

  const getStarRating = (averageRating: number) => {
    const roundedRating = Math.round(averageRating * 2) / 2;
    return "⭐️".repeat(roundedRating) + "✩".repeat(5 - roundedRating);
  };

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
          <p>{getStarRating(averageRating)}</p>
        </div>
      </div>

      <div className="recipe-box">
        <div className="recipe-box-top">
          <span className="recipe-box-name">
            <p>{getRecipe.name}</p>
          </span>
          <div className="recipe-box-serving">
            <p>serves: {servesIcons[getRecipe.serves]}</p>
            <p>prep time: {getRecipe.prep_time}</p>
          </div>
        </div>
        <div className="recipe-box-body">
          <h2>Instructions:</h2>
          <h2>Ingredients:</h2>
          <p>{getRecipe.instructions}</p>
          <p>{getRecipe.ingredients}</p>
        </div>
      </div>

      <div className="add-comment">
        <h1>Add a comment</h1>
        <p>Form to add comment HERE!</p>
      </div>

      <div className="comment-section">
        <h2>Comments</h2>
        <div className="comment-container">
          {getRecipe.comments.map((comment: Comment) => (
            <div className="comment-body" key={comment.id}>
              <p>{comment.name}</p>
              <p>{comment.message}</p>
              <p>{"⭐️".repeat(comment.rating)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipePage;
