// ========================================================
// INDEX.JS - HOMEPAGE INTERACTIVE LOGIC
// ========================================================
// This file handles all the interactive behavior for the
// homepage (index.html). It includes:
// 1. Profile dropdown management
// 2. Property card rendering and navigation
// 3. Search bar field toggling and dropdown management
// 4. Calendar date selection (Exact Dates mode)
// 5. Flexible date selection (Weekend/Week/Month mode)
// 6. Guest counter management
// 7. Search form submission and result filtering
// 8. Carousel arrow navigation
// 9. Top navigation tab interactions
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    // ========================================================
    // 1. SETUP & INITIALIZATION
    // Initialize user profile settings and clear temporary 
    // search states to ensure a fresh homepage load.
    // ========================================================
    if (typeof setupNavProfile === 'function') setupNavProfile();

    // Clear old search states so default homepage clicks don't inherit them
    localStorage.removeItem('selectedNights');
    localStorage.removeItem('flexMonth');
    localStorage.removeItem('exactCheckinVal');

    // ========================================================
    // 2. PROPERTY CARD RENDERING SYSTEM
    // Function to dynamically generate HTML for a property card.
    // Handles custom pricing if the user searches by dates.
    // Parameters:
    //   - property: The property object from allProperties
    //   - customDateStr: Optional date string for search results
    //   - customNights: Optional number of nights for price calculation
    // Returns: A DOM element (div.property-card)
    // ========================================================
    function createCard(property, customDateStr = null, customNights = null) {
        // Generate guest favorite badge if applicable
        const badgeHTML = property.isGuestFavorite ? `<div class="guest-favorite-badge">Guest favorite</div>` : '';
        const card = document.createElement('div');
        card.className = 'property-card';
        
        // Build price display - show per night or total with nights
        let priceDisplay = `<strong>RM ${property.pricePerNight}</strong> <span>night</span>`;
        let dateDisplay = property.propertyType;
        
        if (customDateStr && customNights) {
            const totalPrice = property.pricePerNight * customNights;
            priceDisplay = `<strong>RM ${totalPrice}</strong> <span style="text-decoration: underline;">for ${customNights} nights</span>`;
            dateDisplay = `<span style="color: var(--text-dark);">${customDateStr}</span>`;
        }
        
        // Build the card HTML structure
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
                ${dateDisplay}
            </div>
            <div class="card-price" style="margin-top: 4px;">
                ${priceDisplay}
            </div>
        `;

        // ========================================================
        // INTERACTIVE HEART BUTTON
        // Toggles the 'liked' class on click, with event propagation
        // stopped to prevent navigating to the details page.
        // ========================================================
        const heartBtn = card.querySelector('.heart-btn');
        heartBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            heartBtn.classList.toggle('liked');
        });

        // ========================================================
        // CARD NAVIGATION
        // Clicking anywhere on the card (except the heart button)
        // navigates to the property details page with the property ID.
        // ========================================================
        card.addEventListener('click', () => {
            window.location.href = `details.html?id=${property.id}`;
        });

        return card;
    }

    // ========================================================
    // RENDER HOMEPAGE
    // Populates the "Malacca" and "Kuala Lumpur" horizontal
    // scroll sections with property cards.
    // ========================================================
    function renderHomepage() {
        const malaccaGrid = document.getElementById('malacca-grid');
        const klGrid = document.getElementById('kl-grid');
        if (malaccaGrid) malaccaGrid.innerHTML = ''; 
        if (klGrid) klGrid.innerHTML = '';
        
        if (malaccaGrid) allProperties.filter(p => p.location === 'Malacca').forEach(p => malaccaGrid.appendChild(createCard(p)));
        if (klGrid) allProperties.filter(p => p.location === 'Kuala Lumpur').forEach(p => klGrid.appendChild(createCard(p)));
    }
    renderHomepage();

    // ========================================================
    // 3. TOP NAVIGATION TABS INTERACTION
    // Handles clicking on "All", "Homes", etc., and shows alerts
    // for features that are not yet implemented.
    // ========================================================
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

    // ========================================================
    // 4. CAROUSEL ARROWS LOGIC
    // Enables horizontal scrolling for property grids on desktop
    // when clicking the left/right chevron arrows.
    // Each listing section has its own pair of arrows.
    // ========================================================
    document.querySelectorAll('.listing-section').forEach(section => {
        const scrollContainer = section.querySelector('.horizontal-scroll');
        const arrows = section.querySelectorAll('.arrow-btn');
        if (scrollContainer && arrows.length === 2) {
            arrows[0].addEventListener('click', () => scrollContainer.scrollBy({ left: -300, behavior: 'smooth' }));
            arrows[1].addEventListener('click', () => scrollContainer.scrollBy({ left: 300, behavior: 'smooth' }));
        }
    });

    // ========================================================
    // 5. SEARCH BAR DROPDOWN LOGIC
    // Manages the visibility of the dropdown panels (Where, Type, 
    // When, Who) ensuring only one panel is open at a time.
    // Clicking outside the search bar closes all dropdowns.
    // ========================================================
    const whenField = document.getElementById('when-field');
    const whoField = document.getElementById('who-field');
    const whereField = document.getElementById('where-field');
    const typeField = document.getElementById('type-field');
    const calendarDropdown = document.getElementById('calendar-dropdown');
    const guestsDropdown = document.getElementById('guests-dropdown');
    const locationDropdown = document.getElementById('location-dropdown');
    const typeDropdown = document.getElementById('type-dropdown');
    const searchPill = document.querySelector('.search-pill');

    /**
     * closeAllDropdowns - Hides all dropdown panels and removes
     * the 'active' class from all search fields and the search pill.
     */
    function closeAllDropdowns() {
        if (calendarDropdown) calendarDropdown.classList.add('hidden');
        if (guestsDropdown) guestsDropdown.classList.add('hidden');
        if (locationDropdown) locationDropdown.classList.add('hidden');
        if (typeDropdown) typeDropdown.classList.add('hidden');
        document.querySelectorAll('.search-field').forEach(el => el.classList.remove('active'));
        if (searchPill) searchPill.classList.remove('active');
    }

    // Global click listener - close dropdowns when clicking outside the search area
    document.addEventListener('click', function(e) {
        if (searchPill && searchPill.contains(e.target)) return;
        if (calendarDropdown && calendarDropdown.contains(e.target)) return;
        if (guestsDropdown && guestsDropdown.contains(e.target)) return;
        if (locationDropdown && locationDropdown.contains(e.target)) return;
        if (typeDropdown && typeDropdown.contains(e.target)) return;
        
        closeAllDropdowns();
    });

    // ========================================================
    // WHERE FIELD - Opens location dropdown
    // ========================================================
    if (whereField) {
        whereField.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllDropdowns();
            whereField.classList.add('active');
            if (searchPill) searchPill.classList.add('active');
            if (locationDropdown) locationDropdown.classList.remove('hidden');
        });
    }

    // ========================================================
    // TYPE FIELD - Opens type dropdown
    // ========================================================
    if (typeField) {
        typeField.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllDropdowns();
            typeField.classList.add('active');
            if (searchPill) searchPill.classList.add('active');
            if (typeDropdown) typeDropdown.classList.remove('hidden');
        });
    }

    // ========================================================
    // LOCATION OPTIONS - Click handler
    // Sets the location input value and auto-advances to the
    // Type field for a smooth UX flow.
    // ========================================================
    document.querySelectorAll('#location-options .option-item').forEach(item => {
        item.addEventListener('click', function() {
            const locInput = document.getElementById('location');
            if (locInput) locInput.value = this.getAttribute('data-value');
            // Smoothly auto-advance to Type field
            if (typeField) typeField.click();
            else closeAllDropdowns();
        });
    });

    // ========================================================
    // TYPE OPTIONS - Click handler
    // Sets the type input value and auto-advances to the
    // When (Dates) field for a smooth UX flow.
    // ========================================================
    document.querySelectorAll('#type-options .option-item').forEach(item => {
        item.addEventListener('click', function() {
            const typeInput = document.getElementById('property-type');
            if (typeInput) typeInput.value = this.getAttribute('data-value');
            // Smoothly auto-advance to When (Dates) field
            if (whenField) whenField.click();
            else closeAllDropdowns();
        });
    });

    // ========================================================
    // WHEN FIELD - Opens calendar dropdown
    // ========================================================
    if (whenField) {
        whenField.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllDropdowns();
            whenField.classList.add('active');
            if (searchPill) searchPill.classList.add('active');
            if (calendarDropdown) calendarDropdown.classList.remove('hidden');
        });
    }

    // ========================================================
    // WHO FIELD - Opens guests dropdown
    // ========================================================
    if (whoField) {
        whoField.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllDropdowns();
            whoField.classList.add('active');
            if (searchPill) searchPill.classList.add('active');
            if (guestsDropdown) guestsDropdown.classList.remove('hidden');
        });
    }

    // ========================================================
    // 6. FLEXIBLE VS DATES TOGGLE
    // Switches between "Exact Dates" and "Flexible" modes
    // in the calendar dropdown.
    // ========================================================
    const tabDates = document.getElementById('tab-dates');
    const tabFlexible = document.getElementById('tab-flexible');
    const viewDates = document.getElementById('calendar-view-dates');
    const viewFlexible = document.getElementById('calendar-view-flexible');
    const calFooter = document.getElementById('calendar-footer');

    let isFlexibleSearch = false;
    let flexStayLength = 'Week';
    let flexMonth = 'July';

    /**
     * updateFlexibleInput - Updates the "When" field display
     * to show the selected flexible stay length and month.
     */
    function updateFlexibleInput() {
        if (checkinInput) {
            checkinInput.value = `${flexStayLength} in ${flexMonth.substring(0,3)}`;
        }
    }

    if(tabDates && tabFlexible) {
        // Exact Dates tab
        tabDates.addEventListener('click', (e) => {
            e.stopPropagation();
            tabFlexible.classList.remove('active');
            tabDates.classList.add('active');
            viewFlexible.classList.add('hidden');
            viewDates.classList.remove('hidden');
            if(calFooter) calFooter.classList.remove('hidden');
            isFlexibleSearch = false;
            updateCalendarUI(); // restore exact dates
        });
        
        // Flexible tab
        tabFlexible.addEventListener('click', (e) => {
            e.stopPropagation();
            tabDates.classList.remove('active');
            tabFlexible.classList.add('active');
            viewDates.classList.add('hidden');
            viewFlexible.classList.remove('hidden');
            if(calFooter) calFooter.classList.add('hidden');
            isFlexibleSearch = true;
            updateFlexibleInput();
        });
    }

    // ========================================================
    // FLEXIBLE OPTIONS - Stay Length & Month Selection
    // Clicking a stay button or month button updates the
    // selection and refreshes the display.
    // ========================================================
    document.querySelectorAll('.stay-btn, .month-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (btn.classList.contains('stay-btn')) {
                document.querySelectorAll('.stay-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                flexStayLength = btn.textContent.trim();
            } else {
                document.querySelectorAll('.month-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                flexMonth = btn.querySelector('span').textContent.trim();
            }
            if (isFlexibleSearch) updateFlexibleInput();
        });
    });

    // ========================================================
    // MONTHS CAROUSEL SCROLL
    // Clicking the arrow button scrolls the months horizontally.
    // ========================================================
    const monthsScroll = document.querySelector('.months-scroll');
    const monthsArrowBtn = document.querySelector('.months-arrow-btn');
    if (monthsScroll && monthsArrowBtn) {
        monthsArrowBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            monthsScroll.scrollBy({ left: 150, behavior: 'smooth' });
        });
    }

    // ========================================================
    // 7. CALENDAR RANGE SELECTION (Exact Dates)
    // Handles selecting check-in and check-out dates with
    // a range visualization (in-range class).
    // ========================================================
    let date1 = null, date2 = null;          // Selected date objects { val, text }
    let selectedNights = 1;                   // Calculated number of nights
    let flexDaysModifier = '';                // e.g., " ± 1 day" from pill buttons
    const days = document.querySelectorAll('.days span:not(.empty)');
    const checkinInput = document.getElementById('checkin');

    // Month names array for the calendar navigation
    const monthNames = [
        'June 2026', 'July 2026', 'August 2026', 'September 2026', 
        'October 2026', 'November 2026', 'December 2026', 'January 2027',
        'February 2027', 'March 2027', 'April 2027', 'May 2027'
    ];
    let currentMonthOffset = 0;
    const leftArrow = document.querySelector('.fa-chevron-left.cal-arrow');
    const rightArrow = document.querySelector('.fa-chevron-right.cal-arrow');

    /**
     * updateCalendarMonths - Updates the displayed months in the
     * calendar header based on the current month offset.
     * Also manages the disabled state of the left arrow.
     */
    function updateCalendarMonths() {
        const monthHeaders = document.querySelectorAll('.month-header strong');
        if (monthHeaders.length >= 2) {
            monthHeaders[0].textContent = monthNames[currentMonthOffset];
            monthHeaders[1].textContent = monthNames[currentMonthOffset + 1];
            
            // Update "past" and "today" classes for the first month
            const firstMonthDays = document.querySelectorAll('.month:first-of-type .days span:not(.empty)');
            if (currentMonthOffset === 0) {
                const todayDate = new Date().getDate();
                firstMonthDays.forEach(day => {
                    day.classList.remove('past');
                    day.classList.remove('today');
                    const val = parseInt(day.textContent);
                    if (val < todayDate) day.classList.add('past');
                    if (val === todayDate) day.classList.add('today');
                });
            } else {
                firstMonthDays.forEach(day => {
                    day.classList.remove('past');
                    day.classList.remove('today');
                });
            }
        }
        
        // Disable left arrow when at the first month
        if (leftArrow) {
            if (currentMonthOffset === 0) {
                leftArrow.style.opacity = '0.2';
                leftArrow.style.cursor = 'not-allowed';
                leftArrow.style.pointerEvents = 'none';
            } else {
                leftArrow.style.opacity = '1';
                leftArrow.style.cursor = 'pointer';
                leftArrow.style.pointerEvents = 'auto';
            }
        }
        
        if (typeof updateCalendarUI === 'function') updateCalendarUI();
    }

    // Initialize calendar
    if (leftArrow && rightArrow) {
        updateCalendarMonths();
        
        rightArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentMonthOffset < monthNames.length - 2) {
                currentMonthOffset++;
                updateCalendarMonths();
            }
        });

        leftArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentMonthOffset > 0) {
                currentMonthOffset--;
                updateCalendarMonths();
            }
        });
    }

    // ========================================================
    // CALENDAR FOOTER PILL BUTTONS
    // Handles "Exact dates" and flexible date range buttons
    // (±1 day, ±2 days, etc.)
    // ========================================================
    document.querySelectorAll('.pill-btn, .cal-tab').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.parentNode;
            parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (this.classList.contains('pill-btn')) {
                if (this.textContent.trim() === 'Exact dates') {
                    flexDaysModifier = '';
                } else {
                    flexDaysModifier = ` ${this.textContent.trim()}`;
                }
                if (typeof updateCalendarUI === 'function') updateCalendarUI();
            }
        });
    });

    /**
     * updateCalendarUI - Highlights selected dates and date ranges
     * in the calendar grid. Also updates the checkin input field
     * with the selected date range text.
     */
    function updateCalendarUI() {
        // Clear previous selections
        days.forEach(day => {
            day.classList.remove('selected', 'in-range');
            const val = parseInt(day.textContent);
            const monthText = day.closest('.month').querySelector('strong').textContent;
            const monthIndex = monthNames.indexOf(monthText);
            const absVal = monthIndex * 100 + val;
            
            if (date1 && absVal === date1.val) day.classList.add('selected');
            if (date2 && absVal === date2.val) day.classList.add('selected');
            if (date1 && date2) {
                const min = Math.min(date1.val, date2.val), max = Math.max(date1.val, date2.val);
                if (absVal > min && absVal < max) day.classList.add('in-range');
            }
        });

        // Update the "When" field display
        if (!date1 && !date2) {
            checkinInput.value = "";
            selectedNights = 1;
        }
        else if (date1 && !date2) {
            checkinInput.value = `${date1.text}`;
            selectedNights = 1;
        }
        else if (date1 && date2) {
            checkinInput.value = `${date1.text} - ${date2.text}${flexDaysModifier}`;
            const d1Month = Math.floor(date1.val / 100);
            const d1Day = date1.val % 100;
            const d2Month = Math.floor(date2.val / 100);
            const d2Day = date2.val % 100;
            
            // Calculate nights (approximate, assuming 30-day months)
            if (d1Month === d2Month) {
                selectedNights = Math.abs(d1Day - d2Day);
            } else {
                selectedNights = (30 - d1Day) + d2Day;
            }
            if (selectedNights === 0) selectedNights = 1;
        }
    }

    // ========================================================
    // DAY CLICK HANDLER
    // Users click on a day to select a date.
    // First click: selects check-in
    // Second click: selects check-out
    // Clicking the same day again: deselects
    // ========================================================
    days.forEach(day => {
        day.addEventListener('click', function() {
            if (this.classList.contains('past')) return;
            
            const val = parseInt(this.textContent);
            const monthText = this.closest('.month').querySelector('strong').textContent;
            const monthIndex = monthNames.indexOf(monthText);
            const shortMonth = monthText.substring(0, 3);
            const dateObj = { val: monthIndex * 100 + val, text: `${shortMonth} ${val}` };

            // Selection logic
            if (!date1 || (date1 && date2)) { 
                date1 = dateObj; 
                date2 = null; 
            } 
            else if (date1 && !date2) {
                if (dateObj.val === date1.val) {
                    date1 = null; // Deselect
                } else {
                    date2 = dateObj;
                    if (date1.val > date2.val) { 
                        let t = date1; 
                        date1 = date2; 
                        date2 = t; 
                    }
                    
                    // Auto-advance to the "Who" (Guests) field after selecting checkout
                    setTimeout(() => {
                        if (whoField) whoField.click();
                    }, 300);
                }
            }
            updateCalendarUI();
        });
    });

    // ========================================================
    // 8. GUEST COUNTER
    // Manages the +/- buttons for Adults, Children, Infants, Pets.
    // The total guest count is displayed in the "Who" field.
    // ========================================================
    const guestCounts = { adults: 0, children: 0, infants: 0, pets: 0 };
    
    /**
     * updateGuestDisplay - Updates the "Who" field display text
     * based on the current guest counts.
     */
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

    // Add click listeners to all guest control buttons
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

    // ========================================================
    // 9. SEARCH SUBMISSION
    // When the user clicks the search button, the form submits.
    // Filters properties based on Location, Type, and Guests.
    // Switches from Home View to Search View with results.
    // ========================================================
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            closeAllDropdowns();

            // Get search criteria from the form
            const searchLocation = document.getElementById('location').value;
            const searchType = document.getElementById('property-type').value;
            const guestsInput = parseInt(document.getElementById('guests').value) || 0;

            // ========================================================
            // FILTERING ENGINE
            // Loops through allProperties and matches based on:
            // - Location (exact match or "Anywhere")
            // - Property Type (exact match or "Any type")
            // - Guest capacity (must be >= requested guests)
            // ========================================================
            const matchedProperties = [];

            for (let i = 0; i < allProperties.length; i++) {
                let p = allProperties[i];
                let locationMatch = false;
                let typeMatch = false;

                // Location matching
                if (searchLocation === "" || searchLocation === "Anywhere") {
                    locationMatch = true;
                } else {
                    switch(searchLocation) {
                        case "Kuala Lumpur": if (p.location === "Kuala Lumpur") locationMatch = true; break;
                        case "Malacca": if (p.location === "Malacca") locationMatch = true; break;
                        case "Penang": if (p.location === "Penang") locationMatch = true; break;
                        case "Johor Bahru": if (p.location === "Johor Bahru") locationMatch = true; break;
                        case "Langkawi": if (p.location === "Langkawi") locationMatch = true; break;
                        case "Sabah": if (p.location === "Sabah") locationMatch = true; break;
                        default: locationMatch = false;
                    }
                }

                // Type matching
                if (searchType === "" || searchType === "Any type") {
                    typeMatch = true;
                } else {
                    switch(searchType) {
                        case "Entire home": if (p.propertyType === "Entire home") typeMatch = true; break;
                        case "Shared room": if (p.propertyType === "Shared room") typeMatch = true; break;
                        case "Luxury villa": if (p.propertyType === "Luxury villa") typeMatch = true; break;
                        default: typeMatch = false;
                    }
                }

                // Guest capacity matching
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

            // ========================================================
            // DISPLAY RESULTS
            // Switch from home view to search view and render results.
            // ========================================================
            const homeView = document.getElementById('home-view');
            const searchView = document.getElementById('search-view');
            const searchGrid = document.getElementById('search-grid');
            const noResults = document.getElementById('no-results');

            if (homeView) homeView.classList.add('hidden');
            if (searchView) searchView.classList.remove('hidden');
            if (searchGrid) searchGrid.innerHTML = '';

            if (searchGrid) {
                if (matchedProperties.length === 0) {
                    if (noResults) noResults.classList.remove('hidden');
                    searchGrid.classList.add('hidden');
                } else {
                    if (noResults) noResults.classList.add('hidden');
                    searchGrid.classList.remove('hidden');
                    
                    // Build date display string for search results
                    let customDateStr = null;
                    let customNights = null;

                    if (isFlexibleSearch) {
                        customDateStr = `${flexStayLength} in ${flexMonth.substring(0,3)}`;
                        if (flexStayLength === 'Weekend') customNights = 2;
                        else if (flexStayLength === 'Week') customNights = 7;
                        else if (flexStayLength === 'Month') customNights = 30;
                    } else if (date1 && date2) {
                        customDateStr = `${date1.text} - ${date2.text}${flexDaysModifier}`;
                        customNights = selectedNights;
                    }
                    
                    // Save states to localStorage so details page knows the search context
                    if (customNights) {
                        localStorage.setItem('selectedNights', customNights);
                    } else {
                        localStorage.setItem('selectedNights', 1);
                    }
                    
                    if (isFlexibleSearch) {
                        localStorage.setItem('flexMonth', flexMonth);
                        localStorage.removeItem('exactCheckinVal');
                    } else if (date1) {
                        localStorage.setItem('exactCheckinVal', date1.val);
                        localStorage.removeItem('flexMonth');
                    }

                    // Render each matched property as a card
                    matchedProperties.forEach(p => searchGrid.appendChild(createCard(p, customDateStr, customNights)));
                }
            }
        });
    }
});