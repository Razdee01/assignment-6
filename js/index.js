const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
const removeActive=()=>{
  const treeCat=document.querySelectorAll(".tree-cat")
    for(let cats of treeCat){
      cats.classList.remove("active")
    }
  
}
// onclick
const loadTreeCategorie=(id)=>{
  const url=`https://openapi.programming-hero.com/api/category/${id}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive()
      const clickCat = document.getElementById(`cat-${id}`);
      clickCat.classList.add("active")
      displayLoadTreeCategorie(data.plants);
    });
  
}
const displayLoadTreeCategorie=(TreeCategories)=>{
  const treeCat=document.getElementById("all-cards")
    treeCat.innerHTML=""
    for(let TreeCategorie of TreeCategories){
      const treeCatDiv=document.createElement("div")
      treeCatDiv.innerHTML = `   <div class="p-4 shadow-lg bg-white h-full">
      <div class="mb-2 p-4">
          <img class=" md:h-48 w-full rounded-md" src=${TreeCategorie.image} alt="">
      </div>
      <div class="mb-2">
          <h3 class="text-xl font-semibold mb-3">${TreeCategorie.name}</h3>
          <p class="text-sm font-light md:h-30">${TreeCategorie.description}</p>
      </div>
      <div class="flex justify-between items-center md:mb-2">
          <span class="bg-[#DCFCE7] rounded-full p-3">${TreeCategorie.category}</span>
          <span><span>$</span>${TreeCategorie.price}</span>
      </div>
      <div class="text-center ">
          <button class="btn bg-[#FACC15] text-[#15803D] rounded-full  w-full">Add To Card</button>
      </div>
  </div>`;
  treeCat.append(treeCatDiv)
    }
}

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
const allCategories=()=>{
  fetch("https://openapi.programming-hero.com/api/plants")
  .then(res=>res.json())
  .then(data=>displayAllCat(data.plants))
}
const displayAllCat=(everyCats)=>{
  const allCat=document.getElementById("all-cards")
  allCat.innerHTML=""
  for(let everyCat of everyCats){
    const allCatdivs = document.createElement("div");
    allCatdivs.innerHTML = `
    <div class="p-4 shadow-lg bg-white h-full">
    <div class="mb-2 p-4">
        <img class=" md:h-48 w-full rounded-md" src=${everyCat.image} alt="">
    </div>
    <div class="mb-2">
        <h3 class="text-xl font-semibold mb-3">${everyCat.name}</h3>
        <p class="text-sm font-light md:h-30">${everyCat.description}</p>
    </div>
    <div class="flex justify-between items-center md:mb-2">
        <span class="bg-[#DCFCE7] rounded-full p-3">${everyCat.category}</span>
        <span><span>$</span>${everyCat.price}</span>
    </div>
    <div class="text-center ">
        <button class="btn bg-[#FACC15] text-[#15803D] rounded-full  w-full">Add To Card</button>
    </div>
</div>
    `;
    allCat.append(allCatdivs);
  }
}
allCategories()
loadCategories();
