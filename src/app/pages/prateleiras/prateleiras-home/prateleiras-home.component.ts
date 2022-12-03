import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataGridModel, DataGridModels } from 'src/app/components/data-grid/data-grid-model';
import { ImageService } from 'src/app/entity/image/image.service';
import { PrateleiraService } from 'src/app/entity/prateleira/prateleira.service';

@Component({
  selector: 'pages-prateleiras-home',
  templateUrl: './prateleiras-home.component.html',
})
export class PrateleirasHomeComponent implements OnInit {
  constructor(private prateleiraService: PrateleiraService, private imageService: ImageService) {}

  prateleiras: DataGridModels = [];

  loadPrateleiras(): void {
    firstValueFrom(this.prateleiraService.list(8))
      .then((subscribedPrateleiras) => {
        this.prateleiras = subscribedPrateleiras.map((mappedPrateleira) => {
          let newModel: DataGridModel = <DataGridModel>{
            title: mappedPrateleira.nome,
            field1: mappedPrateleira.capacidade,
            field2: mappedPrateleira.precisaReparos ? "Sim" : "Não",
            field3: mappedPrateleira.modelo,
            routerLink: `/prateleiras/${mappedPrateleira.id}`,
          };
          firstValueFrom(this.imageService.getById(mappedPrateleira.imagem))
            .then((imagem) => {
              newModel.image = imagem;
            })
            .catch((reason) => {
              if (reason.status != 404) {
                console.error(`Erro ao carregar imagem para prateleira ${mappedPrateleira.id}`);
              }
            });
          return newModel;
        });
      })
      .catch((reason) => {
        window.alert(`Ocorreu um erro ao listar as prateleiras.\n${reason.message}`);
      });
  }

  ngOnInit(): void {
    this.loadPrateleiras();
  }
}
