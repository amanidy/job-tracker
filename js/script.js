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