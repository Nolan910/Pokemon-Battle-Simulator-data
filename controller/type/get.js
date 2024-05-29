const { initDatabase } = require("../../api/database");

async function getAllType() {
    let db = await initDatabase();

    if (db) {
        const results = await db.collection("type").find({
        }).toArray()
        return results
    } 
    else {
        return {
            error: "Not found"
        };
    }
}
module.exports = {getAllType}