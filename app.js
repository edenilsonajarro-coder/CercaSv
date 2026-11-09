const toast = document.getElementById('toast');
    let toastTimer;
    function notify(message){
      toast.textContent=message; toast.style.display='block';
      clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.style.display='none',3200);
    }
    document.getElementById('searchInput').addEventListener('keydown',(event)=>{
      if(event.key==='Enter'){
        const value=document.getElementById('searchInput').value.trim();
        notify(value ? 'Todavía no hay productos publicados para buscar.' : 'Escribe un producto o una tienda.');
      }
    });
