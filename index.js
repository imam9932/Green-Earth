 const loadCategories=()=>{
  fetch('https://openapi.programming-hero.com/api/categories')
  .then((res)=>res.json())
  .then((data)=>{

    displayCategories(data.categories);
  })
 }

 const displayCategories=(categories)=>{
  const categoriesContainer=document.getElementById('categories-container');
  categoriesContainer.innerHTML='';
  categories.forEach(category=>{
     categoriesContainer.innerHTML +=`
     <ul class='space-y-8 text-center'>
      <li class='font-semibold hover:bg-green-700 hover:text-white hover:rounded-sm my-4'>${category.category_name}</li>
    </ul>
     `
  })


 }

 const loadAllPlants=()=>{
  fetch('https://openapi.programming-hero.com/api/plants')
  .then((res)=>res.json())
  .then((data)=>{
displayAllPlants(data.plants);
  })
 }
const displayAllPlants=(plants)=>{
  const cartContainer=document.getElementById('cart-container');
  cartContainer.innerHTML='';
  plants.forEach(plant=>{
    cartContainer.innerHTML+=`
    <div class="bg-white rounded-sm p-2 space-y-2 h-[381px]">
        <img class='h-1/3 rounded-lg w-full'src="${plant.image}" alt="fruits image">
        <h3 class="text-lg font-semibold">${plant.name}</h3>
        <p class="text-xs text-gray-500">${plant.description}</p>
        <div class="flex justify-between">
          <button class="bg-[#CFF0DC] px-3 text-green-700 rounded-full">${plant.category}</button>
          <p class="font-bold text-xl">${plant.price}</p>
        </div>
        <button class="bg-green-700 text-sm py-2 mt-2 flex items-center justify-center text-center w-55 rounded-full text-white">Add to Cart</button>

      </div>
    
    `
  })

}



 loadAllPlants();
 loadCategories();