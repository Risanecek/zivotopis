document.addEventListener("DOMContentLoaded", async () => {
    
    //tsParticles 
    await tsParticles.load("tsparticles", {
        particles: {
            number: { value: 45, density: { enable: true, area: 1000 } },
            color: { value: "#facc15" },
            links: { enable: true, distance: 150, color: "#facc15", opacity: 0.3 },
            move: { enable: true, speed: 1.2 }
        },
        interactivity: {
            detectsOn: "window",
            events: { onHover: { enable: true, mode: "repel" } },
            modes: { repel: { distance: 150, duration: 0.4 } }
        }
    });

    const ring = document.getElementById('progress-ring');
    const text = document.getElementById('progress-text');
    let startL = null;
    function load(t) {
        if (!startL) startL = t;
        let p = Math.min((t - startL) / 2000, 1);
        if(ring) ring.style.setProperty('--progress', (p * 100) + "%");
        if(text) text.innerText = Math.floor(p * 100) + "%";
        if (p < 1) requestAnimationFrame(load);
        else document.getElementById('loader-wrapper').classList.add('fade-out');
    }
    requestAnimationFrame(load);

    //kurzor
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    const canvas = document.getElementById('trail-canvas');
    const ctx = canvas.getContext('2d');
    let points = [];

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX, y = e.clientY;
        if(dot) { dot.style.left = x + 'px'; dot.style.top = y + 'px'; }
        if(outline) { outline.style.left = x + 'px'; outline.style.top = y + 'px'; }
        points.push({ x, y });
        if (points.length > 25) points.shift();
    });

    document.querySelectorAll('.work-card, .card-style-btn, .cert-link, .social-icons a').forEach(el => {
        el.addEventListener('mouseenter', () => outline.classList.add('hover-active'));
        el.addEventListener('mouseleave', () => outline.classList.remove('hover-active'));
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
        requestAnimationFrame(draw);
    }
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    window.dispatchEvent(new Event('resize'));
    draw();

    document.querySelectorAll('.work-card').forEach(c => {
        c.addEventListener('click', () => c.querySelector('.card-inner').classList.toggle('is-flipped'));
    });

    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            btn.style.transform = `translate(${(e.clientX - (r.left + r.width/2))*0.3}px, ${(e.clientY - (r.top + r.height/2))*0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0,0)');
    });
});


const initStatusCheck = () => {
    const btn = document.querySelector('.card-style-btn');
    const status = document.getElementById('system-status');

    if (btn && status) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            status.innerText = "Stránka se připravuje... Ani Řím nebyl postaven za den :)";
            status.classList.add('active');

            setTimeout(() => {
                status.classList.remove('active');
            }, 3000);
        });
    }
};

window.addEventListener('load', initStatusCheck);