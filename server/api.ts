import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";
import UserModel from "./models/User";
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

router.get("/usercolor", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }

  UserModel.findById(req.user._id)
    .select("color")
    .then((user) => {
      if (user) {
        res.send({ color: user.color });
      } else {
        res.status(404).send({ msg: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error fetching color", error: err });
    });
});

router.get("/useraboutme", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }

  UserModel.findById(req.user._id)
    .select("aboutme")
    .then((user) => {
      if (user) {
        res.send({ aboutme: user.aboutme });
      } else {
        res.status(404).send({ msg: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error fetching about me", error: err });
    });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
