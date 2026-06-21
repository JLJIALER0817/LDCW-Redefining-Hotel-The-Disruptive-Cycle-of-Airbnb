// details.js

document.addEventListener('DOMContentLoaded', () => {
    // ========================================================
    // 1. URL PARAMETER EXTRACTION
    // Extracts the property ID from the URL string (e.g., ?id=2)
    // to determine which property to display.
    // ========================================================
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = parseInt(urlParams.get('id'));

    if (!propertyId) {
        alert("Property not found!");
        window.location.href = "index.html";
        return;
    }

    // 2. Find Property in Database
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) {
        alert("Property not found!");
        window.location.href = "index.html";
        return;
    }

    // ========================================================
    // 2. DATA POPULATION
    // Injects the property's data (title, specs, rating, images)
    // into the HTML DOM elements dynamically.
    // ========================================================
    document.title = `${property.title} - Airbnb Clone`;
    document.getElementById('detail-title').textContent = property.title;
    document.getElementById('detail-subtitle').textContent = `${property.propertyType} in ${property.location}, Malaysia`;
    
    const bedrooms = Math.ceil(property.maxGuests / 2);
    const beds = property.maxGuests;
    const baths = Math.max(1, Math.floor(property.maxGuests / 2));
    document.getElementById('detail-specs').textContent = `${property.maxGuests} guests · ${bedrooms} bedrooms · ${beds} beds · ${baths} baths`;
    document.getElementById('detail-rating').textContent = property.rating.toFixed(2);
    
    // Images
    document.getElementById('img-main').src = property.imgUrl;
    const subImages = [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=400&auto=format&fit=crop"
    ];
    document.getElementById('img-sub-1').src = subImages[0];
    document.getElementById('img-sub-2').src = subImages[1];
    document.getElementById('img-sub-3').src = subImages[2];
    document.getElementById('img-sub-4').src = subImages[3];
    document.getElementById('max-guests-text').textContent = property.maxGuests;

    // ========================================================
    // 3. BOOKING WIDGET INITIALIZATION
    // Sets up initial dates and parses any search queries 
    // passed over from the homepage via localStorage.
    // ========================================================
    let checkinDate = new Date();
    
    // Attempt to set a smart checkin date based on search parameters
    const flexMonthStr = localStorage.getItem('flexMonth');
    const exactCheckinVal = localStorage.getItem('exactCheckinVal');
    
    if (flexMonthStr) {
        // e.g. "July"
        const monthNamesArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthIndex = monthNamesArr.findIndex(m => m === flexMonthStr || m.startsWith(flexMonthStr));
        if (monthIndex !== -1) {
            let year = new Date().getFullYear();
            if (monthIndex < new Date().getMonth()) year++; // If it's a past month, assume next year
            checkinDate = new Date(year, monthIndex, 1);
        }
    } else if (exactCheckinVal) {
        // e.g. "205" = March 5 (Month index 2, day 5). Wait, val is `monthIndex * 100 + day`.
        // Our monthNames in index.js are 'June 2026' = 0, 'July 2026' = 1, etc.
        // It's a bit complex to reverse engineer exactly. Let's do a simple parse:
        const val = parseInt(exactCheckinVal);
        const day = val % 100;
        const indexOffset = Math.floor(val / 100);
        // Assuming base month is June 2026 (month 5 in JS, year 2026) based on our mock data
        let baseDate = new Date(2026, 5, 1);
        baseDate.setMonth(baseDate.getMonth() + indexOffset);
        checkinDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), day);
    }
    
    let checkoutDate = new Date(checkinDate.getTime());
    
    // Read selected nights passed from Flexible search on homepage
    let savedNights = localStorage.getItem('selectedNights');
    if (savedNights) {
        checkoutDate.setDate(checkoutDate.getDate() + parseInt(savedNights));
    } else {
        checkoutDate.setDate(checkoutDate.getDate() + 1);
    }
    
    let guestCounts = { adults: 1, children: 0, infants: 0, pets: 0 };
    let totalGuests = 1;

    // Elements
    const datesBtn = document.getElementById('details-dates-btn');
    const guestsBtn = document.getElementById('details-guests-btn');
    const datesPopup = document.getElementById('details-calendar-popup');
    const guestsPopup = document.getElementById('details-guests-popup');
    const chevron = document.getElementById('guests-chevron');
    
    // Popups Toggling
    function closePopups() {
        datesPopup.classList.add('hidden');
        guestsPopup.classList.add('hidden');
        if (chevron) chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }

    datesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = datesPopup.classList.contains('hidden');
        closePopups();
        if (isHidden) datesPopup.classList.remove('hidden');
    });

    guestsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = guestsPopup.classList.contains('hidden');
        closePopups();
        if (isHidden) {
            guestsPopup.classList.remove('hidden');
            if (chevron) chevron.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!datesPopup.contains(e.target) && !guestsPopup.contains(e.target)) {
            closePopups();
        }
    });
    
    document.getElementById('close-guests-btn').addEventListener('click', closePopups);
    document.getElementById('close-dates-btn').addEventListener('click', closePopups);

    // GUESTS LOGIC
    const updateGuestsDisplay = () => {
        totalGuests = guestCounts.adults + guestCounts.children;
        document.getElementById('widget-guests-display').textContent = `${totalGuests} guest${totalGuests > 1 ? 's' : ''}`;
        
        // Update counters
        for (const type in guestCounts) {
            document.getElementById(`count-${type}`).textContent = guestCounts[type];
            const minusBtn = document.querySelector(`.minus[data-type="${type}"]`);
            const plusBtn = document.querySelector(`.plus[data-type="${type}"]`);
            
            if (minusBtn) {
                if (type === 'adults') minusBtn.disabled = guestCounts[type] <= 1;
                else minusBtn.disabled = guestCounts[type] <= 0;
            }
            
            if (plusBtn && (type === 'adults' || type === 'children')) {
                plusBtn.disabled = totalGuests >= property.maxGuests;
            }
        }
    };

    document.querySelectorAll('#details-guests-popup .ctrl-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.getAttribute('data-type');
            const isPlus = e.target.classList.contains('plus');
            
            if (isPlus) {
                guestCounts[type]++;
            } else {
                guestCounts[type]--;
            }
            updateGuestsDisplay();
        });
    });

    // CALENDAR LOGIC
    let selectionStep = 0; // 0 = picking checkin, 1 = picking checkout
    let tempCheckin = null;
    let tempCheckout = null;

    const formatDateStr = (date) => `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

    function renderCalendar() {
        const container = document.getElementById('calendar-months-container');
        container.innerHTML = '';
        
        const today = new Date();
        const refDate = tempCheckin || today;
        const startMonth = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
        
        for (let i = 0; i < 2; i++) {
            const m = new Date(startMonth.getFullYear(), startMonth.getMonth() + i, 1);
            const monthName = m.toLocaleString('default', { month: 'long', year: 'numeric' });
            
            let daysHTML = '';
            const firstDayIndex = m.getDay();
            const daysInMonth = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
            
            for (let j = 0; j < firstDayIndex; j++) {
                daysHTML += `<span class="cal-day empty"></span>`;
            }
            
            for (let day = 1; day <= daysInMonth; day++) {
                const iterDate = new Date(m.getFullYear(), m.getMonth(), day);
                iterDate.setHours(0,0,0,0);
                today.setHours(0,0,0,0);
                
                let classes = 'cal-day';
                if (iterDate < today) {
                    classes += ' past';
                } else {
                    if (tempCheckin && iterDate.getTime() === tempCheckin.getTime()) classes += ' selected';
                    if (tempCheckout && iterDate.getTime() === tempCheckout.getTime()) classes += ' selected';
                    if (tempCheckin && tempCheckout && iterDate > tempCheckin && iterDate < tempCheckout) {
                        classes += ' in-range';
                    }
                }
                
                daysHTML += `<span class="${classes}" data-date="${iterDate.toISOString()}">${day}</span>`;
            }

            container.innerHTML += `
                <div class="cal-month">
                    <div class="cal-month-header">
                        ${i === 0 ? '<i class="fa-solid fa-chevron-left cal-arrow" style="visibility:hidden"></i>' : ''}
                        <span>${monthName}</span>
                        ${i === 1 ? '<i class="fa-solid fa-chevron-right cal-arrow"></i>' : ''}
                    </div>
                    <div class="cal-weekdays">
                        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                    </div>
                    <div class="cal-days">${daysHTML}</div>
                </div>
            `;
        }

        // Attach click events
        container.querySelectorAll('.cal-day:not(.past):not(.empty)').forEach(dayEl => {
            dayEl.addEventListener('click', (e) => {
                e.stopPropagation();
                const clickedDate = new Date(dayEl.getAttribute('data-date'));
                clickedDate.setHours(0,0,0,0);
                
                if (selectionStep === 0) {
                    tempCheckin = clickedDate;
                    tempCheckout = null;
                    selectionStep = 1;
                } else {
                    if (clickedDate <= tempCheckin) {
                        tempCheckin = clickedDate;
                        tempCheckout = null;
                    } else {
                        tempCheckout = clickedDate;
                        selectionStep = 0;
                        checkinDate = tempCheckin;
                        checkoutDate = tempCheckout;
                        updateDatesDisplay();
                    }
                }
                renderCalendar();
            });
        });
    }

    function updateDatesDisplay() {
        document.getElementById('widget-checkin-display').textContent = formatDateStr(checkinDate);
        document.getElementById('popup-checkin-display').textContent = formatDateStr(checkinDate);
        
        document.getElementById('widget-checkout-display').textContent = formatDateStr(checkoutDate);
        document.getElementById('popup-checkout-display').textContent = formatDateStr(checkoutDate);

        // Update Price
        const diffDays = Math.max(1, Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)));
        selectedNights = diffDays;
        document.getElementById('widget-price-total').textContent = `RM ${property.pricePerNight * selectedNights}`;
        document.getElementById('widget-price-nights').textContent = `for ${selectedNights} night${selectedNights > 1 ? 's' : ''}`;
    }

    document.getElementById('clear-dates-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        tempCheckin = null;
        tempCheckout = null;
        selectionStep = 0;
        renderCalendar();
    });

    // Initialization
    tempCheckin = checkinDate;
    tempCheckout = checkoutDate;
    updateGuestsDisplay();
    updateDatesDisplay();
    renderCalendar();

    // 5. Connect "Book" button
    const reserveBtn = document.getElementById('details-reserve-btn');
    if (reserveBtn) {
        reserveBtn.addEventListener('click', () => {
            openComparisonModal(property);
        });
    }

    // === 6. Setup Nav Profile (from data.js) ===
    if (typeof setupNavProfile === 'function') setupNavProfile();

    // === 7. Disruptive Comparison Modal Logic ===
    const comparisonModal = document.getElementById('comparison-modal');
    const closeModalBtn = document.getElementById('close-modal');

    function openComparisonModal(property) {
        document.getElementById('comp-img').src = property.imgUrl;
        document.getElementById('comp-title').textContent = property.title;
        document.getElementById('comp-guests').textContent = `Up to ${property.maxGuests} guests`;
        
        const airbnbTotalPrice = property.pricePerNight * selectedNights;
        document.getElementById('comp-price').textContent = property.pricePerNight;
        document.getElementById('stay-nights').textContent = selectedNights;

        // Dynamic Comparison Engine
        let hotelTierName = "Standard 4-Star Hotel";
        let hotelImageUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop";
        let baseHotelPrice = 300; // default
        let GUESTS_PER_ROOM = 2;
        let roomsNeeded = 1;

        if (property.propertyType === "Luxury villa") {
            hotelTierName = "5-Star Luxury Resort";
            hotelImageUrl = "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop";
            baseHotelPrice = 650;
        } else if (property.propertyType === "Shared room") {
            hotelTierName = "Budget Hostel / 2-Star Hotel";
            hotelImageUrl = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop";
            baseHotelPrice = 120;
        } else {
            // Entire home / Apartment
            hotelTierName = "Standard 4-Star Hotel";
            hotelImageUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop";
            
            // Location modifier for standard hotels
            if (property.location === "Kuala Lumpur" || property.location === "Penang") {
                baseHotelPrice = 320;
            } else if (property.location === "Langkawi" || property.location === "Sabah") {
                baseHotelPrice = 380;
            } else {
                baseHotelPrice = 250;
            }
        }

        roomsNeeded = Math.ceil(property.maxGuests / GUESTS_PER_ROOM);
        const hotelPricePerNight = roomsNeeded * baseHotelPrice;
        const totalHotelPrice = hotelPricePerNight * selectedNights;

        // Update DOM for Hotel
        const hotelTitleEl = document.getElementById('hotel-comp-title');
        const hotelImgEl = document.getElementById('hotel-comp-img');
        if (hotelTitleEl) hotelTitleEl.textContent = hotelTierName;
        if (hotelImgEl) hotelImgEl.src = hotelImageUrl;

        document.getElementById('hotel-rooms').textContent = roomsNeeded;
        document.getElementById('hotel-price').textContent = hotelPricePerNight;

        const savings = totalHotelPrice - airbnbTotalPrice;
        const savingsEl = document.getElementById('total-savings');
        
        if (savings > 0) {
            savingsEl.textContent = `RM ${savings}`;
            savingsEl.className = "text-green";
        } else {
            savingsEl.textContent = `RM 0 (Hotel is cheaper)`;
            savingsEl.className = "text-red";
        }

        if (comparisonModal) comparisonModal.classList.remove('hidden');
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            comparisonModal.classList.add('hidden');
        });
    }

    if (comparisonModal) {
        comparisonModal.addEventListener('click', (e) => {
            if (e.target === comparisonModal) {
                comparisonModal.classList.add('hidden');
            }
        });
    }

    // === 8. Booking Action ===
    const bookNowBtn = document.getElementById('book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', () => {
            if (localStorage.getItem('isLoggedIn') !== 'true') {
                comparisonModal.classList.add('hidden');
                document.getElementById('login-prompt-modal').classList.remove('hidden');
                return;
            }

            comparisonModal.classList.add('hidden');
            const successModal = document.getElementById('success-modal');
            
            const finalPrice = property.pricePerNight * selectedNights;
            document.getElementById('success-prop-name').textContent = property.title;
            document.getElementById('success-total-price').textContent = `RM ${finalPrice}`;
            
            const newBooking = {
                title: property.title,
                location: property.location,
                imgUrl: property.imgUrl,
                nights: selectedNights,
                totalPrice: finalPrice,
                guests: `${totalGuests} guest${totalGuests > 1 ? 's' : ''}`,
                dateBooked: new Date().toLocaleDateString(),
                checkin: formatDateStr(checkinDate),
                checkout: formatDateStr(checkoutDate)
            };
            
            const existingBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
            existingBookings.push(newBooking);
            localStorage.setItem('myBookings', JSON.stringify(existingBookings));
            
            if (successModal) successModal.classList.remove('hidden');
        });
    }

    const closeSuccessBtn = document.getElementById('close-success');
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            document.getElementById('success-modal').classList.add('hidden');
        });
    }

    const closeLoginBtn = document.getElementById('close-login-prompt');
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', () => {
            document.getElementById('login-prompt-modal').classList.add('hidden');
        });
    }

    // === Description & Amenities Modals ===
    const descModal = document.getElementById('desc-modal');
    const amenitiesModal = document.getElementById('amenities-modal');
    const descBtn = document.querySelector('.property-description .show-more-btn');
    const amenitiesBtn = document.querySelector('.amenities-section .show-more-btn');
    const closeDescBtn = document.getElementById('close-desc-modal');
    const closeAmenitiesBtn = document.getElementById('close-amenities-modal');

    if (descBtn && descModal) {
        descBtn.addEventListener('click', () => {
            descModal.classList.remove('hidden');
        });
    }
    if (closeDescBtn) {
        closeDescBtn.addEventListener('click', () => {
            descModal.classList.add('hidden');
        });
    }
    if (amenitiesBtn && amenitiesModal) {
        amenitiesBtn.addEventListener('click', () => {
            amenitiesModal.classList.remove('hidden');
        });
    }
    if (closeAmenitiesBtn) {
        closeAmenitiesBtn.addEventListener('click', () => {
            amenitiesModal.classList.add('hidden');
        });
    }

    // === Reviews Modal ===
    const reviewsModal = document.getElementById('reviews-modal');
    const reviewsBtn = document.querySelector('.reviews-section > .show-more-btn');
    const closeReviewsBtn = document.getElementById('close-reviews-modal');

    if (reviewsBtn && reviewsModal) {
        reviewsBtn.addEventListener('click', () => {
            reviewsModal.classList.remove('hidden');
        });
    }
    if (closeReviewsBtn) {
        closeReviewsBtn.addEventListener('click', () => {
            reviewsModal.classList.add('hidden');
        });
    }
});
