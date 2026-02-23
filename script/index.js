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
        
        <div class="card-actions flex justify-between mt-3">
            <span class="font-semibold text-primary">$${product.price}</span>
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
  console.log(category);

  const url = category == 'all'? 'https://fakestoreapi.com/products' :`https://fakestoreapi.com/products/category/${category}`
  try{
      const res = await fetch(url)
      const products = await res.json()
      console.log(products);
      renderProducts(products)

  }catch(error){
      console.error('Failed to load products', error);
  }
};

const renderProducts = (products) => {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
};

/* load product category */
const loadProductCategory = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();
    renderCategory(categories);
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }
};


const renderCategory = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";
    const allCategories = ["all", ...categories];
  
    allCategories.forEach((category) => {
      const categoryList = document.createElement("ul");
  
      const btn = document.createElement("button");
      btn.className = "btn btn-sm btn-outline";
      btn.textContent = category;
  
      // No quotes/HTML issues; pure JS handler
      btn.addEventListener("click", () => {
        loadProductByCategory(category); // this will log even for men's / women's
      });
  
      categoryList.appendChild(btn);
      categoryContainer.appendChild(categoryList);
    });
  };

// const renderCategory = (categories) => {
//   const categoryContainer = document.getElementById("category-container");
//   categoryContainer.innerHTML = "";
//   const allCategories = ["all", ...categories];
//   allCategories.forEach((category) => {
//     const categoryList = document.createElement("ul");
//     categoryList.innerHTML = `
//             <button onClick="loadProductByCategory(${JSON.stringify(category)})" class="btn btn-sm btn-outline">${category}</button>
//         `;

//     categoryContainer.appendChild(categoryList);
//   });
// };

loadProductCategory();
