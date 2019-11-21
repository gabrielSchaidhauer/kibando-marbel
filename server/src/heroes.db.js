var { Pool } = require('pg');
var conString = "postgres://herouser:password@localhost/herodb";
var pool = new Pool({
    connectionString: conString
});

function getHeroes(name = false) {
    return new Promise((resolve, reject) => {
        pool.connect(function (err, client, done) {

            if (err) {
                reject(err)
            }
            if (!name) {
                client.query('SELECT * from hero', function (err, result) {
                    done();
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(result.rows);
                    }
                });
            } else {
                client.query(`SELECT * FROM hero WHERE name like $1`, ['%' + name + '%'], function (err, result) {
                    done();
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(result.rows);
                    }
                });
            }
        });
    });
}

function getHeroById(id) {
    return new Promise((resolve, reject) => {
        pool.connect(function (err, client, done) {

            if (err) {
                reject(err)
            }
            client.query('SELECT * from hero where id = $1', [id], function (err, result) {
                done();
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result.rows[0]);
                }
            });
        });
    });
}


function updateHero(hero) {
    return new Promise((resolve, reject) => {
        pool.connect(function (err, client, done) {

            if (err) {
                reject(err)
            }

            if (!hero.id) {
                reject(new Error('Hero must exist'));
            }

            client.query('UPDATE hero SET name = $1, category = $2 where id = $3', [hero.category, hero.name + 't', hero.id], function (err, result) {
                done();
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result.rows[0]);
                }
            });
        });
    });
}

function saveHero(hero) {
    return new Promise((resolve, reject) => {
        pool.connect(function (err, client, done) {

            if (err) {
                reject(err)
            }

            client.query('INSERT INTO (name, category) VALUES ($1, $2)', [hero.name, hero.category], function (err, result) {
                done();
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result.rows[0]);
                }
            });
        });
    });
}

function deleteHero(id) {
    return new Promise((resolve, reject) => {
        pool.connect(function (err, client, done) {

            if (err) {
                reject(err)
            }

            client.query('DELETE FROM hero where id = $1', [id], function (err, result) {
                done();
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result.rows[0]);
                }
            });
        });
    });
}

module.exports = {
    "getHeroes": getHeroes,
    "getHeroById": getHeroById,
    "updateHero": updateHero,
    "saveHero": saveHero,
    "deleteHero": deleteHero
}