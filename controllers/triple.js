const marklogic = require('marklogic');
const config = require('../config');

const db = marklogic.createDatabaseClient(config.connInfo);
const tripleController = {};

tripleController.getTriple = (req, res) => {
  const tripleName = req.params.name;

  db.graphs.read( tripleName,'application/json')
  .result(
    function(response) {
      res.send(response);
    },
    function(error) { console.log(JSON.stringify(error)); }
  );

}
tripleController.getTripleList = (req, res) => {
  db.graphs.list('text/uri-list')
    .result(
      function(response) {
        res.send(response);
      },
      function(error) { console.log(JSON.stringify(error)); }
  );
}

tripleController.mergeTriple = (req, res) => {
// db.graphs.merge('test','application/rdf+json', triples).result(
//     function(response) { 
//       if (response.defaultGraph) {
//         console.log('Loaded into default graph'); 
//       } else {
//         console.log('Loaded into graph ' + response.graph); 
//       };
//     },
//     function(error) { console.log(JSON.stringify(error)); }
// );
}

tripleController.createTriple = (req, res) => {
  const name = req.body.name;
  const subject = req.body.subject;
  const predicate = req.body.predicate;
  const object = req.body.object;
  const objectType = req.body.objectType;

  const triple = {
    [subject]: {
    [predicate] : [{
      type: objectType,
      value: object
    }]
    } 
  }

  db.graphs.write(name,'application/rdf+json', triple).result(
      function(response) { 
        if (response.defaultGraph) {
          console.log('Loaded into default graph'); 
        } else {
          console.log('graph response', response);
          console.log('Loaded into graph ' + response.graph); 
          res.send(response);
        };
      },
      function(error) { console.log(JSON.stringify(error)); }
  );
}


module.exports = tripleController;