fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => response.json())
    .then(data => {
        const categorySelect = document.getElementById('categorySelect');
        const categories = data.categories;

        // Clear existing options (if any)
        categorySelect.innerHTML = '<option value="#">All Categories</option>';

        // Populate select element with fetched categories
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.strCategory;
            option.textContent = category.strCategory;
            categorySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching categories: ', error);
    });

document.getElementById('categoryButton').addEventListener('click', function() {
    const mealInput = document.getElementById('categorySelect').value;
    console.log(mealInput);
    let url;

    if (mealInput === '#') {
        url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealInput}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const mealArray = data.meals;
            if (!mealArray) {
                document.getElementById('mealDisplay').textContent = 'No meals found.';
                return;
            }

            const ul = document.createElement('ul');
            ul.className = 'grid-container';
            document.getElementById('mealDisplay').innerHTML = '';
            document.getElementById('mealDisplay').appendChild(ul);

            const gridColumns = [
                '1 / 4', '4 / 6', '6 / 10',
                '1 / 3', '3 / 6', '6 / 10',
                '1 / 3', '3 / 5', '5 / 10'
            ];

            mealArray.forEach((meal, index) => {
                const li = createListItem(index + 1, meal, gridColumns);
                ul.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            document.getElementById('mealDisplay').textContent = 'Failed to fetch meal data.';
        });
});

function createListItem(index, meal, gridColumns) {
    const li = document.createElement('li');
    li.className = 'grid-item';
    li.style.gridColumn = gridColumns[(index - 1) % gridColumns.length];
    li.style.backgroundImage = `url(${meal.strMealThumb})`;
    li.setAttribute('aria-label', meal.strMeal);

    const h1 = document.createElement('h2');
    h1.textContent = meal.strMeal;
    h1.classList.add('mealName');
    li.appendChild(h1);

    const button = document.createElement('button');
    button.textContent = "Click here to see details";
    button.addEventListener('click', function() {
        window.location.href = `meal-detail.html?id=${meal.idMeal}`;
    });
    li.appendChild(button);

    const favoriteButton = document.createElement('button');
    favoriteButton.className = 'favoriteButton';
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
    const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
    let favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

    const isFavorite = favoriteRecipes.some(r => r.idMeal === meal.idMeal);
    favoriteButton.textContent = isFavorite ? '☆ Unfavorite' : '★ Favorite';
    favoriteButton.addEventListener('click', function() {
        toggleFavorite(meal, favoriteButton);
    });
    li.appendChild(favoriteButton);

    return li;
}

function toggleFavorite(meal, button) {
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        alert('You must be logged in to favorite recipes.');
        return;
    }

    const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
    let favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

    const isFavorite = favoriteRecipes.some(r => r.idMeal === meal.idMeal);

    if (isFavorite) {
        favoriteRecipes = favoriteRecipes.filter(r => r.idMeal !== meal.idMeal);
        button.textContent = '★ Favorite';
        alert('Recipe removed from favorites!');
    } else {
        favoriteRecipes.push({ idMeal: meal.idMeal, name: meal.strMeal });
        button.textContent = '☆ Unfavorite';
        alert('Recipe added to favorites!');
    }

    localStorage.setItem(favoriteRecipesKey, JSON.stringify(favoriteRecipes));
}
