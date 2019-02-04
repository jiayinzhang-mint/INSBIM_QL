import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.json({ msg: "fuck" });
});

export default router;
