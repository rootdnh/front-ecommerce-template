const productsCategories = document.getElementById("products-categories");
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.documentElement.style.setProperty(
 "--scrollbar-width",
 `${scrollbarWidth}px`
);
const btnAll = document.querySelectorAll(".btn-select");
const btnTwo = document.getElementById("tab-two");
const btnThree = document.getElementById("tab-three");

fetchAllProducts();

function renderCategories(data) {
 productsCategories.innerHTML = data
  .map(
   (product) =>
    `
    <a href="./produtos.html?id=${product.id}"class="single-product">
     <div>
      <h3>${product.title}</h3>
      <span>
      ${product.price.toLocaleString("pt-BR", {
       style: "currency",
       currency: "BRL",
      })}
      </span>
     </div>
      <img src="${product.image}">
     </a>
      `
  )
  .join("");
}

function fetchAllProducts() {
 selectBtn(1);
 fetch("https://fakestoreapi.com/products?limit=8")
  .then((data) => data.json())
  .then((data) => renderCategories(data));
}

function fetchByCategory(category, select) {
 selectBtn(select)
 fetch(`https://fakestoreapi.com/products/category/${category}`)
  .then((data) => data.json())
  .then((data) => renderCategories(data));
}

document.getElementById("tab-one").addEventListener("click", fetchAllProducts);

document.getElementById("tab-two").addEventListener("click", () => {
 fetchByCategory("women's%20clothing", 2);
});

document.getElementById("tab-three").addEventListener("click", () => {
 fetchByCategory("men's%20clothing", 3);
});

function selectBtn(selected) {
   btnAll.forEach((btn, index) => {
      (selected == index + 1) ? btn.classList.add("active") :
      btn.classList.remove("active")
   });
}
