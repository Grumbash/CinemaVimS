var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, name: "someone"},
    {id: 2, name: "someone_else"}
  ]);
});

module.exports = router;
