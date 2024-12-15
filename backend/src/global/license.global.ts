export class LicenseGlobal {
  id?: number;
  code?: string;
  display?: string;
  timer: number;
  passed?: number;

  constructor(
    id?: number,
    code?: string,
    display?: string,
    timer?: number,
    passed?: number,
  ) {
    this.id = id;
    this.code = code;
    this.display = display;
    this.timer = timer;
    this.passed = passed;
  }
}
