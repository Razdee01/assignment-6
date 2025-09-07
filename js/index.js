const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
displayCategories = (categories) => {
  const tressContainer = document.getElementById("catagories-list");
  tressContainer.innerHTML = "";
  for (let categorie of categories) {
    const catlist = document.createElement("li");
    catlist.innerHTML = `
        <li class="hover:bg-green-500 hover:text-white hover:rounded-sm">
        <a>${categorie.category_name}</a>
        </li>
        `;
    tressContainer.append(catlist);
  }
};

loadCategories();
