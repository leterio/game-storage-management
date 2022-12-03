import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable, of, switchMap } from 'rxjs';
import { DropDownOption } from 'src/app/components/forms/drop-down-field/drop-down-option';
import { ActionImage, Image } from 'src/app/entity/image/image';
import { ImageService } from 'src/app/entity/image/image.service';
import { Jogo } from 'src/app/entity/jogo/jogo';
import { JogoService } from 'src/app/entity/jogo/jogo.service';
import { PrateleiraService } from 'src/app/entity/prateleira/prateleira.service';
import { Utils } from 'src/app/helper/utils';

@Component({
  selector: 'pages-jogos-form',
  templateUrl: './jogos-form.component.html',
})
export class JogosFormComponent implements OnInit {
  pageTitle!: string;
  editMode!: boolean;
  newMode!: boolean;
  jogo!: Jogo;
  imagem!: Image;

  prateleiraOptions!: DropDownOption[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jogoService: JogoService,
    private imageService: ImageService,
    private prateleiraService: PrateleiraService
  ) {}

  resetPage(): void {
    this.pageTitle = 'Cadastro de Jogo';
    this.editMode = true;
    this.newMode = true;
    this.jogo = this.jogoService.newEmpty();
    this.imagem = this.imageService.newEmpty();
    this.checkOpenedForView();
  }

  ngOnInit(): void {
    this.resetPage();
    firstValueFrom(this.prateleiraService.list()).then((prateleiras) => {
      this.prateleiraOptions = prateleiras.map(
        (prateleira) =>
          <DropDownOption>{
            id: prateleira.id,
            label: prateleira.nome,
          }
      );
    });
  }

  private checkOpenedForView() {
    let idParameterizado: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParameterizado) {
      this.editMode = false;
      this.pageTitle = 'Carregando jogo para visualização ...';
      firstValueFrom(this.jogoService.getById(idParameterizado))
        .then((jogoCarregado) => {
          if (jogoCarregado) {
            this.pageTitle = jogoCarregado.titulo;
            firstValueFrom(this.imageService.getById(jogoCarregado.imagem))
              .then((imagem) => {
                if (imagem) {
                  this.imagem = imagem;
                }
              })
              .catch((reason) => {
                if (reason.status !== 404) {
                  window.alert(`Ocorreu um erro ao carregar a imagem do jogo para visualização.\n${reason.message}`);
                  history.back();
                }
              });
            this.newMode = false;
            this.jogo = jogoCarregado;
          } else {
            window.alert(`Nenhum jogo localizado com o id (${idParameterizado}) informado.`);
            history.back();
          }
        })
        .catch((reason) => {
          window.alert(`Ocorreu um erro ao carregar o jogo para visualização.\n${reason.message}`);
          history.back();
        });
    }
  }

  enterEditMode(): void {
    this.editMode = true;
    if (!this.newMode) {
      this.pageTitle = `Editando: ${this.jogo?.titulo}`;
    }
  }

  onSubmit(): void {
    firstValueFrom(this.imageService.save(this.imagem))
      .then((imagemId) => {
        this.jogo.imagem = imagemId;
        firstValueFrom(this.jogoService.save(this.jogo))
          .then((savedId) => {
            window.alert(`Jogo salvo. ID: ${savedId}`);
            this.router.navigate([`/jogos/${savedId}`]);
            this.resetPage();
          })
          .catch((reason) => {
            window.alert(`Ocorreu um erro ao salvar o jogo. Tente novamente.\n${reason.message}`);
          });
      })
      .catch((reason) => {
        window.alert(`Ocorreu um erro ao salvar o jogo. Tente novamente.\n${reason.message}`);
      });
  }

  remove() {
    if (window.confirm(`Deseja realmente remover o jogo "${this.jogo.titulo}?"`)) {
      firstValueFrom(this.imageService.remove(this.imagem.id!))
        .then(() => {
          firstValueFrom(this.jogoService.remove(this.jogo.id!))
            .then(() => {
              window.alert(`Jogo "${this.jogo.titulo}" removido`);
              this.router.navigate(['/jogos/']);
            })
            .catch((reason) => {
              window.alert(`Ocorreu um erro ao remover o jogo. Tente novamente.\n${reason.message}`);
            });
        })
        .catch((reason) => {
          window.alert(`Ocorreu um erro ao remover o jogo. Tente novamente.\n${reason.message}`);
        });
    }
  }

  back() {
    history.back();
  }
}
