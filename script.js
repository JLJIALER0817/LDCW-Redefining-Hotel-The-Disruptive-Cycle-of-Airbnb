// Mock Database matching the screenshot
const allProperties = [
    // Malacca Properties
    {
        id: 1,
        location: 'Malacca',
        title: 'Condo in Malacca',
        price: 326,
        rating: 5.0,
        nights: 2,
        maxGuests: 4,
        isGuestFavorite: true,
        imgUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 2,
        location: 'Malacca',
        title: 'Apartment in Malacca',
        price: 301,
        rating: 4.91,
        nights: 2,
        maxGuests: 2,
        isGuestFavorite: false,
        imgUrl: 'https://images.unsplash.com/photo-1502672260266-1c1de24227e8?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 3,
        location: 'Malacca',
        title: 'Apartment in Malacca',
        price: 298,
        rating: 4.79,
        nights: 2,
        maxGuests: 3,
        isGuestFavorite: true,
        imgUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 4,
        location: 'Malacca',
        title: 'Apartment in Malacca',
        price: 400,
        rating: 5.0,
        nights: 2,
        maxGuests: 5,
        isGuestFavorite: true,
        imgUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 5,
        location: 'Malacca',
        title: 'Condo in Malacca',
        price: 290,
        rating: 4.85,
        nights: 2,
        maxGuests: 2,
        isGuestFavorite: true,
        imgUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop'
    },

    // Kuala Lumpur Properties
    {
        id: 6,
        location: 'Kuala Lumpur',
        title: 'Apartment in Kuala Lumpur',
        price: 400,
        rating: 4.94,
        nights: 2,
        maxGuests: 4,
        isGuestFavorite: true,
        imgUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 7,
        location: 'Kuala Lumpur',
        title: 'Apartment in Cheras',
        price: 326,
        rating: 5.0,
        nights: 2,
        maxGuests: 2,
        isGuestFavorite: false,
        imgUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 8,
        location: 'Kuala Lumpur',
        title: 'Apartment in Kuala Lumpur',
        price: 546,
        rating: 4.83,
        nights: 2,
        maxGuests: 6,
        isGuestFavorite: false,
        imgUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 9,
        location: 'Kuala Lumpur',
        title: 'Apartment in Brickfields',
        price: 236,
        rating: 5.0,
        nights: 2,
        maxGuests: 2,
        isGuestFavorite: false,
        imgUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 10,
        location: 'Kuala Lumpur',
        title: 'Condo in Kuala Lumpur',
        price: 628,
        rating: 4.97,
        nights: 2,
        maxGuests: 4,
        isGuestFavorite: true,
        imgUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop'
    }
];

// Helper to create card HTML
function createCard(property) {
    const badgeHTML = property.isGuestFavorite 
        ? `<div class="guest-favorite-badge">Guest favorite</div>` 
        : '';

    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
        <div class="image-container">
            ${badgeHTML}
            <button class="heart-btn"><i class="fa-solid fa-heart"></i></button>
            <img src="${property.imgUrl}" alt="${property.title}" class="card-image">
        </div>
        <div class="card-info">
            <div class="card-title">${property.title}</div>
            <div class="card-rating"><i class="fa-solid fa-star"></i> ${property.rating.toFixed(2)}</div>
        </div>
        <div class="card-price">
            <strong>RM ${property.price}</strong> <span>for ${property.nights} nights</span>
        </div>
    `;
    return card;
}

// Render Initial Homepage Rows
function renderHomepage() {
    const malaccaGrid = document.getElementById('malacca-grid');
    const klGrid = document.getElementById('kl-grid');

    // Filter by location
    const malaccaProps = allProperties.filter(p => p.location === 'Malacca');
    const klProps = allProperties.filter(p => p.location === 'Kuala Lumpur');

    malaccaProps.forEach(p => malaccaGrid.appendChild(createCard(p)));
    klProps.forEach(p => klGrid.appendChild(createCard(p)));
}

// Run on load
renderHomepage();

// Search Logic
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const searchInput = document.getElementById('location').value.toLowerCase();
    const guestsInput = parseInt(document.getElementById('guests').value) || 1;

    // Filter Logic
    const matchedProperties = allProperties.filter(p => {
        const matchLocation = searchInput === '' || p.title.toLowerCase().includes(searchInput) || p.location.toLowerCase().includes(searchInput);
        const matchGuests = p.maxGuests >= guestsInput;
        return matchLocation && matchGuests;
    });

    // Toggle Views
    const homeView = document.getElementById('home-view');
    const searchView = document.getElementById('search-view');
    const searchGrid = document.getElementById('search-grid');
    const noResults = document.getElementById('no-results');

    homeView.classList.add('hidden');
    searchView.classList.remove('hidden');

    searchGrid.innerHTML = ''; // clear old search

    if (matchedProperties.length === 0) {
        noResults.classList.remove('hidden');
        searchGrid.classList.add('hidden');
    } else {
        noResults.classList.add('hidden');
        searchGrid.classList.remove('hidden');
        matchedProperties.forEach(p => searchGrid.appendChild(createCard(p)));
    }
});
