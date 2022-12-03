import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataGridModel, DataGridModels } from 'src/app/components/data-grid/data-grid-model';
import { ImageService } from 'src/app/entity/image/image.service';
import { PlataformaService } from 'src/app/entity/plataforma/plataforma.service';

@Component({
  selector: 'pages-plataformas-home',
  templateUrl: './plataformas-home.component.html',
})
export class PlataformasHomeComponent implements OnInit {
  constructor(private plataformaService: PlataformaService, private imageService: ImageService) {}

  plataformas: DataGridModels = [];

  loadPlataformas(): void {
    firstValueFrom(this.plataformaService.list(8))
      .then((subscribedPlataformas) => {
        this.plataformas = subscribedPlataformas.map((mappedPlataforma) => {
          let newModel: DataGridModel = <DataGridModel>{
            title: mappedPlataforma.nome,
            field1: mappedPlataforma.modelo,
            field2: mappedPlataforma.marca,
            field3: mappedPlataforma.serial,
            field4: mappedPlataforma.desbloqueio,
            routerLink: `/plataformas/${mappedPlataforma.id}`,
          };
          firstValueFrom(this.imageService.getById(mappedPlataforma.imagem))
            .then((imagem) => {
              newModel.image = imagem;
            })
            .catch((reason) => {
              if (reason.status != 404) {
                console.error(`Erro ao carregar imagem para plataforma ${mappedPlataforma.id}`);
              }
            });
          return newModel;
        });
      })
      .catch((reason) => {
        window.alert(`Ocorreu um erro ao listar os plataformas.\n${reason.message}`);
      });
  }

  ngOnInit(): void {
    this.loadPlataformas();
  }
}
