console.log("Website loaded successfully.");

/* =========================================
   1. CLOCK WIDGET LOGIC
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

// Only run clock logic if the clock container exists (in the iframe)
if (document.getElementById("clock-container")) {
    greetUser();
    startClock();
}


/* =========================================
   2. BOUNCING BALL PHYSICS ENGINE
   ========================================= */
const ball = document.getElementById("ball");
const court = document.getElementById("court");
const toggleBtn = document.getElementById("toggle-ball-btn");
const resetBtn = document.getElementById("reset-ball-btn");
const ballWrapper = document.getElementById("ball-wrapper");

let animationInterval = null;
let x = 20;       
let y = 20;       
let vx = 5;       
let vy = 0;       
const gravity = 0.8; 
const friction = 0.8; 
const ballSize = 40;

function updatePhysics() {
    // Dynamically get court size for responsiveness
    const courtWidth = court.clientWidth;
    const courtHeight = court.clientHeight;

    // 1. Apply Physics
    vy += gravity; 
    x += vx; 
    y += vy; 

    // 2. Floor Collision 
    if (y + ballSize > courtHeight) {
        y = courtHeight - ballSize; 
        vy *= -friction; 
        
        // Stop micro-bouncing when near rest
        if (Math.abs(vy) < 1.5) vy = 0;
    }

    // 3. Wall Collision
    if (x + ballSize > courtWidth) {
        x = courtWidth - ballSize;
        vx *= -friction; 
    } else if (x < 0) {
        x = 0;
        vx *= -friction;
    }

    // 4. Ceiling Collision
    if (y < 0) {
        y = 0;
        vy *= -friction;
    }

    // 5. Update DOM
    ball.style.left = x + "px";
    ball.style.top = y + "px";
}

function resetBall() {
    x = 20;
    y = 20;
    vx = Math.random() * 10 + 5; // Random horizontal speed
    vy = 0;
}

if (toggleBtn) {
    toggleBtn.addEventListener("click", function() {
        if (ballWrapper.style.display === "none") {
            // SHOW Animation
            ballWrapper.style.display = "block";
            toggleBtn.innerText = "Close Demo";
            resetBall(); // Reset position on open
            animationInterval = setInterval(updatePhysics, 20); // Start Loop
        } else {
            // HIDE Animation
            ballWrapper.style.display = "none";
            toggleBtn.innerText = "Play Physics Demo";
            clearInterval(animationInterval); // Stop Loop to save resources
        }
    });
}

if (resetBtn) {
    resetBtn.addEventListener("click", resetBall);
}


/* =========================================
   3. ENHANCED FORM VALIDATION
   ========================================= */
const formLoadTime = Date.now(); 
let submitTimes = []; 
const contactForm = document.getElementById('portfolio-contact-form');

if (contactForm) {
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
            input.style.borderColor = '#E3AE57'; // Restore theme color
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function containsSpam(message) {
        const spamWords = ["free money", "buy now", "click here", "subscribe", "promo", "win big"];
        return spamWords.some(word => message.toLowerCase().includes(word));
    }

    // Input Event Listeners for Real-time feedback
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

    contactForm.addEventListener('submit', function(event) {
        let isValid = true;
        const nameInput = document.getElementById('fullname');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Validation Checks
        if (!nameInput.value.trim()) {
            showInputError(nameInput, "Name is required.");
            isValid = false;
        }

        if (!isValidEmail(emailInput.value)) {
            showInputError(emailInput, "Invalid email.");
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            showInputError(messageInput, "Message is required.");
            isValid = false;
        } else if (containsSpam(messageInput.value)) {
            showInputError(messageInput, "Message contains spam terms.");
            isValid = false;
        }

        // Time-based security (Bot check)
        if ((Date.now() - formLoadTime) < 2000) {
            alert("Submission too fast.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        } else {
            console.log("Form valid. Submitting...");
        }
    });
}