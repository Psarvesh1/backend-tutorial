const router = require("express").Router();
const verifyToken = require('./verifyToken')

router.get("/post", verifyToken, async (req, res) => {
  res.json({
    post: {
      title: "My First Post",
      desc: "Im working on jwt token verification",
    },
  });
});
module.exports = router;
