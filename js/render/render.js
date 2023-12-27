import cart from "../cart.js";
import data from "../data/data.js";
import { dataRTU } from "../cart.js";
import closeMenu from "../script.js";
const carticon = document.querySelector(".carticon");
export const cartList = document.querySelector(".cart-list");


const rendeer = (sector, arr) => {
  const products = document.querySelector(sector);
  products.innerHTML = arr
    .map((el, i) => {
      return `
    <div class="product" data-id="${++i}">
    <img src="${el.img}" alt="IMG">
    <div class="title-price">
      <h3>${el.product}</h3>
      <span>${el.price}$</span>
    </div>
    <div class="info-btn">
    <div class="info btn">
    ${el.tite}
    </div>
    <div id="full" class="full-info">${el.info}</div>
    </div>
    <button type="button" class="btn">
  Add to Cart
    </button>
  </div>
    `;
    })
    .join("");

  const infoBlock = document.querySelectorAll(".info");
  infoBlock.forEach((el) => {
    el.addEventListener("click", (e) => {
      let parent = e.target.closest(".info-btn");
      for (let child of parent.childNodes) {
        if (child.classList && child.classList.contains("full-info")) {
          child.classList.toggle("hiden");
          break; 
        }
      }
    });
    
  });

  const btn = document.querySelectorAll(".btn");
  btn.forEach((el) => {
    el.addEventListener("click", (el) => {
      let prodId = el.target.closest(".product").dataset.id;

      cart.find((el) => el.id == prodId)
        ? cart.find((el) => el.id == prodId).amount++
        : cart.push({ id: prodId, amount: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
    });
  });
  updateCartUI();
};

const updateCartUI = () => {
  let items = cart.reduce((a, b) => a + b.amount, 0);
  carticon.innerHTML = items;

  cartList.innerHTML = dataRTU
    .map((el) => {
      const product = data.find((item) => item.id == el.id);
      if (!product) return "";
      return `
        <li class="list-item" data-id="${product.id}">
          <img src="${product.img}" alt="Img">
          <div>${product.product}</div>
          <span>${product.price}$</span>
          <div class="amount">Amount: <span class="removeItem">-</span> ${el.amount} <span class="addItem">+</span></div>
          <div class="summ">Sum:${el.amount * product.price}$</div>
        </li>
      `;
    })
    .join("");
};

cartList.addEventListener('click', (e) => {
  const target = e.target;
  
  if (target.classList.contains('removeItem')) {
    handleRemoveItem(target);
  } else if (target.classList.contains('addItem')) {
    handleAddItem(target);
  }
});

const handleRemoveItem = (target) => {
  let prodId = target.closest(".list-item").dataset.id;
  const index = cart.findIndex((item) => item.id == prodId);
  
  if (index !== -1) {
    cart[index].amount--;
    if (cart[index].amount <= 0) {
      target.closest(".list-item").classList.add('remove')
      setTimeout(()=>{
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();

      },400)
    }else{
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
  
    }
  }
};


const handleAddItem = (target) => {
  let prodId = target.closest(".list-item").dataset.id;
  const cartItem = cart.find((item) => item.id == prodId);
  
  if (cartItem) {
    cartItem.amount++;
  } else {
    cart.push({ id: prodId, amount: 1 });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
};


carticon.addEventListener("click", (el) => {
  updateCartUI()
  if(cartList.classList.contains("hiden") ) {
    cartList.classList.remove("hiden")
    closeMenu.classList.remove('close')
  }
    
  cartList.classList.add("hiden")
  closeMenu.classList.add('close')});

export default rendeer;
