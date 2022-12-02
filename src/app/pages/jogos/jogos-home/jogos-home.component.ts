import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataGridModel, DataGridModels } from 'src/app/components/data-grid/data-grid-model';
import { ImageService } from 'src/app/entity/image/image.service';
import { JogoService } from 'src/app/entity/jogo/jogo.service';

@Component({
  selector: 'pages-jogos-home',
  templateUrl: './jogos-home.component.html',
})
export class JogosHomeComponent implements OnInit {
  constructor(private jogoService: JogoService, private imageService: ImageService) {}

  jogos: DataGridModels = [];

  loadJogos(): void {
    firstValueFrom(this.jogoService.list(8))
      .then((subscribedJogos) => {
        this.jogos = subscribedJogos.map((mappedJogo) => {
          let newModel: DataGridModel = <DataGridModel>{
            title: mappedJogo.titulo,
            field1: mappedJogo.plataforma,
            field2: mappedJogo.genero,
            field3: mappedJogo.serial,
            field4: 'WIP',
            routerLink: `/jogos/${mappedJogo.id}`,
          };
          firstValueFrom(this.imageService.getById(mappedJogo.imagemId))
            .then((imagem) => {
              newModel.image = imagem;
            })
            .catch((reason) => {
              if (reason.status != 404) {
                console.error(`Erro ao carregar imagem para jogo ${mappedJogo.id}`);
              }
            });
          return newModel;
        });
      })
      .catch((reason) => {
        window.alert(`Ocorreu um erro ao listar os jogos.\n${reason.message}`);
      });
  }

  ngOnInit(): void {
    this.loadJogos();
  }
}
