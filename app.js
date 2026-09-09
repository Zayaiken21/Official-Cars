let data = window.OFFICIAL_CARS;
const $ = id => document.getElementById(id);

document.addEventListener("DOMContentLoaded", async () => {
  if (typeof loadOfficialCars === "function") await loadOfficialCars();
  data = window.OFFICIAL_CARS;
  $("year").textContent = new Date().getFullYear();
  $("vehicleCount").textContent = data.vehicles.length;
  $("dealerCount").textContent = data.dealers.length;
  populateFilters();
  renderInventory();
  renderDealers();
});

function dealer(id){ return data.dealers.find(d => d.id === id) || {name:"Participating Dealer",address:"NYC"}; }

function populateFilters(){
  [...new Set(data.vehicles.map(v=>v.make))].sort().forEach(x=> $("make").insertAdjacentHTML("beforeend", `<option>${x}</option>`));
  [...new Set(data.vehicles.map(v=>v.type))].sort().forEach(x=> $("type").insertAdjacentHTML("beforeend", `<option>${x}</option>`));
  [...new Set(data.dealers.map(d=>d.borough))].sort().forEach(x=> $("location").insertAdjacentHTML("beforeend", `<option>${x}</option>`));
}

function renderInventory(){
  const q=($("search").value||"").toLowerCase().trim(), make=$("make").value, type=$("type").value, max=Number($("price").value||0), loc=$("location").value;
  const filtered=data.vehicles.filter(v=>{
    const d=dealer(v.dealerId);
    const text=`${v.year} ${v.make} ${v.model} ${v.type} ${d.name} ${d.borough}`.toLowerCase();
    return (!q||text.includes(q))&&(!make||v.make===make)&&(!type||v.type===type)&&(!max||v.price<=max)&&(!loc||d.borough===loc);
  });
  $("inventoryGrid").innerHTML=filtered.length ? filtered.map(card).join("") : `<div class="empty">No vehicles matched those filters.<br>Try a different search.</div>`;
}

function card(v){
  const d=dealer(v.dealerId);
  return `<article class="car-card" onclick="showCar('${v.id}')">
    <div class="car-image"><span class="badge">${v.tag}</span><span class="car-silhouette">${v.emoji}</span></div>
    <div class="car-info"><div class="car-title">${v.year} ${v.make} ${v.model}</div>
    <div class="car-meta">${v.type} • ${v.miles.toLocaleString()} miles • ${d.borough}</div>
    <div class="car-bottom"><div class="price">$${v.price.toLocaleString()}</div><div class="dealer-mini">${d.name}<br>${d.address}</div></div></div>
  </article>`;
}

function renderDealers(){
  $("dealerGrid").innerHTML=data.dealers.map(d=>{
    const count=data.vehicles.filter(v=>v.dealerId===d.id).length;
    return `<article class="dealer-card"><span class="dealer-pill">${d.borough}</span><h3>${d.name}</h3><p>${d.address}<br>${d.specialties.join(" • ")}<br><strong>${count} demo listings</strong></p><a class="btn btn-light" href="#inventory" onclick="setDealer('${d.borough}')">View inventory</a></article>`;
  }).join("");
}

function setDealer(b){ $("location").value=b; renderInventory(); $("inventory").scrollIntoView({behavior:"smooth"}); }
function applyHeroSearch(){ $("search").value=$("heroSearch").value; renderInventory(); $("inventory").scrollIntoView({behavior:"smooth"}); }
function quickFilter(kind){
  $("search").value = kind==="Under $30k" ? "" : kind;
  $("price").value = kind==="Under $30k" ? "30000" : "";
  $("type").value = ["SUV","Sedan","Electric"].includes(kind) ? kind : "";
  renderInventory(); $("inventory").scrollIntoView({behavior:"smooth"});
}
function toggleFilters(){ $("filters").classList.toggle("hidden"); }

function showCar(id){
  const v=data.vehicles.find(x=>x.id===id), d=dealer(v.dealerId);
  $("modalBody").innerHTML=`<div class="eyebrow">${v.tag.toUpperCase()}</div><h2>${v.year} ${v.make} ${v.model}</h2><p class="muted">${v.type} • ${v.miles.toLocaleString()} miles • ${d.name} • ${d.address}</p><h3>$${v.price.toLocaleString()}</h3><p>Demo listing. Before relying on price, mileage, availability, financing, fees or other terms, confirm the current details directly with the participating dealer.</p><p><strong>Partner disclosure:</strong> Official Cars may receive compensation for qualifying referrals or leads.</p><a class="btn btn-primary" target="_blank" rel="noopener" href="${v.url}">Visit dealer listing ↗</a>`;
  $("carModal").showModal();
}
function closeModal(){ $("carModal").close(); }

function submitPartner(e){
  e.preventDefault();
  $("partnerMsg").textContent="Thanks! Demo form received. Connect this form to your CRM/email endpoint before launch.";
  e.target.reset();
}
