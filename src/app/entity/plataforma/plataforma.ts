export declare type Plataformas = Plataforma[];
export class Plataforma {
  constructor(
    public id?: string,
    public nome: string = '',
    public marca: string = '',
    public modelo: string = '',
    public serial: string = '',
    public precisaReparos: boolean = false,
    public emprestado: boolean = false,
    public desbloqueio: string = '',
    public regiao: string = '',
    public detalhes: string = '',
    public imagem: string = ''
  ) {}
}
