import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/helper/constants';
import { MockHelper } from 'src/app/helper/mock-helper';
import { Utils } from 'src/app/helper/utils';
import { BaseEntityService } from '../base-entity-service';
import { Prateleira } from './prateleira';

@Injectable({ providedIn: 'root' })
export class PrateleiraService extends BaseEntityService<Prateleira> {
  get localStorageKey(): string {
    return 'prateleiraDatabase';
  }

  get jsonServerEntity(): string {
    return 'prateleiras';
  }

  get useMocks(): boolean {
    return Constants.prateleirasMocked;
  }

  get useLocalStorage(): boolean {
    return Constants.prateleirasLocalStorage;
  }

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  public newEmpty(): Prateleira {
    return new Prateleira();
  }

  public copyClean(object: Prateleira): Prateleira {
    return new Prateleira(
      object.id,
      object.nome,
      object.modelo,
      object.dimensoes,
      object.capacidade,
      object.precisaReparos,
      object.descomissionada,
      object.detalhes,
      object.imagem
    );
  }

  protected generateMock(): Prateleira {
    return new PrateleiraMock();
  }
}

class PrateleiraMock extends Prateleira {
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
      undefined
    );
  }
}
