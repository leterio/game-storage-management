import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DropDownOption } from 'src/app/components/forms/drop-down-field/drop-down-option';
import { Image } from 'src/app/entity/image/image';
import { ImageService } from 'src/app/entity/image/image.service';
import { Plataforma } from 'src/app/entity/plataforma/plataforma';
import { PlataformaService } from 'src/app/entity/plataforma/plataforma.service';
import { PrateleiraService } from 'src/app/entity/prateleira/prateleira.service';

@Component({
  selector: 'pages-plataformas-form',
  templateUrl: './plataformas-form.component.html',
})
export class PlataformasFormComponent implements OnInit {
  pageTitle!: string;
  editMode!: boolean;
  newMode!: boolean;
  plataforma!: Plataforma;
  imagem!: Image;

  prateleiraOptions!: DropDownOption[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private plataformaService: PlataformaService,
    private imageService: ImageService,
    private prateleiraService: PrateleiraService
  ) {}

  resetPage(): void {
    this.pageTitle = 'Cadastro de Plataforma / Console';
    this.editMode = true;
    this.newMode = true;
    this.plataforma = this.plataformaService.newEmpty();
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
      this.pageTitle = 'Carregando plataforma para visualização ...';
      firstValueFrom(this.plataformaService.getById(idParameterizado))
        .then((plataformaCarregado) => {
          if (plataformaCarregado) {
            this.pageTitle = plataformaCarregado.nome;
            firstValueFrom(this.imageService.getById(plataformaCarregado.imagem))
              .then((imagem) => {
                if (imagem) {
                  this.imagem = imagem;
                }
              })
              .catch((reason) => {
                if (reason.status !== 404) {
                  window.alert(
                    `Ocorreu um erro ao carregar a imagem do plataforma para visualização.\n${reason.message}`
                  );
                  history.back();
                }
              });
            this.newMode = false;
            this.plataforma = plataformaCarregado;
          } else {
            window.alert(`Nenhum plataforma localizado com o id (${idParameterizado}) informado.`);
            history.back();
          }
        })
        .catch((reason) => {
          window.alert(`Ocorreu um erro ao carregar o plataforma para visualização.\n${reason.message}`);
          history.back();
        });
    }
  }

  enterEditMode(): void {
    this.editMode = true;
    if (!this.newMode) {
      this.pageTitle = `Editando: ${this.plataforma?.nome}`;
    }
  }

  onSubmit(): void {
    firstValueFrom(this.imageService.save(this.imagem))
      .then((imagemId) => {
        this.plataforma.imagem = imagemId;
        firstValueFrom(this.plataformaService.save(this.plataforma))
          .then((savedId) => {
            window.alert(`Plataforma salvo. ID: ${savedId}`);
            this.router.navigate([`/plataformas/${savedId}`]);
            this.resetPage();
          })
          .catch((reason) => {
            window.alert(`Ocorreu um erro ao salvar o plataforma. Tente novamente.\n${reason.message}`);
          });
      })
      .catch((reason) => {
        window.alert(`Ocorreu um erro ao salvar o plataforma. Tente novamente.\n${reason.message}`);
      });
  }

  remove() {
    if (window.confirm(`Deseja realmente remover o plataforma "${this.plataforma.nome}?"`)) {
      firstValueFrom(this.imageService.remove(this.imagem.id!))
        .then(() => {
          firstValueFrom(this.plataformaService.remove(this.plataforma.id!))
            .then(() => {
              window.alert(`Plataforma "${this.plataforma.nome}" removido`);
              this.router.navigate(['/plataformas/']);
            })
            .catch((reason) => {
              window.alert(`Ocorreu um erro ao remover o plataforma. Tente novamente.\n${reason.message}`);
            });
        })
        .catch((reason) => {
          window.alert(`Ocorreu um erro ao remover o plataforma. Tente novamente.\n${reason.message}`);
        });
    }
  }

  back() {
    history.back();
  }
}
