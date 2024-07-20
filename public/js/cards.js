const apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const fetchRandomRecipe = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.meals[0];
};

const updateRecipeOfTheWeek = async () => {
    const meal = await fetchRandomRecipe();
    const recipeOfTheWeek = document.querySelector(".card-of-the-week");
    recipeOfTheWeek.style.backgroundImage = `url(${meal.strMealThumb})`;
    recipeOfTheWeek.querySelector(".card-title-of-the-week").textContent = meal.strMeal;
    recipeOfTheWeek.querySelector(".card-body").textContent = meal.strInstructions.substring(0, 100) + "...";
    recipeOfTheWeek.querySelector(".card-btn").href = `meal-detail.html?id=${meal.idMeal}`;
};

const createRecipeCard = (meal, cardClass) => {
    const card = document.createElement("article");
    card.classList.add(cardClass);

    card.innerHTML = `
        <div class="card-content">
            <h2 class="card-title">${meal.strMeal}</h2>
            <p class="card-body">${meal.strInstructions.substring(0, 100)}...</p>
            <a href="meal-detail.html?id=${meal.idMeal}" class="card-btn" title="View Recipe">More</a>
        </div>
    `;
    card.style.backgroundImage = `url(${meal.strMealThumb})`;
    return card;
};

const updateNewRecipes = async () => {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";
    for (let i = 1; i <= 4; i++) {
        const meal = await fetchRandomRecipe();
        const card = createRecipeCard(meal, `card${i}`);
        cardsContainer.appendChild(card);
    }
    for (let i = 1; i <= 4; i++) {
        const meal = await fetchRandomRecipe();
        const card = createRecipeCard(meal, `card${i}`);
        cardsContainer.appendChild(card);
    }
};

updateRecipeOfTheWeek();
updateNewRecipes();
