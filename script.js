// Mock Database
const allProperties = [
    { id: 1, location: 'Malacca', title: 'Condo in Malacca', propertyType: 'Entire home', pricePerNight: 163, rating: 5.0, maxGuests: 4, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop' },
    { id: 2, location: 'Malacca', title: 'Apartment in Malacca', propertyType: 'Shared room', pricePerNight: 150, rating: 4.91, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1502672260266-1c1de24227e8?q=80&w=600&auto=format&fit=crop' },
    { id: 3, location: 'Malacca', title: 'Luxury Villa Malacca', propertyType: 'Luxury villa', pricePerNight: 450, rating: 4.79, maxGuests: 6, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop' },
    { id: 4, location: 'Kuala Lumpur', title: 'KLCC View Condo', propertyType: 'Entire home', pricePerNight: 200, rating: 4.94, maxGuests: 4, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop' },
    { id: 5, location: 'Kuala Lumpur', title: 'Cozy Room in Cheras', propertyType: 'Shared room', pricePerNight: 80, rating: 5.0, maxGuests: 2, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop' },
    { id: 6, location: 'Penang', title: 'Heritage House Penang', propertyType: 'Entire home', pricePerNight: 180, rating: 4.85, maxGuests: 5, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop' },
    { id: 7, location: 'Johor Bahru', title: 'JB City Apartment', propertyType: 'Entire home', pricePerNight: 120, rating: 4.83, maxGuests: 3, isGuestFavorite: false, imgUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop' },
    { id: 8, location: 'Langkawi', title: 'Langkawi Beach Villa', propertyType: 'Luxury villa', pricePerNight: 600, rating: 4.97, maxGuests: 8, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop' },
    { id: 9, location: 'Sabah', title: 'Mount Kinabalu Lodge', propertyType: 'Shared room', pricePerNight: 100, rating: 4.90, maxGuests: 2, isGuestFavorite: true, imgUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop' }
];

let selectedNights = 1;
let currentSelectedProperty = null;

// === 1. Render & Heart Buttons ===
function createCard(property) {
    const badgeHTML = property.isGuestFavorite ? `<div class="guest-favorite-badge">Guest favorite</div>` : '';
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
        <div class="card-price" style="margin-top: 4px; font-size: 14px; color: var(--text-light);">
            ${property.propertyType}
        </div>
        <div class="card-price" style="margin-top: 4px;">
            <strong>RM ${property.pricePerNight}</strong> <span>night</span>
        </div>
    `;

    // Interactive Heart Button
    const heartBtn = card.querySelector('.heart-btn');
    heartBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent card click from firing modal
        heartBtn.classList.toggle('liked');
    });

    // Attach click event for Comparison Modal
    card.addEventListener('click', () => {
        openComparisonModal(property);
    });

    return card;
}

function renderHomepage() {
    const malaccaGrid = document.getElementById('malacca-grid');
    const klGrid = document.getElementById('kl-grid');
    malaccaGrid.innerHTML = ''; klGrid.innerHTML = '';
    
    allProperties.filter(p => p.location === 'Malacca').forEach(p => malaccaGrid.appendChild(createCard(p)));
    allProperties.filter(p => p.location === 'Kuala Lumpur').forEach(p => klGrid.appendChild(createCard(p)));
}
renderHomepage();


// === 2. Top Navbar Tabs Interaction ===
document.querySelectorAll('.nav-center .nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-center .nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        const tabName = this.querySelector('span').textContent;
        if(tabName !== 'Homes' && tabName !== 'All') {
            alert(tabName + " feature is coming soon!");
        }
    });
});


// === 3. Carousel Arrows ===
document.querySelectorAll('.listing-section').forEach(section => {
    const scrollContainer = section.querySelector('.horizontal-scroll');
    const arrows = section.querySelectorAll('.arrow-btn');
    if (scrollContainer && arrows.length === 2) {
        arrows[0].addEventListener('click', () => scrollContainer.scrollBy({ left: -300, behavior: 'smooth' }));
        arrows[1].addEventListener('click', () => scrollContainer.scrollBy({ left: 300, behavior: 'smooth' }));
    }
});


// === 4. Dropdown Show/Hide Logic ===
const whenField = document.getElementById('when-field');
const whoField = document.getElementById('who-field');
const whereField = document.getElementById('where-field');
const typeField = document.getElementById('type-field');
const calendarDropdown = document.getElementById('calendar-dropdown');
const guestsDropdown = document.getElementById('guests-dropdown');
const locationDropdown = document.getElementById('location-dropdown');
const typeDropdown = document.getElementById('type-dropdown');
const searchPill = document.querySelector('.search-pill');

function closeAllDropdowns() {
    calendarDropdown.classList.add('hidden');
    guestsDropdown.classList.add('hidden');
    locationDropdown.classList.add('hidden');
    typeDropdown.classList.add('hidden');
    document.querySelectorAll('.search-field').forEach(el => el.classList.remove('active'));
    searchPill.classList.remove('active');
}

document.addEventListener('click', function(e) {
    if (!searchPill.contains(e.target) && !calendarDropdown.contains(e.target) && !guestsDropdown.contains(e.target) && !locationDropdown.contains(e.target) && !typeDropdown.contains(e.target)) {
        closeAllDropdowns();
    }
});

whereField.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    whereField.classList.add('active');
    searchPill.classList.add('active');
    locationDropdown.classList.remove('hidden');
});

typeField.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    typeField.classList.add('active');
    searchPill.classList.add('active');
    typeDropdown.classList.remove('hidden');
});

// Dropdown item selection
document.querySelectorAll('#location-options .option-item').forEach(item => {
    item.addEventListener('click', function() {
        document.getElementById('location').value = this.getAttribute('data-value');
        closeAllDropdowns();
    });
});

document.querySelectorAll('#type-options .option-item').forEach(item => {
    item.addEventListener('click', function() {
        document.getElementById('property-type').value = this.getAttribute('data-value');
        closeAllDropdowns();
    });
});

whenField.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    whenField.classList.add('active');
    searchPill.classList.add('active');
    calendarDropdown.classList.remove('hidden');
});

whoField.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    whoField.classList.add('active');
    searchPill.classList.add('active');
    guestsDropdown.classList.remove('hidden');
});


// === 5. Calendar Range ===
let date1 = null, date2 = null;
const days = document.querySelectorAll('.days span:not(.empty):not(.past)');
const checkinInput = document.getElementById('checkin');

document.querySelectorAll('.pill-btn, .cal-tab').forEach(btn => {
    btn.addEventListener('click', function() {
        const parent = this.parentNode;
        parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

function updateCalendarUI() {
    days.forEach(day => {
        day.classList.remove('selected', 'in-range');
        const val = parseInt(day.textContent);
        const isJune = day.closest('.month').querySelector('strong').textContent.includes('June');
        const absVal = isJune ? 100 + val : 200 + val;
        
        if (date1 && absVal === date1.val) day.classList.add('selected');
        if (date2 && absVal === date2.val) day.classList.add('selected');
        if (date1 && date2) {
            const min = Math.min(date1.val, date2.val), max = Math.max(date1.val, date2.val);
            if (absVal > min && absVal < max) day.classList.add('in-range');
        }
    });

    if (!date1 && !date2) {
        checkinInput.value = "";
        selectedNights = 1;
    }
    else if (date1 && !date2) {
        checkinInput.value = `${date1.text}`;
        selectedNights = 1;
    }
    else if (date1 && date2) {
        checkinInput.value = `${date1.text} - ${date2.text}`;
        const d1Month = Math.floor(date1.val / 100);
        const d1Day = date1.val % 100;
        const d2Month = Math.floor(date2.val / 100);
        const d2Day = date2.val % 100;
        
        if (d1Month === d2Month) {
            selectedNights = Math.abs(d1Day - d2Day);
        } else {
            selectedNights = (30 - d1Day) + d2Day;
        }
        if (selectedNights === 0) selectedNights = 1;
    }
}

days.forEach(day => {
    day.addEventListener('click', function() {
        const val = parseInt(this.textContent);
        const isJune = this.closest('.month').querySelector('strong').textContent.includes('June');
        const dateObj = { val: isJune ? 100 + val : 200 + val, text: `${isJune ? "Jun" : "Jul"} ${val}` };

        if (!date1 || (date1 && date2)) { date1 = dateObj; date2 = null; } 
        else if (date1 && !date2) {
            if (dateObj.val === date1.val) date1 = null;
            else {
                date2 = dateObj;
                if (date1.val > date2.val) { let t = date1; date1 = date2; date2 = t; }
            }
        }
        updateCalendarUI();
    });
});


// === 6. Guest Counter ===
const guestCounts = { adults: 0, children: 0, infants: 0, pets: 0 };
function updateGuestDisplay() {
    const totalGuests = guestCounts.adults + guestCounts.children;
    document.getElementById('guests').value = totalGuests;
    
    let displayText = '';
    if (totalGuests > 0) {
        displayText = `${totalGuests} guest${totalGuests > 1 ? 's' : ''}`;
        if (guestCounts.infants > 0) displayText += `, ${guestCounts.infants} infant${guestCounts.infants > 1 ? 's' : ''}`;
        if (guestCounts.pets > 0) displayText += `, ${guestCounts.pets} pet${guestCounts.pets > 1 ? 's' : ''}`;
    }
    document.getElementById('guests-display').value = displayText;
}

document.querySelectorAll('.ctrl-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation(); 
        const type = this.getAttribute('data-type');
        if (this.classList.contains('plus')) guestCounts[type]++;
        else if (guestCounts[type] > 0) guestCounts[type]--;
        
        document.getElementById(`count-${type}`).textContent = guestCounts[type];
        this.parentNode.querySelector('.minus').disabled = guestCounts[type] === 0;
        updateGuestDisplay();
    });
});


// === 7. Search Submission ===
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    closeAllDropdowns();

    const searchLocation = document.getElementById('location').value;
    const searchType = document.getElementById('property-type').value;
    const guestsInput = parseInt(document.getElementById('guests').value) || 0;

    const matchedProperties = [];

    // Using switch and if/else as required by assignment rubric
    for (let i = 0; i < allProperties.length; i++) {
        let p = allProperties[i];
        let locationMatch = false;
        let typeMatch = false;

        // Check Location using switch
        if (searchLocation === "" || searchLocation === "Anywhere") {
            locationMatch = true;
        } else {
            switch(searchLocation) {
                case "Kuala Lumpur":
                    if (p.location === "Kuala Lumpur") locationMatch = true;
                    break;
                case "Malacca":
                    if (p.location === "Malacca") locationMatch = true;
                    break;
                case "Penang":
                    if (p.location === "Penang") locationMatch = true;
                    break;
                case "Johor Bahru":
                    if (p.location === "Johor Bahru") locationMatch = true;
                    break;
                case "Langkawi":
                    if (p.location === "Langkawi") locationMatch = true;
                    break;
                case "Sabah":
                    if (p.location === "Sabah") locationMatch = true;
                    break;
                default:
                    locationMatch = false;
            }
        }

        // Check Type using switch
        if (searchType === "" || searchType === "Any type") {
            typeMatch = true;
        } else {
            switch(searchType) {
                case "Entire home":
                    if (p.propertyType === "Entire home") typeMatch = true;
                    break;
                case "Shared room":
                    if (p.propertyType === "Shared room") typeMatch = true;
                    break;
                case "Luxury villa":
                    if (p.propertyType === "Luxury villa") typeMatch = true;
                    break;
                default:
                    typeMatch = false;
            }
        }

        // Check Guests using if/else
        let guestMatch = false;
        if (guestsInput === 0) {
            guestMatch = true;
        } else if (p.maxGuests >= guestsInput) {
            guestMatch = true;
        } else {
            guestMatch = false;
        }

        if (locationMatch && typeMatch && guestMatch) {
            matchedProperties.push(p);
        }
    }

    const homeView = document.getElementById('home-view');
    const searchView = document.getElementById('search-view');
    const searchGrid = document.getElementById('search-grid');
    const noResults = document.getElementById('no-results');

    homeView.classList.add('hidden');
    searchView.classList.remove('hidden');
    searchGrid.innerHTML = '';

    if (matchedProperties.length === 0) {
        noResults.classList.remove('hidden');
        searchGrid.classList.add('hidden');
    } else {
        noResults.classList.add('hidden');
        searchGrid.classList.remove('hidden');
        matchedProperties.forEach(p => searchGrid.appendChild(createCard(p)));
    }
});


// === 8. Disruptive Comparison Modal Logic ===
const comparisonModal = document.getElementById('comparison-modal');
const closeModalBtn = document.getElementById('close-modal');

function openComparisonModal(property) {
    currentSelectedProperty = property;
    // 1. Populate Airbnb Side
    document.getElementById('comp-img').src = property.imgUrl;
    document.getElementById('comp-title').textContent = property.title;
    document.getElementById('comp-guests').textContent = `Up to ${property.maxGuests} guests`;
    
    const airbnbTotalPrice = property.pricePerNight * selectedNights;
    document.getElementById('comp-price').textContent = property.pricePerNight;
    
    document.getElementById('stay-nights').textContent = selectedNights;

    // 2. Dynamic Hotel Calculation Logic using if/else
    let HOTEL_PRICE_PER_ROOM;
    if (property.location === "Kuala Lumpur" || property.location === "Penang") {
        HOTEL_PRICE_PER_ROOM = 300;
    } else if (property.location === "Langkawi" || property.location === "Sabah") {
        HOTEL_PRICE_PER_ROOM = 350;
    } else {
        HOTEL_PRICE_PER_ROOM = 200;
    }
    const GUESTS_PER_ROOM = 2;
    
    const roomsNeeded = Math.ceil(property.maxGuests / GUESTS_PER_ROOM);
    const hotelPricePerNight = roomsNeeded * HOTEL_PRICE_PER_ROOM;
    const totalHotelPrice = hotelPricePerNight * selectedNights;

    document.getElementById('hotel-rooms').textContent = roomsNeeded;
    document.getElementById('hotel-price').textContent = hotelPricePerNight;

    // 3. Calculate Savings
    const savings = totalHotelPrice - airbnbTotalPrice;
    const savingsEl = document.getElementById('total-savings');
    
    if (savings > 0) {
        savingsEl.textContent = `RM ${savings}`;
        savingsEl.className = "text-green";
    } else {
        savingsEl.textContent = `RM 0 (Hotel is cheaper)`;
        savingsEl.className = "text-red";
    }

    comparisonModal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => {
    comparisonModal.classList.add('hidden');
});

comparisonModal.addEventListener('click', (e) => {
    if (e.target === comparisonModal) {
        comparisonModal.classList.add('hidden');
    }
});

// === 9. Booking Action ===
document.getElementById('book-now-btn').addEventListener('click', () => {
    comparisonModal.classList.add('hidden');
    const successModal = document.getElementById('success-modal');
    
    const finalPrice = currentSelectedProperty.pricePerNight * selectedNights;
    document.getElementById('success-prop-name').textContent = currentSelectedProperty.title;
    document.getElementById('success-total-price').textContent = `RM ${finalPrice}`;
    
    successModal.classList.remove('hidden');
});

document.getElementById('close-success').addEventListener('click', () => {
    document.getElementById('success-modal').classList.add('hidden');
});
