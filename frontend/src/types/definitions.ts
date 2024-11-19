export interface ITheme {
  mode: 'dark' | 'light';
}

export interface IStoreState {
  theme: ITheme;
}

export interface IAnswer {
  id: string;
  title: string;
}

export interface IQuestion {
  id: string;
  title: string;
  image?: string | null | undefined;
  answers: IAnswer[];
  required: boolean;
  instruction?: string | undefined | null;
  idTrueAnswer: string;
  idSelectedAnswer?: string | undefined | null;
}

export interface IBehavior {
  type: 'view' | 'exam';
}
