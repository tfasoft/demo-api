import { User } from "$app/models/index.js";
import { createToken, tfa } from "$app/functions/index.js";

import axios from "axios";
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

export const TELEGRAM_REQUEST = async (req, res) => {
  try {
    const { data } = await axios.post(
      "http://localhost:25000/api/auth/request",
      {
        admin: "644245fc0255e2cce61e8c52",
        service: "6442a3bc4b8726646d465d5d",
        user: null,
        callbackUrl: "http://localhost:9999/api/auth/telegram",
      }
    );

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const TELEGRAM_AUTH = async (req, res) => {
  const data = req.body;

  try {
    if (data.resCode === 0) {
      const userData = {
        tid: data.user,
      };

      try {
        const user = await User.findOne(userData);

        const dUser = user
          ? await User.findOne(req.body)
          : await User.create(userData);

        res.redirect("https://google.com");

        // res.status(200).send({ token: createToken(dUser._id), user: dUser });
      } catch (error) {
        res.redirect("https://google.com");

        // res.status(500).send({ message: error.message });
      }
    } else {
      res.status(500).send({ message: "Faild to authenticate" });
    }
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};
