const maxCars = 10;
let parkedCars = {}; // Object to store car plate numbers and their counts

// Array of car images
const carImages = [
    'CAR5.png'
];

function handleCarArrival() {
    const plateInput = document.getElementById("plateInput");
    const plateNumber = plateInput.value.trim();

    if (plateNumber === "") {
        displayMessage("PLEASE ENTER YOUR PLATE NUMBER");
        return;
    }

    if (Object.keys(parkedCars).length >= maxCars) {
        displayMessage("GARAGE FULL! CAR CANNOT PARK.");
        return;
    }

    if (!parkedCars[plateNumber]) {
        parkedCars[plateNumber] = { arrivals: 0, departures: 0 }; // Initialize counts for new car
    }

    parkedCars[plateNumber].arrivals++; // Increment arrival count
    updateMirror(plateNumber); // Update mirror with the current car
    displayCar(plateNumber); // Display the car visual
    displayMessage(`CAR ${plateNumber} SUCCESSFULLY PARKED!`);
    plateInput.value = ""; // Clear input
}

function handleCarDeparture() {
    const plateInput = document.getElementById("plateInput");
    const plateNumber = plateInput.value.trim();

    if (plateNumber === "") {
        displayMessage("PLEASE ENTER YOUR PLATE NUMBER");
        return;
    }

    if (!parkedCars[plateNumber]) {
        displayMessage(`CAR ${plateNumber} NOT FOUND!`);
        return;
    }

    // Temporarily store all cars to the right
    const rightCars = [];
    const carIndex = Object.keys(parkedCars).indexOf(plateNumber);
    for (let i = carIndex + 1; i < Object.keys(parkedCars).length; i++) {
        const rightCar = Object.keys(parkedCars)[i];
        rightCars.push(rightCar);
        parkedCars[rightCar].departures++; // Increment departure count for the right car
        removeCar(rightCar); // Remove the car visual
    }

    // Remove the departing car
    parkedCars[plateNumber].departures++; // Increment departure count
    updateMirror(plateNumber); // Update mirror with the current car
    removeCar(plateNumber); // Remove the car visual
    delete parkedCars[plateNumber]; // Remove car from parked cars
    displayMessage(`CAR ${plateNumber} SUCCESSFULLY DEPARTED!`);

    // Add back the right cars in their original order
    for (const rightCar of rightCars) {
        parkedCars[rightCar].arrivals++; // Increment arrival count for the right car
        displayCar(rightCar); // Display the right car visual
    }

    plateInput.value = ""; // Clear input
}

function updateMirror(plateNumber) {
    const mirror = document.getElementById("mirror");
    const carData = parkedCars[plateNumber];

    if (carData) {
        mirror.textContent = `CAR ${plateNumber}\nARRIVALS: ${carData.arrivals}\nDEPARTURES: ${carData.departures}`;
    } else {
        mirror.textContent = ""; // Clear if the car is not found
    }
}

function displayCar(plateNumber) {
    const carVisuals = document.getElementById("carVisuals");
    const carDiv = document.createElement("div");
    carDiv.className = "car";

    // Randomly select an image from the carImages array
    const randomImageIndex = Math.floor(Math.random() * carImages.length);
    carDiv.style.backgroundImage = `url('${carImages[randomImageIndex]}')`;
    carDiv.style.backgroundSize = 'cover'; // Ensure the image covers the car div
    carDiv.style.backgroundPosition = 'center'; // Center the image

    const carPlate = document.createElement("div");
    carPlate.className = "car-plate";
    carPlate.textContent = plateNumber; // Set the plate number on the car visual

    carDiv.appendChild(carPlate);
    carVisuals.insertBefore(carDiv, carVisuals.firstChild); // Add the new car at the top of the existing ones
}

function removeCar(plateNumber) {
    const carVisuals = document.getElementById("carVisuals");
    const carDivs = carVisuals.getElementsByClassName("car");

    for (let i = 0; i < carDivs.length; i++) {
        const carPlate = carDivs[i].getElementsByClassName("car-plate")[0];
        if (carPlate.textContent === plateNumber) {
            carVisuals.removeChild(carDivs[i]); // Remove the car visual
            break;
        }
    }
}

function displayMessage(message) {
    const messageDisplay = document.getElementById("messageDisplay");
    messageDisplay.textContent = message;
}
