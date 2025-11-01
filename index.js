import { menuArray } from './data.js';

// Add particles background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Add dynamic CSS for particle animation
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(50px) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(particleStyles);

document.body.innerHTML = `
	<main class="app-container">
		<header>
			<h1>
				<span class="title-emoji">🚀</span>
				<span class="title-text">Cosmic Diner</span>
				<span class="title-emoji">🌟</span>
			</h1>
		</header>
		<section id="menu"></section>
		<section id="order"></section>
		<footer>
			<button id="checkout-btn" class="checkout-btn">🛸 Launch Order 🛸</button>
		</footer>
	</main>
`;

const menuSection = document.getElementById('menu');
const orderSection = document.getElementById('order');
let order = [];

// Sound effects (using Web Audio API for futuristic sounds)
function playSound(frequency, duration = 200, type = 'sine') {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

function renderMenu() {
	menuSection.innerHTML = menuArray.map((item, index) => `
		<div class="menu-item">
			<div class="emoji">${item.emoji}</div>
			<div class="menu-item-content">
				<h2>${item.name}</h2>
				<div class="ingredients">${item.ingredients.join(' • ')}</div>
				<div class="price-container">
					<div class="price">$${item.price}</div>
				</div>
				<div class="menu-item-actions">
					<button class="add-btn" data-id="${item.id}">
						<span class="btn-icon">⚡</span>
						<span class="btn-text">Add to Cart</span>
						<span class="btn-icon">⚡</span>
					</button>
				</div>
			</div>
		</div>
	`).join('');
	
	// Add enhanced hover effects
	document.querySelectorAll('.menu-item').forEach((item, index) => {
		item.addEventListener('mouseenter', () => {
			playSound(400 + (index * 100), 150);
			
			// Add particle burst effect
			createHoverParticles(item);
		});
		
		// Add click ripple effect to the entire card
		item.addEventListener('click', (e) => {
			if (!e.target.closest('.add-btn')) {
				createCardRipple(item, e);
			}
		});
	});
}

// Enhanced particle effect for hover
function createHoverParticles(element) {
	const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#ff8a80'];
	const rect = element.getBoundingClientRect();
	
	for (let i = 0; i < 5; i++) {
		const particle = document.createElement('div');
		particle.style.cssText = `
			position: fixed;
			width: 4px;
			height: 4px;
			background: ${colors[Math.floor(Math.random() * colors.length)]};
			border-radius: 50%;
			pointer-events: none;
			z-index: 1000;
			left: ${rect.left + rect.width / 2}px;
			top: ${rect.top + rect.height / 2}px;
			animation: hoverParticle 1s ease-out forwards;
		`;
		
		particle.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
		particle.style.setProperty('--random-y', -Math.random() * 60 - 20 + 'px');
		
		document.body.appendChild(particle);
		setTimeout(() => particle.remove(), 1000);
	}
}

// Card ripple effect
function createCardRipple(element, event) {
	const rect = element.getBoundingClientRect();
	const ripple = document.createElement('div');
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	
	ripple.style.cssText = `
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.4);
		transform: scale(0);
		animation: cardRipple 0.8s linear;
		pointer-events: none;
		z-index: 1;
		width: 20px;
		height: 20px;
		left: ${x - 10}px;
		top: ${y - 10}px;
	`;
	
	element.appendChild(ripple);
	setTimeout(() => ripple.remove(), 800);
}

// Add particle and ripple animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
	@keyframes hoverParticle {
		0% {
			transform: translate(0, 0) scale(1);
			opacity: 1;
		}
		100% {
			transform: translate(var(--random-x), var(--random-y)) scale(0);
			opacity: 0;
		}
	}
	
	@keyframes cardRipple {
		to {
			transform: scale(8);
			opacity: 0;
		}
	}
`;
document.head.appendChild(enhancedStyles);

function renderOrder() {
	if (order.length === 0) {
		orderSection.innerHTML = '<p>🌌 Your cosmic order awaits... 🌌</p>';
		return;
	}
	
	const itemsHtml = order.map((item, index) => `
		<div class="order-item" style="animation-delay: ${index * 0.1}s">
			<span>${item.emoji}</span>
			<span>${item.name}</span>
			<span class="price">$${item.price}</span>
			<button class="remove-btn" data-id="${item.id}">🗑️ Remove</button>
		</div>
	`).join('');
	
	const total = order.reduce((sum, item) => sum + item.price, 0);
	orderSection.innerHTML = `
		<h2>🛸 Your Cosmic Order 🛸</h2>
		${itemsHtml}
		<div class="order-total">💫 Total: $${total} 💫</div>
	`;
	
	// Add remove button sound effects
	document.querySelectorAll('.remove-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			playSound(200, 150, 'sawtooth');
		});
	});
}

// Enhanced button click effects
function addClickEffect(element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
        width: 20px;
        height: 20px;
        left: ${rect.left + rect.width / 2 - 10}px;
        top: ${rect.top + rect.height / 2 - 10}px;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect CSS
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

menuSection.addEventListener('click', e => {
	if (e.target.classList.contains('add-btn')) {
		const id = Number(e.target.dataset.id);
		const item = menuArray.find(i => i.id === id);
		
		// Add visual feedback
		addClickEffect(e.target);
		e.target.style.transform = 'scale(0.95)';
		setTimeout(() => {
			e.target.style.transform = '';
		}, 150);
		
		// Play success sound
		playSound(600, 300, 'triangle');
		
		// Add to order with animation
		order.push(item);
		renderOrder();
		
		// Trigger confetti effect
		createConfetti(e.target);
	}
});

orderSection.addEventListener('click', e => {
	if (e.target.classList.contains('remove-btn')) {
		const id = Number(e.target.dataset.id);
		addClickEffect(e.target);
		order = order.filter(i => i.id !== id);
		renderOrder();
	}
});

// Confetti effect for adding items
function createConfetti(element) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#ff8a80'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: confetti-fall 1s ease-out forwards;
        `;
        
        confetti.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
        confetti.style.setProperty('--random-y', -Math.random() * 100 - 50 + 'px');
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 1000);
    }
}

// Add confetti animation CSS
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--random-x), var(--random-y)) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyles);

// Enhanced checkout with celebration
document.getElementById('checkout-btn').addEventListener('click', () => {
	if (order.length === 0) {
		// Play error sound
		playSound(150, 500, 'sawtooth');
		return;
	}
	
	// Add click effect
	addClickEffect(document.getElementById('checkout-btn'));
	
	// Play success fanfare
	setTimeout(() => playSound(523, 200), 0);    // C
	setTimeout(() => playSound(659, 200), 200);  // E
	setTimeout(() => playSound(784, 200), 400);  // G
	setTimeout(() => playSound(1047, 400), 600); // C (octave)
	
	// Celebration confetti
	for (let i = 0; i < 30; i++) {
		setTimeout(() => {
			createConfetti(document.getElementById('checkout-btn'));
		}, i * 50);
	}
	
	// Create success modal
	const modal = document.createElement('div');
	modal.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(10px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		animation: fadeIn 0.3s ease-out;
	`;
	
	modal.innerHTML = `
		<div style="
			background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
			backdrop-filter: blur(20px);
			border: 1px solid rgba(255, 255, 255, 0.2);
			border-radius: 24px;
			padding: 3rem;
			text-align: center;
			color: white;
			max-width: 400px;
			animation: scaleIn 0.5s ease-out;
		">
			<div style="font-size: 4rem; margin-bottom: 1rem;">🚀✨🎉</div>
			<h2 style="font-family: 'Orbitron', monospace; color: #4ecdc4; margin-bottom: 1rem;">Order Launched!</h2>
			<p style="margin-bottom: 2rem; font-size: 1.1rem;">Your cosmic feast is being prepared in our space kitchen! 🛸</p>
			<button id="close-modal" style="
				background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
				color: white;
				border: none;
				padding: 1rem 2rem;
				border-radius: 12px;
				font-size: 1.1rem;
				font-weight: 600;
				cursor: pointer;
				transition: all 0.3s ease;
			">Close</button>
		</div>
	`;
	
	// Add modal styles
	const modalStyles = document.createElement('style');
	modalStyles.textContent = `
		@keyframes fadeIn {
			from { opacity: 0; }
			to { opacity: 1; }
		}
		@keyframes scaleIn {
			from { transform: scale(0.5); opacity: 0; }
			to { transform: scale(1); opacity: 1; }
		}
	`;
	document.head.appendChild(modalStyles);
	
	document.body.appendChild(modal);
	
	// Close modal functionality
	document.getElementById('close-modal').addEventListener('click', () => {
		modal.style.animation = 'fadeOut 0.3s ease-out';
		setTimeout(() => {
			modal.remove();
			modalStyles.remove();
		}, 300);
	});
	
	// Add fadeOut animation
	modalStyles.textContent += `
		@keyframes fadeOut {
			from { opacity: 1; }
			to { opacity: 0; }
		}
	`;
	
	order = [];
	renderOrder();
});

// Initialize app
createParticles();
renderMenu();
renderOrder();

// Add dynamic title effect
let titleIndex = 0;
const titles = [
    { text: 'Cosmic Diner', emojis: ['🚀', '🌟'] },
    { text: 'Space Eats', emojis: ['🌌', '🛸'] },
    { text: 'Stellar Bites', emojis: ['✨', '⭐'] },
    { text: 'Galaxy Grub', emojis: ['🌠', '�'] }
];

setInterval(() => {
    titleIndex = (titleIndex + 1) % titles.length;
    const currentTitle = titles[titleIndex];
    const titleElement = document.querySelector('h1');
    
    titleElement.innerHTML = `
        <span class="title-emoji">${currentTitle.emojis[0]}</span>
        <span class="title-text">${currentTitle.text}</span>
        <span class="title-emoji">${currentTitle.emojis[1]}</span>
    `;
}, 5000);
