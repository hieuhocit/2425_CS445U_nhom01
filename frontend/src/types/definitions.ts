export interface ITheme {
  mode: 'dark' | 'light';
}

export interface ISetting {
  currentLicense: ILicense;
  licenses: ILicense[];
  violationType: 1 | 2 | 3;
}

export type User = {
  username: string;

  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  created_at: string;
  updated_at: string;
  permission: 'ADMIN' | 'MEMBER' | null;

  access_token: string;
  refresh_token: string;
};

export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  access_token: string | null;
  refresh_token: string | null;
};

export interface IExam {
  id: number;
  license_ids: number[];
  title: string;
}

export interface ILicense {
  id: number;
  code: string;
  display: string;
  timer: number;
  pass: number;
}

export interface IQuestion {
  id: number;
  image: string;
  text: string;
  tip: string;
  required: boolean;
  topic_id: number;
  exam_ids: number[];
  license_ids: number[];
  answers?: IAnswer[];
  idSelectedAnswer?: number;
}

export interface IAnswer {
  id: number;
  text: string;
  correct: boolean;
  question_id: number;
}

export interface ISign {
  id: number;
  signType: string;
  code: string;
  name: string;
  detail: string;
  image: string;
  sign_topic_id: number;
}

export interface ISignTopic {
  id: number;
  signType: string;
  display: string;
  subTitle: string;
}

export interface ITopic {
  id: number;
  display: string;
}

export interface IViolation {
  id: number;
  no: number;
  violation: string;
  entities: string;
  fines: string;
  additionalPenalties: string;
  remedial: string;
  otherPenalties: string;
  image: string;
  keyword: string;
  relations: number[];
  bookmarks: IBookmark[];
  law_topic_id: number;
  violation_type: number;
}

export interface ILawTopic {
  id: number;
  display: string;
}

export interface IBookmark {
  bookmarkCode: string;
  bookmarkType: number;
  bookmark: string;
}

export interface IBehavior {
  type: 'view' | 'exam';
}
