import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jogo } from 'src/app/entity/jogo/jogo';
import { JogoService } from 'src/app/entity/jogo/jogo-service';
import { Utils } from 'src/app/helper/utils';

@Component({
  selector: 'pages-jogos-form',
  templateUrl: './jogos-form.component.html',
})
export class JogosFormComponent implements OnInit {
  pageTitle!: string;
  jogo!: Jogo;

  constructor(public activatedRoute: ActivatedRoute, public jogoService: JogoService) {}

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.initJogo();
  }

  private initJogo(): void {
    let id: number | undefined = Utils.tryParseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(id);
    if (id) {
      this.jogoService.getById(id).subscribe((jogo) => {
        if (jogo) {
          this.jogo = <Jogo>jogo;
          this.pageTitle = `Editando: ${jogo.titulo}`;
        }
      });
    }

    if (!this.jogo) {
      this.jogo = this.jogoService.newEmpty();
      this.pageTitle = 'Novo Jogo';
    }
  }

  onSave(): void {
    console.log(this.jogo);
  }
}
