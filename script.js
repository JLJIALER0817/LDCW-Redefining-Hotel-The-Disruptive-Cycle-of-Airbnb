document.getElementById('estimator-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission from reloading page
    
    // Get input values
    const nights = parseInt(document.getElementById('nights').value);
    const guests = parseInt(document.getElementById('guests').value);
    const budget = parseFloat(document.getElementById('budget').value);

    // Variables to hold the recommendation
    let roomType = "";
    let ratePerNight = 0;

    // Design Logic (if/else structure as required by the rubric)
    if (budget < 50) {
        roomType = "Shared Room";
        ratePerNight = 35;
    } else if (budget >= 50 && budget < 120) {
        roomType = "Private Room";
        ratePerNight = 80;
    } else {
        // budget >= 120
        if (guests >= 2) {
            roomType = "Entire Home / Apartment";
            ratePerNight = 150;
        } else {
            // High budget but only 1 guest, suggest an upscale private room or whole place
            roomType = "Luxury Private Room";
            ratePerNight = 110;
        }
    }

    // Cost calculations
    const baseCost = ratePerNight * nights;
    const cleaningFee = 30.00; // Fixed cleaning fee
    const serviceFee = baseCost * 0.10; // Airbnb typical service fee is around 10-14%
    const totalCost = baseCost + cleaningFee + serviceFee;

    // Update the DOM with results
    document.getElementById('result-type').textContent = roomType;
    document.getElementById('result-base').textContent = `$${baseCost.toFixed(2)} ($${ratePerNight}/night)`;
    document.getElementById('result-cleaning').textContent = `$${cleaningFee.toFixed(2)}`;
    document.getElementById('result-service').textContent = `$${serviceFee.toFixed(2)}`;
    document.getElementById('result-total').textContent = `$${totalCost.toFixed(2)}`;

    // Show the results section
    const resultsSection = document.getElementById('results-section');
    resultsSection.classList.remove('hidden');
});
