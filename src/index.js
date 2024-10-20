// Callbacks
// Handling click event on a ramen image and updating detail section
const handleClick = (ramen) => {
  const ramenName = document.querySelector('#ramen-detail h2');
  const ramenRestaurant = document.querySelector('#ramen-detail h3');
  const ramenImage = document.querySelector('#ramen-detail img');
  const ramenRating = document.querySelector('#rating-display');
  const ramenComment = document.querySelector('#comment-display');

  // Update the details with the clicked ramen's information
  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ramenImage.src = ramen.image;
  ramenRating.textContent = ramen.rating;
  ramenComment.textContent = ramen.comment;
};

// Function to handle form submissions for new ramen
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const { 
      'new-name': nameInput, 
      'new-restaurant': restaurantInput, 
      'new-image': imageInput, 
      'new-rating': ratingInput, 
      'new-comment': commentInput 
    } = e.target;

    const newRamen = {
      name: nameInput.value,
      restaurant: restaurantInput.value,
      image: imageInput.value,
      rating: ratingInput.value,
      comment: commentInput.value,
    };

    // Add the new ramen to the #ramen-menu div
    addRamenToMenu(newRamen);

    // Clear the form fields
    form.reset();
  });
};

// Define the API URL depending on whether the app is running locally or live
const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000/ramens"  // Local development URL
  : "https://phase-1-cc-ramen-rater-v2-htj3.onrender.com/ramens";  // Live server URL

// Function to fetch and display ramen data
const displayRamens = () => {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((ramens) => {
      ramens.forEach((ramen) => addRamenToMenu(ramen));
      if (ramens.length > 0) {
        handleClick(ramens[0]);  // Show the first ramen's details
      }
    })
    .catch((error) => console.error("Error fetching ramens:", error));
};

// Adds a ramen image to the #ramen-menu div
const addRamenToMenu = (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');

  // Setting the image's src attribute to the ramen's image URL
  img.src = ramen.image;

  // Show ramen details when the image is clicked
  img.addEventListener('click', () => handleClick(ramen));

  // Append the image to the ramen-menu div
  ramenMenu.appendChild(img);
};

// Main function to initialize the app
const main = () => {
  displayRamens(); // Fetch and display existing ramen data
  addSubmitListener(); // Set up the form listener
};

// Start the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

