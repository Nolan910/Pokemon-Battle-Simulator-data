const { initDatabase } = require("../../api/database");

async function getAllPokemon() {
    let db = await initDatabase();

    if (db) {
        const results = await db.collection("pokemon").find({
        }).toArray()
        return results
    } 
    else {
        return {
            error: "Not found"
        };
    }
}

async function getPokemonID() {
    let db = await initDatabase();


    if (db) {
        const results = await db.collection("pokemon").findOne({
            _id: new ObjectId(_id),
        });
    } 
        else {
        return {
            error: "Not found"
        };
    }
}
module.exports = {getPokemonID, getAllPokemon}