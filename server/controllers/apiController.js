import bcrypt from "bcrypt";
import Admin from "../models/Admin";

export const postLogin = async (req, res) => {
  const {
    body: { id, pw },
  } = req;
  // 데이터베이스에서 form 요소에서 받은 id 가 있는지 체크
  const admin = await Admin.findOne({id});

  /**
   * ID, PW가 일치하지 않을 경우 에러 메세지를 반환
   */
  if(!admin){
    return res.json({ error: "존재하지 않는 계정입니다."});
  }
  const ok = await bcrypt.compare(pw, admin.pw);
  if(!ok){
    return res.json({ error: "올바른 비밀번호가 아닙니다."});
  }
  // 로그인 성공
  return res.json({ success: true });
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
