# LDCW6123 Group Project: Airbnb Disruptive Innovation 

**Course**: LDCW6123 - Fundamentals of Digital Competence for Programmer  
**Topic**: Analyzing the disruptive innovation cycle of Airbnb (Clayton Christensen's Model) and building an interactive accommodation fare estimator program.

## 📖 Project Overview
This project satisfies **Part 2 (Interactive Program)** of the group assignment. We designed and developed an interactive, web-based **Accommodation Fare Estimator & Booking System** inspired by Airbnb. 

The purpose of this program is to practically demonstrate Airbnb's disruptive innovation by allowing users to:
1. Browse and "book" properties.
2. Dynamically calculate fare estimates based on location, dates, and number of guests.
3. **Compare costs directly against traditional hotels**, highlighting the exact financial savings ("Disruption") that aided Airbnb's market adoption.

## ✨ Key Features
- **Premium User Interface**: Built from scratch using modern web design principles, featuring custom glassmorphism effects, dynamic hover states, and smooth micro-animations.
- **Fully Responsive Design**: The layout adapts flawlessly across Desktop, Tablet, and Mobile devices (using CSS `@media` queries).
- **Interactive Fare Calculator**: Users can select check-in/checkout dates and customize guest counts (Adults, Children, Infants). The system calculates total nights and final prices instantly.
- **"Disruptive" Comparison Engine**: When a user clicks "Reserve", a modal dynamically compares the Airbnb cost against the equivalent number of traditional hotel rooms needed in that specific city, proving the economic disruption.
- **Trips Management System**: 
  - Uses browser `localStorage` for data persistence.
  - Automatically categorizes bookings into **Upcoming Trips** and **Past Trips** based on real-time checkout dates.
  - Users can cancel upcoming reservations, seamlessly moving them into a **Cancelled Trips** history with refunded status tags.

## 🛠️ Technology Stack
- **HTML5**: Semantic structure for all pages (`index.html`, `details.html`, `booking.html`, `login.html`).
- **CSS3 (Vanilla)**: All styling is custom-written without external frameworks like Tailwind or Bootstrap. Uses CSS Grid, Flexbox, and CSS Variables for a scalable design system.
- **JavaScript (Vanilla)**: Handles all interactive logic, date math, DOM manipulation, and data persistence via `localStorage`.
- **Git**: Used extensively for version control and documenting development progress.

## 🚀 How to Run the Program
1. **Clone or Download** this repository to your local machine.
2. Ensure you have a modern web browser installed (Chrome, Edge, Safari, Firefox).
3. **Using VS Code (Recommended)**:
   - Open the project folder in Visual Studio Code.
   - Install the **"Live Server"** extension.
   - Right-click on `index.html` and select **"Open with Live Server"**.
4. **Alternative Method**:
   - Simply double-click `index.html` to open it directly in your browser. (Note: Using Live Server is recommended for the best experience with local URL routing).

## 👥 Group Members
*(Please fill in your group members' names and Student IDs before submission)*
- Member 1 Name (ID: XXXXXX) - Group Leader
- Member 2 Name (ID: XXXXXX)
- Member 3 Name (ID: XXXXXX)
- Member 4 Name (ID: XXXXXX)
- Member 5 Name (ID: XXXXXX)
- Member 6 Name (ID: XXXXXX)
