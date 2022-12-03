import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/helper/constants';
import { MockHelper } from 'src/app/helper/mock-helper';
import { Utils } from 'src/app/helper/utils';
import { BaseEntityService } from '../base-entity-service';
import { Jogo } from './jogo';

@Injectable({ providedIn: 'root' })
export class JogoService extends BaseEntityService<Jogo> {
  get localStorageKey(): string {
    return 'jogoDatabase';
  }

  get jsonServerEntity(): string {
    return 'jogos';
  }

  get useMocks(): boolean {
    return Constants.jogosMocked;
  }

  get useLocalStorage(): boolean {
    return Constants.jogosLocalStorage;
  }

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  public newEmpty(): Jogo {
    return new Jogo();
  }

  public copyClean(object: Jogo): Jogo {
    return new Jogo(
      object.id,
      object.titulo,
      object.genero,
      object.plataforma,
      object.desenvolvedora,
      object.publicadora,
      object.precisaReparos,
      object.emprestado,
      object.serial,
      object.prateleira,
      object.detalhes,
      object.imagem
    );
  }

  protected generateMock(): Jogo {
    return new JogoMock();
  }
}

class JogoMock extends Jogo {
  constructor() {
    super(
      Utils.generateEntityId(),
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
