export class ExamGlobal {
  id?: number;
  title?: string;
  examsLicenses?: Array<string>;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}
