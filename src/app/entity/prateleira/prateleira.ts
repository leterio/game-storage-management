export declare type Prateleiras = Prateleiras[];
export class Prateleira {
  constructor(
    public id?: string,
    public nome: string = '',
    public modelo: string = '',
    public dimensoes: string = '',
    public capacidade: string = '',
    public precisaReparos: boolean = false,
    public descomissionada: boolean = false,
    public detalhes: string = '',
    public imagem: string = ''
  ) {}
}
