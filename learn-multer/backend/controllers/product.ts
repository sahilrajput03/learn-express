import fs from 'fs'

export const newUser = async (req: any, res: any, next: any) => {
  const photo = req.file as Express.Multer.File | undefined;
  console.log("🚀 photo:", photo)
  /**
  {
    fieldname: 'photo',
    originalname: 'peacock.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'uploads',
    filename: '88246d52-cf8d-40e4-8cf5-51b11e08b8fc.jpg',
    path: 'uploads/88246d52-cf8d-40e4-8cf5-51b11e08b8fc.jpg',
    size: 641739
  }
  */

  if (!photo) {
    res.status(400).json({ success: false, message: 'Please send image' }); // handling request without image need to be handled
    return
  }

  // & One by one upload each file via `photos[i].path` and then delete it
  fs.unlinkSync(photo.path)

  res.status(201).json({ success: true, });
  return
};

export const newProduct = async (req: any, res: any, next: any) => {
  const photos = req.files as Express.Multer.File[] | undefined;
  console.log("🚀 photos:", photos)
  /**
  [{
    fieldname: 'photos',
    originalname: 'lily.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'uploads/',
    filename: '8fdd3dd0-aafd-4b00-8485-863c5728a11d.jpeg',
    path: 'uploads/8fdd3dd0-aafd-4b00-8485-863c5728a11d.jpeg',
    size: 550823
  }]
  */

  if (!photos) {
    res.status(400).json({ success: false, message: 'Please send image(s).' }); // handling request without images need to be handled
    return
  }

  // & One by one upload each file via `photos[i].path` and then delete it
  for (let i = 0; i < photos.length; i++) {
    // fs.unlinkSync(photos[i].path)
  }

  res.status(201).json({ success: true, });
  return
};
