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

    // Flicker effect for 0.3 seconds
    setTimeout(() => {
        staticOverlay.style.opacity = "0";
        resetToInitialPage();
    }, 300);
}

function resetToInitialPage() {
    document.body.style.backgroundColor = "#001f3f"; // Dark blue
    document.body.style.color = "white"; // White text

    document.getElementById("content").innerHTML = `
        <h1>Cloak Pixel Training</h1>
        <h2>March 26th, 27th and 31st 2025</h2>
        <hr>
        <p>More information to come soon - stay tuned.</p>
    `;

    // Hide the static effect
    document.getElementById("static").style.opacity = "0";

    // Schedule the effect to happen again randomly between 2-8 seconds
    let nextEffectTime = Math.floor(Math.random() * (8000 - 2000 + 1)) + 2000; // 2 to 8 seconds
    setTimeout(() => {
        startCracking();
        setTimeout(tvStaticTransition, 1000); // TV static starts after cracking
    }, nextEffectTime);
}

// Start the first cycle
setTimeout(() => {
    startCracking();
    setTimeout(tvStaticTransition, 1000); // TV static starts after cracking
}, 7000);
