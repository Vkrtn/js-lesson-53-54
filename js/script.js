import data from "./data/data.js";
import rendeer from "./render/render.js";
import { cartList } from "./render/render.js";
rendeer(".products", data);
const closeMenu = document.querySelector('.fa-xmark')

closeMenu.addEventListener('click' , el=>{
        cartList.classList.remove("hiden")
        closeMenu.classList.remove('close')

    });





export default closeMenu