const userInput = document.querySelector(".userInput")
const content = document.querySelector(".content")
const title = document.querySelector(".title")
const dateElem = document.querySelector(".date")
const tempElem = document.querySelector(".temp")
const moodWtr = document.querySelector(".moodWtr")
const minMaxTemp = document.querySelector(".min-max-temp")
const errElem = document.querySelector(".err")

const key = "615a54f7c5323eb352ecd9bb395b69a6"
const kelvin = 273.15
const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const daysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

userInput.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${userInput.value.trim()}&appid=${key}`
    )
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        errElem.innerText = ""
        generateHtml(data)
      })
      .catch((err) => {
        errElem.innerText = "city not found.try again..."
        for (const elem of content.children) {
          elem.innerText = ''
        }
        userInput.value = ""
        userInput.focus()
      })
  }
})

function generateHtml(data) {
  let d = new Date()
  let year = d.getFullYear()
  let month = monthsArray[d.getMonth()]
  let date = d.getDate()
  let day = daysArray[d.getDay()]

  title.innerText = `${data.name}, ${data.sys.country}`
  dateElem.innerText = `${day} ${date} ${month} ${year}`
  tempElem.innerText = `${Math.floor(data.main.temp - kelvin)}°C`
  moodWtr.innerText = data.weather[0].main
  minMaxTemp.innerText = `${Math.floor(
    data.main.temp_min - kelvin
  )}°C / ${Math.floor(data.main.temp_max - kelvin)}°C `

  userInput.value = ""
  userInput.focus()
}
