const canvas = document.getElementById("crackCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cracks = [];
const crackCount = 20;
let opacity = 0;
let transitionStarted = false;

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

// Start crack animation
const crackInterval = setInterval(drawCracks, 100);

setTimeout(() => {
    clearInterval(crackInterval);
    transitionStarted = true;
}, 7000); // Start transition slightly before 8 seconds

// Static effect before showing the page
setTimeout(() => {
    document.getElementById("static").style.opacity = "0";
}, 3000);

// After 8 seconds, show TV "lost signal" glitch before transitioning
setTimeout(() => {
    const glitchEffect = document.createElement("div");
    glitchEffect.classList.add("lost-signal");
    document.body.appendChild(glitchEffect);
}, 7900);

setTimeout(() => {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "#001f3f"; // Dark blue text
    document.getElementById("content").innerHTML = `
        <img src="cloak-pixel.png" alt="CloakPixel Logo" style="width: 200px; display: block; margin: 0 auto 20px;">
        <h1>Everything isn't as it seems.</h1>
        <h2>See you soon!</h2>
    `;
}, 8500); // 8.5 seconds
