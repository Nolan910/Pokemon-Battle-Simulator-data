const { initDatabase } = require("../../api/database");

async function getAllAbility() {
    let db = await initDatabase();

    if (db) {
        const results = await db.collection("ability").find({
        }).toArray()
        return results
    } 
    else {
        return {
            error: "Not found"
        };
    }
}
module.exports = {getAllAbility}