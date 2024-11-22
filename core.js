// Game variables
let colorSequence = [];
let userSequence = [];
let level = 0;
let colorMap = {};
let envelop = "";
let clearImageTimer;

const colors = ["red", "green", "blue", "yellow"];
const envelopeImages = {
    "A": "assets/img.png",
    "B": "assets/img_1.png",
    "C": "assets/img_2.png",
    "D": "assets/img_3.png",
    "E": "assets/img_4.png"
};

// Function to start the game
document.getElementById("start-button").addEventListener("click", startGame);

async function startGame() {
    let password = await prompt("Voer hier het wachtwoord in.").then((value) => {
        return value;
    });

    console.log(password)
    if (password === "2655") {
        colorMap = {
            red: "blue",
            green: "yellow",
            blue: "green",
            yellow: "red"
        };
        envelop = "A";
        nextRound();
    } else if (password === "3885") {
        colorMap = {
            red: "green",
            green: "blue",
            blue: "red",
            yellow: "yellow"
        };
        envelop = "B";
        nextRound();
    } else if (password === "6789") {
        colorMap = {
            red: "yellow",
            green: "red",
            blue: "blue",
            yellow: "green"
        };
        envelop = "C";
        nextRound();
    } else if (password === "1226") {
        colorMap = {
            red: "red",
            green: "blue",
            blue: "yellow",
            yellow: "green"
        };
        envelop = "D";
        nextRound();
    } else if (password === "1737") {
        colorMap = {
            red: "green",
            green: "yellow",
            blue: "red",
            yellow: "blue"
        };
        envelop = "E";
        nextRound();
    } else {
        alert("Incorrect Password! Try Again");
    }
}

function nextRound() {
    userSequence = [];
    level++;
    colorSequence.push(colors[Math.floor(Math.random() * colors.length)]);
    if (level === 6) {
        displayEnvelope();
        stopGame();
    }
    flashSequence();
}

// Flash the sequence of colors for the player to memorize
function flashSequence() {
    colorSequence.forEach((color, index) => {
        setTimeout(() => flashColor(color), 600 * (index + 1));
    });
}

// Function to flash a color
function flashColor(color) {
    const button = document.getElementById(color);
    button.classList.remove('flash'); // Remove class if it exists
    void button.offsetWidth; // Force reflow
    button.classList.add('flash');
    setTimeout(() => button.classList.remove('flash'), 500);  // Removes flash effect after 500ms
}

// Function to display the envelope image
function displayEnvelope() {
    const imageElement = document.getElementById("envelope-image");
    imageElement.src = envelopeImages[envelop];
    imageElement.style.display = "block";
    const envelopeText = document.getElementById("envelope-text");
    envelopeText.innerHTML = "Gefeliciteerd! Je mag nu de envelop bekijken!";

    // alert("Gefeliciteerd! Je mag nu de envelop bekijken!");

    // Clear the image after 1 minute
    if (clearImageTimer) {
        clearTimeout(clearImageTimer); // Clear any previous timers
    }
    clearImageTimer = setTimeout(clearEnvelopeImage, 60000); // 60 seconds
}

// Function to clear the envelope image
function clearEnvelopeImage() {
    const imageElement = document.getElementById("envelope-image");
    imageElement.src = "";
    imageElement.style.display = "none";
    const envelopeText = document.getElementById("envelope-text");
    envelopeText.innerHTML = "";

    // alert("De envelop afbeelding is verwijderd.");
}

// Function to stop the game
function stopGame() {
    colorSequence = [];
    userSequence = [];
    level = 0;
}

// Handle user input and check against mapped color sequence
document.querySelectorAll(".color-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        const userColor = e.target.id;
        const expectedColor = colorMap[colorSequence[userSequence.length]];
        userSequence.push(userColor);

        if (userColor === expectedColor) {
            if (userSequence.length === colorSequence.length) {
                setTimeout(nextRound, 1000);
            }
        } else {
            alert("Game Over! Try Again");
            stopGame();
        }
    });
});
// Modal elements for alerts
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeModalButton = document.getElementById('close-modal');

// Modal elements for prompts
const promptModal = document.getElementById('prompt-modal');
const promptModalText = document.getElementById('prompt-modal-text');
const promptInput = document.getElementById('prompt-input');
const submitPromptButton = document.getElementById('submit-prompt');
const closePromptModalButton = document.getElementById('close-prompt-modal');

// Function to show alert modal
function showModal(message) {
    modalText.textContent = message;
    modal.classList.remove('hidden');
}

// Close alert modal event
closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Replace default alert
window.alert = function (message) {
    showModal(message);
};

// Function to show prompt modal
function showPrompt(message, callback) {
    promptModalText.textContent = message;
    promptInput.value = '';
    promptModal.classList.remove('hidden');

    // Handle submit
    submitPromptButton.onclick = function () {
        callback(promptInput.value); // Pass the value back to the callback
        promptModal.classList.add('hidden');
    };

    // Handle cancel
    closePromptModalButton.onclick = function () {
        callback(null); // Pass null if canceled
        promptModal.classList.add('hidden');
    };
}

// Replace default prompt
window.prompt = function (message, defaultValue = '') {
    return new Promise((resolve) => {
        showPrompt(message, resolve);
    });
};

// Example usage of the prompt

