
function showPage(list, page) {
   const itemsPerPage = 9;
   const firstIndex = (page * itemsPerPage) - itemsPerPage;
   const lastIndex = page * itemsPerPage;

   const studentList = document.querySelector('.student-list');

   function createLiElement(data) {
      const li = document.createElement('li')
      li.className = 'student-item cf'
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
Create the `addPagination` function
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



