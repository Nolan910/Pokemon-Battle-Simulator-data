const express = require('express')
const fs = require('fs/promises');
const axios = require("axios")
const cors = require("cors")
const {getAllPokemon} = require("./controller/pokemon/get.js");
const {getAllMoves} = require("./controller/moves/get.js");
const {getAllAbility} = require("./controller/ability/get.js");
const {getAllType} = require("./controller/type/get.js");
const { log } = require('console');

const app = express()

app.use(cors())

let path = "./data/pokemon-data.json"

//GET PUT UPDATE DELETE CREATE

let text = "/random : Renvoye un pokemon aléatoire de la liste, /random/[type] : Renvoye un pokemon aléatoire de la liste correspondant au type, /random/[type]/[type] : Renvoye un pokemon aléatoire de la liste correspondant au deux types, /random/stage/[1-2]: Renvoye un pokemon aléatoire correspondant au stage d'évolution en paramètre (1 le pokemon est non évolué, 2 le pokemon n'a plus d'évolution), /random/tier/[tier] : Renvoye un pokemon aléatoire dans la tier correspondant, /liste/tier: Renvoye la liste de tout les tiers, /liste/type : Renvoye la liste de tout les types disponibles"

app.get('/', function (req, res) {
  res.send(text)
})

app.get("/pokemon", async (req, res) => {

  console.log({getAllPokemon})
  const pokemon = await getAllPokemon()

  res.send(pokemon)
})

app.get("/moves", async (req, res) => {

  console.log({getAllMoves})
  const moves = await getAllMoves()

  res.send(moves)
})

app.get("/ability", async (req, res) => {

  console.log({getAllAbility})
  const ability = await getAllAbility()

  res.send(ability)
})

app.get("/type", async (req, res) => {

  console.log({getAllType})
  const type = await getAllType()

  res.send(type)
})

app.get('/random',async function (req, res) {
  try {

      const pokemon = await getAllPokemon()

      let randomInt = Math.floor(Math.random() * pokemon.length)

      let randomPokemon = pokemon[randomInt]

      res.send(randomPokemon)

    }
    catch(error) {
      console.log("ErreuruerrE : ", {error})
    };
})

// app.get('/random',async function (req, res) {
//   try {

//       let data = await fs.readFile(path)

//       let fileData = JSON.parse(data)

//       let randomInt = Math.floor(Math.random() * fileData.length)

//       let randomPokemon = fileData[randomInt]

//       res.send(randomPokemon)

//     }
//     catch(error) {
//       console.log("ErreuruerrE : ", {error})
//     };
// })


app.get("/random/:type", async(req, res) => {
  let userParam = req.params.type

  try {

      let data = await fs.readFile(path)

      let fileData = JSON.parse(data)

      let filteredData = fileData.filter((pkmObj) => pkmObj["Types"].toLowerCase().includes(userParam.toLowerCase()))

      let randomInt = Math.floor(Math.random() * filteredData.length)

      let randomPokemon = filteredData[randomInt]

      res.send(randomPokemon)
    }
    catch(error) {
      console.log("ErreuruerrE : ", {error})
    };
})



app.get("/random/:type/:type2", async(req, res) => {
  let userParam = req.params.type
  let userParam2 = req.params.type2

  try {

      let data = await fs.readFile(path)

      let fileData = JSON.parse(data)

      let filteredData = fileData.filter((pkmObj) => pkmObj["Types"].toLowerCase().includes(userParam.toLowerCase()&&userParam2.toLowerCase()))

      if (filteredData){

      let randomInt = Math.floor(Math.random() * filteredData.length)

      let randomPokemon = fileData[randomInt]

      res.send(randomPokemon)
      } else{
        console.log("pas de poke de ces 2 types")
        res.send("pas de poke de ces 2 types")
      }
    }
    catch(error) {
      console.log("ErreuruerrE : ", {error})
    };
})


app.get("/random/stage/:stage", async(req, res) => {
  let userParam = req.params.stage

  try {

      let data = await fs.readFile(path)

      let fileData = JSON.parse(data)

      if (userParam == 1){
      let filteredData = fileData.filter((pkmObj) => pkmObj["Next Evolution(s)"].length>2)

      let randomInt = Math.floor(Math.random() * filteredData.length)

      let randomPokemon = filteredData[randomInt]

      res.send(randomPokemon, "Ce Pokemon peut évoluer")
      } 

      else if (userParam === 2){
      let filteredData = fileData.filter((pkmObj) => pkmObj["Next Evolution(s)"].length<2)

      let randomInt = Math.floor(Math.random() * filteredData.length)

      let randomPokemon = filteredData[randomInt]

      res.send(randomPokemon, "Ce Pokemon ne peut pas évoluer")
      }

      else {
        res.send("Rentre 1 ou 2 stp")
      }
    }
    catch(error) {
      console.log("ErreuruerrE : ", {error})
    };
})



app.get("/random/tier/:tier", async(req, res) =>{
  let userParam = req.params.tier

  try {

      let data = await fs.readFile(path)

      let fileData = JSON.parse(data)

      let filteredData = fileData.filter((pkmObj) => pkmObj["Tier"].toLowerCase()==userParam.toLowerCase)// /!\tier pas un tableau

      let randomInt = Math.floor(Math.random() * filteredData.length)

      let randomPokemon = filteredData[randomInt]

      res.send(randomPokemon)
    }
    catch(error) {
      console.log("ErreuruerrE : ", {error})
    };
})



app.get("/liste/tiers", async(req, res) => {

  try {

      let data = await fs.readFile(path)

      let fileData = JSON.parse(data)

      let filteredData = fileData.map(pkmObj => pkmObj.Tier)

      filteredData = filteredData.map(typeString =>{
        return typeString
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll("'", "")
        .replaceAll(" ", "")
        .split(",")
      })

      let tierList =[]

      filteredData.forEach(listeTypeElelement => {
        listeTypeElelement.forEach(oneType => {
          if(tierList.includes(oneType)=== false){
            tierList.push(oneType)
          }
        })
      })

      res.send(tierList)

    }
    catch(error) {
      console.log("ErreuruerrE : ", {error})
    };
})




app.get("/liste/types", async(req, res) => {
  
  try {

      let data = await fs.readFile(path)

      let fileData = JSON.parse(data)

      let filteredData = fileData.map(pkmObj => pkmObj.Types)

      filteredData = filteredData.map(typeString =>{
        return typeString
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll("'", "")
        .replaceAll(" ", "")
        .split(",")
      })

      let typeList =[]

      filteredData.forEach(listeTypeElelement => {
        listeTypeElelement.forEach(oneType => {
          if(typeList.includes(oneType)=== false){
            typeList.push(oneType)
          }
        })
      })

      res.send(typeList)

    }
    catch(error) {
      console.log("ErreuruerrE : ", {error})
    };
})

app.get("/error?m=:message_erreur", (req, res) =>{
  let userParam = req.params.message_erreur
  res.status(404).send(`Erreur 404: ${userParam}`);
})


app.listen(3001, () => {
  console.log("Serveur lancé sur l'adresse http://localhost:3001/");
})






