const router = require("express").Router();
const verify = require('../routes/verifyToken')
router.get("/", verify, (req, res) => {
//   res.send({
//     post: {
//       title: "My post",
//       description: " Some description. I am the best coder.",
//     },
//   });
    res.send(req.user)
});


//output:
//==========
// {
//     "_id": "5e8cffe01104604d64c81c5e",
//     "iat": 1586305365
// }

module.exports = router;