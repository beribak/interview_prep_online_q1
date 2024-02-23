import './hello.js';
import './styles.css';
import ApexCharts from 'apexcharts'

const container = document.querySelector('.container');
let counter = 0;

fetch("https://gitlab.com/-/snippets/2149167/raw/main/data.json")
  .then(response => response.json())
  .then((data) => {
    
    data.profiles.forEach((profile) => {
      // create the labels and values arrays and fill them with the values from the data
      let labels = []
      let values = []

      profile.data.forEach((data) => {
        labels.push(data.label)
        values.push(data.value)
      })

      // construct html and insert in container
      let html = `<div style="display: flex; justify-content: between; padding: 10px;">
                    <h2>${profile.title}</h2>
                    <div class="btn${counter}">...</div>
                  </div>

                  <div style="width: 25vw;" id="chart${counter}">
                  </div>`

      container.insertAdjacentHTML('beforeend', html)
      let btn = document.querySelector(`.btn${counter}`)
     
      // create the chart
      let options = chartOptions(labels, values)
      
      var chart = new ApexCharts(document.querySelector(`#chart${counter}`), options);
      chart.render();

      counter += 1;
     
      // clone card when clicking btn
      btn.addEventListener('click', (event) => {
        event.currentTarget.style.display = 'none'

        let html1 = `<div style="display: flex; justify-content: between; padding: 10px;">
                      <h2>${profile.title}</h2>
                    </div>

                    <div style="width: 25vw;" id="chart${counter + 1}">
                    </div>`
          
        container.insertAdjacentHTML('beforeend', html1)
        
        let options = chartOptions(labels, values)
        var chart = new ApexCharts(document.querySelector(`#chart${counter + 1}`), options);
        chart.render();

        counter += 1;
      })

 
    })
  });

  const chartOptions = (labels, values) => {
    return {
      series: values,
      chart: {
        type: 'donut',
      },
      labels: labels,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  }

     