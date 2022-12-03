import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from 'src/app/helper/constants';
import { MockHelper } from 'src/app/helper/mock-helper';
import { BaseEntityService } from '../base-entity-service';
import { ActionImage } from '../image/image';
import { ImageService } from '../image/image.service';

import { Jogo, Jogos } from './jogo';

@Injectable({ providedIn: 'root' })
export class JogoService extends BaseEntityService<Jogo, number> {
  constructor(private imageService: ImageService) {
    super();
  }

  public override list(total: number = 1, currentPage?: number): Observable<Jogos> {
    let jogos: Jogos;

    if (Constants.jogosMocked) jogos = JogoService.mocked(total);
    else jogos = [];

    for (let jogo of jogos) {
      this.loadImage(jogo);
    }

    return of(jogos);
  }

  public override listTop(count: number = 4): Observable<Jogos> {
    let jogos: Jogos;

    if (Constants.jogosMocked) jogos = JogoService.mocked(count);
    else jogos = [];

    for (let jogo of jogos) {
      this.loadImage(jogo);
    }

    return of(jogos);
  }

  public getById(id: number): Observable<Jogo | undefined> {
    let jogo: Jogo | undefined;

    if (Constants.jogosMocked) jogo = JogoService.mocked()[0];
    else jogo = undefined;

    if (jogo) {
      this.loadImage(jogo);
    }

    return of(jogo);
  }

  public newEmpty(): Jogo {
    let jogo: Jogo = new Jogo();
    jogo.imagem = this.imageService.newEmpty();
    return jogo;
  }

  private loadImage(jogo: Jogo) {
    if (Constants.imageMocked) {
      let imagem: ActionImage = ActionImage.fromImage(ImageService.mocked()[0]);
      imagem.clickRoute = `/jogos/${jogo.id}`;
      jogo.imagem = imagem;
    } else {
      this.imageService.getById(jogo.id).subscribe((image) => (jogo.imagem = image));
    }
  }

  public static mocked(count: number = 1): Jogos {
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
