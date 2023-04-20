import { User } from "$app/models/index.js";

import md5 from "md5";

export const SINGLE = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id);

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const UPDATE = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { $set: data });

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const PASSWORD = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndUpdate(id, {
      $set: {
        password: md5(password),
      },
    });

    res.status(200).send({ message: "User password updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
