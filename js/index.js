const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
const removeActive = () => {
  const treeCat = document.querySelectorAll(".tree-cat");
  for (let cats of treeCat) {
    cats.classList.remove("active");
  }
};
// ------Loading-----
const manageSpiner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("all-cards").classList.add("hidden");
  } else {
    document.getElementById("all-cards").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// onclick
const loadTreeCategorie = (id) => {
  manageSpiner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickCat = document.getElementById(`cat-${id}`);
      clickCat.classList.add("active");
      displayLoadTreeCategorie(data.plants);
    });
};
// Modal
const loadCatDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCatDetails(data.plants));
};

const displayCatDetails = (details) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
      <div class="">
      <h3 onclick='loadCatDetail(${details.id})'  class="text-xl font-semibold p-3 ">${details.name}</h3>
      <div class="mb-2 p-4">
          <img class=" md:h-48 w-full rounded-md" src=${details.image} alt="">
      </div>
      <div class=" md:mb-1">
          <span class=" p-3"> <span class="font-semibold">Category:</span>${details.category}</span><br>
          <span class="p-3"><span><span class="font-semibold">Price:</span>$</span>${details.price}</span>
      </div>
      <div class="mb-2">
      
          <p class="text-sm font-light p-3 md:h-30 "><span class="font-semibold">Description:</span>${details.description}</p>
      </div>
      
   
  </div>
      `;
  document.getElementById("my_modal_5").showModal();
};

const displayLoadTreeCategorie = (TreeCategories) => {
  const treeCat = document.getElementById("all-cards");
  treeCat.innerHTML = "";
  for (let TreeCategorie of TreeCategories) {
    const treeCatDiv = document.createElement("div");
    treeCatDiv.innerHTML = `  
       <div class="p-4 shadow-lg bg-white h-full">
        <div class="mb-2 p-4">
          <img class=" md:h-48 w-full rounded-md" src=${TreeCategorie.image} alt="">
        </div>
        <div class="mb-2">
          <h3 onclick='loadCatDetail(${TreeCategorie.id})'  class="text-xl font-semibold mb-3 ">${TreeCategorie.name}</h3>
          <p class="text-sm font-light md:h-30">${TreeCategorie.description}</p>
        </div>
        <div class="flex justify-between items-center md:mb-2">
          <span class="bg-[#DCFCE7] rounded-full p-3">${TreeCategorie.category}</span>
          <span class="ml-30">$</span><span>${TreeCategorie.price}</span>
        </div>
        <div class="text-center ">
          <button class="btn bg-[#FACC15] text-[#15803D] rounded-full  w-full add-to-cart">Add To Card</button>
        </div>
       </div>`;
    treeCat.append(treeCatDiv);
  }
  manageSpiner(false);
};

displayCategories = (categories) => {
  const tressContainer = document.getElementById("catagories-list");
  tressContainer.innerHTML = "";
  for (let categorie of categories) {
    const catlist = document.createElement("li");
    catlist.innerHTML = `
        <li id="cat-${categorie.id}" onclick="loadTreeCategorie(${categorie.id})" class="hover:bg-green-500 hover:text-white hover:rounded-sm cursor-pointer tree-cat">
        <a>${categorie.category_name}</a>
        </li>
        `;
    tressContainer.append(catlist);
  }
};
const allCategories = () => {
  manageSpiner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayAllCat(data.plants));
};
const displayAllCat = (everyCats) => {
  const allCat = document.getElementById("all-cards");
  allCat.innerHTML = "";
  for (let everyCat of everyCats) {
    const allCatdivs = document.createElement("div");
    allCatdivs.innerHTML = `
    <div class="p-4 shadow-lg bg-white h-full">
    <div class="mb-2 p-4">
        <img class=" md:h-48 w-full rounded-md" src=${everyCat.image} alt="">
    </div>
    <div class="mb-2">
        <h3 onclick='loadCatDetail(${everyCat.id})'  class="text-xl font-semibold mb-3 ">${everyCat.name}</h3>
        <p class="text-sm font-light md:h-30">${everyCat.description}</p>
    </div>
    <div class="flex justify-between items-center md:mb-2">
        <span class="bg-[#DCFCE7] rounded-full p-3">${everyCat.category}</span>
        <span class="ml-30">$</span><span>${everyCat.price}</span>
    </div>
    <div class="text-center ">
        <button class="btn bg-[#FACC15] text-[#15803D] rounded-full  w-full add-to-cart">Add To Card</button>
    </div>
</div>
    `;
    allCat.append(allCatdivs);
  }
  manageSpiner(false);
};
// -------------Add to Cart-------------//
cartTotal = 0;
document.getElementById("all-cards").addEventListener("click", function (e) {
  if (e.target.className.includes("add-to-cart")) {
    const addToCart = e.target;
    const heading =
      addToCart.parentNode.parentNode.children[1].children[0].innerText;
    const price =
      addToCart.parentNode.parentNode.children[2].children[2].innerText;

    alert(`${heading} has been added to the cart`);
    const cartContainer = document.getElementById("cart-container");

    const cartDiv = document.createElement("div");
    cartDiv.innerHTML = `
    <div class="flex justify-between items-center bg-white w-full rounded-md  p-4">
      <div>
          <h3 class="font-medium text-xl">${heading}</h3>
          <p class="text-sm">Price :$<span class="item-price">${price}</span></p>
      </div>
      <!-- cross button -->
      <div>
          <button class="btn bg-white border-none cross-btn">❌</button>
      </div>
    </div>
    `;

    cartContainer.append(cartDiv);
    // ----Total----//
    cartTotal = cartTotal + Number(price);
    document.getElementById("cart-total").innerText = `Total: $${cartTotal}`;
  }
});
// ---Removal Functionality---//

  document.getElementById("cart-container").addEventListener("click", function (e){
    if (e.target.className.includes("cross-btn")) {
      const cross = e.target.parentNode.parentNode; 
      cross.remove(); 
      const price =cross.querySelector(".item-price").innerText
      cartTotal = cartTotal - Number(price);
      document.getElementById("cart-total").innerText = `Total: $${cartTotal}`;
      
    }
  })

 
  
    
allCategories();
loadCategories();
