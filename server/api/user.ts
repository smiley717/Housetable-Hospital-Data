import * as express from "express";
import env from "../env";

const router = express.Router();

router.get("/details", (req, res) => {
  if (!req.user) {
    console.log("Boooo! The user is NOT attached to the request.");
    return res.status(401).send();
  }
  console.log(`Hey, here's the user: ${req.user}`);
  return res.send(req.user);
});

export default router;
