(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();const f=[{name:"Pizza",ingredients:["pepperoni","mushrom","mozarella"],id:0,price:14,emoji:"🍕"},{name:"Hamburger",ingredients:["beef","cheese","lettuce"],price:12,emoji:"🍔",id:1},{name:"Beer",ingredients:["grain, hops, yeast, water"],price:12,emoji:"🍺",id:2}];function C(){const e=document.createElement("div");e.className="particles",e.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;for(let n=0;n<20;n++){const t=document.createElement("div");t.style.cssText=`
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${5+Math.random()*10}s linear infinite;
            left: ${Math.random()*100}%;
            top: ${Math.random()*100}%;
            animation-delay: ${Math.random()*5}s;
        `,e.appendChild(t)}document.body.appendChild(e)}const h=document.createElement("style");h.textContent=`
    @keyframes float {
        0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(50px) rotate(360deg); opacity: 0; }
    }
`;document.head.appendChild(h);document.body.innerHTML=`
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
`;const y=document.getElementById("menu"),m=document.getElementById("order");let s=[];function a(e,n=200,t="sine"){const i=new(window.AudioContext||window.webkitAudioContext),o=i.createOscillator(),r=i.createGain();o.connect(r),r.connect(i.destination),o.frequency.value=e,o.type=t,r.gain.setValueAtTime(.1,i.currentTime),r.gain.exponentialRampToValueAtTime(.01,i.currentTime+n/1e3),o.start(i.currentTime),o.stop(i.currentTime+n/1e3)}function T(){y.innerHTML=f.map((e,n)=>`
		<div class="menu-item">
			<div class="emoji">${e.emoji}</div>
			<div class="menu-item-content">
				<h2>${e.name}</h2>
				<div class="ingredients">${e.ingredients.join(" • ")}</div>
				<div class="price-container">
					<div class="price">$${e.price}</div>
				</div>
				<div class="menu-item-actions">
					<button class="add-btn" data-id="${e.id}">
						<span class="btn-icon">⚡</span>
						<span class="btn-text">Add to Cart</span>
						<span class="btn-icon">⚡</span>
					</button>
				</div>
			</div>
		</div>
	`).join(""),document.querySelectorAll(".menu-item").forEach((e,n)=>{e.addEventListener("mouseenter",()=>{a(400+n*100,150),$(e)}),e.addEventListener("click",t=>{t.target.closest(".add-btn")||E(e,t)})})}function $(e){const n=["#ff6b6b","#4ecdc4","#45b7d1","#ffd93d","#ff8a80"],t=e.getBoundingClientRect();for(let i=0;i<5;i++){const o=document.createElement("div");o.style.cssText=`
			position: fixed;
			width: 4px;
			height: 4px;
			background: ${n[Math.floor(Math.random()*n.length)]};
			border-radius: 50%;
			pointer-events: none;
			z-index: 1000;
			left: ${t.left+t.width/2}px;
			top: ${t.top+t.height/2}px;
			animation: hoverParticle 1s ease-out forwards;
		`,o.style.setProperty("--random-x",(Math.random()-.5)*100+"px"),o.style.setProperty("--random-y",-Math.random()*60-20+"px"),document.body.appendChild(o),setTimeout(()=>o.remove(),1e3)}}function E(e,n){const t=e.getBoundingClientRect(),i=document.createElement("div"),o=n.clientX-t.left,r=n.clientY-t.top;i.style.cssText=`
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.4);
		transform: scale(0);
		animation: cardRipple 0.8s linear;
		pointer-events: none;
		z-index: 1;
		width: 20px;
		height: 20px;
		left: ${o-10}px;
		top: ${r-10}px;
	`,e.appendChild(i),setTimeout(()=>i.remove(),800)}const g=document.createElement("style");g.textContent=`
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
`;document.head.appendChild(g);function c(){if(s.length===0){m.innerHTML="<p>🌌 Your cosmic order awaits... 🌌</p>";return}const e=s.map((t,i)=>`
		<div class="order-item" style="animation-delay: ${i*.1}s">
			<span>${t.emoji}</span>
			<span>${t.name}</span>
			<span class="price">$${t.price}</span>
			<button class="remove-btn" data-id="${t.id}">🗑️ Remove</button>
		</div>
	`).join(""),n=s.reduce((t,i)=>t+i.price,0);m.innerHTML=`
		<h2>🛸 Your Cosmic Order 🛸</h2>
		${e}
		<div class="order-total">💫 Total: $${n} 💫</div>
	`,document.querySelectorAll(".remove-btn").forEach(t=>{t.addEventListener("click",()=>{a(200,150,"sawtooth")})})}function p(e){const n=e.getBoundingClientRect(),t=document.createElement("div");t.style.cssText=`
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
        width: 20px;
        height: 20px;
        left: ${n.left+n.width/2-10}px;
        top: ${n.top+n.height/2-10}px;
    `,document.body.appendChild(t),setTimeout(()=>{t.remove()},600)}const b=document.createElement("style");b.textContent=`
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;document.head.appendChild(b);y.addEventListener("click",e=>{if(e.target.classList.contains("add-btn")){const n=Number(e.target.dataset.id),t=f.find(i=>i.id===n);p(e.target),e.target.style.transform="scale(0.95)",setTimeout(()=>{e.target.style.transform=""},150),a(600,300,"triangle"),s.push(t),c(),x(e.target)}});m.addEventListener("click",e=>{if(e.target.classList.contains("remove-btn")){const n=Number(e.target.dataset.id);p(e.target),s=s.filter(t=>t.id!==n),c()}});function x(e){const n=["#ff6b6b","#4ecdc4","#45b7d1","#ffd93d","#ff8a80"],t=e.getBoundingClientRect();for(let i=0;i<10;i++){const o=document.createElement("div");o.style.cssText=`
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${n[Math.floor(Math.random()*n.length)]};
            left: ${t.left+t.width/2}px;
            top: ${t.top+t.height/2}px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: confetti-fall 1s ease-out forwards;
        `,o.style.setProperty("--random-x",(Math.random()-.5)*200+"px"),o.style.setProperty("--random-y",-Math.random()*100-50+"px"),document.body.appendChild(o),setTimeout(()=>o.remove(),1e3)}}const v=document.createElement("style");v.textContent=`
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
`;document.head.appendChild(v);document.getElementById("checkout-btn").addEventListener("click",()=>{if(s.length===0){a(150,500,"sawtooth");return}p(document.getElementById("checkout-btn")),setTimeout(()=>a(523,200),0),setTimeout(()=>a(659,200),200),setTimeout(()=>a(784,200),400),setTimeout(()=>a(1047,400),600);for(let t=0;t<30;t++)setTimeout(()=>{x(document.getElementById("checkout-btn"))},t*50);const e=document.createElement("div");e.style.cssText=`
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
	`,e.innerHTML=`
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
	`;const n=document.createElement("style");n.textContent=`
		@keyframes fadeIn {
			from { opacity: 0; }
			to { opacity: 1; }
		}
		@keyframes scaleIn {
			from { transform: scale(0.5); opacity: 0; }
			to { transform: scale(1); opacity: 1; }
		}
	`,document.head.appendChild(n),document.body.appendChild(e),document.getElementById("close-modal").addEventListener("click",()=>{e.style.animation="fadeOut 0.3s ease-out",setTimeout(()=>{e.remove(),n.remove()},300)}),n.textContent+=`
		@keyframes fadeOut {
			from { opacity: 1; }
			to { opacity: 0; }
		}
	`,s=[],c()});C();T();c();let l=0;const u=[{text:"Cosmic Diner",emojis:["🚀","🌟"]},{text:"Space Eats",emojis:["🌌","🛸"]},{text:"Stellar Bites",emojis:["✨","⭐"]},{text:"Galaxy Grub",emojis:["🌠","�"]}];setInterval(()=>{l=(l+1)%u.length;const e=u[l],n=document.querySelector("h1");n.innerHTML=`
        <span class="title-emoji">${e.emojis[0]}</span>
        <span class="title-text">${e.text}</span>
        <span class="title-emoji">${e.emojis[1]}</span>
    `},5e3);
