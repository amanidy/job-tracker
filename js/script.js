

//capturing values
const formEl = document.querySelector("form");
const addBtnEl = document.querySelector('.add-job');


//functionality for form visibility
function toggleApplicationForm(){
  return formEl.classList.add('visible');
}

/*add job btn application btn functionality*/
addBtnEl.addEventListener('click',
  toggleApplicationForm
)

//Setting date to default
const today = new Date();
  
const day = ("0" + today.getDate()).slice(-2);
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const formattedDate = today.getFullYear() + "-" + month + "-" + day;

  document.getElementById("date").value = formattedDate;
  
  
  //localStorage read/write
  const key = "applications";
  const applicationsArr= JSON.parse(localStorage.getItem(key)) || [];
  
  function loadData(){
    const applicationsArr = JSON.parse(localStorage.getItem(key)) || [];
    return applicationsArr;
  }
  
  function saveData(){
    localStorage.setItem(key,JSON.stringify(applicationsArr));
    
  }
  
   //reading all field values
    const nameEl = document.getElementById('name');
    const roleEl =document.getElementById('role');
    const urlEl = document.getElementById('url');
    const dateEl =document.getElementById('date');
    const statusEl =document.getElementById('status');
    
    
    const formBody = document.getElementById('form');
    formBody.addEventListener('submit',handleAddSubmit)
    
   
  
  //form submit function 
  function handleAddSubmit(e) {
  
  e.preventDefault();
    
    /*validating company's name and role*/
    
    if(!nameEl.value || !roleEl.value){
      alert("Ensure the fields are not empty")
    }
    
    applicationsArr.push({
      id:Date.now(),
      name:nameEl.value.trim(),
      role:roleEl.value.trim(),
      url:urlEl.value.trim(),
      date:dateEl.value.trim(),
      status:statusEl.value.trim()
    });
    
    saveData();
    renderTable();
    clearForm();
    
    console.log(applicationsArr);
    
  }
  
  function clearForm(){
    nameEl.value = "";
    roleEl.value = "";
    urlEl.value = "";
    dateEl.value = formattedDate;
    statusEl.value = document.getElementById('applied');
    
  }
  
  /*Rendering the applications table*/
  
  function renderTable(){
    
    const tableBody = document.querySelector('.table-body');
    
    if (!tableBody) {
      alert('Table body was not found')
      return;
      
    }
    
    tableBody.innerHTML = applicationsArr.map(application=> `
    
   <tr>
  <td data-label="Name">${application.name}</td>
  <td data-label="Role">${application.role}</td>
  <td data-label="URL">${application.url}</td>
  <td data-label="Date">${application.date}</td>
  <td data-label="Status">
    <span class="status-badge ${getStatusColor(application.status)}">
      ${application.status}
    </span>
  </td>
  <td data-label="Actions">
    <button class="edit-btn" onclick="handleEdit(${application.id})">
      Edit
    </button>
     <button class="delete-btn" onclick="handleDelete(${application.id})">
      Delete
    </button>
  </td>
</tr>
    
    `).join('')
    
  }
  
  
  //status badge colors
  
  function getStatusColor(status){
    switch (status.toLowerCase()) {
      case 'applied': return 'status-applied';
      case 'interview': return 'status-interview';
      case 'offer': return 'status-offer';
      case 'rejected': return 'status-rejected';
      case 'ghosted': return 'status-ghosted';
      case 'withdrawn': return 'status-withdrawn';
      case 'phone' : return 'phone';
      
      
      
      
      default: return 'status-default';
    }
  }
  
  renderTable();
  
  