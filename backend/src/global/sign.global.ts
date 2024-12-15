export class SignGlobal {
  id?: number;
  signType?: string;
  code?: string;
  name?: string;
  detail?: string;
  image?: string;

  constructor(
    id: number,
    signType: string,
    code: string,
    name: string,
    detail: string,
    image: string,
  ) {
    this.id = id;
    this.signType = signType;
    this.code = code;
    this.name = name;
    this.detail = detail;
    this.image = image;
  }
}
