import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Observable, of, switchMap } from 'rxjs';
import { ActionImage, Image } from 'src/app/entity/image/image';
import { ImageService } from 'src/app/entity/image/image.service';
import { Prateleira } from 'src/app/entity/prateleira/prateleira';
import { PrateleiraService } from 'src/app/entity/prateleira/prateleira.service';
import { Utils } from 'src/app/helper/utils';

@Component({
  selector: 'pages-prateleiras-form',
  templateUrl: './prateleiras-form.component.html',
})
export class PrateleirasFormComponent implements OnInit {
  pageTitle!: string;
  editMode!: boolean;
  newMode!: boolean;
  prateleira!: Prateleira;
  imagem!: Image;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private prateleiraService: PrateleiraService,
    private imageService: ImageService
  ) {}

  resetPage(): void {
    this.pageTitle = 'Cadastro de Prateleira';
    this.editMode = true;
    this.newMode = true;
    this.prateleira = this.prateleiraService.newEmpty();
    this.imagem = this.imageService.newEmpty();
  }

  ngOnInit(): void {
    this.resetPage();
    this.checkOpenedForView();
  }

  private checkOpenedForView() {
    let idParameterizado: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParameterizado) {
      this.editMode = false;
      this.pageTitle = 'Carreganda prateleira para visualização ...';
      firstValueFrom(this.prateleiraService.getById(idParameterizado))
        .then((prateleiraCarregado) => {
          if (prateleiraCarregado) {
            this.pageTitle = prateleiraCarregado.nome;
            firstValueFrom(this.imageService.getById(prateleiraCarregado.imagem))
              .then((imagem) => {
                if (imagem) {
                  this.imagem = imagem;
                }
              })
              .catch((reason) => {
                if (reason.status !== 404) {
                  window.alert(
                    `Ocorreu um erro ao carregar a imagem da prateleira para visualização.\n${reason.message}`
                  );
                  history.back();
                }
              });
            this.newMode = false;
            this.prateleira = prateleiraCarregado;
          } else {
            window.alert(`Nenhum prateleira localizado com o id (${idParameterizado}) informado.`);
            history.back();
          }
        })
        .catch((reason) => {
          window.alert(`Ocorreu um erro ao carregar a prateleira para visualização.\n${reason.message}`);
          history.back();
        });
    }
  }

  enterEditMode(): void {
    this.editMode = true;
    if (!this.newMode) {
      this.pageTitle = `Editando: ${this.prateleira?.nome}`;
    }
  }

  onSubmit(): void {
    firstValueFrom(this.imageService.save(this.imagem))
      .then((imagemId) => {
        this.prateleira.imagem = imagemId;
        firstValueFrom(this.prateleiraService.save(this.prateleira))
          .then((savedId) => {
            window.alert(`Prateleira salvo. ID: ${savedId}`);
            this.router.navigate([`/prateleiras/${savedId}`]);
            this.resetPage();
          })
          .catch((reason) => {
            window.alert(`Ocorreu um erro ao salvar a prateleira. Tente novamente.\n${reason.message}`);
          });
      })
      .catch((reason) => {
        window.alert(`Ocorreu um erro ao salvar a prateleira. Tente novamente.\n${reason.message}`);
      });
  }

  remove() {
    if (window.confirm(`Deseja realmente remover a prateleira "${this.prateleira.nome}?"`)) {
      firstValueFrom(this.imageService.remove(this.imagem.id!))
        .then(() => {
          firstValueFrom(this.prateleiraService.remove(this.prateleira.id!))
            .then(() => {
              window.alert(`Prateleira "${this.prateleira.nome}" removido`);
              this.router.navigate(['/prateleiras/']);
            })
            .catch((reason) => {
              window.alert(`Ocorreu um erro ao remover a prateleira. Tente novamente.\n${reason.message}`);
            });
        })
        .catch((reason) => {
          window.alert(`Ocorreu um erro ao remover a prateleira. Tente novamente.\n${reason.message}`);
        });
    }
  }

  back() {
    history.back();
  }
}
