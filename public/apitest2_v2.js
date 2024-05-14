document.getElementById('searchButton').addEventListener('click', function() {
  const mealInput = document.getElementById('mealInput').value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          const mealArray = data.meals;
          // Check if meals are found
          if (!mealArray) {
              document.getElementById('mealDisplay').textContent = 'No meals found.';
              return; // Stop further execution if no meals
          }

          // Create the main structure
          const ul = document.createElement('ul');
          document.getElementById('mealDisplay').innerHTML = ''; // Clear previous results
          document.getElementById('mealDisplay').appendChild(ul);

          // Helper function to create an li element with content
          function createListItem(index, meal) {
              const li = document.createElement('li');
              li.className = `grid${(index % 9) || 9}`;

              const button = document.createElement('button');
              button.textContent = "Click here to see details";

              button.addEventListener('click', function() {
                window.location.href = `meal-detail.html?id=${meal.idMeal}`
              })

              const h1 = document.createElement('h1');
              h1.textContent = meal.strMeal;
              li.appendChild(h1);

              const p = document.createElement('p');
              p.textContent = `Category: ${meal.strCategory}`;
              li.appendChild(p);

              li.appendChild(button);

              return li;
          }

          // Create and append list items
          mealArray.forEach((meal, index) => {
              const li = createListItem(index + 1, meal);
              ul.appendChild(li);
          });
      })
      .catch(error => {
          console.error('Error fetching data: ', error);
          document.getElementById('mealDisplay').textContent = 'Failed to fetch meal data.';
      });
});