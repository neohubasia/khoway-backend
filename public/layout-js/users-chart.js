// Team Chart
var teamChart = document.getElementById("teamChart");
// teamChart.height = "150";
var myLineChart = new Chart(teamChart, {
  type: "line",
  data: {
    labels: [],
    type: "line",
    defaultFontFamily: "Montserrat",
    datasets: [
      {
        data: [],
        label: "Users",
        backgroundColor: "rgba(0,100,255,.15)",
        borderColor: "rgba(0,100,255,0.5)",
        borderWidth: 2,
        pointStyle: "circle",
        pointRadius: 5,
        pointBorderColor: "transparent",
        pointBackgroundColor: "rgba(0,100,255,0.5)",
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      titleFontSize: 12,
      titleFontColor: "#000",
      bodyFontColor: "#000",
      backgroundColor: "#fff",
      titleFontFamily: "Montserrat",
      bodyFontFamily: "Montserrat",
      cornerRadius: 3,
      intersect: false,
    },
    legend: {
      display: false,
      position: "top",
      labels: {
        usePointStyle: true,
        fontFamily: "Montserrat",
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: false,
            labelString: "Month",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          scaleLabel: {
            display: true,
            labelString: "Users",
          },
        },
      ],
    },
    title: {
      display: false,
    },
  },
});

// Doughut Chart
var doughutChart = document.getElementById("doughutChart");
// doughutChart.height = "150";
var myDougChart = new Chart(doughutChart, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
    labels: [],
  },
  options: {
    responsive: true,
  },
});

function randomColor(opacity) {
  getNumber = () => Math.floor(Math.random() * 255);
  return `rgba(${getNumber()}, ${getNumber()}, ${getNumber()}, ${opacity})`;
}

function addNewData(data) {
  const labels = data.map((result) => result.label_date);
  const counts = data.map((result) => result.count);
  const colors = data.map((result) => randomColor(0.8));
  // line chart
  myLineChart.data.labels = labels;
  myLineChart.data.datasets[0].data = counts;
  // doug chart
  myDougChart.data.labels = labels;
  myDougChart.data.datasets[0].data = counts;
  myDougChart.data.datasets[0].backgroundColor = colors;
  myDougChart.data.datasets[0].hoverBackgroundColor = colors;
  // update all chart
  myLineChart.update();
  myDougChart.update();
}

function getChartData(token, start_date, end_date) {
  $.ajax({
    url: "/api/chart-data?start_date=" + start_date + "&end_date=" + end_date,
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (result) {
      console.log("Result ", result);
      addNewData(result.data);
    },
    error: function (err) {
      console.log(err);
    },
  });
}
