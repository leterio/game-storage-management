import { Component, OnInit } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ActionImage, Image, Images } from 'src/app/entity/image/image';
import { ImageService } from 'src/app/entity/image/image.service';
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

  constructor(private jogoService: JogoService, private imageService: ImageService) {}

  ngOnInit(): void {
    this.loadJogosImageArray();
    // this.loadPlataformasImageArray();
  }

  private loadJogosImageArray(): void {
    firstValueFrom(this.jogoService.list(4))
      .then((jogos) => {
        for (let jogo of jogos) {
          firstValueFrom(this.imageService.getById(jogo.imagemId)).then((imagem) => {
            let newImagem: Image = ActionImage.fromImage(imagem!, `/jogos/${jogo.id}`);
            newImagem.label = jogo.titulo;
            this.jogosImageArray.push(newImagem);
          });
        }
      })
      .catch((reason) => {
        window.alert(`Ocorreu um erro ao carregar a lista de jogos.\n${reason.message}`);
      });
  }

  // private loadPlataformasImageArray(): void {
  //   this.plataformasImageArray = [];
  // }
}
