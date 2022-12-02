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
  get localStorageKey(): string {
    return 'jogoDatabase';
  }

  get useMocks(): boolean {
    return Constants.jogosMocked;
  }

  get useLocalStorage(): boolean {
    return Constants.jogosLocalStorage;
  }

  constructor(private imageService: ImageService) {
    super();
  }

  protected override postProcessResult(jogo: Jogo): void {
    this.imageService.getById(jogo.id!).subscribe((image) => {
      if (image) {
        let actionImage = ActionImage.fromImage(image, `/jogos/${jogo.id}`);
        jogo.imagem = actionImage;
      }
    });
  }

  public newEmpty(): Jogo {
    return new Jogo();
  }

  protected override saveLocalStorage(jogo: Jogo): number {
    let imagem: Image | undefined = jogo.imagem;
    jogo.imagem = undefined;

    let id = super.saveLocalStorage(jogo);

    if (imagem) {
      imagem.id = id;
      this.imageService.save(imagem);
    } else {
      this.imageService.remove(id);
    }

    return id;
  }

  protected override removeLocalStorage(id: number): boolean {
    this.imageService.remove(id);
    return super.removeLocalStorage(id);
  }

  protected generateMock(): Jogo {
    return new JogoMock();
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
