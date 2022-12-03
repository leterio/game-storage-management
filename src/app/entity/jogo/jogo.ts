import { Image } from '../image/image';

export declare type Jogos = Jogo[];
export class Jogo {
  constructor(
    public id?: string,
    public titulo: string = '',
    public genero: string = '',
    public plataforma: string = '',
    public desenvolvedora: string = '',
    public publicadora: string = '',
    public precisaReparos: boolean = false,
    public emprestado: boolean = false,
    public serial: string = '',
    public prateleiraId: any = undefined,
    public detalhes: string = '',
    public imagemId: string = ''
  ) {}
}
