const items=[
{id:1,name:"Indigo Denim Jacket",cat:"Outerwear",price:5499,tag:"SIGNATURE",img:"images/look-15.jpg",color:"Indigo"},
{id:2,name:"Washed Black Denim Jacket",cat:"Outerwear",price:5999,tag:"NEW",img:"images/look-07.jpg",color:"Washed black"},
{id:3,name:"Sand Utility Overshirt",cat:"Outerwear",price:4999,tag:"",img:"images/look-09.jpg",color:"Sand"},
{id:4,name:"Heritage Plaid Overshirt",cat:"Outerwear",price:4299,tag:"LIMITED",img:"images/look-14.jpg",color:"Brown check"},
{id:5,name:"Burgundy Slim Fit Shirt",cat:"Tops",price:3499,tag:"NEW",img:"images/look-06.jpg",color:"Burgundy"},
{id:6,name:"Heritage Knit Sweater",cat:"Tops",price:4499,tag:"ESSENTIAL",img:"images/look-04.jpg",color:"Cream"},
{id:7,name:"Zip Pocket Hoodie",cat:"Tops",price:3999,tag:"",img:"images/look-05.jpg",color:"Black"},
{id:8,name:"Chikankari Kurta",cat:"Ethnic",price:4999,tag:"",img:"images/look-11.jpg",color:"Ivory"},
{id:9,name:"Black Bandhgala Jacket",cat:"Ethnic",price:8999,tag:"SIGNATURE",img:"images/look-12.jpg",color:"Black"},
{id:10,name:"Olive Cargo Pants",cat:"Bottoms",price:3999,tag:"",img:"images/look-16.jpg",color:"Olive"},
{id:11,name:"Beige Tailored Chinos",cat:"Bottoms",price:3499,tag:"ESSENTIAL",img:"images/look-17.jpg",color:"Beige"},
{id:12,name:"Pinstripe Night Set",cat:"Loungewear",price:4799,tag:"NEW",img:"images/look-20.jpg",color:"Navy"}];
let cart=[],filter="All";const grid=document.getElementById("productGrid"),fmt=n=>"₹"+n.toLocaleString("en-IN");
function render(list=items){grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><img loading="lazy" src="${p.img}" alt="${p.name}">${p.tag?`<span class="product-label">${p.tag}</span>`:""}<button class="quick-add" data-add="${p.id}">ADD TO SELECTION — ${fmt(p.price)}</button></div><div class="product-info"><h3>${p.name}</h3><p><span>${p.color}</span><strong>${fmt(p.price)}</strong></p></div></article>`).join("")}
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.filter;render(filter==="All"?items:items.filter(p=>p.cat===filter))}));
document.querySelectorAll(".category").forEach(c=>c.addEventListener("click",()=>{filter=c.dataset.cat;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));render(items.filter(p=>p.cat===filter))}));
function toast(s){let t=document.getElementById("toast");t.textContent=s;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function refreshCart(){document.getElementById("cartCount").textContent=cart.reduce((a,b)=>a+b.qty,0);document.getElementById("cartTotalCount").textContent="("+document.getElementById("cartCount").textContent+")";let el=document.getElementById("cartItems");el.className="cart-list";el.innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><img src="${p.img}"><div><h4>${p.name}</h4><p>${p.color} · Qty ${p.qty}</p><b>${fmt(p.price*p.qty)}</b><br><button data-remove="${p.id}">Remove</button></div></div>`).join(""):'<p style="font-size:12px;color:#92745d;margin-top:25px">Your selection is currently empty.</p>';document.getElementById("subtotal").textContent=fmt(cart.reduce((a,b)=>a+b.price*b.qty,0));}
document.addEventListener("click",e=>{let a=e.target.closest("[data-add]");if(a){let p=items.find(x=>x.id===+a.dataset.add),old=cart.find(x=>x.id===p.id);old?old.qty++:cart.push({...p,qty:1});refreshCart();toast("Added to your selection");}let r=e.target.closest("[data-remove]");if(r){cart=cart.filter(p=>p.id!==+r.dataset.remove);refreshCart()}});
const panel=document.getElementById("cartPanel"),shade=document.getElementById("shade");function openCart(){panel.classList.add("show");shade.classList.add("show")}function closeCart(){panel.classList.remove("show");shade.classList.remove("show")}
document.getElementById("bagBtn").onclick=openCart;document.getElementById("cartClose").onclick=closeCart;shade.onclick=closeCart;document.getElementById("checkout").onclick=()=>toast("Demo checkout. Connect a payment provider to launch.");
document.getElementById("searchBtn").onclick=()=>document.getElementById("searchModal").classList.toggle("show");document.getElementById("searchClose").onclick=()=>document.getElementById("searchModal").classList.remove("show");document.getElementById("searchInput").addEventListener("input",e=>{let q=e.target.value.toLowerCase();render(items.filter(p=>(p.name+" "+p.cat+" "+p.color).toLowerCase().includes(q)))});
document.getElementById("mobileMenu").onclick=()=>document.getElementById("navLinks").classList.toggle("open");
document.getElementById("newsletter").onsubmit=e=>{e.preventDefault();document.getElementById("newsMsg").textContent="Thank you — you're now part of NORVEN.";e.target.reset()};
render();refreshCart();
// Contact form demo: validate and show confirmation (connect a backend/email service to receive messages).
const contactForm = document.getElementById('contactForm');
if (contactForm) contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = contactForm.elements.name.value.trim();
  const status = document.getElementById('contactStatus');
  status.textContent = `Thank you${name ? ', ' + name : ''}! Your message is ready. Please connect an email service to receive submissions.`;
  contactForm.reset();
});
