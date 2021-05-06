export interface Picture {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: PictureFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
}

export interface PictureFormats {
  thumbnail: PictureThumbnail;
}

export interface PictureThumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}
