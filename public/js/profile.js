document.addEventListener('DOMContentLoaded', async () => {
    const profileInfo = document.getElementById('profile-info');
    const favoriteRecipesList = document.getElementById('favorite-recipes');

    if (!profileInfo || !favoriteRecipesList) {
        console.error("Element with id 'profile-info' or 'favorite-recipes' not found.");
        return;
    }

    // Fetch user profile from JSON Server
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        alert('You must be logged in to view this page.');
        window.location.href = 'login.html';
        return;
    }

    const usersResponse = await fetch('http://localhost:3000/users');
    const users = await usersResponse.json();
    const userProfile = users.find(user => user.email === loggedInUserEmail);
    
    if (!userProfile) {
        console.error("User profile not found for email:", loggedInUserEmail);
        return;
    }

    // Display user profile information including email
    profileInfo.innerHTML = `<p>Email: ${userProfile.email}</p>`;
    
    // Retrieve favorite recipes from localStorage
    const favoriteRecipesKey = `user_${userProfile.email}_favorites`;
    const favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

    // Display favorite recipes
    favoriteRecipes.forEach(recipe => {
        const listItem = document.createElement('li');
        listItem.textContent = recipe.name;
        favoriteRecipesList.appendChild(listItem);

        // Add click event listener to each favorite recipe
        listItem.addEventListener('click', () => {
            // Determine the meal ID property (id or idMeal)
            const mealId = recipe.id || recipe.idMeal;
            window.location.href = `meal-detail.html?id=${mealId}`;
        });
    });
});