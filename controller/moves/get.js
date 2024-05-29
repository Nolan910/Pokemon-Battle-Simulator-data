const { initDatabase } = require("../../api/database");

async function getAllMoves() {
    let db = await initDatabase();

    if (db) {
        const results = await db.collection("moves").find({
        }).toArray()
        return results
    } 
    else {
        return {
            error: "Not found"
        };
    }
}
module.exports = {getAllMoves}