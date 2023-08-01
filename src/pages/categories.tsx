import { useEffect, useState } from "react";
import axios from "axios";

interface Categories {
  id: number;
  name: string;
  img_url: string;
}

const Categories = () => {
  const [getCategories, setCategories] = useState<Categories[] | null>(null);
  useEffect(() => {
    //Define async function for axios
    const getCategories = async () => {
      const categories = await axios.get("http://localhost:3001/categories");
      //   console.log(response.data);
      setCategories(categories.data);
    };
    getCategories();
  }, []);

  return (
    <div>
      {getCategories === null ? (
        <p>Loading...</p>
      ) : (
        getCategories.map((category) => {
          return (
            <div key={category.id}>
              <p>
                {category.id}:{category.name}
              </p>
              <p>{category.img_url}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Categories;
