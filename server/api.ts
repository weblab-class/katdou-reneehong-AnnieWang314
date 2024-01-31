import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";
import UserModel from "./models/User";
import TermModel, { Term } from "./models/Term";
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

type Level = {
  level: number;
  words: Term[];
  progress: number;
  questionsOrder: number[];
};

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.post("/updateaboutme", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }
  const newAboutMe = req.body.aboutMe;
  UserModel.findOneAndUpdate(
    { googleid: req.user.googleid },
    { aboutme: newAboutMe },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(500).send({ msg: "Error updating aboutme" });
      }
      if (req.user) {
        socketManager.getIo().emit("userAboutMeChanged", newAboutMe, req.user._id);
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
      if (req.user) {
        socketManager.getIo().emit("userColorChanged", newColor, req.user._id);
      }
      res.send(doc);
    }
  );
});

router.post("/updatedate", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }
  const newDate = req.body.date;
  UserModel.findOneAndUpdate(
    { googleid: req.user.googleid },
    { date: newDate },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(500).send({ msg: "Error updating date" });
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
        res.send({ aboutMe: user.aboutme });
      } else {
        res.status(404).send({ msg: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error fetching color", error: err });
    });
});

router.get("/userdate", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }
  UserModel.findById(req.user._id)
    .select("date")
    .then((user) => {
      if (user) {
        res.send({ date: user.date });
      } else {
        res.status(404).send({ msg: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error fetching date", error: err });
    });
});

router.get("/terms", async (req, res) => {
  try {
    const terms = await TermModel.find().sort({ term: 1 });
    res.json(terms);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/flashcardsOrder", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }

  const userId = req.user._id;
  const user = await UserModel.findById(userId);

  if (user && user.flashcardsOrder.length === 0) {
    const terms = await TermModel.find({});
    user.flashcardsOrder = shuffle(terms);
    await user.save();

    res.send({ flashcardsOrder: user.flashcardsOrder });
  } else if (user) {
    res.send({ flashcardsOrder: user.flashcardsOrder });
  } else {
    res.status(404).send("User not found.");
  }
});

router.post("/updateFlashcardsOrder", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }

  const userId = req.user._id;

  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).send("User not found.");
  }

  const terms = await TermModel.find({});

  user.flashcardsOrder = shuffle(terms);
  await user.save();

  res.status(200).send({
    message: "Flashcards order updated successfully.",
    flashcardsOrder: user.flashcardsOrder,
  });
});

router.get("/currentIndex", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }

  const userId = req.user._id;
  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send({ currentIndex: user.currentIndex });
});

router.post("/updateCurrentIndex", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }

  const userId = req.user._id;
  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  if (req.body.newIndex > user.flashcardsOrder.length - 1) {
    user.currentIndex = user.flashcardsOrder.length - 1;
  } else if (req.body.newIndex < 0) {
    user.currentIndex = 0;
  } else {
    user.currentIndex = req.body.newIndex;
  }
  await user.save();
  res.send({ currentIndex: user.currentIndex });
});

function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] with the element at the random index
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.get("/levels", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }

  const user = await UserModel.findById(req.user._id).populate({
    path: "progress",
    populate: { path: "words", model: "Term" },
  });

  if (!user) {
    return res.status(404).send("User not found.");
  }

  const terms = await TermModel.find().sort({ term: 1 });

  const levels: Level[] = [];
  for (let i = 0; i < terms.length; i += 4) {
    const levelTerms = terms.slice(i, i + 4);
    const levelNumber = i / 4 + 1;

    const userProgress = user.progress.find((p) => p.level === levelNumber);
    const array = Array.from({ length: levelTerms.length * 2 }, (_, i) => i + 1);

    levels.push({
      level: levelNumber,
      words: levelTerms,
      progress: userProgress ? userProgress.totalQuestionsAnswered : 0,
      questionsOrder:
        userProgress && userProgress.questionsOrder.length === levelTerms.length * 2
          ? userProgress.questionsOrder
          : shuffleArray(array),
    });
  }

  await user.save();

  res.send({ levels: levels });
});

router.post("/updateProgress", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }

  const userId = req.user._id;
  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const levelProgress = user.progress.find((p) => p.level === req.body.currentLevel);
  if (!levelProgress) {
    return res.status(404).json({ error: "Level progress not found" });
  }

  await UserModel.updateOne(
    { _id: userId, "progress.level": req.body.currentLevel },
    { $set: { "progress.$.totalQuestionsAnswered": req.body.newIndex } }
  );
  res.send({ currentQuestionIndex: req.body.newIndex });
});

router.get("/getProgress", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const userId = req.user._id;
  const level = Number(req.query.level);

  if (!userId || isNaN(level)) {
    return res.status(400).json({ error: "Missing userId or invalid level" });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const progressEntry = user.progress.find((p) => p.level === level);
    if (!progressEntry) {
      return res
        .status(200)
        .json({ message: "Progress for the specified level not found", totalQuestionsAnswered: 0 });
    }

    res.json({ totalQuestionsAnswered: progressEntry.totalQuestionsAnswered });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/randomMC", async (req, res) => {
  const randomWords = await TermModel.aggregate([
    { $sample: { size: 3 } }, // $sample selects a specified number of documents randomly
  ]);

  res.send({ choices: randomWords });
});

// router.get("/sum", async (req, res) => {
//   if (!req.user) {
//     return res.status(401).send({ msg: "Not logged in" });
//   }

//   const userId = req.user._id;
//   if (!userId) {
//     return res.status(400).send({ error: "Missing userId" });
//   }

//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     if (!Array.isArray(user.progress)) {
//       return res.status(500).send({ error: "Invalid user progress data" });
//     }

//     const sum = user.progress.reduce((accumulator, level) => {
//       const answered = Number(level.totalQuestionsAnswered) || 0; // Ensure numeric value
//       return accumulator + answered;
//     }, 0);

//     res.status(200).send({ sum: sum });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Server error" });
//   }
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
