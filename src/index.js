import "./styles/index.css";

const API_KEY = "0758d4edb42f48d0bf7c13f21f263756" // personal API key


// Function to search for recipes and display them on the webpage
async function searchRecipes() {
  const searchQuery = document.getElementById("query").value;
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=20`
    );
    const data = await response.json();
    const recipeList = document.getElementById("results");
    recipeList.innerHTML = "";

    if (data.results.length === 0) {
      recipeList.innerHTML = "No recipes found :(";
      recipeList.style.color = "#FF0000";
      recipeList.style.fontSize = "50px";
      recipeList.style.textAlign = "center";
    } else {
      data.results.forEach((recipe) => {
        const recipeItem = document.createElement("div");
        recipeItem.className = "recipe-item";
        const recipeTitle = document.createElement("h3");
        recipeTitle.textContent = recipe.title;
        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.title;
        const recipeLink = document.createElement("a");
        recipeLink.href = "#";
        recipeLink.textContent = "Let's cook!";
        recipeLink.style.fontSize = "24px";
        recipeLink.addEventListener("click", async (event) => {
          event.preventDefault(); 
          await showRecipeDetails(recipe.id);
        });

        recipeItem.appendChild(recipeImage);
        recipeItem.appendChild(recipeTitle);
        recipeItem.appendChild(recipeLink);
        recipeList.appendChild(recipeItem);
      });
    }
  } catch (error) {
    console.log("Error fetching recipes", error);
  }
}

// Function to display recipe details (title, image, ingredients, instructions)
async function showRecipeDetails(recipeId) {
  const recipeDetailsDiv = document.getElementById("recipe-details");
  const recipeContentDiv = document.getElementById("recipe-content");
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    const recipeData = await response.json();
    recipeContentDiv.innerHTML = `
            <h2>${recipeData.title}</h2>
            <img src="${recipeData.image}" alt="${recipeData.title}">
            <p>Ingredients: ${recipeData.extendedIngredients
              .map((ingredient) => ingredient.original)
              .join(", ")}</p>
            <p>Instructions: ${recipeData.instructions}</p>`;
    recipeDetailsDiv.style.display = "flex";
    

  } catch (error) {
    console.log("Error fetching recipe details", error);
  }
}

// Function to close recipe details
function closeRecipeDetails() {
    const recipeDetailsDiv = document.getElementById("recipe-details");
    recipeDetailsDiv.style.display = "none";
 }
 
 document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const closeButton = document.getElementById('close-button');
 
    searchButton.addEventListener('click', searchRecipes);
    closeButton.addEventListener('click', closeRecipeDetails);
 });
