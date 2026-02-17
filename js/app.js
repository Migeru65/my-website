console.log("Website loaded successfully.");

function greetUser() {
    let now = new Date(); 
    let hour = now.getHours(); 
    let greeting = "";

    // Logic to determine the greeting text
    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning!"; //
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good Afternoon!"; //
    } else if (hour >= 18 && hour < 22) {
        greeting = "Good Evening!"; //
    } else {
        greeting = "Good Night!"; //
    }
    
    // 1. Update the visual text on the clock widget
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        greetingElement.innerText = greeting;
    }

    // 2. Trigger the pop-up dialog box (Alert)
    // Using setTimeout ensures the background loads slightly before the alert pops up
    setTimeout(function() {
        alert(greeting);
    }, 100);
}

function startClock() {
    setInterval(() => {
        let now = new Date();
        
        // Time format including seconds
        let timeString = now.toLocaleTimeString([], {
            hour: '2-digit', 
            minute:'2-digit', 
            second:"2-digit"
        });
        
        // Date format
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

// Run the greeting logic (which includes the alert)
greetUser();

// Start the ticking clock
startClock();

// Select the form element using the ID we just added
const contactForm = document.getElementById('portfolio-contact-form');

// Check if the form exists on the page to avoid errors
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        
        // 1. Prevent the default page reload/navigation
        event.preventDefault();

        // 2. Retrieve values from the input fields
        const nameValue = document.getElementById('fullname').value;
        const emailValue = document.getElementById('email').value;
        const messageValue = document.getElementById('message').value;

        // 3. Print the values to the browser console
        console.log("--- New Contact Form Submission ---");
        console.log("Name: " + nameValue);
        console.log("Email: " + emailValue);
        console.log("Message: " + messageValue);

        // Optional: Alert the user so they know it worked
        alert("Thank you, " + nameValue + "! Your message has been logged to the console.");
        
        // Optional: Clear the form fields
        contactForm.reset();
    });
}