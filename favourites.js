
const navA = document.querySelector(".nav-a");

    navA.addEventListener("click", function(e) {
        document.location.href = 'index.html';
    });


//importing modules from script.js
import { renderSuperheroes ,abcd } from './script.js';
setTimeout(()=> renderSuperheroes([]),0)
setTimeout(function(){
    const favHead=document.querySelector('.fav-heading');
    favHead.innerHTML= "Favourite Heroes:"

    renderSuperheroes(abcd);
    
    
    console.log("task done");
    
},2000)

