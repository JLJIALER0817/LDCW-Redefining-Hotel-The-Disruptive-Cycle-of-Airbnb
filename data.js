// data.js
// Mock Database shared across pages
const allProperties = [
    // Malacca
    { id: 1, location: 'Malacca', title: 'Condo in Malacca', propertyType: 'Entire home', pricePerNight: 163, rating: 5.0, maxGuests: 4, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop' },
    { id: 2, location: 'Malacca', title: 'Apartment in Malacca', propertyType: 'Shared room', pricePerNight: 150, rating: 4.91, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=600&auto=format&fit=crop' },
    { id: 3, location: 'Malacca', title: 'Luxury Villa Malacca', propertyType: 'Luxury villa', pricePerNight: 450, rating: 4.79, maxGuests: 6, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop' },
    { id: 4, location: 'Malacca', title: 'Melaka Heritage House', propertyType: 'Entire home', pricePerNight: 210, rating: 4.88, maxGuests: 5, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop' },
    { id: 5, location: 'Malacca', title: 'Riverside Studio Malacca', propertyType: 'Entire home', pricePerNight: 130, rating: 4.95, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop' },

    // Kuala Lumpur
    { id: 6, location: 'Kuala Lumpur', title: 'KLCC View Condo', propertyType: 'Entire home', pricePerNight: 200, rating: 4.94, maxGuests: 4, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop' },
    { id: 7, location: 'Kuala Lumpur', title: 'Cozy Room in Cheras', propertyType: 'Shared room', pricePerNight: 80, rating: 5.0, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop' },
    { id: 8, location: 'Kuala Lumpur', title: 'Bukit Bintang Penthouse', propertyType: 'Luxury villa', pricePerNight: 850, rating: 4.98, maxGuests: 8, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop' },
    { id: 9, location: 'Kuala Lumpur', title: 'Bangsar Loft', propertyType: 'Entire home', pricePerNight: 280, rating: 4.85, maxGuests: 4, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600&auto=format&fit=crop' },
    { id: 10, location: 'Kuala Lumpur', title: 'Mont Kiara Suite', propertyType: 'Entire home', pricePerNight: 190, rating: 4.92, maxGuests: 3, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop' },

    // Penang
    { id: 11, location: 'Penang', title: 'Heritage House Penang', propertyType: 'Entire home', pricePerNight: 180, rating: 4.85, maxGuests: 5, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop' },
    { id: 12, location: 'Penang', title: 'Batu Ferringhi Beach Condo', propertyType: 'Entire home', pricePerNight: 250, rating: 4.90, maxGuests: 4, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop' },
    { id: 13, location: 'Penang', title: 'Georgetown Artist Loft', propertyType: 'Entire home', pricePerNight: 160, rating: 4.88, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=600&auto=format&fit=crop' },
    { id: 14, location: 'Penang', title: 'Seaview Villa Penang', propertyType: 'Luxury villa', pricePerNight: 600, rating: 4.95, maxGuests: 8, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop' },
    { id: 15, location: 'Penang', title: 'Penang Hill Cozy Room', propertyType: 'Shared room', pricePerNight: 90, rating: 4.75, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop' },

    // Johor Bahru
    { id: 16, location: 'Johor Bahru', title: 'JB City Apartment', propertyType: 'Entire home', pricePerNight: 120, rating: 4.83, maxGuests: 3, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop' },
    { id: 17, location: 'Johor Bahru', title: 'Legoland Family Suite', propertyType: 'Entire home', pricePerNight: 220, rating: 4.91, maxGuests: 6, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=600&auto=format&fit=crop' },
    { id: 18, location: 'Johor Bahru', title: 'Danga Bay Sea View', propertyType: 'Entire home', pricePerNight: 150, rating: 4.80, maxGuests: 4, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=600&auto=format&fit=crop' },
    { id: 19, location: 'Johor Bahru', title: 'Johor Luxury Estate', propertyType: 'Luxury villa', pricePerNight: 750, rating: 4.97, maxGuests: 10, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=600&auto=format&fit=crop' },
    { id: 20, location: 'Johor Bahru', title: 'Mount Austin Studio', propertyType: 'Shared room', pricePerNight: 85, rating: 4.78, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=600&auto=format&fit=crop' },

    // Langkawi
    { id: 21, location: 'Langkawi', title: 'Langkawi Beach Villa', propertyType: 'Luxury villa', pricePerNight: 600, rating: 4.97, maxGuests: 8, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop' },
    { id: 22, location: 'Langkawi', title: 'Cenang Beach Chalet', propertyType: 'Entire home', pricePerNight: 180, rating: 4.88, maxGuests: 3, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600&auto=format&fit=crop' },
    { id: 23, location: 'Langkawi', title: 'Kuah Town Apartment', propertyType: 'Entire home', pricePerNight: 140, rating: 4.82, maxGuests: 4, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=600&auto=format&fit=crop' },
    { id: 24, location: 'Langkawi', title: 'Rainforest Retreat Langkawi', propertyType: 'Entire home', pricePerNight: 280, rating: 4.95, maxGuests: 5, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop' },
    { id: 25, location: 'Langkawi', title: 'Sunset View Room', propertyType: 'Shared room', pricePerNight: 110, rating: 4.89, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1542889601-399c4f3a8402?q=80&w=600&auto=format&fit=crop' },

    // Sabah
    { id: 26, location: 'Sabah', title: 'Mount Kinabalu Lodge', propertyType: 'Shared room', pricePerNight: 100, rating: 4.90, maxGuests: 2, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop' },
    { id: 27, location: 'Sabah', title: 'Kota Kinabalu City Condo', propertyType: 'Entire home', pricePerNight: 170, rating: 4.86, maxGuests: 4, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop' },
    { id: 28, location: 'Sabah', title: 'Semporna Ocean Villa', propertyType: 'Luxury villa', pricePerNight: 800, rating: 4.99, maxGuests: 6, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop' },
    { id: 29, location: 'Sabah', title: 'Kundasang Chalet', propertyType: 'Entire home', pricePerNight: 190, rating: 4.92, maxGuests: 5, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop' },
    { id: 30, location: 'Sabah', title: 'Sabah Sunset Apartment', propertyType: 'Entire home', pricePerNight: 150, rating: 4.81, maxGuests: 3, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop' }
];

function setupNavProfile() {
    const profileAvatar = document.getElementById('profile-avatar-icon');
    const loginLogoutLink = document.getElementById('login-logout-link');
    const profileMenuBtn = document.getElementById('profile-menu-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileMenuBtn && profileDropdown) {
        profileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target) && !profileMenuBtn.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }

    if (localStorage.getItem('isLoggedIn') === 'true') {
        if (profileAvatar) {
            const img = document.createElement('img');
            img.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop";
            img.alt = "Profile";
            img.style = "width: 30px; height: 30px; border-radius: 50%; object-fit: cover;";
            profileAvatar.parentNode.replaceChild(img, profileAvatar);
        }
        
        const tripsLink = document.getElementById('trips-link');
        if (tripsLink) tripsLink.style.display = 'block';
        
        if (loginLogoutLink) {
            loginLogoutLink.textContent = "Log out";
            loginLogoutLink.href = "#";
            loginLogoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                window.location.reload();
            });
        }
    }
}
