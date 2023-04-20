import { Bug } from "$app/models/index.js";

export const CREATE = async (req, res) => {
  const data = req.body;

  try {
    const bug = await Bug.create(data);

    res.status(200).send(bug);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const ALL = async (req, res) => {
  try {
    const bugs = await Bug.find();

    res.status(200).send(bugs);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
