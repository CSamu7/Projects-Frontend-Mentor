const getData = async(url) => {
  const adviceText = document.querySelector(".card__advice")
  const adviceNumber = document.querySelector(".card__number")

  try {
    const request = await fetch(url)
    if(!request.ok) throw {status: request.status, message: request.statusText}

    const requestJSON = await request.json()

    console.log(requestJSON)

    adviceText.textContent = `“${requestJSON.slip.advice}”`
    adviceNumber.textContent = `Advice #${requestJSON.slip.id}`
  } catch (error) {
    let message = error.statusText || "Ha ocurrido un error"
    adviceNumber.textContent = `Error: ${error.status}`    
    adviceText.textContent = `${message}`
  }
}

document.addEventListener("click", (e) => {
  if(e.target.matches(".card__random") || e.target.matches(".card__dice")){
    getData("https://api.adviceslip.com/advice")
  }
})

getData("https://api.adviceslip.com/advice")