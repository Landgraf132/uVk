
/* WORK WITH BD */
function openDB() {
    if(db !== null) return 1;

    // db = LocalStorage.openDatabaseSync(identifier, version, description, estimated_size, callback(db))
    db = LocalStorage.openDatabaseSync("uVK-app", "0.1", "Ubuntu client for social network Vkontakte", 100000);

    try {
        db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS settings(key TEXT UNIQUE, value TEXT)');

            var table  = tx.executeSql("SELECT * FROM settings");
            // Seed the table with default values
            if (table.rows.length == 0) {
                tx.executeSql('INSERT INTO settings VALUES(?, ?)', ["distro", "Ubuntu"]);
                tx.executeSql('INSERT INTO settings VALUES(?, ?)', ["foo", "Bar"]);
                console.log('Settings table added');
            };
        });
    } catch (err) {
        console.log("Error creating table in database: " + err);
    };
}
function saveSetting(key, value) {

    openDB();
    db.transaction( function(tx){
        tx.executeSql('INSERT OR REPLACE INTO settings VALUES(?, ?)', [key, value]);
    });
}

function getSetting(key) {

    openDB();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('SELECT value FROM settings WHERE key=?;', [key]);

        if (rs.rows.length===0) res=0; else  res = rs.rows.item(0).value;

        //}

    });
    return res;
}
