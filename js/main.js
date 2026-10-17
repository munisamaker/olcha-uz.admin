const list = document.querySelector("#product-list")
const form = document.querySelector("form");

const filterManufacturer = document.querySelector("#manufacturer");
const addManufacturer = document.querySelector("#product-manufacturer")
const showManufacturer = function (manufacturer) {
  for (let i = 0; i < manufacturers.length; i++) {
    const option = document.createElement("option");
    option.value = manufacturers[i].name;
    option.textContent = manufacturers[i].name;
    manufacturer.append(option)
  }
}

showManufacturer(filterManufacturer);
showManufacturer(addManufacturer)
const addZero = function (number) {
  if (number < 10) {
    return `0${number}`
  } else return number
}
const findCurrentPrice = function (price) {
  return price * 0.85
}


const showDate = function (incomingDate) {
  const curreentDate = new Date(incomingDate);
  const hour = curreentDate.getHours()
  const minutes = curreentDate.getMinutes();
  const day = curreentDate.getDate();
  const month = curreentDate.getMonth(); + 1;
  const year = curreentDate.getFullYear();
  return `${addZero(day)}.${addZero(month)}.${year},${addZero(hour)}:${addZero(minutes)}`

}


function RenderItem(products) {
  const item = document.createElement("li");
  item.className = "col-4";
  const cardItem = document.createElement("div");
  cardItem.className = "card"
  const itemImg = document.createElement("img");
  itemImg.src = products.img;
  itemImg.className = "card-img-top";
  const itemBody = document.createElement("div");
  itemBody.className = "card-body";

  const itemName = document.createElement("h3");
  itemName.textContent = products.title;
  itemName.className = "card-title";

  const itemPrice = document.createElement("p");
  itemPrice.className = "text fw-bocardld";
  itemPrice.innerHTML = `<mark>${findCurrentPrice(products.price)}</mark >`;

  const itemDelPrice = document.createElement("p");
  itemDelPrice.className = "card-text";
  itemDelPrice.innerHTML = `<s>${findCurrentPrice(products.price)}</s>`;


  const itemModel = document.createElement("p");
  itemModel.textContent = products.model;
  itemModel.className = "badge bg-success";

  const itemDate = document.createElement("p");
  itemDate.textContent = showDate(products.addedDate);
  itemDate.className = "card-text";

  const itemBenefitsList = document.createElement("ul");
  itemBenefitsList.className = "d-flex flex-wrap list-unstyled";

  for (let j = 0; j < products.benefits.length; j++) {
    const benefitItem = document.createElement("li");
    benefitItem.className = "badge bg-primary me-1 mb-1";
    benefitItem.textContent = products.benefits[j];
    itemBenefitsList.append(benefitItem);
  }
  const creatorElement = function (elName, textContent, className) {
    const createdElement = document.createElement(elName);
    createdElement.textContent = textContent;
    createdElement.className = className;
    return createdElement
  }

  const productBtns = creatorElement("div", "", "position-absolute top-0 end-0 d-flex")
  const productEditBtn = creatorElement("button", "", "btn rounded-0 btn-secondary");
  productEditBtn.setAttribute("data-bs-toggle", "modal");
  productEditBtn.setAttribute("data-bs-target", "#EditProductModal");
  productEditBtn.setAttribute("data-product-id", products.id);
  const productEditBtnIcon = creatorElement("i", "", "fa-solid fa-pen");
  productEditBtnIcon.style.pointerEvents = "none";

  productEditBtn.append(productEditBtnIcon);

  productBtns.append(productEditBtn);



  const productDelBtn = creatorElement("button", "", "btn rounded-0 btn-danger");
  const productDelBtnIcon = creatorElement("i", "", "fa-solid fa-trash");
  productDelBtnIcon.style.pointerEvents = "none";
  productDelBtn.setAttribute("data-id", products.id);
  productDelBtn.append(productDelBtnIcon);

  productBtns.append(productDelBtn);


  itemBody.append(productBtns);


  itemBody.append(itemName);
  itemBody.append(itemPrice);
  itemBody.append(itemModel);
  itemBody.append(itemDate);
  itemBody.append(itemBenefitsList);

  cardItem.append(itemImg);
  cardItem.append(itemBody);
  item.append(cardItem)
  list.append(item);

}


for (let i = 0; i < products.length; i++) {
  RenderItem(products[i])
}

const addForm = document.querySelector("#add-product-form");
const addModal = document.querySelector("#addProductModal");
const addModalEl = new bootstrap.Modal(addModal);
const editProductModal = document.querySelector("#EditProductModal");
const editProductTitle = document.querySelector("#edit-title");
const editProductPrice = document.querySelector("#edit-price");
const editProductManufacturer = document.querySelector("#edit-manufacturer");
const editProductBenefits = document.querySelector("#edit-benefits");


for (let i = 0; i < benefits.length; i++) {
  const item = document.createElement("li");
  item.className = "me-1 mb-1";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-sm badge rounded-pill btn-danger";
  button.textContent = benefits[i];

  item.append(button);
}




addForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const elements = evt.target.elements;
  const title = elements["product-title"];
  const price = elements.price;
  const manufacturer = elements["product-manufacturer"];
  const benefits = elements.benefits;
  if (title.value.trim() && price.value.trim() && manufacturer.value) {
    const newProduct = {
      id: products.length + 1,
      title: title.value,
      img: "https://picsum.photos/300/200",
      price: Number(price.value),
      model: manufacturer.value,
      addedDate: new Date().toISOString(),
      benefits: benefits.value,
    }

    products.push(newProduct);
    RenderItem(newProduct);
    addForm.reset();
    addModalEl.hide()

  }

});

list.addEventListener("click", function (evt) {
  if (evt.target.matches(".btn-danger")) {
    const clickedElement = evt.target.dataset.id;
    const findedIndex = products.findIndex((product) => {
      return product.id == clickedElement;
    });

    products.splice(findedIndex, 1);
    list.innerHTML = "";

    products.forEach((product) => {
      RenderItem(product);
    });
  } else if (evt.target.matches(".btn-secondary")) {
    const clickedElement = evt.target.dataset.product;
    const findedProduct = products.find((element) => {
      return element.id == +clickedElement;
    });


    editProductTitle.value = findedProduct.title;
    editProductPrice.value = findedProduct.price;
    editProductManufacturer.value = findedProduct.manufacturers;
    editProductBenefits.value = findedProduct.benefits;


  }
});