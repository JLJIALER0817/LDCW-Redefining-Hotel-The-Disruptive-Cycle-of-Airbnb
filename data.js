// data.js
// Mock Database shared across pages
const allProperties = [
    { id: 1, location: 'Malacca', title: 'Condo in Malacca', propertyType: 'Entire home', pricePerNight: 163, rating: 5.0, maxGuests: 4, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop' },
    { id: 2, location: 'Malacca', title: 'Apartment in Malacca', propertyType: 'Shared room', pricePerNight: 150, rating: 4.91, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=600&auto=format&fit=crop' },
    { id: 3, location: 'Malacca', title: 'Luxury Villa Malacca', propertyType: 'Luxury villa', pricePerNight: 450, rating: 4.79, maxGuests: 6, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop' },
    { id: 4, location: 'Kuala Lumpur', title: 'KLCC View Condo', propertyType: 'Entire home', pricePerNight: 200, rating: 4.94, maxGuests: 4, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop' },
    { id: 5, location: 'Kuala Lumpur', title: 'Cozy Room in Cheras', propertyType: 'Shared room', pricePerNight: 80, rating: 5.0, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop' },
    { id: 6, location: 'Penang', title: 'Heritage House Penang', propertyType: 'Entire home', pricePerNight: 180, rating: 4.85, maxGuests: 5, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop' },
    { id: 7, location: 'Johor Bahru', title: 'JB City Apartment', propertyType: 'Entire home', pricePerNight: 120, rating: 4.83, maxGuests: 3, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop' },
    { id: 8, location: 'Langkawi', title: 'Langkawi Beach Villa', propertyType: 'Luxury villa', pricePerNight: 600, rating: 4.97, maxGuests: 8, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop' },
    { id: 9, location: 'Sabah', title: 'Mount Kinabalu Lodge', propertyType: 'Shared room', pricePerNight: 100, rating: 4.90, maxGuests: 2, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop' }
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
