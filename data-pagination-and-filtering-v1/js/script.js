/*
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const itemsPerPage = 9;
   const firstIndex = (page * itemsPerPage) - itemsPerPage;
   const lastIndex = page * itemsPerPage;

   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = ''

   function createLiElement(data) {
      const li = document.createElement('li')
      li.className = 'student-item cf'
      li.id = `${data.name.first} ${data.name.last}"`
      li.innerHTML = `
          <div class="student-details">
            <img class="avatar" src=${data.picture.large} alt="Profile Picture">
            <h3>${data.name.first} ${data.name.last}</h3>
            <span class="email">${data.email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${data.registered.date}</span>
          </div>
      `
      return li
   };

   for (let i = 0; i < list.length; i++) {
      if (i >= firstIndex && i < lastIndex) {
         studentList.insertAdjacentElement('beforeend', createLiElement(list[i]))         
      };
   };
};

showPage(data, 1);
/*
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9)

   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) {
      const li = document.createElement('li')
      li.innerHTML = `
      <button type="button">${i}</button>
      `
      linkList.insertAdjacentElement("beforeend", li);
      document.querySelector('button').className = 'active'  
   };

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = ''
         e.target.className = 'active'
         showPage(list, e.target.textContent)
      };
   });
};

addPagination(data);
/*
This function will create the search button in the html file
*/
function createSearchButton(){
   const header = document.querySelector('.header')
   header.innerHTML = `
   <h2>Students</h2>
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button" id="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `
   return header
};

createSearchButton();
/*
This function will search and match student
*/
function searchFunction(targetValue, names) {
   const currentPage = document.querySelector('.active')
   let currentArray = [];

   for (let i = 0; i < names.length; i++) {
      
      if (targetValue.length !== 0 && names[i].name.first.toLowerCase().includes(targetValue)) {
         currentArray.push(names[i])
      };

   };

   showPage(currentArray, 1)
};
/*
This function will refresh our page after a student search
*/
function refreshPage(searchInput, data) {
   const currentPage = document.querySelector('.active');

   if (searchInput.value.length == 0) {
      showPage(data, currentPage.textContent)
   };
   
};
/*
This will be variables that we will use in our eventListeners
*/
const submit = document.querySelector('#submit')
const search = document.querySelector('#search')
/*
This eventListener will receive the instruction of our search button
*/
submit.addEventListener('keyup', (event) => {
   event.preventDefault();
   const character = e.target.value
   
   searchFunction(search, data)
});
/*
This eventListener will refresh our page when we erase the search student
*/
search.addEventListener('keyup', (e) => {
   e.preventDefault();
   const character = e.target.value

   searchFunction(character, data)
   refreshPage(search, data)
});







