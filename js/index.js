// identify the element form by id
let form = document.getElementById("github-form")
// add an event listener.
form.addEventListener('submit', function(e){
  e.preventDefault()

  let search = document.getElementById("search").value

  let name = search.split('').join('')

  fetch("https://api.github.com/search/users?q=octocat"+name)
  .then((result) => (result.json))
  .then((data) => {
    console.log(data)
  })

})

  searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = searchInput.value;
      searchInput.value = "";

      if (username) {
          const users = await searchUsers(username);

          // Display search results
          displayUsers(users);
      }
  });


  async function searchUsers(username) {
      const response = await fetch(`https://api.github.com/search/users?q=${username}`);
      const data = await response.json();
      return data.items; // Extract user data from the response
  }

  // Function to display search results
  function displayUsers(users) {
      searchResults.innerHTML = ""; 

      users.forEach((user) => {
          const userCard = document.createElement("div");
          userCard.classList.add("user-card");
          userCard.innerHTML = `
              <img src="${user.avatar_url}" alt="${user.login}">
              <h2>${user.login}</h2>
              <a href="${user.html_url}" target="_blank">View Profile</a>
          `;

          userCard.addEventListener("click", async () => {
              // When a user card is clicked, fetch and display their repositories
              const repositories = await getUserRepositories(user.login);
              displayRepositories(repositories);
          });

          searchResults.appendChild(userCard);
      });
  }

  // Function to fetch user repositories using GitHub API
  async function getUserRepositories(username) {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const repositories = await response.json();
      return repositories;
  }

  // Function to display user repositories
  function displayRepositories(repositories) {
      userRepositories.innerHTML = "";

      repositories.forEach((repo) => {
          const repoItem = document.createElement("div");
          repoItem.classList.add("repo-item");
          repoItem.innerHTML = `
              <h3>${repo.name}</h3>
              <p>${repo.description || "No description available"}</p>
              <a href="${repo.html_url}" target="_blank">View Repository</a>
          `;

          userRepositories.appendChild(repoItem);
      });
  }

