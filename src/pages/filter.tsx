import React, { useState } from "react";

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState("All");

  function handleOptionClick(option: any) {
    setSelectedOption(option);
  }

  return (
    <div>
      <div>
        <button onClick={() => handleOptionClick("All")}>All</button>
        <button onClick={() => handleOptionClick("Breakfast")}>
          Breakfast
        </button>
        <button onClick={() => handleOptionClick("Lunch")}>Lunch</button>
        <button onClick={() => handleOptionClick("Dinner")}>Dinner</button>
        <button onClick={() => handleOptionClick("Dessert")}>Dessert</button>
      </div>
      <div>
        {selectedOption === "All" && <p>Display all options here.</p>}
        {selectedOption === "Breakfast" && (
          <p>Display breakfast options here.</p>
        )}
        {selectedOption === "Lunch" && <p>Display lunch options here.</p>}
        {selectedOption === "Dinner" && <p>Display dinner options here.</p>}
        {selectedOption === "Dessert" && <p>Display dessert options here.</p>}
      </div>
    </div>
  );
}

export default MyComponent;
