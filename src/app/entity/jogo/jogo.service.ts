import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Constants } from 'src/app/helper/constants';
import { MockHelper } from 'src/app/helper/mock-helper';
import { BaseEntityService } from '../base-entity-service';
import { ActionImage, Image } from '../image/image';
import { ImageService } from '../image/image.service';
import { Jogo, Jogos } from './jogo';

@Injectable({ providedIn: 'root' })
export class JogoService extends BaseEntityService<Jogo, number> {
  private static localStorageKey: string = 'jogoDatabase';

  constructor(private imageService: ImageService) {
    super();
  }

  public override list(total?: number, currentPage?: number): Observable<Jogos> {
    let jogos: Jogos;

    if (Constants.jogosMocked) jogos = JogoService.mocked(total);
    else if (Constants.jogosLocalStorage)
      jogos = super.listLocalStorage(JogoService.localStorageKey, total, currentPage);
    else jogos = [];

    for (let jogo of jogos) {
      this.loadImage(jogo);
    }

    return of(jogos);
  }

  public override listTop(count: number = 4): Observable<Jogos> {
    let jogos: Jogos;

    if (Constants.jogosMocked) jogos = JogoService.mocked(count);
    else if (Constants.jogosLocalStorage) jogos = super.listLocalStorage(JogoService.localStorageKey, count);
    else jogos = [];

    for (let jogo of jogos) {
      this.loadImage(jogo);
    }

    return of(jogos);
  }

  public getById(id: number): Observable<Jogo | undefined> {
    let jogo: Jogo | undefined;

    if (Constants.jogosMocked) jogo = JogoService.mocked()[0];
    if (Constants.jogosLocalStorage) jogo = super.getByIdLocalStorage(JogoService.localStorageKey, id);
    else jogo = undefined;

    if (jogo) {
      this.loadImage(jogo);
    }

    return of(jogo);
  }

  public newEmpty(): Jogo {
    return new Jogo();
  }

  public save(jogo: Jogo): Observable<number | undefined> {
    if (Constants.jogosMocked) return of(1);
    else if (Constants.jogosLocalStorage) return of(this.saveLocalStorage(JogoService.localStorageKey, jogo));
    return of(undefined);
  }

  protected override saveLocalStorage(localStorageKey: string, jogo: Jogo): number {
    let imagem: Image | undefined = jogo.imagem;
    jogo.imagem = undefined;

    let id = super.saveLocalStorage(localStorageKey, jogo);

    if (imagem) {
      imagem.id = id;
      this.imageService.save(imagem);
    }

    return id;
  }

  public remove(jogo: Jogo): Observable<boolean> {
    if (Constants.jogosMocked) return of(true);
    else if (Constants.jogosLocalStorage) return of(this.removeLocalStorage(JogoService.localStorageKey, jogo));
    return of(true);
  }

  protected override removeLocalStorage(localStorageKey: string, jogo: Jogo): boolean {
    let imagem: Image | undefined = jogo.imagem;
    if (imagem) {
      jogo.imagem = undefined;
      this.imageService.remove(imagem);
    }

    return super.removeLocalStorage(localStorageKey, jogo);
  }

  private loadImage(jogo: Jogo) {
    this.imageService.getById(jogo.id!).subscribe((image) => {
      if (image) {
        let actionImage = ActionImage.fromImage(image, `/jogos/${jogo.id}`);
        jogo.imagem = actionImage;
      }
    });
  }

  private static mocked(count: number = 1): Jogos {
    if (count <= 1) return [new JogoMock()];

    let jogos: Jogos = [];
    for (let i = 0; i < count; i++) jogos.push(new JogoMock());
    return jogos;
  }
}

class JogoMock extends Jogo {
  private static counter: number = 1;

  constructor() {
    super(
      JogoMock.counter++,
      MockHelper.getWords(1, 5),
      MockHelper.getWords(1, 5),
      MockHelper.getWords(1, 5),
      MockHelper.getWords(1, 5),
      MockHelper.getWords(1, 5),
      false,
      false,
      MockHelper.getWords(1, 5),
      undefined,
      MockHelper.getWords(1, 5)
    );
  }
}
