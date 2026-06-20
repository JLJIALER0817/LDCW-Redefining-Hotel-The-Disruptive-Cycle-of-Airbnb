// booking.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check Login State
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please log in to view your trips.');
        window.location.href = 'login.html';
        return;
    }

    // 2. Setup Profile Dropdown
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

    // Update Avatar and Logout link
    if (profileAvatar) {
        const img = document.createElement('img');
        img.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop";
        img.alt = "Profile";
        img.style = "width: 30px; height: 30px; border-radius: 50%; object-fit: cover;";
        profileAvatar.parentNode.replaceChild(img, profileAvatar);
    }
    
    if (loginLogoutLink) {
        loginLogoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }

    // 3. Load and Render Bookings
    const myBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
    const noTripsEl = document.getElementById('no-trips');
    const tripsListEl = document.getElementById('trips-list');

    if (myBookings.length === 0) {
        noTripsEl.classList.remove('hidden');
    } else {
        // Render bookings in reverse chronological order (newest first)
        myBookings.reverse().forEach(booking => {
            const card = document.createElement('div');
            card.className = 'trip-card';
            card.innerHTML = `
                <img src="${booking.imgUrl}" alt="${booking.title}" class="trip-img">
                <div class="trip-info">
                    <div class="trip-header">
                        <div>
                            <div class="trip-title">${booking.title}</div>
                            <div class="trip-location">
                                <i class="fa-solid fa-location-dot"></i> ${booking.location}
                            </div>
                        </div>
                        <div class="trip-price">${booking.totalPrice}</div>
                    </div>
                    
                    <div class="trip-details">
                        <div class="detail-item">
                            <span class="detail-label">Nights</span>
                            <span class="detail-value">${booking.nights} night${booking.nights > 1 ? 's' : ''}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Guests</span>
                            <span class="detail-value">${booking.guests}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Booked On</span>
                            <span class="detail-value">${booking.dateBooked}</span>
                        </div>
                    </div>
                </div>
            `;
            tripsListEl.appendChild(card);
        });
    }
});
