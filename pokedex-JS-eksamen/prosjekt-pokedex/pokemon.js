const MAX_POKEMON = 151;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    displayPokemons(allPokemons);
  });

async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirect");
  }
}

function displayPokemons(pokemon) {
  listWrapper.innerHTML = "";

  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemonID}</p>
        </div>
        <div class="img-wrap">
            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">#${pokemon.name}</p>
        </div>
    `;

    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) {
        window.location.href = `./detail.html?id=${pokemonID}`;
      }
    });

    listWrapper.appendChild(listItem);
  });
}

searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );
  } else {
    filteredPokemons = allPokemons;
  }

  displayPokemons(filteredPokemons);

  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch() {
  searchInput.value = "";
  displayPokemons(allPokemons);
  notFoundMessage.style.display = "none";
}

// Innloggingsskjema
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("https://crudcrud.com/api/3718c0c1a3884cc3b48c7824b3214c9f/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          const token = `${password}qwhshajhwajsjhjshd${username}`;
          localStorage.setItem("authToken", token);
          localStorage.setItem("username", username);
          localStorage.setItem("userId", user._id);
          alert("Login successful!");
          window.location.href = "index.html";
        } else {
          alert("Invalid username or password.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Failed to log in.");
      });
  });
}

// Registreringsskjema
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUsername = document.getElementById("new-username").value;
    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("new-password").value;

    try {
      const response = await fetch(
        "https://crudcrud.com/api/3718c0c1a3884cc3b48c7824b3214c9f/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: newUsername, email, password: newPassword }),
        }
      );
      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "login.html";
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  });
}

// CRUD løsning

async function createPokemon(name) {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Pokemon created:", data);
    } else {
      console.error("Failed to create pokemon");
    }
  } catch (error) {
    console.error("Error creating pokemon:", error);
  }
}

async function getPokemon(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (response.ok) {
      const data = await response.json();
      console.log("Pokemon data:", data);
    } else {
      console.error("Failed to get pokemon data");
    }
  } catch (error) {
    console.error("Error getting pokemon data:", error);
  }
}

async function updatePokemon(id, newData) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (response.ok) {
      console.log("Pokemon updated successfully");
    } else {
      console.error("Failed to update pokemon");
    }
  } catch (error) {
    console.error("Error updating pokemon:", error);
  }
}

async function deletePokemon(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Pokemon deleted successfully");
    } else {
      console.error("Failed to delete pokemon");
    }
  } catch (error) {
    console.error("Error deleting pokemon:", error);
  }
}
