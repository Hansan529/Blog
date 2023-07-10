import bcrypt from 'bcrypt';
import Admin from '../models/Admin';
import fs, { access } from 'fs';
import path from 'path';
import Project from '../models/Project';
import axios from 'axios';

// *
export const getHome = async (req, res) => {
  // 프로젝트 불러오고, 반환
  const project = await Project.find({}).sort({ dateSearch: 'desc' });
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
      body: { id, pw, email, socialLogin, avatarImg, username },
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
      : { socialLogin, avatarImg, email, username };
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
    body: { url, date, title, developer, language, description, sourceCode },
    file: thumbnail,
  } = req;
  // TODO
  if (!thumbnail) {
    return res.end();
  }
  try {
    // 프로젝트 모델 생성
    const project = await Project.create({
      url,
      date,
      dateSearch: date,
      title,
      developer,
      thumbnail: thumbnail.filename,
      language: language.split(',').map((value) => value.trim().toUpperCase()),
      description,
      sourceCode,
    });
    // 생성 완료
    return res.status(201).json(project._id);
  } catch (err) {
    console.error('프로젝트 생성에 실패했습니다', err);
    fs.unlinkSync(thumbnail.path);
    return res.sendStatus(400);
  }
};

// 프로젝트 수정
export const postProjectEdit = async (req, res) => {
  const {
    body: {
      beforeId: id,
      beforeThumbnail,
      url,
      date,
      title,
      developer,
      language,
      description,
      sourceCode,
    },
    file: thumbnail,
  } = req;
  const updateData = {
    url,
    date,
    title,
    developer,
    thumbnail: thumbnail ? thumbnail.filename : undefined,
    language: language.split(',').map((value) => value.trim().toUpperCase()),
    description,
    sourceCode,
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
    if (thumbnail) {
      fs.unlinkSync(
        path.join(__dirname, '../uploads', 'projects', beforeThumbnail)
      );
    }
    return res.sendStatus(200);
  } catch (err) {
    console.error('프로젝트를 찾지 못했습니다', err);
    fs.unlinkSync(img.path);
    return res.send('에러');
  }
};

// 프로젝트 삭제
export const postProjectDelete = async (req, res) => {
  const {
    params: { id },
    body: { thumbnail },
  } = req;
  try {
    const project = await Project.findByIdAndDelete(id);
    fs.unlinkSync(path.join(__dirname, '../uploads', 'projects', thumbnail));
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
          username: userData.data.login,
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

// * 개발자 이미지 호출 API
export const getAvatarImg = async (req, res) => {
  const admin = await Admin.find({});
  const data = admin.map(({ avatarImg, username }) => ({
    img: avatarImg,
    username,
  }));
  return res.json(data);
};

// * 프로젝트 목록 호출 API
export const getProject = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const project = await Project.findById(id);
    return res.json(project);
  } catch (err) {
    console.error('프로젝트 로딩에 문제가 생겼습니다.', err);
    return res.sendStatus(400);
  }
  return res.end();
};
