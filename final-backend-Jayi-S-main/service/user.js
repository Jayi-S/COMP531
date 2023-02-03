/**
 * services
 */

import jsonwebtoken from "jsonwebtoken";
import config from "../config/index.js";
import md5 from "md5";

// db
import mongoose from "mongoose";
import UserModel from "../db/user.js";
import ProfileModel from "../db/profile.js";
import crypto from 'crypto'

import { sessions } from '../middleware/session.js'

/*
    {
        "username"
        "password"
        "email"
        "dob"
        "zip"
    }
*/
// register
export const register = async (req, res) => {
  let { username, password, email, dob, zip, avator } = req.body;

  const userLi = await UserModel.find({ username });
  if (userLi.length != 0) {
    res.send({
      code: 101,
      msg: "user exist",
    });
    return;
  }

  password = md5("pwd_" + password + `_${username}`);

  const userId = new mongoose.Types.ObjectId();
  let userDoc = new UserModel({
    _id: userId,
    username,
    password,
    following: [],
  });
  await userDoc.save();

  let profileDoc = new ProfileModel({
    _id: new mongoose.Types.ObjectId(),
    userId,
    email,
    dob,
    zip,
    status: "online",
    avator: avator,
  });
  await profileDoc.save();
  const userLi1 = await UserModel.find({ username });
  res.send({
    code: 0,
    msg: "success",
    result: "success",
    username: username,
    id: userLi1[0]._id,
  });
};

/*
    {
        "username"
        "password"
    }
*/
export const login = async (req, res) => {
  let { username, password } = req.body;

  password = md5("pwd_" + password + `_${username}`);

  const userLi = await UserModel.find({ username, password });
  if (userLi.length == 0) {
    res.send({
      code: 1002,
      msg: "auth error",
    });
    return;
  }

  const token = crypto.randomUUID();

  sessions[token] = {
    userInfo: {
      userId: userLi[0]._id,
      username,
    }
  }

  res.send({
    code: 0,
    msg: "success",
    username: userLi[0].username,
    id: userLi[0]._id,
    result: "success",
    token: token,
  });

};

/*
    {
        username
        password
    }
*/
export const changePasswd = async (req, res) => {
  let { username, password } = req.body;

  password = md5("pwd_" + password + `_${username}`);

  const userLi = await UserModel.updateOne(
    { username },
    {
      $set: {
        password,
      },
    }
  );

  res.send({
    code: 0,
    msg: "success",
  });
};

export const logout = async (req, res) => {
  if (!req.mysession.userInfo) {
    res.send({
      code: 1003,
      msg: "not login",
    });
    return;
  }

  req.mysession.userInfo = {};

  res.send({
    code: 0,
    msg: "success",
  });
};

export const getFollowUser = async (req, res) => {
  const userId = req.mysession.userInfo.userId;
  const username = req.mysession.userInfo.username;

  const userInfo = await UserModel.findOne({
    _id: mongoose.Types.ObjectId(userId),
  });

  console.log(userInfo);

  res.send({
    code: 0,
    msg: "success",
    username,
    following: userInfo.following,
  });
};

/*
    {
        username
    }
*/
export const followUser = async (req, res) => {
  const { user: username } = req.params;

  const userId = req.mysession.userInfo.userId;

  const userInfo = await UserModel.findOne({
    _id: mongoose.Types.ObjectId(userId),
  });

  if (!userInfo.following.includes(username)) {
    userInfo.following.push(username);
    const data = await UserModel.updateOne(
      { _id: mongoose.Types.ObjectId(userId) },
      {
        $set: {
          following: userInfo.following,
        },
      }
    );
  }

  res.send({
    code: 0,
    msg: "success",
    username,
    following: userInfo.following.map((user) => {
      return {
        name: user
      }
    }),
  });
};

export const unfollowUser = async (req, res) => {
  const { user: username } = req.params;

  const userId = req.mysession.userInfo.userId;

  const userInfo = await UserModel.findOne({
    _id: mongoose.Types.ObjectId(userId),
  });

  console.log(userInfo, username);

  const follow = userInfo.following.filter((it) => it != username);
  console.log(`follow is ` + follow);

  const data = await UserModel.updateOne(
    { _id: mongoose.Types.ObjectId(userId) },
    {
      $set: {
        following: follow,
      },
    }
  );

  res.send({
    code: 0,
    msg: "success",
    username,
    following: follow,
  });
};


export const getUser = async (req, res) => {
  // let { username, password, email, dob, zip } = req.body;

  const userLi = await UserModel.find({});
  res.send({
    code: 0,
    msg: "success",
    result: "success",
    users: userLi.map((e) => ({ "id": e._id, "name": e.username }))
  });
};
