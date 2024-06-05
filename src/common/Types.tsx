export interface ProductDetail {
  id: number;
  title: string;
  url: string;
}

export interface RegionDetail {
  lat: number;
  lng: number;
  title: string;
}

export interface CommentDetail {
  id: number;
  author: string;
  content: string;
  insertDts: string;
}
export interface CommentProps {
  comments: CommentDetail[];
}
export interface KakaoMapProps {
  regions: RegionDetail[];
}
