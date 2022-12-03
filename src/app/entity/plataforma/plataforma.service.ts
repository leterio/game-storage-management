import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/helper/constants';
import { MockHelper } from 'src/app/helper/mock-helper';
import { Utils } from 'src/app/helper/utils';
import { BaseEntityService } from '../base-entity-service';
import { Plataforma } from './plataforma';

@Injectable({ providedIn: 'root' })
export class PlataformaService extends BaseEntityService<Plataforma> {
  get localStorageKey(): string {
    return 'plataformaDatabase';
  }

  get jsonServerEntity(): string {
    return 'plataformas';
  }

  get useMocks(): boolean {
    return Constants.plataformasMocked;
  }

  get useLocalStorage(): boolean {
    return Constants.plataformasLocalStorage;
  }

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  public newEmpty(): Plataforma {
    return new Plataforma();
  }

  public copyClean(object: Plataforma): Plataforma {
    return new Plataforma(
      object.id,
      object.nome,
      object.marca,
      object.modelo,
      object.serial,
      object.precisaReparos,
      object.emprestado,
      object.desbloqueio,
      object.regiao,
      object.detalhes,
      object.imagem
    );
  }

  protected generateMock(): Plataforma {
    return new PlataformaMock();
  }
}

class PlataformaMock extends Plataforma {
  constructor() {
    super(
      Utils.generateEntityId(),
      MockHelper.getWords(1, 5),
      MockHelper.getWords(1, 5),
      MockHelper.getWords(1, 5),
      MockHelper.getWords(1, 5),
      false,
      false,
      MockHelper.getWords(1, 5),
      MockHelper.getWords(1, 5),
      MockHelper.getWords(1, 5),
      MockHelper.getWords(1, 5)
    );
  }
}
