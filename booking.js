// ========================================================
// BOOKING.JS - TRIPS DASHBOARD INTERACTIVE LOGIC
// ========================================================
// This file handles all the interactive behavior for the
// My Trips page (booking.html). It includes:
// 1. Authentication check - redirects to login if not logged in
// 2. Profile dropdown management with avatar replacement
// 3. Loading bookings from localStorage
// 4. Sorting bookings into Upcoming, Past, and Cancelled
// 5. Rendering trip cards with status indicators
// 6. Cancel trip functionality with confirmation modal
// 7. Real-time status updates and re-rendering
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    // ========================================================
    // 1. AUTHENTICATION CHECK
    // Verifies if the user is logged in via localStorage.
    // Redirects to the login page if not authenticated.
    // ========================================================
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('Please log in to view your trips.');
        window.location.href = 'login.html';
        return;
    }

    // ========================================================
    // 2. PROFILE DROPDOWN LOGIC
    // Handles the toggling of the user profile menu and 
    // replacing the generic avatar with a logged-in user image.
    // ========================================================
    const profileAvatar = document.getElementById('profile-avatar-icon');
    const loginLogoutLink = document.getElementById('login-logout-link');
    const profileMenuBtn = document.getElementById('profile-menu-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    // Toggle dropdown on button click
    if (profileMenuBtn && profileDropdown) {
        profileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target) && !profileMenuBtn.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }

    // Replace the avatar icon with a user image
    if (profileAvatar) {
        const img = document.createElement('img');
        img.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop";
        img.alt = "Profile";
        img.style = "width: 30px; height: 30px; border-radius: 50%; object-fit: cover;";
        profileAvatar.parentNode.replaceChild(img, profileAvatar);
    }
    
    // Set up logout link
    if (loginLogoutLink) {
        loginLogoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }

    // ========================================================
    // 3. LOAD AND RENDER BOOKINGS
    // Retrieves bookings from localStorage and dynamically 
    // generates HTML cards for Upcoming, Past, and Cancelled trips.
    // ========================================================
    function renderBookings() {
        // Load bookings from localStorage
        let myBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
        const noTripsEl = document.getElementById('no-trips');
        const tripsListEl = document.getElementById('trips-list');
        const pastTripsTitle = document.getElementById('past-trips-title');
        const pastTripsListEl = document.getElementById('past-trips-list');
        const cancelledTripsTitle = document.getElementById('cancelled-trips-title');
        const cancelledTripsListEl = document.getElementById('cancelled-trips-list');

        // Clear existing content
        if (tripsListEl) tripsListEl.innerHTML = '';
        if (pastTripsListEl) pastTripsListEl.innerHTML = '';
        if (cancelledTripsListEl) cancelledTripsListEl.innerHTML = '';

        // Show empty state if no bookings
        if (myBookings.length === 0) {
            if (noTripsEl) noTripsEl.classList.remove('hidden');
            if (pastTripsTitle) pastTripsTitle.classList.add('hidden');
            if (cancelledTripsTitle) cancelledTripsTitle.classList.add('hidden');
            return;
        }

        if (noTripsEl) noTripsEl.classList.add('hidden');
        
        const today = new Date();
        today.setHours(0,0,0,0);

        let upcomingCount = 0;
        let pastCount = 0;
        let cancelledCount = 0;

        // Iterate backwards to show newest first
        // We use the original index for cancel operations
        for (let i = myBookings.length - 1; i >= 0; i--) {
            const booking = myBookings[i];
            const isCancelled = booking.status === 'cancelled';
            
            // Determine if past based on checkout date
            let isPast = false;
            if (booking.checkout && booking.checkout !== 'N/A') {
                const checkoutParts = booking.checkout.split('/'); // MM/DD/YYYY
                if (checkoutParts.length === 3) {
                    const checkoutDate = new Date(checkoutParts[2], checkoutParts[0] - 1, checkoutParts[1]);
                    if (checkoutDate < today) isPast = true;
                }
            }

            // Create the card element
            const card = document.createElement('div');
            
            // Apply appropriate class based on status
            if (isCancelled) {
                card.className = 'trip-card cancelled-trip-card';
            } else if (isPast) {
                card.className = 'trip-card past-trip-card';
            } else {
                card.className = 'trip-card';
            }
            
            // Build card content
            let badgeHTML = '';
            let priceHTML = `RM ${booking.totalPrice}`;
            
            if (isCancelled) {
                badgeHTML = `<span class="cancelled-badge">Cancelled</span>`;
                priceHTML = `<span style="text-decoration: line-through; color: var(--text-light);">RM ${booking.totalPrice}</span> (Refunded)`;
            }

            let cardHTML = `
                <img src="${booking.imgUrl}" alt="${booking.title}" class="trip-img">
                <div class="trip-info">
                    <div class="trip-header">
                        <div>
                            <div class="trip-title">${booking.title} ${badgeHTML}</div>
                            <div class="trip-location">
                                <i class="fa-solid fa-location-dot"></i> ${booking.location}
                            </div>
                        </div>
                        <div class="trip-price">${priceHTML}</div>
                    </div>
                    
                    <!-- Trip Details Grid -->
                    <div class="trip-details">
                        <div class="detail-item">
                            <span class="detail-label">Check-in</span>
                            <span class="detail-value">${booking.checkin || 'N/A'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Checkout</span>
                            <span class="detail-value">${booking.checkout || 'N/A'}</span>
                        </div>
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
            `;
            
            // Add Cancel button only for upcoming trips (not past or cancelled)
            if (!isPast && !isCancelled) {
                cardHTML += `
                    <div class="trip-footer">
                        <button class="cancel-btn" data-index="${i}">Cancel Trip</button>
                    </div>
                `;
            }
            
            cardHTML += `</div>`; // Close trip-info
            card.innerHTML = cardHTML;

            // Append to the appropriate list
            if (isCancelled) {
                if (cancelledTripsListEl) cancelledTripsListEl.appendChild(card);
                cancelledCount++;
            } else if (isPast) {
                if (pastTripsListEl) pastTripsListEl.appendChild(card);
                pastCount++;
            } else {
                if (tripsListEl) tripsListEl.appendChild(card);
                upcomingCount++;
            }
        }
        
        // Show/hide section titles based on counts
        if (pastCount > 0) {
            if (pastTripsTitle) pastTripsTitle.classList.remove('hidden');
        } else {
            if (pastTripsTitle) pastTripsTitle.classList.add('hidden');
        }

        if (cancelledCount > 0) {
            if (cancelledTripsTitle) cancelledTripsTitle.classList.remove('hidden');
        } else {
            if (cancelledTripsTitle) cancelledTripsTitle.classList.add('hidden');
        }
        
        // Show empty state if no trips in any category
        if (upcomingCount === 0 && pastCount === 0 && cancelledCount === 0) {
            if (noTripsEl) noTripsEl.classList.remove('hidden');
        }
        
        // ========================================================
        // 4. CANCEL TRIP FUNCTIONALITY
        // Attaches click handlers to all Cancel buttons.
        // Uses a confirmation modal before proceeding.
        // ========================================================
        const cancelModal = document.getElementById('cancel-modal');
        const btnCancelNo = document.getElementById('cancel-modal-no');
        const btnCancelYes = document.getElementById('cancel-modal-yes');
        let tripToCancelIndex = null;

        // Clicking Cancel button shows the modal
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                tripToCancelIndex = this.getAttribute('data-index');
                if (cancelModal) cancelModal.classList.remove('hidden');
            });
        });

        // "No, keep trip" button - closes modal
        if (btnCancelNo && cancelModal) {
            btnCancelNo.addEventListener('click', () => {
                cancelModal.classList.add('hidden');
                tripToCancelIndex = null;
            });
        }

        // "Yes, cancel trip" button - performs the cancellation
        if (btnCancelYes && cancelModal) {
            // Clone the button to remove any pre-existing listeners
            const newBtnCancelYes = btnCancelYes.cloneNode(true);
            btnCancelYes.parentNode.replaceChild(newBtnCancelYes, btnCancelYes);
            
            newBtnCancelYes.addEventListener('click', () => {
                if (tripToCancelIndex !== null) {
                    let currentBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
                    if (currentBookings[tripToCancelIndex]) {
                        // Update status to 'cancelled'
                        currentBookings[tripToCancelIndex].status = 'cancelled';
                    }
                    localStorage.setItem('myBookings', JSON.stringify(currentBookings));
                    cancelModal.classList.add('hidden');
                    tripToCancelIndex = null;
                    // Re-render the entire list
                    renderBookings();
                }
            });
        }
    }

    // Initial render
    renderBookings();
});