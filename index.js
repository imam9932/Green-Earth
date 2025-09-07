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
     <ul id='category-ul' class='space-y-8 text-center'>
      <li id='category-id'class='font-semibold hover:bg-green-700 hover:text-white hover:rounded-sm my-4'>${category.category_name}</li>
    </ul>
     `
  })
//   categoriesContainer.addEventListener('click',(e)=>{
// const allLi=document.getElementById("category-ul");
//  console.log(allLi);
//   })


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
    <div class="bg-white rounded-sm p-2 space-y-2 h-auto overflow-hidden">
        <img class='rounded-lg w-full h-48 object-cover object-top block'src="${plant.image}" alt="fruits image">
        <h3 class="text-lg font-semibold">${plant.name}</h3>
        <p class="text-xs text-gray-500">${plant.description}</p>
        <div class="flex justify-between">
          <button class="bg-[#CFF0DC] px-3 text-green-700 rounded-full">${plant.category}</button>
          <p class="font-bold text-xl">${plant.price}</p>
        </div>
        <button class="bg-green-700 text-sm py-1 mt-2 text-center w-full rounded-full text-white">Add to Cart</button>

      </div>
    
    `
  })

}

// const loadPlantByCategory=(Id)=>{
//   fetch(`https://openapi.programming-hero.com/api/category/${Id}`)
//   .then((res)=>res.json())
//   .then((data)=>{
//     displayPlantByCategory(data.plants);
//   })
// }
// const displayPlantByCategory=(plants)=>{
// categoriesContainer.addeventlistener('click',()=>{

// })
// }



// loadPlantByCategory();
loadAllPlants();
 loadCategories();