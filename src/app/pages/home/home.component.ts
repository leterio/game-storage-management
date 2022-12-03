import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Images } from 'src/app/entity/image/image';
import { Jogos } from 'src/app/entity/jogo/jogo';
import { JogoService } from 'src/app/entity/jogo/jogo.service';

@Component({
  selector: 'pages-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public jogosNovoRoute: string = '/jogos/novo';

  public jogosImageArray: Images = [];
  // public plataformasImageArray: Images = [];

  constructor(private jogoService: JogoService) {}

  ngOnInit(): void {
    this.loadJogosImageArray();
    // this.loadPlataformasImageArray();
  }

  private loadJogosImageArray(): void {
    const jogos: Observable<Jogos> = this.jogoService.list(4);
    jogos.subscribe((jogos) => {
      this.jogosImageArray = <Images>(
        jogos.filter((jogo) => jogo.imagem !== undefined && jogo.imagem !== null).map((jogo) => jogo.imagem)
      );
    });
  }

  // private loadPlataformasImageArray(): void {
  //   this.plataformasImageArray = [];
  // }
}
