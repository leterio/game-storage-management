import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActionImage, Image, Images } from 'src/app/entity/image/image';
import { ImageService } from 'src/app/entity/image/image.service';
import { JogoService } from 'src/app/entity/jogo/jogo.service';
import { PlataformaService } from 'src/app/entity/plataforma/plataforma.service';

@Component({
  selector: 'pages-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public jogosNovoRoute: string = '/jogos/novo';
  public plataformasNovoRoute: string = '/plataformas/novo';

  public jogosImageArray: Images = [];
  public plataformasImageArray: Images = [];

  constructor(
    private jogoService: JogoService,
    private plataformaService: PlataformaService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadJogosImageArray();
    this.loadPlataformasImageArray();
  }

  private loadJogosImageArray(): void {
    firstValueFrom(this.jogoService.list(4))
      .then((jogos) => {
        for (let jogo of jogos) {
          firstValueFrom(this.imageService.getById(jogo.imagem)).then((imagem) => {
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

  private loadPlataformasImageArray(): void {
    firstValueFrom(this.plataformaService.list(4))
      .then((plataformas) => {
        for (let plataforma of plataformas) {
          firstValueFrom(this.imageService.getById(plataforma.imagem)).then((imagem) => {
            let newImagem: Image = ActionImage.fromImage(imagem!, `/plataformas/${plataforma.id}`);
            newImagem.label = plataforma.nome;
            this.plataformasImageArray.push(newImagem);
          });
        }
      })
      .catch((reason) => {
        window.alert(`Ocorreu um erro ao carregar a lista de plataformas.\n${reason.message}`);
      });
  }
}
