export interface UserInfo {
  username: string;
  password: string;
  email: string;
  phone?: string;
  zip: string;
  pw2?: string;
  avatar?: string;
  state?: string;
  id?:number|string;
  dob: string;
}

export interface ArticleInterface {
  id?: number|string;
  _id?: number|string;
  author?: string;
  userName?:string;
  content?: string;
  Content?: string;
  isImgs?: boolean;
  userId?: number|string;
  isShowComment?: boolean;
  images?:string[];
}

export interface LoginInter {
  username: string;
  password: string;
}
export interface UserInfoInter {
  username: string;
  id: string;
}
