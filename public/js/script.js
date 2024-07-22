const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("https://www.themealdb.com/api/json/v1/1/categories.php", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}
document.getElementById('showSidebar').addEventListener("click", showSidebar)

function showSidebar() {
    const sidebar = document.getElementById('showSidebar')
    sidebar.style.display = 'flex'
    }

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('#navbar');
  const sidebar = document.querySelector('.sidebar');
  
  // Event listeners for showing and hiding the sidebar
  document.querySelector('.show-sidebar').addEventListener('click', showSidebar);
  document.querySelector('.hide-sidebar').addEventListener('click', hideSidebar);
  
  // Check if the user is logged in
  const loggedInUser = sessionStorage.getItem('loggedInUser');

  if (loggedInUser) {
    // Create and append logout and profile items
    const logoutListItem = document.createElement('li');
    const logoutButton = document.createElement('a');
    logoutButton.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>`;
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', () => {
      sessionStorage.removeItem('loggedInUser');
      window.location.href = "logout.html"; 
    });
    logoutListItem.appendChild(logoutButton);
    
    const profileListItem = document.createElement('li');
    const profileLink = document.createElement('a');
    profileLink.href = 'profile.html';
    profileLink.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>`;
    profileLink.textContent = 'Profile';
    profileListItem.appendChild(profileLink);

    // Append items to the correct container based on screen size
    if (window.innerWidth >= 48 * 16) { // 48rem in pixels
      navbar.appendChild(logoutListItem);
      navbar.appendChild(profileListItem);
    } else {
      sidebar.appendChild(logoutListItem);
      sidebar.appendChild(profileListItem);
    }
  } else {
    // Create and append login and signup items
    const loginListItem = document.createElement('li');
    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>`;
    loginLink.textContent = 'Login';
    loginListItem.appendChild(loginLink);
    
    const signupListItem = document.createElement('li');
    const signupLink = document.createElement('a');
    signupLink.href = 'signup.html';
    signupLink.innerHTML = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>`;
    signupLink.textContent = 'Signup';
    signupListItem.appendChild(signupLink);

    if (window.innerWidth >= 48 * 16) {
      navbar.appendChild(loginListItem);
      navbar.appendChild(signupListItem);
    } else {
      sidebar.appendChild(loginListItem);
      sidebar.appendChild(signupListItem);
    }
  }

  // Handle window resize event to adjust the view if the user resizes the browser
  window.addEventListener('resize', () => {
    location.reload();
  });
});
