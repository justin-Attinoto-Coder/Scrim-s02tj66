import { menuArray } from './data.js';

document.body.innerHTML = `
	<main class="app-container">
		<header>
			<h1>Mobile Restaurant Ordering</h1>
		</header>
		<section id="menu"></section>
		<section id="order"></section>
		<footer>
			<button id="checkout-btn" class="checkout-btn">Checkout</button>
		</footer>
	</main>
`;

const menuSection = document.getElementById('menu');
const orderSection = document.getElementById('order');
let order = [];

function renderMenu() {
	menuSection.innerHTML = menuArray.map(item => `
		<div class="menu-item">
			<span class="emoji">${item.emoji}</span>
			<div>
				<h2>${item.name}</h2>
				<p>${item.ingredients.join(', ')}</p>
				<p class="price">$${item.price}</p>
			</div>
			<button class="add-btn" data-id="${item.id}">Add</button>
		</div>
	`).join('');
}

function renderOrder() {
	if (order.length === 0) {
		orderSection.innerHTML = '<p>Your order is empty.</p>';
		return;
	}
	const itemsHtml = order.map(item => `
		<div class="order-item">
			<span>${item.emoji}</span>
			<span>${item.name}</span>
			<span>$${item.price}</span>
			<button class="remove-btn" data-id="${item.id}">Remove</button>
		</div>
	`).join('');
	const total = order.reduce((sum, item) => sum + item.price, 0);
	orderSection.innerHTML = `
		<h2>Your Order</h2>
		${itemsHtml}
		<div class="order-total">Total: $${total}</div>
	`;
}

menuSection.addEventListener('click', e => {
	if (e.target.classList.contains('add-btn')) {
		const id = Number(e.target.dataset.id);
		const item = menuArray.find(i => i.id === id);
		order.push(item);
		renderOrder();
	}
});

orderSection.addEventListener('click', e => {
	if (e.target.classList.contains('remove-btn')) {
		const id = Number(e.target.dataset.id);
		order = order.filter(i => i.id !== id);
		renderOrder();
	}
});

document.getElementById('checkout-btn').addEventListener('click', () => {
	if (order.length === 0) return;
	alert('Thank you for your order!');
	order = [];
	renderOrder();
});

renderMenu();
renderOrder();
