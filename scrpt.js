const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const listingsContainer = document.getElementById('listingsContainer');
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  fetchListings(searchTerm);
});

function fetchListings(searchTerm) {
  fetch(`https://rapidapi.com/3b-data-3b-data-default/api/airbnb13?search=${searchTerm}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': '3b-data-3b-data-default.p.rapidapi.com',
      'X-RapidAPI-Key': apiKey
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayListings(data);
  })
  .catch(error => {
    console.error('Error:', error);
    listingsContainer.innerHTML = 'An error occurred while fetching listings.';
  });
}

function displayListings(listings) {
  listingsContainer.innerHTML = ''; // Clear previous listings

  listings.data.forEach(listing => {
    const listingCard = document.createElement('div');
    listingCard.classList.add('listing-card');

    // Create and append HTML elements to listingCard
    const listingTitle = document.createElement('h2');
    listingTitle.innerText = listing.name;
    listingCard.appendChild(listingTitle);

    const listingImage = document.createElement('img');
    listingImage.src = listing.images[0];
    listingImage.alt = listing.name;
    listingCard.appendChild(listingImage);

    const listingType = document.createElement('p');
    listingType.innerText = `Type: ${listing.type}`;
    listingCard.appendChild(listingType);

    const listingPrice = document.createElement('p');
    listingPrice.innerText = `Price: $${listing.price.rate} per night`;
    listingCard.appendChild(listingPrice);

    // Add more details like beds, bathrooms, amenities, and ratings here

    listingsContainer.appendChild(listingCard);
  });
}
