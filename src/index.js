// Callbacks
//  Handling click event on a ramen image and updating detail section   
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

const addSubmitListener = () => {
  // Add code
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // const newRamen = {
  
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
const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:3000/ramen' : 'https://phase-1-cc-ramen-rater-v2-htj3.onrender.com';

const displayRamens = () => {

  fetch('baseURL')
    .then((response) => response.json())
    .then((ramens) => {
      ramens.forEach((ramen) => {
        addRamenToMenu(ramen);
      });

      //  show the first ramen's details automatically when the page loads
      handleClick(ramens[0]);
    });
};
// Adds a ramen image to the #ramen-menu div
const addRamenToMenu = (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');

  // Setting the image's src attribute to the ramen's image URL
  img.src = ramen.image;

  //  showing ramen details when the image is clicked
  img.addEventListener('click', () => handleClick(ramen));

  // Append the image to the ramen-menu div
  ramenMenu.appendChild(img);
};

const main = () => {
  displayRamens(); // Invoke displayRamens here
  addSubmitListener();// Invoke addSubmitListener here
}

main()
// Call main() to start the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', main);


// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
