import { Image } from '../image/image';

export declare type Jogos = Jogo[];
export class Jogo {
  public imagem?: Image;

  constructor(
    public id?: number,
    public titulo: string = '',
    public genero: string = '',
    public plataforma: string = '',
    public desenvolvedora: string = '',
    public publicadora: string = '',
    public precisaReparos: boolean = false,
    public emprestado: boolean = false,
    public serial: string = '',
    public prateleira: any = undefined,
    public detalhes: string = ''
  ) {}

  public toString(): string {
    return JSON.stringify(this, null, 4);
  }
}
