const localsRouter = require("express").Router();
const Local = require("../models/local");
const User = require("../models/user");
const Review = require("../models/review");
const jwt = require("jsonwebtoken");
const { getTokenFrom } = require("../utils/token");

localsRouter.get("/", async (request, response, next) => {
  try {
    const locals = await Local.find({}, "nombre direccion horario consumicion");
    response.status(200).json(locals);
  } catch (error) {
    next(error);
  }
});

localsRouter.get("/:id", async (request, response, next) => {
  try {
    const local = await Local.findById(request.params.id)
      .populate({
        path: "user",
        select: "username email",
      })
      .populate({
        path: "reviews",
        select: "-local",
        populate: { path: "user", select: "username" },
      });

    if (!local) return response.status(404).send({ error: "local not found" });

    response.status(200).json(local);
  } catch (error) {
    next(error);
  }
});

localsRouter.post("/", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id)
      return response.status(401).send({ error: "invalid token" });

    const user = await User.findById(decodedToken.id);
    const local = new Local({
      ...request.body,
      user: user._id,
    });

    const savedLocal = await local.save();
    user.locales.push(savedLocal._id);
    await user.save();

    return response.status(201).json(savedLocal);
  } catch (error) {
    next(error);
  }
});

localsRouter.post("/:id/reviews", async (request, response, next) => {
  try {
    const local = await Local.findById(request.params.id);
    if (!local) return response.status(400).send({ error: "local not found" });

    const { content, date } = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id)
      return response.status(401).send({ error: "invalid token" });

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(400).json({ error: "user not found." });
    }

    const review = new Review({
      content,
      date: date ? date : new Date(),
      user: user._id,
      local: local._id,
    });

    const savedReview = await review.save();
    local.reviews.push(savedReview);
    await local.save();
    user.reviews.push(savedReview);
    await user.save();

    response.json(savedReview);
  } catch (error) {
    next(error);
  }
});

localsRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id)
      return response.status(401).send({ error: "invalid token" });

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(400).json({ error: "user not found." });
    }

    const local = await Local.findById(request.params.id);
    if (!local) {
      response.status(204).end();
      return;
    }
    if (local.user === user) {
      console.log("local.user === user");
    } else if (local.user === user._id) {
      console.log("local.user === user._id");
    } else if (local.user.toString() === user._id.toString()) {
      console.log("local.user.toString() === user._id.toString()");
    } else {
      console.log("Otro");
    }

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

localsRouter.put("/:id", async (request, response, next) => {
  try {
    const { nombre, direccion, musica, consumicion, horario } = request.body;
    const updatedLocal = await Local.findByIdAndUpdate(
      request.params.id,
      { nombre, direccion, musica, consumicion, horario },
      { new: true, runValidators: true, context: "query" }
    );
    response.status(200).json(updatedLocal);
  } catch (error) {
    next(error);
  }
});

module.exports = localsRouter;
