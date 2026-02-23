const getTrendingProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    const ratingArray = products
      .filter(
        (product) => product.rating && typeof product.rating.rate === "number",
      )
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 3);

    renderTrendingProduct(ratingArray);
  } catch (error) {
    console.error("Failed to load products", error);
  }
};

const renderTrendingProduct = (products) => {
  const container = document.getElementById("trending-products");
  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm";

    card.innerHTML = `
      <figure class="px-4 pt-4 h-48 flex items-center justify-center overflow-hidden bg-sky-100">
        <img src="${product.image}" alt="${product.title}" class="object-contain max-h-full" />
      </figure>
      <div class="card-body">
        <div class="flex items-center justify-between mt-2">
          <p class="text-xs text-gray-500">${product.category}</p>
          <span class="text-xs text-yellow-500 flex items-center gap-1">
            <i class="fa-solid fa-star"></i>
            ${product.rating?.rate?.toFixed ? product.rating.rate.toFixed(1) : product.rating.rate}
            <span class="text-[10px] text-gray-400">(${product.rating?.count || 0})</span>
          </span>
         </div>
        <h3 class="card-title text-sm md:text-base overflow-hidden">${product.title}</h3>
        
        <p class="font-semibold text-primary">$${product.price}</p>
        <div class="card-actions flex justify-between mt-3">
        <button class="btn btn-outline btn-sm">
        <i class="fa-regular fa-eye"></i>
        Details
        </button>
        <button class="btn btn-primary btn-sm">Add to Cart</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
};

getTrendingProducts();

/* load product by category */
const loadProductByCategory = async (category) => {
  const url =
    category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;
  try {
    const res = await fetch(url);
    const products = await res.json();
    renderProducts(products);
    setActiveCategory(category);
  } catch (error) {
    console.error("Failed to load products", error);
  }
};

/* highlight the active category button */
const setActiveCategory = (category) => {
  const categoryContainer = document.getElementById("category-container");
  if (!categoryContainer) return;
  const buttons = categoryContainer.querySelectorAll("button");
  buttons.forEach((btn) => {
    const isActive = btn.dataset.category === category;
    btn.classList.remove("btn-primary", "btn-outline");
    btn.classList.add(isActive ? "btn-primary" : "btn-outline");
  });
};
/* render products */
const renderProducts = (products) => {
  const productsContainer = document.getElementById("products-container");
  if (!productsContainer) return;
  productsContainer.innerHTML = "";
  products.forEach(product =>{

    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm";

    card.innerHTML = `
      <figure class="px-4 pt-4 h-48 flex items-center justify-center overflow-hidden bg-sky-100">
        <img src="${product.image}" alt="${product.title}" class="object-contain max-h-full" />
      </figure>
      <div class="card-body">
        <div class="flex items-center justify-between mt-2">
          <p class="text-xs text-gray-500">${product.category}</p>
          <span class="text-xs text-yellow-500 flex items-center gap-1">
            <i class="fa-solid fa-star"></i>
            ${product.rating?.rate?.toFixed ? product.rating.rate.toFixed(1) : product.rating.rate}
            <span class="text-[10px] text-gray-400">(${product.rating?.count || 0})</span>
          </span>
         </div>
        <h3 class="card-title text-sm md:text-base overflow-hidden">${product.title}</h3>
        
        <p class="font-semibold text-primary">$${product.price}</p>
        <div class="card-actions flex justify-between mt-3">
        <button class="btn btn-outline btn-sm">
        <i class="fa-regular fa-eye"></i>
        Details
        </button>
        <button class="btn btn-primary btn-sm">Add to Cart</button>
        </div>
      </div>
    `;

    productsContainer.appendChild(card);
  });
};

/* load product category */
const loadProductCategory = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();
    renderCategory(categories);
    // by default show all products
    loadProductByCategory("all");
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }
};

const renderCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  if (!categoryContainer) return;
  categoryContainer.innerHTML = "";
  const allCategories = ["all", ...categories];

  allCategories.forEach((category) => {
    const categoryList = document.createElement("ul");

    const btn = document.createElement("button");
    btn.dataset.category = category;
    btn.className = `btn btn-sm ${category === "all" ? "btn-primary" : "btn-outline"}`;
    btn.textContent = category === "all" ? "All" : category;

    btn.addEventListener("click", () => {
      loadProductByCategory(category);
    });

    categoryList.appendChild(btn);
    categoryContainer.appendChild(categoryList);
  });
};

loadProductCategory();
