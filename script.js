const canvas = document.getElementById("crackCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cracks = [];
const crackCount = 20;
let opacity = 0;

// Generate random cracks
for (let i = 0; i < crackCount; i++) {
    cracks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
    });
}

function drawCracks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; // White cracks
    ctx.lineWidth = 2;

    cracks.forEach((crack) => {
        ctx.beginPath();
        ctx.moveTo(crack.x, crack.y);
        ctx.lineTo(crack.x + crack.dx * 10, crack.y + crack.dy * 10);
        ctx.stroke();

        crack.x += crack.dx;
        crack.y += crack.dy;
    });

    if (opacity < 1) {
        opacity += 0.02; // Slow fade-in effect for cracks
    }
}

function startCracking() {
    opacity = 0; // Reset opacity for repeated effect
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setInterval(drawCracks, 100);
}

function tvStaticTransition() {
    const staticOverlay = document.getElementById("static");
    staticOverlay.style.opacity = "1";
    staticOverlay.style.animation = "none"; // Reset animation

    // Flicker effect every 0.1s for 0.3 seconds
    let flickerInterval = setInterval(() => {
        staticOverlay.style.opacity = staticOverlay.style.opacity == "1" ? "0" : "1";
    }, 100);

    setTimeout(() => {
        clearInterval(flickerInterval);
        staticOverlay.style.opacity = "0";
        showNotEverythingIsAsItSeems();
    }, 300);
}

function showNotEverythingIsAsItSeems() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "#001f3f"; // Dark blue text

    document.getElementById("content").innerHTML = `
        <h1>Everything isn't as it seems.</h1>
        <h2>See you soon!</h2>
    `;

    // Start countdown timer
    startCountdown();

    // Hide the static effect
    document.getElementById("static").style.opacity = "0";

    // Schedule the effect to happen again randomly between 2-8 seconds
    let nextEffectTime = Math.floor(Math.random() * (8000 - 2000 + 1)) + 2000; // 2 to 8 seconds
    setTimeout(() => {
        startCracking();
        setTimeout(tvStaticTransition, 1000); // TV static starts after cracking
    }, nextEffectTime);
}

function startCountdown() {
    const countdownElement = document.getElementById("countdown");
    const targetDate = new Date("March 26, 2025 11:00:00").getTime();

    // Update the countdown every second
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "The event has started!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

// Start the first cycle
setTimeout(() => {
    startCracking();
    setTimeout(tvStaticTransition, 1000); // TV static starts after cracking
}, 7000);
