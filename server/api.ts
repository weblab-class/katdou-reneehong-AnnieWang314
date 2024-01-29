import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";
import UserModel from "./models/User";
import TermModel from "./models/Term";
const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.post("/updateaboutme", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }
  const newAboutMe = req.body.aboutme;
  UserModel.findOneAndUpdate(
    { googleid: req.user.googleid },
    { aboutme: newAboutMe },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(500).send({ msg: "Error updating aboutme" });
      }
      res.send(doc);
    }
  );
});

router.post("/updatecolor", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }
  const newColor = req.body.color;
  UserModel.findOneAndUpdate(
    { googleid: req.user.googleid },
    { color: newColor },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(500).send({ msg: "Error updating color" });
      }
      res.send(doc);
    }
  );
});

router.get("/terms", async (req, res) => {
  try {
    const terms = await TermModel.find().sort({ term: 1 });
    res.json(terms);
  } catch (err) {
    res.status(500).send(err);
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
