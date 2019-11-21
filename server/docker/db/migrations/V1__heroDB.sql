CREATE USER herouser WITH SUPERUSER PASSWORD 'password';

CREATE TABLE hero (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    category VARCHAR
);

INSERT INTO hero (name, category)
VALUES 
    ( 'Dr Nice', 'Cientist' ),
    ( 'Narco', 'Alchemist' ),
    ( 'Bombasto', 'Destroyer' ),
    ( 'Celeritas', 'Mage' ),
    ( 'Magneta', 'Telechnicist' ),
    ( 'RubberMan', 'Mutant' ),
    ( 'Dynama', 'Mutant' ),
    ( 'Dr IQ', 'Mutant' ),
    ( 'Magma', 'Elemental' ),
    ( 'Tornado', 'Elemental');