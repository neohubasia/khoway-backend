function removeOldData() {
    //for line chart
    myLineChart.data.labels = [];
    myLineChart.data.datasets.forEach((data) => {
      data.data = [];
    });
    myLineChart.update();
    //for Doug 
    myDougChart.data.labels = [];
    myDougChart.data.datasets.forEach((data) => {
      data.data = [];
    });
    myDougChart.update();
  }
  function addNewData(data) {
    let color_array = [];
    data.map(result => {
      color_array.push("#"+Math.floor(Math.random() * Math.pow(256, 3)).toString(16))
      myLineChart.data.labels.push(result.labeldata);
      myLineChart.data.datasets.forEach((data) => {
        data.data.push(result.count);
      });
      //for Doug 
      myDougChart.data.labels.push(result.labeldata);
      myDougChart.data.datasets.forEach((data) => {
        data.data.push(result.count);  
      });    
    });
    myDougChart.data.datasets.forEach((data) => {
      data.backgroundColor = color_array;
      data.hoverBackgroundColor = color_array;
    });
    myLineChart.update();
    myDougChart.update();
  }
  function getChartdata(token, start_date, end_date) {
    $.ajax({
      url: "/api/chartdata?start_date="+start_date+"&end_date="+end_date,
      type: "GET",
      dataType: 'json',
      headers: {
        Authorization: 'Bearer '+token
      },  
      success: function (result) {
          removeOldData();
          addNewData(result.data);
      },
      error: function (err) {
        console.log(err);
      }
    });
  }
    // TeamChart
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
  
    //doughut chart
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
  
  