const container = document.getElementById("products-container");
const baseUrl = "https://fakestoreapi.com/products";

// //////////////  ES5
// const fetchProducts = () => {
//   const response = fetch(baseUrl, {
//     method: "GET",
//   });
//   console.log(response);
//   response.then((res) => res.json()).then((res) => console.log(res));
// };
// fetchProducts();
// //////////////  ES6

const getProduct = async () => {
  try {
    const response = await fetch(baseUrl, { method: "GET" });
    const data = await response.json();
    console.log(data);
    localStorage.setItem("products", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const displayData = (data) => {
  data.forEach((item) => {
    let productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <div class="image-container">
          <img
            src=${item.image}
            alt=""
          />
        </div>

        <h3>${item.title} </h3>
        <p class="product-description">
          ${item.description}
        </p>
        <p class="product-category">${item.category}</p>
        <p class="product-price">Price:<span>$${item.price}</span></p>
        <div class="product-footer">
          <p class="rate">${item.rating.rate}</p>
          <button class="delete-button" value=${item.id}>Delete</button>
        </div>

    `;
    container.appendChild(productCard);
  });
};

const localData = localStorage.getItem("products");
const newData = JSON.parse(localData);

if (localData === null) {
  console.log("RE-FETCHING PRODUCTS");
  getProduct();
  console.log("DISPLAYED PRODUCTS");
  displayData(JSON.parse(localData));
} else {
  console.log("DISPLAYED PRODUCTS FROM LOCAL STORAGE");
  displayData(JSON.parse(localData));
  console.log(JSON.parse(localData));
}

//////////////////////////////////////////// ADDING NEW PRODUCT FROM FORM
const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const imageURL = document.getElementById("image-url");
  const price = document.getElementById("price");
  const category = document.getElementById("category");
  const message = document.querySelector(".message");
  const products = [];

  if (name.value.trim() === "" || null) {
    message.innerText = "Please enter a valid product name.";
    message.classList.add("error");
    name.classList.add("errorInput");
    message.classList.remove("success");
    return;
  } else {
    name.classList.remove("errorInput");
  }
  if (description.value.trim() === "" || null) {
    message.innerText = " Please enter a valid product description.";
    message.classList.add("error");
    description.classList.add("errorInput");
    message.classList.remove("success");
    return;
  } else {
    description.classList.remove("errorInput");
  }
  if (imageURL.value.trim() === "" || null) {
    message.innerText = " Please paste a valid Image URL.";
    message.classList.add("error");
    imageURL.classList.add("errorInput");
    message.classList.remove("success");
    return;
  } else {
    imageURL.classList.remove("errorInput");
  }
  if (price.value.trim() === "" || null) {
    message.innerText = " Please input price of product.";
    message.classList.add("error");
    price.classList.add("errorInput");
    message.classList.remove("success");
    return;
  } else {
    price.classList.remove("errorInput");
  }
  if (category.value.trim() === "" || null) {
    message.innerText = " Please enter product category.";
    message.classList.add("error");
    category.classList.add("errorInput");
    message.classList.remove("success");
    return;
  } else {
    category.classList.remove("errorInput");
  }
  const product = {
    title: name.value,
    description: description.value,
    imageURL: imageURL.value,
    price: price.value,
    category: category.value,
    id: Math.floor(Math.random() * 200),
    rating: {
      count: 123,
      rate: 4.2,
    },
  };

  newData.push(product);
  localStorage.setItem("products", JSON.stringify(newData));

  message.innerText = "Product added!";
  message.classList.add("success");
  window.location.reload();
  productForm.reset();
});

//////////////////////////////////////////// DELETING  PRODUCT FROM LOCALSTORAGE

const deleteButton = document.querySelectorAll(".delete-button");

deleteButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnID = btn.value;
    const allNewData = newData.filter((pdt) => pdt.id != btnID);
    localStorage.setItem("products", JSON.stringify(allNewData));
    console.log("Product added successfully!");
    window.location.reload();
  });
});
//////////////////////////////////////////// DELETING  PRODUCT FROM LOCALSTORAGE

const resetAllButton = document.getElementById("reset-all");

resetAllButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
  console.log("LOCAL STORAGE CLEARED");
});
