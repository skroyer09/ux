document.getElementById('searchButton').addEventListener('click', function() {
    const mealInput = document.getElementById('mealInput').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`;

    // Sample data for each item
    const itemsData = [
    { title: 'Item 1', description: 'Description for Item 1' },
    { title: 'Item 2', description: 'Description for Item 2' },
    { title: 'Item 3', description: 'Description for Item 3' },
    // Add more items as needed
    ];
  
    // Create the main structure
    const ul = document.createElement('ul');
        document.body.appendChild(ul);
  
  // Helper function to create an li element with content
  function createListItem(index, title, description) {
    const li = document.createElement('li');
    li.className = `grid${(index % 9) || 9}`;
  
    const h1 = document.createElement('h1');
    h1.textContent = title;
    li.appendChild(h1);
  
    const p = document.createElement('p');
    p.textContent = description;
    li.appendChild(p);
  
    return li;
  }
  
  // Create and append list items
  for (let i = 0; i < itemsData.length; i++) {
    const item = itemsData[i];
    const li = createListItem(i + 1, item.title, item.description);
    ul.appendChild(li);
  }
  

});