import bcrypt from 'bcrypt';
import Admin from '../models/Admin';
import fs from 'fs';
import path from 'path';
import Project from '../models/Project';

// *
export const getHome = async (req, res) => {
  // 프로젝트 불러오고, 반환
  const project = await Project.find({});
  return res.json(project);
};

// *
export const postUpload = async (req, res) => {
  const {
    body: { title, member, language },
    file: img,
  } = req;
  try {
    // 프로젝트 모델 생성
    const project = await Project.create({
      title,
      member,
      img: img.filename,
      language,
    });
  } catch (err) {
    console.error('프로젝트 생성에 실패했습니다', err);
    fs.unlinkSync(img.path);
    return res.sendStatus(400);
  }
  // 생성 완료
  return res.status(201).json({ img });
};

// *
export const postLogin = async (req, res) => {
  const {
    body: { id, pw },
  } = req;
  // 데이터베이스에서 form 요소에서 받은 id 가 있는지 체크
  const admin = await Admin.findOne({ id });

  /**
   * ID, PW가 일치하지 않을 경우 에러 메세지를 반환
   */
  if (!admin) {
    return res.json({ error: '존재하지 않는 계정입니다.' });
  }
  const ok = await bcrypt.compare(pw, admin.pw);
  if (!ok) {
    return res.json({ error: '올바른 비밀번호가 아닙니다.' });
  }
  // 로그인 성공
  return res.json({ success: true });
};

// *
export const postJoin = async (req, res) => {
  const {
    body: { id, pw, email },
  } = req;
  let error;
  const adminExists = await Admin.exists({
    $or: [
      { id: { $regex: new RegExp(id, 'i') } },
      { email: { $regex: new RegExp(email, 'i') } },
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
  return res.sendStatus(201);
};
