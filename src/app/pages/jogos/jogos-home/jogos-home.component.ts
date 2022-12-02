import { Component, OnInit } from '@angular/core';
import { DataGridModel, DataGridModels } from 'src/app/components/data-grid/data-grid-model';
import { JogoService } from 'src/app/entity/jogo/jogo.service';

@Component({
  selector: 'pages-jogos-home',
  templateUrl: './jogos-home.component.html',
})
export class JogosHomeComponent implements OnInit {
  constructor(private jogoService: JogoService) {}

  jogos: DataGridModels = [];

  loadJogos(): void {
    this.jogoService.list(8).subscribe(
      (subscribedJogos) =>
        (this.jogos = subscribedJogos.map(
          (mappedJogo) =>
            <DataGridModel>{
              image: mappedJogo.imagem,
              title: mappedJogo.titulo,
              field1: mappedJogo.plataforma,
              field2: mappedJogo.genero,
              field3: mappedJogo.serial,
              field4: 'WIP',
              routerLink: `/jogos/${mappedJogo.id}`,
            }
        ))
    );
  }

  ngOnInit(): void {
    this.loadJogos();
  }
}
