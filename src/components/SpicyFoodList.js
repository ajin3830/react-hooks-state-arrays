import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [filterBy, setFilterBy] = useState('ALL');
  const [foods, setFoods] = useState(spicyFoods);
  
  //TO ADD
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }
  // ^^^ 
  // use spread operator
  

  // first add a click handler to the <li> elements, and pass in the id of the food we're trying to remove
  const foodList = foods.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));
  // TO REMOVE
  function handleLiClick(id) {
    const newFoodArray = foods.filter(food => food.id !== id);
    setFoods(newFoodArray);
  }
  // ^^^
  // [1, 2, 3].filter((number) => number !== 3);
  // // => [1,2]
  

  //  TO UPDATE
  function handleLiClick(id) {
    const newFoodArray = foods.map(food => {
      if (food.id=== id) {
        return {
          ...food,
          headLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }
  //   ^^^
  // [1, 2, 3].map((number) => {
  //   if (number === 3) {
  //     // if the number is the one we're looking for, increment it
  //     return number + 100;
  //   } else {
  //     // otherwise, return the original number
  //     return number;
  //   }
  // });
  //   // => [1,2,103]

  
  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }
  
  const foodsToDisplay = foods.filter(food => {
    if (filterBy === 'ALL') {
      return true;
    } else {
      return foods.cuisine === filterBy;
    }
  })
  
  const foodList = foodsToDisplay.map(food => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
    {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
  </li>
  ));

  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
