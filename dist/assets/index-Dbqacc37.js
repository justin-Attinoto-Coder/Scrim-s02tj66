(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const u=[{name:"Pizza",ingredients:["pepperoni","mushrom","mozarella"],id:0,price:14,emoji:"🍕"},{name:"Hamburger",ingredients:["beef","cheese","lettuce"],price:12,emoji:"🍔",id:1},{name:"Beer",ingredients:["grain, hops, yeast, water"],price:12,emoji:"🍺",id:2}];document.body.innerHTML=`
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
`;const l=document.getElementById("menu"),a=document.getElementById("order");let o=[];function m(){l.innerHTML=u.map(t=>`
		<div class="menu-item">
			<span class="emoji">${t.emoji}</span>
			<div>
				<h2>${t.name}</h2>
				<p>${t.ingredients.join(", ")}</p>
				<p class="price">$${t.price}</p>
			</div>
			<button class="add-btn" data-id="${t.id}">Add</button>
		</div>
	`).join("")}function d(){if(o.length===0){a.innerHTML="<p>Your order is empty.</p>";return}const t=o.map(n=>`
		<div class="order-item">
			<span>${n.emoji}</span>
			<span>${n.name}</span>
			<span>$${n.price}</span>
			<button class="remove-btn" data-id="${n.id}">Remove</button>
		</div>
	`).join(""),i=o.reduce((n,s)=>n+s.price,0);a.innerHTML=`
		<h2>Your Order</h2>
		${t}
		<div class="order-total">Total: $${i}</div>
	`}l.addEventListener("click",t=>{if(t.target.classList.contains("add-btn")){const i=Number(t.target.dataset.id),n=u.find(s=>s.id===i);o.push(n),d()}});a.addEventListener("click",t=>{if(t.target.classList.contains("remove-btn")){const i=Number(t.target.dataset.id);o=o.filter(n=>n.id!==i),d()}});document.getElementById("checkout-btn").addEventListener("click",()=>{o.length!==0&&(alert("Thank you for your order!"),o=[],d())});m();d();
