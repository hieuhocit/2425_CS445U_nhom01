export interface ITheme {
  mode: 'dark' | 'light';
}

export interface ISetting {
  currentLicenseId: string | null;
  currentLicense: ILicense | null | undefined;
  licenses: ILicense[];
  violationType: 1 | 2 | 3;
}

export type User = {
  id: number;
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
};

export interface IExam {
  id: number;
  title: string;
  license_ids: number[];
}

export interface ILicense {
  id: number;
  code: string;
  display: string;
  timer: number;
  pass: number;
}

export interface IQuestion {
  id?: number;
  image: string | File;
  text: string;
  tip: string;
  required: boolean;
  topic_id: number | null;
  answers?: IAnswer[];
  idSelectedAnswer?: number;
}

export interface IAnswer {
  id: number | null;
  text: string;
  correct: boolean;
  question_id: number | null;
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
  image: string;
}

export interface ITopic {
  id: number;
  display: string;
  totalQuestion: number | undefined;
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
  relations: IViolation[];
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
