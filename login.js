document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordSection = document.getElementById('password-section');
    const passwordInput = document.getElementById('password');
    const continueBtn = document.getElementById('continue-btn');
    const toast = document.getElementById('toast');

    let step = 1;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (step === 1) {
            // Validate email/phone (simple check for demo)
            if (emailInput.value.trim() !== "") {
                // Move to password step
                passwordSection.classList.remove('hidden');
                passwordInput.setAttribute('required', 'true');
                passwordInput.focus();
                
                // Make email input readonly
                emailInput.setAttribute('readonly', 'true');
                emailInput.style.color = "var(--text-light)";
                
                // Update button text
                continueBtn.textContent = "Log In";
                step = 2;
            }
        } else if (step === 2) {
            // Validate password and "login"
            if (passwordInput.value.trim() !== "") {
                // Show success toast
                toast.classList.remove('hidden');
                
                // Simulate network request and redirect
                continueBtn.textContent = "Logging in...";
                continueBtn.style.opacity = "0.7";
                continueBtn.disabled = true;
                
                setTimeout(() => {
                    localStorage.setItem('isLoggedIn', 'true');
                    window.location.href = "index.html";
                }, 1500);
            }
        }
    });

    // Handle social buttons (just mock functionality)
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toast.querySelector('span').textContent = "Social Login Simulator Redirecting...";
            toast.classList.remove('hidden');
            setTimeout(() => {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = "index.html";
            }, 1500);
        });
    });
});
