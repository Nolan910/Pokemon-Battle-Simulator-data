const express = require("express");
const app = express();
const data = require("../data.json")

const {getPokemonByID, getAllPokemons} = require("../controller/pokemon/get.js")

app.get("/", (req, res) => res.send("Express on Vercel"));


// app.get("/data", (req, res) => {
//     console.log({data});
//     res.send(data)
// })

// app.get("/pokemon/:pokemon-id", async (req, res) => {
//     const pokemon_info = await getPokemonByID(pokemon_id)
//     res.send(data)
// })


app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;