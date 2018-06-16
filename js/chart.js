var chart = null;

function displayChart(data) {
  let chartData = prepareData(data);  // data prepared
  tableDisplay(data);
  var ctx = document.getElementById('chart').getContext('2d');
  var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke.addColorStop(0, "#80b6f4");
  gradientStroke.addColorStop(1, "#f49080");
  if (chart != null) {
    chart.destroy();  // destroys previous chart
  }
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(chartData),
      datasets: [{
        label: '# of Articles',
        data: Object.values(chartData),
        backgroundColor: gradientStroke,
        borderColor: (1, "#ffffff"),
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false,
        bodyFontSize: 11
        }
      }
  });
}

function prepareData(data) {
  let others = 0;
  for (let i = Object.keys(data).length-1; i >= 0; i--) {
    if (Object.values(data)[i] < 5) {  // Any country with value below 5 put into 'Others' on chart
      let key = Object.keys(data)[i];
      data = _.omit(data, key);
      others++;
    }
  }
  data["Others"] = others;
  return data;
}

function tableDisplay(data) {
  $("#dataTable tr").remove();
  let txt = ""
  for (let i = 0; i < Object.keys(data).length-1; i++) {
    txt += "<tr><td><h5>" + Object.keys(data)[i] + "</h5></td>" +
        "<td><p>" + Object.values(data)[i] + "</p></td></tr>"
  }
  if (txt != "") {
    $("#dataTable").append(txt)
  }
}
