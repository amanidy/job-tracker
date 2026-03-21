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

let responseRate = Math.round((totalOffers + totalInterviews) / totalApplications * 100)


document.getElementById("response-rate").textContent = ` ${responseRate}%`;
document.getElementById("total-applications").textContent = totalApplications;
document.getElementById("total-offers").textContent = totalOffers;

document.getElementById("total-interviews").textContent =totalInterviews;

}

processEl();

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toLocaleDateString("en-KE", { weekday: "short" }));
  }
  return days;
}

function getResponsesPerDay() {
  const responses = Array(7).fill(0);

  apps.forEach(app => {
    app.items.forEach(item => {
      const applicationDate = new Date(item.date);
      const today = new Date();
      const diffDays = Math.floor((today - applicationDate) / (1000 * 60 * 60 * 24));

      if (diffDays < 7) {
        const index = 6 - diffDays;

        // count responses (interview or offer)
        if (item.status === "interview" || item.status === "offer") {
          responses[index]++;
        }
      }
    });
  });

  return responses;
}

const responseCtx = document.getElementById("responseChart").getContext("2d");

new Chart(responseCtx, {
  type: "line",
  data: {
    labels: getLast7Days(),
    datasets: [{
      label: "Responses",
      data: getResponsesPerDay(),
      borderColor: "#6c63ff",
      backgroundColor: "rgba(108, 99, 255, 0.1)",
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } }
  }
});

function getTopStatuses() {
  const statusMap = {};

  apps.forEach(app => {
    app.items.forEach(item => {
      const status = item.status;

      if (statusMap[status]) {
        statusMap[status]++;
      } else {
        statusMap[status] = 1;
      }
    });
  });

  return {
    labels: Object.keys(statusMap),
    data: Object.values(statusMap)
  };
}

const topStatuses = getTopStatuses();
const topCtx = document.getElementById("topApplicationsChart").getContext("2d");

new Chart(topCtx, {
  type: "bar",
  data: {
    labels: topStatuses.labels,
    datasets: [{
      label: "Applications",
      data: topStatuses.data,
      backgroundColor: ["#6c63ff", "#ff6584", "#43d9a2", "#ffa94d", "#4dabf7"],
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } }
  }
});

function getApplicationsByHour() {
  const hours = Array(24).fill(0);

  apps.forEach(app => {
    const hour = new Date(app.createdAt).getHours();
    hours[hour]++;
  });

  const activeHours = hours
    .map((count, hour) => ({ hour, count }))
    .filter(entry => entry.count > 0);

  return {
    labels: activeHours.map(e => `${e.hour}:00`),
    data: activeHours.map(e => e.count)
  };
}

const hourly = getApplicationsByHour();
const hourlyCtx = document.getElementById("hourlyChart").getContext("2d");

new Chart(hourlyCtx, {
  type: "doughnut",
  data: {
    labels: hourly.labels,
    datasets: [{
      data: hourly.data,
      backgroundColor: ["#6c63ff", "#ff6584", "#43d9a2", "#ffa94d", "#4dabf7"]
    }]
  },
  options: { responsive: true }
});

