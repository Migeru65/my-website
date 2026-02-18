console.log("Website loaded successfully.");

/* =========================================
   CLOCK WIDGET LOGIC
   ========================================= */
function greetUser() {
    let now = new Date(); 
    let hour = now.getHours(); 
    let greeting = "";

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning!"; 
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good Afternoon!"; 
    } else if (hour >= 18 && hour < 22) {
        greeting = "Good Evening!"; 
    } else {
        greeting = "Good Night!"; 
    }
    
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        greetingElement.innerText = greeting;
    }

    if (document.getElementById("greeting")) {
         setTimeout(function() {
        }, 100);
    }
}

function startClock() {
    setInterval(() => {
        let now = new Date();
        let timeString = now.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', second:"2-digit" });
        let dateString = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

        const clockElement = document.getElementById("clock");
        const dateElement = document.getElementById("date-display");

        if (clockElement) clockElement.innerText = timeString;
        if (dateElement) dateElement.innerText = dateString;
    }, 1000); 
}

if (document.getElementById("clock-container")) {
    greetUser();
    startClock();
}


/* =========================================
   PART B: ENHANCED FORM INTEGRATION
   ========================================= */

const formLoadTime = Date.now(); 

let submitTimes = []; 

const contactForm = document.getElementById('portfolio-contact-form');

if (contactForm) {

    // --- Helper Functions ---

    function showInputError(input, message) {
        const errorSmall = input.nextElementSibling; 
        if (errorSmall) {
            errorSmall.innerText = message;
            errorSmall.style.display = 'block';
            input.style.borderColor = 'red';
        }
    }

    function clearInputError(input) {
        const errorSmall = input.nextElementSibling;
        if (errorSmall) {
            errorSmall.style.display = 'none';
            input.style.borderColor = '#ccc'; 
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function containsSpam(message) {
        const spamWords = ["free money", "buy now", "click here", "subscribe", "promo", "win big", "urgent"];
        const lowerMessage = message.toLowerCase();
        return spamWords.some(word => lowerMessage.includes(word));
    }

    function isRateLimited() {
        const now = Date.now();
        submitTimes = submitTimes.filter(time => now - time < 60000);
        if (submitTimes.length >= 3) {
            return true;
        }
        submitTimes.push(now);
        return false;
    }

    function isTooFast() {
        const submitTime = Date.now();
        const secondsTaken = (submitTime - formLoadTime) / 1000;
        return secondsTaken < 2;
    }

    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => clearInputError(input));
        
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showInputError(input, "This field is required.");
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                showInputError(input, "Please enter a valid email address.");
            }
        });
    });

    // --- Form Submission Handler ---
    contactForm.addEventListener('submit', function(event) {
        
        const feedback = document.getElementById('form-feedback');
        feedback.style.display = 'none';
        feedback.className = 'text-center'; 
        
        let isValid = true;
        const nameInput = document.getElementById('fullname');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (!nameInput.value.trim()) {
            showInputError(nameInput, "Name is required.");
            isValid = false;
        }

        if (!isValidEmail(emailInput.value)) {
            showInputError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            showInputError(messageInput, "Message is required.");
            isValid = false;
        } else if (messageInput.value.length < 10) {
            showInputError(messageInput, "Message must be at least 10 characters.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); 
            return;
        }

        if (isTooFast()) { 
            event.preventDefault();
            alert("Submission was too fast. Please try again.");
            return;
        }

        if (isRateLimited()) { 
            event.preventDefault();
            alert("Too many submissions. Please wait a minute.");
            return;
        }

        if (containsSpam(messageInput.value)) { 
            event.preventDefault();
            alert("Your message contains blocked spam keywords.");
            showInputError(messageInput, "Message contains spam keywords.");
            return;
        }

        console.log("Validation passed. Submitting form...");
    });
}