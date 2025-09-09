 const loadCategories=()=>{
  manageSpinner(true)
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
     <ul  class='space-y-8 text-center'>
      <li id="${category.id}" class='font-semibold hover:bg-green-700 hover:text-white hover:rounded-sm my-4'>${category.category_name}</li>
    </ul>
     `
  });
  categoriesContainer.addEventListener('click',(e)=>{
const allLi=document.querySelectorAll('li')
allLi.forEach(li=>{
  li.classList.remove('bg-green-700')
})
if(e.target.localName==="li"){
  // console.log(e.target.id);
  e.target.classList.add('bg-green-700')
  loadPlantByCategory(e.target.id);
}
 
  });
  manageSpinner(false);
 };


const loadPlantByCategory=(categoryId)=>{
  manageSpinner(true);
  console.log(categoryId);
  const url=(`https://openapi.programming-hero.com/api/category/${categoryId}`)
  fetch(url)
   .then((res)=>res.json())
   .then((data)=>{
    // console.log(data.plants);
    displayPlantByCategory(data.plants);
   })
   
   
}  

const displayPlantByCategory=(categoryPlants)=>{
  const cartContainer=document.getElementById("cart-container")
  cartContainer.innerHTML='';
categoryPlants.forEach(categoryPlant=>{
  cartContainer.innerHTML+=`
 <div id='${categoryPlant.id}' class="bg-white rounded-sm p-2 space-y-2 h-auto overflow-hidden">
        <img class='rounded-lg w-full h-48 object-cover object-top block'src="${categoryPlant.image}" alt="fruits image">
        <h3 onclick="loadPlantsModal('${categoryPlant.id}')" class="text-lg font-semibold hover:bg-pink-600 rounded-sm px-2">${categoryPlant.name}</h3>
        <p class="text-xs text-gray-500">${categoryPlant.description}</p>
        <div class="flex justify-between">
          <button class="bg-[#CFF0DC] px-3 text-green-700 rounded-full">${categoryPlant.category}</button>
          <p class="font-bold text-xl">TK ${categoryPlant.price}</p>
        </div>
        <button id='btn-add-cart' class="bg-green-700 text-sm py-1 mt-2 text-center w-full rounded-full text-white">Add to Cart</button>

      </div>
  `
})
manageSpinner(false);
};


 const loadAllPlants=()=>{
  manageSpinner(true)
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
    <div id='${plant.id}' class="bg-white rounded-sm p-2 space-y-2 h-auto overflow-hidden">
        <img class='rounded-lg w-full h-48 object-cover object-top block'src="${plant.image}" alt="fruits image">
        <h3 onclick="loadPlantsModal('${plant.id}')"class="text-lg font-semibold hover:bg-pink-600 rounded-sm px-2">${plant.name}</h3>
        <p class="text-xs text-gray-500">${plant.description}</p>
        <div class="flex justify-between">
          <button class="bg-[#CFF0DC] px-3 text-green-700 rounded-full">${plant.category}</button>
          <p class="font-bold text-xl"> ${plant.price}</p>
        </div>
        <button id='btn-add-cart' class="bg-green-700 text-sm py-1 mt-2 text-center w-full rounded-full text-white">Add to Cart</button>

      </div>
    
    `
   
  });
manageSpinner(false)
};
let addToCarts=[];
const cartContainer=document.getElementById('cart-container').addEventListener('click',(e)=>{
 if(e.target.innerText==='Add to Cart'){
handleAddToCart(e);
}
});
const handleAddToCart=(e)=>{
  manageSpinner(true)
const plantName=e.target.parentNode.children[1].innerText
const price=e.target.parentNode.children[3].children[1].innerText;
const id=e.target.parentNode.id;
 
 
addToCarts.push({
  plantName:plantName,
  price:price,
  id:id,

});
displayAddToCart(addToCarts)

};

const displayAddToCart=(addToCarts)=>{
 const addToCartContainer=document.getElementById("add-to-cart-container")
 addToCartContainer.innerHTML='';
addToCarts.forEach(addToCart=>{
  addToCartContainer.innerHTML+=`
  <div class="bg-gray-300 rounded-sm p-2 mt-2 flex justify-between items-center">
  <div>
  <h1 class='font-bold text-green-600'>${addToCart.plantName}</h1>
   <h3 class='text-green-600'> <span class='font-semibold'>${addToCart.price}</h3>
  </div>
  <div onclick="handleDeleteAddToCart('${addToCart.id}')" class='p-2 bg-white rounded-lg hover:bg-green-500'>
  <h3 class='text-red-700 font-bold text-2xl'>x</h3>
  </div>
  </div>
  `
  //  document.getElementById('btn-add-cart').addEventListener('click',()=>{
    // const plantName=`${plant.name}`
    // const plantPrice=`${plant.price}`

    const totalPrice=document.getElementById('plant-price')
    console.log(totalPrice);
    const currentPrice=Number(totalPrice)+Number(1)
    totalPrice.innerText=currentPrice;
  })
;
manageSpinner(false)
};
const handleDeleteAddToCart=(addToCartId)=>{
  
  const filteredAddToCarts=addToCarts.filter(addToCart=>addToCart.id!==addToCartId)
addToCarts=filteredAddToCarts
displayAddToCart(addToCarts);
};
const manageSpinner=(status)=>{
  if(status===true){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('trees-plant-container').classList.add('hidden')
  }
  else{
     document.getElementById('trees-plant-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden')

  };
};

const loadPlantsModal=async(id)=>{
  const url=(`https://openapi.programming-hero.com/api/plant/${id}`)
 
  const res=await fetch(url);
  const details=await res.json();
  displayPlantsModal(details.plants);
}  
const displayPlantsModal=(plant)=>{
// console.log(plant);
const modalBox=document.getElementById('modal-container');
modalBox.innerHTML= `
<div id='${plant.id}' class="bg-white rounded-sm p-2 space-y-2 h-auto overflow-hidden">
        <h3"class="text-lg font-bold">${plant.name}</h3>
        <img class='rounded-lg w-full h-48 object-cover object-top block mt-2'src="${plant.image}" alt="fruits image">
        <button class="bg-[#CFF0DC] px-3 text-green-700 rounded-full mt-2"> ${plant.category}</button>
        <p class="font-bold text-xl ml-2">TK ${plant.price}</p>
        <p class="text-xs text-gray-500 ml-2">${plant.description}</p>
         </div>
`;
document.getElementById('my_modal_5').showModal();
}
 

loadAllPlants();
 loadCategories();