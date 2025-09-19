class GraphAnimation {
    constructor() {
        this.canvas = document.getElementById('graphCanvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
        this.bindEvents();
        this.startAnimation();
    }
    
    init() {
        this.resizeCanvas();
        this.createNodes();
        console.log(`Created ${this.nodes.length} nodes`);
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createNodes() {
        const nodeCount = Math.max(40, Math.floor((this.canvas.width * this.canvas.height) / 20000));
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.6 + 0.3,
                pulsePhase: Math.random() * Math.PI * 2,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            { r: 255, g: 255, b: 255 }, // White
            { r: 100, g: 200, b: 255 }, // Light Blue
            { r: 255, g: 100, b: 200 }, // Pink
            { r: 100, g: 255, b: 150 }  // Light Green
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.nodes = [];
            this.createNodes();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    startAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.animate();
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) {
                node.vx *= -1;
            }
            if (node.y < 0 || node.y > this.canvas.height) {
                node.vy *= -1;
            }
            
            // Keep nodes in bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            
            // Update pulse phase
            node.pulsePhase += 0.02;
        });
    }
    
    drawConnections() {
        this.connections = [];
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const node1 = this.nodes[i];
                const node2 = this.nodes[j];
                
                const dx = node1.x - node2.x;
                const dy = node1.y - node2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Connect nodes within a certain distance
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.4;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(node1.x, node1.y);
                    this.ctx.lineTo(node2.x, node2.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                    
                    this.connections.push({
                        node1: i,
                        node2: j,
                        distance: distance,
                        opacity: opacity
                    });
                }
            }
        }
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            // Mouse interaction
            const dx = node.x - this.mouse.x;
            const dy = node.y - this.mouse.y;
            const mouseDistance = Math.sqrt(dx * dx + dy * dy);
            
            let currentOpacity = node.opacity;
            let currentRadius = node.radius;
            
            // Pulse effect
            const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
            currentOpacity *= pulse;
            
            // Mouse proximity effect
            if (mouseDistance < 100) {
                const mouseEffect = (100 - mouseDistance) / 100;
                currentOpacity += mouseEffect * 0.3;
                currentRadius += mouseEffect * 1;
            }
            
            // Draw simple glow effect
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, currentRadius * 2
            );
            gradient.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${currentOpacity * 0.8})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, currentRadius * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Draw main node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${currentOpacity})`;
            this.ctx.fill();
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateNodes();
        this.drawConnections();
        this.drawNodes();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// Initialize the animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing animation...');
    new GraphAnimation();
});

// Fallback initialization
window.addEventListener('load', () => {
    console.log('Window loaded, checking for animation...');
    if (!window.graphAnimation) {
        console.log('Creating fallback animation...');
        window.graphAnimation = new GraphAnimation();
    }
});

// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const text = item.textContent.trim();
            let targetId = '';
            
            if (text.includes('HOME')) {
                targetId = 'home';
            } else if (text.includes('WHO WE ARE')) {
                targetId = 'who-we-are';
            } else if (text.includes('BLOG')) {
                targetId = 'blog';
            } else if (text.includes('JOBS')) {
                targetId = 'jobs';
            }
            
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Add some subtle animations to text elements
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-title, .section-description, .process-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
