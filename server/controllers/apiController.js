import bcrypt from "bcrypt";
import Admin from "../models/Admin";

export const postLogin = async (req, res) => {
  const {
    body: { id, pw },
  } = req;
  return res.send("테스트");
};

export const getJoin = async (req, res) => {
  return res.send("dd");
};
export const postJoin = async (req, res) => {
  const {
    body: { id, pw, email },
  } = req;
  let error;
  const adminExists = await Admin.exists({
    $or: [
      { id: { $regex: new RegExp(id, "i") } },
      { email: { $regex: new RegExp(email, "i") } },
    ],
  });
  if (Boolean(adminExists)) {
    return res.json({ error: true });
  } else {
    await Admin.create({
      id,
      pw,
      email,
    });
  }
  return res.sendStatus(200);
};
