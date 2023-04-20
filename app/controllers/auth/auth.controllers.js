import { User } from "$app/models/index.js";
import { createToken, tfa } from "$app/functions/index.js";

import md5 from "md5";

export const LOGIN = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password: md5(password) });

    if (user === null) {
      return res.status(401).send({
        message: "Sorry user is not here!",
      });
    }

    res.status(200).send({ token: createToken(user._id), user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const REGISTER = async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email,
    password: md5(password),
  };

  try {
    const user = await User.create(data);

    res.status(200).send({ token: createToken(user._id), user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const TELEGRAM_AUTH = async (req, res) => {
  const body = req.body;

  try {
    const { data, status } = await tfa.authUser(body.userToken);

    if (status === 200) {
      console.log(data);

      try {
        const user = await User.findOne({ tid: data.tid });

        const userData = {
          tid: data.tid,
        };

        if (user) {
          const dbUser = await User.findOne(req.body);

          res
            .status(200)
            .send({ token: createToken(dbUser._id), user: dbUser });
        } else {
          const newUser = await User.create(userData);

          res
            .status(200)
            .send({ token: createToken(newUser._id), user: newUser });
        }
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};
