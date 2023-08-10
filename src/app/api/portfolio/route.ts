import mime from 'mime';
import { join } from 'path';
import { stat, mkdir, writeFile, unlink } from 'fs/promises';
import * as dateFn from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';
import Portfolio from '../../../models/Portfolio';
import Info from '../../../models/Info';
import Admin from '../../../models/Admin';

export const GET = async () => {
  const portfolio = await Portfolio.find({}).sort({ dateSearch: 'desc' });
  const info = await Info.find({}).sort({ date: 'desc' });
  const admin = await Admin.find({});
  return NextResponse.json({ portfolio, admin, info });
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get('file') as Blob | null;
  if (!file) {
    return NextResponse.json(
      { error: 'File blob is required.' },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), 'dd-MM-Y')}`;
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        'Error while trying to create directory when uploading a file\n',
        e
      );
      return NextResponse.json(
        { error: 'Something went wrong.' },
        { status: 500 }
      );
    }
  }

  try {
    // MIME
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    // 파일명
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      ''
    )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    // 이미지 업로드
    await writeFile(`${uploadDir}/${filename}`, buffer);

    const url = formData.get('url') as string;
    const date = formData.get('date') as string;
    const dateSearch = new Date(date as string);
    const title = formData.get('title') as string;
    const developer = formData.get('developer') as string;
    const imageUrl = `${relativeUploadDir}/${filename}`;
    const language = formData.get('language') as string;
    const description = formData.get('description') as string;
    const portfolioData = {
      url,
      date,
      dateSearch,
      title,
      developer: developer.split(','),
      imageUrl,
      language: language.split(','),
      description,
    };
    // await connectMongoDB();
    const portfolio = await Portfolio.create(portfolioData);
    return NextResponse.json({ portfolio: portfolio._id });
  } catch (e) {
    console.error('파일을 업로드하는 동안 오류가 발생\n', e);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

export const PATCH = async (req: NextRequest) => {
  const formData = await req.formData();

  const file = formData.get('file') as Blob | null;
  let imageUrl: string | null = formData.get('imageUrl') as string | null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/${dateFn.format(
      Date.now(),
      'dd-MM-Y'
    )}`;
    const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          'Error while trying to create directory when uploading a file\n',
          e
        );
        return NextResponse.json(
          { error: 'Something went wrong.' },
          { status: 500 }
        );
      }
    }
    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      // 파일명
      const filename = `${file.name.replace(
        /\.[^/.]+$/,
        ''
      )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
      const filePath = `${uploadDir}/${filename}`;
      // 포트폴리오 업데이트일 경우 기존 이미지 파일을 삭제
      if (imageUrl) await unlink(join(process.cwd(), 'public', imageUrl));
      // 이미지 업로드
      await writeFile(filePath, buffer);
      imageUrl = `${relativeUploadDir}/${filename}`;
    } catch (err) {
      console.error('이미지 업로드에 문제가 생겼습니다', err);
    }
  }
  try {
    const id = formData.get('_id') as string;
    const url = formData.get('url') as string;
    const date = formData.get('date') as string;
    const dateSearch = new Date(date as string);
    const title = formData.get('title') as string;
    const developer = formData.get('developer') as string;
    const language = formData.get('language') as string;
    const description = formData.get('description') as string;
    const portfolioData = {
      url,
      date,
      dateSearch,
      title,
      developer: developer.split(','),
      imageUrl,
      language: language.split(','),
      description,
    };
    await Portfolio.findByIdAndUpdate(id, portfolioData, { new: true });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.error('파일을 업로드하는 동안 오류가 발생\n', e);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: 'test' });
};
