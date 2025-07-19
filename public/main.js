// Volume Calculations
function calculateCylinderVolume() {
    const radius = parseFloat(document.getElementById("cylinder-radius").value);
    const height = parseFloat(document.getElementById("cylinder-height").value);
    if (isNaN(radius) || isNaN(height)) return;
    const volume = Math.PI * Math.pow(radius, 2) * height;
    const volumeGallons = volume * 7.48052; // Convert cubic feet to gallons
    const resultElement = document.getElementById("cylinder-volume-result");
    resultElement.innerHTML = `Volume: ${volume.toFixed(2)} ft³<br>Volume: ${volumeGallons.toFixed(2)} gallons`;
}

function calculateBoxVolume() {
    const length = parseFloat(document.getElementById("box-length").value);
    const width = parseFloat(document.getElementById("box-width").value);
    const height = parseFloat(document.getElementById("box-height").value);
    if (isNaN(length) || isNaN(width) || isNaN(height)) return;
    const volume = length * width * height;
    const volumeGallons = volume * 7.48052; // Convert cubic feet to gallons
    const resultElement = document.getElementById("box-volume-result");
    resultElement.innerHTML = `Volume: ${volume.toFixed(2)} ft³<br>Volume: ${volumeGallons.toFixed(2)} gallons`;
}

function calculateConeVolume() {
    const radius = parseFloat(document.getElementById("cone-radius").value);
    const height = parseFloat(document.getElementById("cone-height").value);
    if (isNaN(radius) || isNaN(height)) return;
    const volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    const volumeGallons = volume * 7.48052; // Convert cubic feet to gallons
    const resultElement = document.getElementById("cone-volume-result");
    resultElement.innerHTML = `Volume: ${volume.toFixed(2)} ft³<br>Volume: ${volumeGallons.toFixed(2)} gallons`;
}

// --- MODIFIED FLOW/VELOCITY SECTION ---

// Main calculation function for Flow/Velocity
function calculateFlow() {
    const calcType = document.getElementById("flow-calc-type").value;
    const pipeSizeInches = parseFloat(document.getElementById('flow-pipe-size').value);
    const resultElement = document.getElementById("flow-result");

    if (isNaN(pipeSizeInches)) {
        resultElement.textContent = "Please enter a valid pipe size.";
        return;
    }

    const diameterFeet = pipeSizeInches / 12;
    const area = Math.PI * Math.pow(diameterFeet / 2, 2);

    if (calcType === "flow") {
        let velocity = parseFloat(document.getElementById("flow-velocity").value);
        const velocityUnit = document.getElementById("velocity-units").value;

        if (isNaN(velocity)) {
            resultElement.textContent = "Please enter a valid velocity.";
            return;
        }

        // Standardize velocity to ft/s
        if (velocityUnit === "ms") {
            velocity = velocity * 3.28084; // m/s to ft/s
        }

        const flowCfs = velocity * area;
        const flowGpm = flowCfs * 448.83;
        const flowMgd = flowCfs * 0.646317;

        resultElement.innerHTML = `
            Flow: ${flowCfs.toFixed(2)} cfs<br>
            Flow: ${flowGpm.toFixed(2)} gpm<br>
            Flow: ${flowMgd.toFixed(3)} MGD`;

    } else if (calcType === "velocity") {
        let flow = parseFloat(document.getElementById("flow-flow").value);
        const flowUnit = document.getElementById("flow-units").value;

        if (isNaN(flow)) {
            resultElement.textContent = "Please enter a valid flow rate.";
            return;
        }

        // Standardize flow to cfs
        if (flowUnit === "gpm") {
            flow = flow / 448.83; // gpm to cfs
        } else if (flowUnit === "mgd") {
            flow = flow / 0.646317; // MGD to cfs
        }

        const velocityFts = flow / area;
        const velocityMs = velocityFts / 3.28084; // ft/s to m/s

        resultElement.innerHTML = `
            Velocity: ${velocityFts.toFixed(2)} ft/s<br>
            Velocity: ${velocityMs.toFixed(2)} m/s`;
    }
}

// Function to toggle input visibility based on dropdown selection
function toggleFlowInputs(calcType) {
    const flowInputGroup = document.getElementById("flow-input-group");
    const velocityInputGroup = document.getElementById("velocity-input-group");

    if (calcType === "flow") {
        velocityInputGroup.style.display = "block";
        flowInputGroup.style.display = "none";
    } else if (calcType === "velocity") {
        flowInputGroup.style.display = "block";
        velocityInputGroup.style.display = "none";
    }
}

// Event listener to initialize and update the UI
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.quick-menu');
    const navLinks = document.querySelectorAll('.quick-menu a');

    const toggleMenu = () => {
        navMenu.classList.toggle('menu-open');
        hamburgerBtn.classList.toggle('active'); // 
    };
    hamburgerBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('menu-open')) {
                toggleMenu();
            }
        });
    });
    const flowCalcTypeDropdown = document.getElementById("flow-calc-type");
    if (flowCalcTypeDropdown) {
        flowCalcTypeDropdown.addEventListener("change", (event) => toggleFlowInputs(event.target.value));
        // Set initial state on page load
        toggleFlowInputs(flowCalcTypeDropdown.value);
    }
});


// --- END OF MODIFIED SECTION ---


// Dosing Calculations
function calculateDose() {
    const dose = parseFloat(document.getElementById("dose-dose").value);
    const flow = parseFloat(document.getElementById("dose-flow").value);
    if (isNaN(dose) || isNaN(flow)) return;
    const poundsPerDay = dose * flow * 8.34;
    document.getElementById("dose-result").textContent = `Dose: ${poundsPerday.toFixed(2)} lbs/day`;
}

// Unit Conversions (Original functions remain unchanged)
// Flow Conversions
function convertFlow() {
    const fromUnit = document.getElementById("flow-conversion-from").value;
    const toUnit = document.getElementById("flow-conversion-to").value;
    const value = parseFloat(document.getElementById("flow-conversion-value").value);
    if (isNaN(value)) return;
    let result;
    const conversions = {
        mgd: { cfs: 1.547, gpm: 694.44 },
        cfs: { mgd: 0.646317, gpm: 448.83 },
        gpm: { mgd: 0.00144, cfs: 0.002228 }
    };
    if (fromUnit === toUnit) {
        result = value;
    } else {
        result = value * conversions[fromUnit][toUnit];
    }
    document.getElementById("flow-conversion-result").textContent = `Result: ${result.toFixed(3)} ${toUnit.toUpperCase()}`;
}

// Volume Conversions
function convertVolume() {
    const fromUnit = document.getElementById("volume-conversion-from").value;
    const toUnit = document.getElementById("volume-conversion-to").value;
    const value = parseFloat(document.getElementById("volume-conversion-value").value);
    if (isNaN(value)) return;
    let result;
    // Base unit: gallons
    const toGallons = {
        gallons: 1,
        cubicfeet: 7.48052,  // Added: 1 cubic foot = 7.48052 gallons
        acreft: 325851,
        liters: 0.264172
    };
    const fromGallons = {
        gallons: 1,
        cubicfeet: 1 / 7.48052, // Added: Convert gallons to cubic feet
        acreft: 1 / 325851,
        liters: 3.78541
    };
    if (fromUnit === toUnit) {
        result = value;
    } else {
        const valueInGallons = value * toGallons[fromUnit];
        result = valueInGallons * fromGallons[toUnit];
    }
    document.getElementById("volume-conversion-result").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
}

// Area Conversions
function convertArea() {
    const fromUnit = document.getElementById("area-conversion-from").value;
    const toUnit = document.getElementById("area-conversion-to").value;
    const value = parseFloat(document.getElementById("area-conversion-value").value);
    if (isNaN(value)) return;
    let result;
    // Base unit: sqft
    const toSqFt = {
        sqin: 1 / 144,
        sqft: 1,
        sqm: 10.764,
        acre: 43560,
        sqmi: 27878400
    };
    const fromSqFt = {
        sqin: 144,
        sqft: 1,
        sqm: 1 / 10.764,
        acre: 1 / 43560,
        sqmi: 1 / 27878400
    };
    if (fromUnit === toUnit) {
        result = value;
    } else {
        const valueInSqFt = value * toSqFt[fromUnit];
        result = valueInSqFt * fromSqFt[toUnit];
    }
    document.getElementById("area-conversion-result").textContent = `Result: ${result.toExponential(4)} ${toUnit}`;
}

// Temperature Conversions
function convertTemp() {
    const fromUnit = document.getElementById("temp-conversion-from").value;
    const toUnit = document.getElementById("temp-conversion-to").value;
    const value = parseFloat(document.getElementById("temp-conversion-value").value);
    if (isNaN(value)) return;
    let result;
    if (fromUnit === toUnit) {
        result = value;
    } else if (fromUnit === "celsius") {
        result = (toUnit === "fahrenheit") ? (value * 9 / 5) + 32 : value + 273.15;
    } else if (fromUnit === "fahrenheit") {
        const celsius = (value - 32) * 5 / 9;
        result = (toUnit === "celsius") ? celsius : celsius + 273.15;
    } else if (fromUnit === "kelvin") {
        const celsius = value - 273.15;
        result = (toUnit === "celsius") ? celsius : (celsius * 9 / 5) + 32;
    }
    document.getElementById("temp-conversion-result").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
}

// Weight Conversions
function convertWeight() {
    const fromUnit = document.getElementById("weight-conversion-from").value;
    const toUnit = document.getElementById("weight-conversion-to").value;
    const value = parseFloat(document.getElementById("weight-conversion-value").value);
    if (isNaN(value)) return;
    let result;
    // Base unit: lbs
    const toLbs = { kg: 2.20462, lbs: 1, oz: 1 / 16 };
    const fromLbs = { kg: 1 / 2.20462, lbs: 1, oz: 16 };
    if (fromUnit === toUnit) {
        result = value;
    } else {
        const valueInLbs = value * toLbs[fromUnit];
        result = valueInLbs * fromLbs[toUnit];
    }
    document.getElementById("weight-conversion-result").textContent = `Result: ${result.toFixed(2)} ${toUnit}`;
}

// Power Conversions
function convertPower() {
    const fromUnit = document.getElementById("power-conversion-from").value;
    const toUnit = document.getElementById("power-conversion-to").value;
    const value = parseFloat(document.getElementById("power-conversion-value").value);
    if (isNaN(value)) return;
    let result;
    // Base unit: watts
    const toWatts = {
        hp: 745.7,
        watts: 1,
        ergs: 1e-7,
        kcals: 4184,
        btus: 1055.06
    };
    const fromWatts = {
        hp: 1 / 745.7,
        watts: 1,
        ergs: 1e7,
        kcals: 1 / 4184,
        btus: 1 / 1055.06
    };

    if (fromUnit === toUnit) {
        result = value;
    } else {
        const valueInWatts = value * toWatts[fromUnit];
        result = valueInWatts * fromWatts[toUnit];
    }
    document.getElementById("power-conversion-result").textContent = `Result: ${result.toExponential(4)} ${toUnit}`;
}

// Tank Emptying Time
function calculateEmptyTime() {
    const radius = parseFloat(document.getElementById("tank-radius").value);
    const height = parseFloat(document.getElementById("tank-height").value);
    const flow = parseFloat(document.getElementById("tank-flow").value);
    if (isNaN(radius) || isNaN(height) || isNaN(flow)) return;

    const volume = Math.PI * Math.pow(radius, 2) * height; // Calculate volume in cubic feet
    if (flow === 0) {
        document.getElementById("empty-time-result").textContent = "Flow cannot be zero.";
        return;
    }
    const timeInSeconds = volume / flow;
    const timeInMinutes = timeInSeconds / 60;

    document.getElementById("empty-time-result").textContent = `Emptying Time: ${timeInMinutes.toFixed(2)} minutes`;
}