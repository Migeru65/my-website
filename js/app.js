console.log("Website loaded successfully.");

function greetUser() {
    let now = new Date(); 
    let hour = now.getHours(); 
    let greeting = "";

    // Logic to determine the greeting text
    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning Guest!"; 
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good Afternoon Guest!"; 
    } else if (hour >= 18 && hour < 22) {
        greeting = "Good Evening Guest!"; 
    } else {
        greeting = "Good Night Guest!"; 
    }
    
    // 1. Update the visual text on the clock widget
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        greetingElement.innerText = greeting;
    }

    // 2. Trigger the pop-up dialog box (Alert)
    setTimeout(function() {
        alert(greeting);
    }, 100);
}

function startClock() {
    setInterval(() => {
        let now = new Date();
        
        let timeString = now.toLocaleTimeString([], {
            hour: '2-digit', 
            minute:'2-digit', 
            second:"2-digit"
        });
        
        let dateString = now.toLocaleDateString(undefined, { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });

        const clockElement = document.getElementById("clock");
        const dateElement = document.getElementById("date-display");

        if (clockElement) clockElement.innerText = timeString;
        if (dateElement) dateElement.innerText = dateString;
    }, 1000); 
}

/* =========================================
   FIX: ONLY RUN CLOCK LOGIC IF CLOCK EXISTS
   ========================================= */
// We check if "clock-container" exists. If it does, we are inside the iframe.
// If it doesn't, we are on the main index page and should skip this.
if (document.getElementById("clock-container")) {
    greetUser();
    startClock();
}


/* =========================================
   FORM LOGIC (Safe to keep here)
   ========================================= */
const contactForm = document.getElementById('portfolio-contact-form');

// This check prevents errors inside the clock iframe (where the form doesn't exist)
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        
        event.preventDefault();

        const nameValue = document.getElementById('fullname').value;
        const emailValue = document.getElementById('email').value;
        const messageValue = document.getElementById('message').value;

        console.log("--- New Contact Form Submission ---");
        console.log("Name: " + nameValue);
        console.log("Email: " + emailValue);
        console.log("Message: " + messageValue);

        alert("Thank you, " + nameValue + "! Your message has been logged to the console.");
        
        contactForm.reset();
    });
}