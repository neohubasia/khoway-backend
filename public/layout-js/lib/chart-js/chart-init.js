function getChartdata(token) {
  let xdata = [];
  let ydata = [];
  $.ajax({
    url: "/api/chartdata",
    type: "GET",
    dataType: 'json',
    headers: {
      Authorization: 'Bearer '+token
    },  
    success: function (result) {
      result.data.map(rdata => {
        ydata.push(rdata._id.day);
        xdata.push(rdata.count);
      })
    },
    error: function (err) {
      console.log(err);
    }
  });
  // TeamChart
  var teamChart = document.getElementById("teamChart");
  // teamChart.height = "150";
  var myChart = new Chart(teamChart, {
    type: "line",
    data: {
      labels: ydata,
      type: "line",
      defaultFontFamily: "Montserrat",
      datasets: [
        {
          data: xdata,
          label: "Expense",
          backgroundColor: "rgba(0,103,255,.15)",
          borderColor: "rgba(0,103,255,0.5)",
          borderWidth: 2,
          pointStyle: "circle",
          pointRadius: 5,
          pointBorderColor: "transparent",
          pointBackgroundColor: "rgba(0,103,255,0.5)",
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
              labelString: "Value",
            },
          },
        ],
      },
      title: {
        display: false,
      },
    },
  });

  //doughut chart
  var doughutChart = document.getElementById("doughutChart");
  // doughutChart.height = "150";
  var myChart = new Chart(doughutChart, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: xdata,
          backgroundColor: [
            "rgba(0, 123, 255,0.9)",
            "rgba(0, 123, 255,0.7)",
            "rgba(0, 123, 255,0.5)",
            "rgba(0,0,0,0.07)",
          ],
          hoverBackgroundColor: [
            "rgba(0, 123, 255,0.9)",
            "rgba(0, 123, 255,0.7)",
            "rgba(0, 123, 255,0.5)",
            "rgba(0,0,0,0.07)",
          ],
        },
      ],
      labels: ["green", "green", "green", "green"],
    },
    options: {
      responsive: true,
    },
  });
}
