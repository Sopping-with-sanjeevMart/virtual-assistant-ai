let box = document.querySelector(".box");
let btn = document.querySelector("button");

// Function for speaking text
const speakFunction = (input) => {
    let speech = new SpeechSynthesisUtterance();
    speech.text = input;
    speech.lang = "en-IN";  // Use "en-IN" for Indian accent
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
};

// Function to check current time and greet
const greetingFunction = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour <= 12) {
        speakFunction("Good Morning sir, How can I help you?");
    } else if (hour >= 12 && hour <= 16) {
        speakFunction("Good Afternoon sir, How can I help you?");
    } else {
        speakFunction("Good Evening sir, How can I help you?");
    }
};

// Function to start voice input
const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        speakFunction("Sorry, your device does not support voice recognition.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.onstart = () => {
        console.log("voice activated");
        greetingFunction();
    };

    recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase();
        console.log(transcript);

        // Based on voice input, open a specific website or application
        if (transcript.includes(" open whatsapp")) {
            window.location.href = "https://web.whatsapp.com";  // Opens in the same tab
        } else if (transcript.includes(" open google")) {
            window.location.href = "https://www.google.com";  // Opens in the same tab
        } else if (transcript.includes(" open youtube")) {
            window.location.href = "https://www.youtube.com";  // Opens in the same tab
        } else if (transcript.includes(" open facebook")) {
            window.location.href = "https://www.facebook.com";  // Opens in the same tab
        } else if (transcript.includes(" open instagram")) {
            window.location.href = "https://www.instagram.com";  // Opens in the same tab
        } else if (transcript.includes(" open twitter")) {
            window.location.href = "https://www.twitter.com";  // Opens in the same tab
        } else if (transcript.includes(" open linkedin")) {
            window.location.href = "https://www.linkedin.com";  // Opens in the same tab
        } else if (transcript.includes(" open chrome")) {
            window.location.href = "https://www.chrome.com";  // Opens in the same tab
        } else if (transcript.includes(" open github")) {
            window.location.href = "https://www.github.com";  // Opens in the same tab
        } else if (transcript.includes("open telegram")) {
            window.location.href = "https://www.telegram.com";  // Opens in the same tab
        } else if (transcript.includes("open chatgpt")) {
            window.location.href = "https://www.chatgpt.com";  // Opens in the same tab
        }
        // Add functionality for asking "What is your name?"
        else if (transcript.includes("what is your name")) {
            speakFunction("My name is Lisha. How can I assist you?");
        }
        else if (transcript.includes("who i am")) {
            speakFunction("You are my developer Sanjeev Kumar");
        }
        else if (transcript.includes("who are you")) {
            speakFunction("I am Lisha, your virtual assistant. How can I assist you sir?");
        }
        else if (transcript.includes("what is your developer name")) {
            speakFunction("My developer name is Sanjeev Kumar");
        }
        else if (transcript.includes("ok ")) {
            speakFunction("ok sir,thank you");
        }
        else if (transcript.includes("how are you?")) {
            speakFunction("i am fine, how can i help you sir?");
        }
        else if (transcript.includes("show me your developer picture")) {
            // Show the developer's picture
            const img = document.createElement("img");
            img.src = "developer_picture_url.jpg";  // Replace with actual URL of developer picture
            img.alt = "Developer Picture";
            img.style.maxWidth = "300px";
            img.style.borderRadius = "10px";
            box.appendChild(img);
            speakFunction("Here is the picture of my developer, Sanjeev Kumar.");
        }
        else if (transcript.includes(" you")) {
            // Show the developer's picture
            const img = document.createElement("img");
            img.src = "collage_picture_url.jpg";  // Replace with actual URL of developer picture
            img.alt = "Developer Picture";
            img.style.maxWidth = "300px";
            img.style.borderRadius = "10px";
            box.appendChild(img);
            speakFunction("Here is the picture of khalsa collage of engineering and technology.");
        }
        // Add functionality for asking "What is the time?"
        else if (transcript.includes("what is the time")) {
            let currentTime = new Date();
            let hours = currentTime.getHours();
            let minutes = currentTime.getMinutes();
            let seconds = currentTime.getSeconds();
            let timeString = `The current time is ${hours}:${minutes}:${seconds}`;
            speakFunction(timeString);

            // Display the time on the screen
            const timeElement = document.createElement("p");
            timeElement.innerText = timeString;
            timeElement.style.fontSize = "24px";
            timeElement.style.color = "greenyellow";
            box.appendChild(timeElement);
        }
        // New functionality to play music or song on YouTube
        else if (transcript.includes("play") && (transcript.includes("music") || transcript.includes("song"))) {
            // Extract song name from the command
            let songName = transcript.replace("play", "").replace("song", "").replace("music", "").trim();
            if (songName) {
                let youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(songName)}`;
                window.location.href = youtubeSearchUrl;  // Open the YouTube search for the song
            } else {
                speakFunction("Please tell me the name of the song you'd like to play.");
            }
        }
        // New functionality for today's news
        else if (transcript.includes("today's news") || transcript.includes("news today")) {
            let youtubeSearchUrl = `https://www.youtube.com/results?search_query=today%27s+news`;
            window.location.href = youtubeSearchUrl;  // Opens YouTube search for today's news
            speakFunction("Opening today's news on YouTube.");
        }
        else {
            speakFunction("Sorry, I don't recognize that command.");
        }
    };
    
    recognition.start();
};

// Handle mobile touch events and button interaction
btn.onclick = () => {
    startVoiceInput();
};

// Ensure button is easily clickable on mobile by adjusting styles
btn.style.fontSize = '20px';
btn.style.padding = '15px 30px';
btn.style.borderRadius = '10px';
btn.style.backgroundColor = '#4CAF50';
btn.style.color = '#fff';
btn.style.cursor = 'pointer';
btn.style.display = 'block';
btn.style.margin = '20px auto';

// Mobile-friendly layout for the box element
box.style.textAlign = 'center';
box.style.marginTop = '50px';

// Optional: Add event listeners for touch events (for mobile devices)
btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startVoiceInput();
});
