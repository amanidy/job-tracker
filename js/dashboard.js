const apps = JSON.parse(localStorage.getItem("apps")) || [];

console.log(apps);

function processEl(){
  let totalApplications = 0;
let totalInterviews = 0;
let totalOffers = 0;

apps.forEach(app => {
  totalApplications += app.total; // each completed application has a total

  console.log(totalApplications);
  
  
  const interviews = app.items.filter(item => item.status === "interview"); // dig into each application's items array
  totalInterviews += interviews.length;
  console.log(totalInterviews);
  
  const offers = app.items.filter(item => item.status === "offer"); // dig into each application's items array
  totalOffers += offers.length;
  console.log(totalOffers);
  
  
});

let responseRate = (totalOffers + totalInterviews) / totalApplications * 100


document.getElementById("response-rate").textContent = ` ${responseRate}%`;
document.getElementById("total-applications").textContent = totalApplications;
document.getElementById("total-offers").textContent = totalOffers;

document.getElementById("total-interviews").textContent =totalInterviews;

}

processEl();