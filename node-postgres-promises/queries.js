const promise = require('bluebird');

const options = {
  //Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/puppies';
const db = pgp(connectionString);

//add query functions
const getAllPuppies = (req, res, next) => {
  db.any('SELECT * FROM pups')
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const getSinglePuppy = (req, res, next) => {
  const pupID = parseInt(req.params.id);
  db.one('SELECT * FROM pups WHERE id = $1', pupID)
    .then(function(data){
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function(err) {
      return next(err);
    });
};

const createPuppy = (req, res, next) => {
  req.body.age = parseInt(req.body.age);
  db.none('INSERT INTO pups(name, breed, age, sex)' + 'values(${name}, ${breed}, ${age}, ${sex}', req.body)
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });    
    })
    .catch(function(err) {
      return next(err);
    });

};

module.exports = {
  getAllPuppies,
  getSinglePuppy,
  createPuppy,
  // updatePuppy,
  // removePuppy
};