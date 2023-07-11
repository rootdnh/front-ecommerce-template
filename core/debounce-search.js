const searchInput = document.getElementById("search-input");
const searchInputBtn = document.getElementById("search-btn-icon");
const listProducts = document.getElementById("list-products");
let timer = null;
let products = [];

fetchAllProducts();

searchInput
 .addEventListener('keyup', (e)=>{
  let {value} = e.target;
  if(value.trim()){
  debounceEvent(handleSearchValue, 1000)(value);
  }else{
    clearTimeout(timer);
    listProducts.innerHTML = ""
  }
});

 function debounceEvent(fn, timeout){
  return function (value){
    clearTimeout(timer);
    timer = setTimeout(()=> fn(value), timeout);
  }
 }

 function fetchAllProducts(){
  fetch("https://fakestoreapi.com/products")
  .then(data => data.json())
  .then(data => products = data)
 }

 function handleSearchValue(value){
    let  data = products.map((product)=>{
      if(product.title.toLowerCase().indexOf(value) !== -1){
        return `<li>${product.title.replace(new RegExp(value, 'gi'), (match)=>{
          return `<strong>${match}</strong>`
        })}</li>`;
      }

    }).join("");
    listProducts.innerHTML = data;
 }
