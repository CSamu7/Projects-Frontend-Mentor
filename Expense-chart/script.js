const canva = document.getElementById("graph")
const ctx = canva.getContext("2d")

const getAmount = async() => {
  const request = await fetch("data.json")
  const response = await request.json()

  const amounts = response.map(x => x.amount)
  const days = response.map(x => x.day)

  creatChart(days, amounts)
}

const getColorsBar = (amounts, opacity) => {
  const maxNumber = Math.max(...amounts)
  const maxNumberBg = `rgba(118, 181, 188, ${opacity})`
  const minNumberBg = `rgba(236, 119, 95, ${opacity})`
  const colors = []

  amounts.forEach((amount, index) => {
    amount === maxNumber
      ? colors[index] = maxNumberBg
      : colors[index] = minNumberBg
  })

  return colors
}

const creatChart = (days, amounts) => {
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: days,
      datasets: [{
        backgroundColor: getColorsBar(amounts, 1), 
        borderRadius: 5,
        data: amounts,
        hoverBackgroundColor: getColorsBar(amounts, .6)
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          displayColors: false,
          callbacks: {
           label: (ctx) => {
             let label = ctx.dataset.label || '';

             label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ctx.parsed.y);
   
             return label;
            },
            title: () => {},
          }
         },
      },
      scales: {
        x: {
          grid: {
            drawBorder: false,
            display: false
          }
        },
        y: {
          display: false,
          grid: {
            display: false
          }
        }
      }
    }   
  })
}

getAmount()