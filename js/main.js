//calling Elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
//getTotal
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = " ";
    total.style.background = "#a00d02";
  }
}

// Create Product
let dataPro;
if (localStorage.product != null) {
  //if it is true yaane fe data stored b al product property
  dataPro = JSON.parse(localStorage.product);
  //b7awel al json
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
};

//Clear Inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = " "; //l2nu msh input lizm innerHTML
  count.value = "";
  category.value = "";
}

//read
function showData() {
  getTotal();
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button id="update" onclick="UpdateData(${i})">update</button></td>
   <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
   
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelte = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelte.innerHTML = `
    <button onclick="deleteAll()">Delete All(${dataPro.length})</button>
    `;
  } else {
    btnDelte.innerHTML = "";
  }
}
showData();
//Delete
function deleteData(i) {
  dataPro.splice(i, 1); //i hwi yali ana bde em7eh w al 1 hwi kam element ana bde em7i
  localStorage.product = JSON.stringify(dataPro); //krmal em7ya men al memory
  showData(); //krmal do8re yn3ml update lal data  w bs 23mol delete ttzabat
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0); //hyde btms7li kelshy
  showData(); //krmal tbayn do8ere
}

function UpdateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search
let searchmood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchmood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchmood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";

  if (searchmood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value)) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="UpdateData(${i})">update</button></td>
       <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
       
      </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="UpdateData(${i})">update</button></td>
       <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
       
      </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
