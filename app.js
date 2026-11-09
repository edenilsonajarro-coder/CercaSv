const SUPABASE_URL="https://kxbcndsjfbngawzvhdpj.supabase.co";
const SUPABASE_KEY="sb_publishable_cE-XEDxG_5TlE6XCH3gRbA_ymlTB-uU";
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const toast=document.getElementById("toast");let toastTimer;let products=[];
function notify(m){toast.textContent=m;toast.style.display="block";clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.style.display="none",3200)}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function money(v){return new Intl.NumberFormat("es-SV",{style:"currency",currency:"USD"}).format(v||0)}
function render(items){const host=document.getElementById("emptyState");if(!items.length){host.className="empty-products";host.innerHTML='<div class="big">🛍️</div><h3>Estamos preparando el mercado</h3><p>No hay productos activos disponibles por ahora.</p>';return}host.className="product-grid";host.innerHTML=items.map(p=>'<article class="product-card"><div class="product-symbol">🛍️</div><small>'+esc(p.negocios?.nombre||"Negocio local")+'</small><h3>'+esc(p.nombre)+'</h3><p>'+esc(p.descripcion||"Producto local")+'</p><strong>'+money(p.precio)+'</strong><span class="stock">Disponibles: '+p.stock+'</span></article>').join("")}
async function load(){const {data,error}=await db.from("productos").select("id,nombre,descripcion,precio,stock,negocios(nombre)").eq("activo",true).gt("stock",0).order("creado_en",{ascending:false});if(error){console.error(error);notify("No se pudo cargar el catálogo de Supabase.");return}products=data||[];render(products)}
document.getElementById("searchInput").addEventListener("input",e=>{const q=e.target.value.trim().toLocaleLowerCase();render(products.filter(p=>(p.nombre+" "+(p.descripcion||"")+" "+(p.negocios?.nombre||"")).toLocaleLowerCase().includes(q)))});
document.querySelectorAll(".login").forEach(b=>b.onclick=()=>notify("El acceso de compradores se habilitará en la siguiente etapa."));
load();