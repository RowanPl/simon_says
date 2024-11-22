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

function startGame() {
    const password = prompt("Voer hier het wachtwoord in.");

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
