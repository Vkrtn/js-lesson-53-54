import cart from "../cart.js";
import data from "../data/data.js";
import { dataRTU } from "../cart.js";
const carticon = document.querySelector(".carticon");
const cartList = document.querySelector(".cart-list");

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
    }).join("");


    const infoBlock = document.querySelectorAll(".info");
    infoBlock.forEach(el => {
      el.addEventListener("click", (event) => {
          
          const fullInfoEl = event.target.closest(".full-info");
          if (fullInfoEl) {
              fullInfoEl.classList.toggle("hiden");
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
      return `
          <li class="list-item">
            <img src="${product.img}" alt="Img">
            <div>${product.product}</div>
            <span>${product.price}$</span>
            <div class="amount">${el.amount}</div>
          </li>
        `;
    })
    .join("");
};

carticon.addEventListener("click", (el) => {
  cartList.classList.contains("hiden")
    ? cartList.classList.remove("hiden")
    : cartList.classList.add("hiden");
});

export default rendeer;
