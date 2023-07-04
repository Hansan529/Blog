import bcrypt from 'bcrypt';
import Admin from '../models/Admin';
import fs, { access } from 'fs';
import path from 'path';
import Project from '../models/Project';
import axios from 'axios';

// *
export const getHome = async (req, res) => {
  // 프로젝트 불러오고, 반환
  const project = await Project.find({});
  return res.json(project);
};

// ^ 관리
// ^ 로그인
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
// ^ 관리자 추가
export const postJoin = async (req, res) => {
  try {
    const {
      body: { id, pw, email, socialLogin, avatarImg },
    } = req;
    let error;
    const adminExists = await Admin.exists({
      $or: [
        { id: { $regex: new RegExp(id, 'i') } },
        { email: { $regex: new RegExp(email, 'i') } },
      ],
    });
    if (adminExists) {
      return res.json({ error: true });
    }
    const adminData = id
      ? { id, pw, email }
      : { socialLogin, avatarImg, email };
    await Admin.create(adminData);
    return res.sendStatus(201);
  } catch (err) {
    console.error('관리자 추가 중 오류가 발생했습니다', err);
    return res.statue(500).json({ error: '올바르지 않은 정보가 있습니다' });
  }
};

// * 프로젝트 관련
// 프로젝트 추가
export const postUpload = async (req, res) => {
  const {
    body: { date, title, member, language },
    file: img,
  } = req;
  // TODO
  if (!img) {
    return res.end();
  }
  try {
    // 프로젝트 모델 생성
    const project = await Project.create({
      date,
      title,
      member,
      img: img.filename,
      language: language.toUpperCase(),
    });
  } catch (err) {
    console.error('프로젝트 생성에 실패했습니다', err);
    fs.unlinkSync(img.path);
    return res.sendStatus(400);
  }
  // 생성 완료
  return res.status(201).json({ img });
};

// 프로젝트 수정
export const postProjectEdit = async (req, res) => {
  const {
    body: { beforeId: id, beforeImg, date, title, member, language },
    file: img,
  } = req;
  const updateData = {
    date,
    title,
    member,
    img: img ? img.filename : undefined,
    language: language.toUpperCase(),
  };
  // 객체의 value 값이 undefined가 아닌 것들만 반환하고 하나의 객체로 합침
  const undefinedFilter = Object.entries(updateData)
    .filter(([key, value]) => value != undefined)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  try {
    // Project 업데이트
    const project = await Project.findByIdAndUpdate(id, undefinedFilter, {
      new: true,
    });
    // 이미지를 새로 업로드 했을 경우, 기존 이미지 파일 삭제
    if (img) {
      fs.unlinkSync(path.join(__dirname, '../uploads', 'projects', beforeImg));
    }
  } catch (err) {
    console.error('프로젝트를 찾지 못했습니다', err);
    fs.unlinkSync(img.path);
    return res.send('에러');
  }
  return res.sendStatus(200);
};

// 프로젝트 삭제
export const postProjectDelete = async (req, res) => {
  const {
    params: { id },
    body: { img },
  } = req;
  try {
    const project = await Project.findByIdAndDelete(id);
    fs.unlinkSync(path.join(__dirname, '../uploads', 'projects', img));
  } catch (err) {
    console.error('프로젝트 삭제에 실패했습니다', err);
    return res.sendStatus(400);
  }
  return res.sendStatus(200);
};

// 깃허브 로그인 토큰 발부
export const tokenLoginGithub = (req, res) => {
  const baseURL = 'https://github.com/login/oauth/authorize';
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_singup: false,
    scope: 'read:user user:email',
  };
  const params = new URLSearchParams(config);
  const url = `${baseURL}?${params}`;

  return res.send(url);
};
// 토큰을 통해 로그인 및 아이디 생성
export const postLoginGithub = async (req, res) => {
  const baseURL = 'https://github.com/login/oauth/access_token';
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.body.code,
  };

  const params = new URLSearchParams(config).toString();
  const url = `${baseURL}?${params}`;

  try {
    const { access_token } = await (
      await axios(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })
    ).data;
    if (access_token) {
      const apiUrl = 'https://api.github.com';

      const userData = await axios(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
      const a = await userData.data;
      console.log('userData: ', a);
      const emailData = await axios(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });

      const emailObj = emailData.data.find(
        (email) => email.primary === true && email.verified === true
      );

      if (!emailObj) {
        return res.sendStatus(400);
      }
      const already = await Admin.findOne({ email: emailObj.email });
      if (already) {
        return res.json({ logged: true });
      } else {
        return res.json({
          socialLogin: true,
          avatarImg: userData.data.avatar_url,
          email: emailObj.email,
        });
      }
    }
  } catch (err) {
    console.error('오류', err);
    return res.sendStatus(400);
  }
  return res.end();
};
