import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ActionImage } from 'src/app/entity/image/image';
import { Jogo } from 'src/app/entity/jogo/jogo';
import { JogoService } from 'src/app/entity/jogo/jogo.service';
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

  constructor(private router: Router, public activatedRoute: ActivatedRoute, public jogoService: JogoService) {}

  resetPage(): void {
    this.pageTitle = 'Cadastro de jogo';
    this.editMode = true;
    this.newMode = true;
    this.jogo = this.jogoService.newEmpty();
  }

  ngOnInit(): void {
    this.resetPage();
    this.checkOpenedForView();
  }

  private checkOpenedForView() {
    let id: number | undefined = Utils.tryParseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.editMode = false;
      this.pageTitle = 'Carregando jogo para visualização ...';
      firstValueFrom(this.jogoService.getById(id)).then((_jogo) => {
        if (_jogo) {
          this.pageTitle = _jogo.titulo;
          if (_jogo.imagem && _jogo.imagem instanceof ActionImage) {
            _jogo.imagem = (<ActionImage>_jogo.imagem).toImage();
          }
          this.newMode = false;
          this.jogo = _jogo;
        } else {
          this.resetPage();
        }
      });
    }
  }

  enterEditMode(): void {
    this.editMode = true;
    if (!this.newMode) {
      this.pageTitle = `Editando: ${this.jogo?.titulo}`;
    }
  }

  async onSubmit(): Promise<void> {
    let savedId = await firstValueFrom(this.jogoService.save(this.jogo));
    if (savedId) {
      window.alert(`Jogo salvo. ID: ${savedId}`);
      this.router.navigate([`/jogos/${savedId}`]);
    } else {
      window.alert(`Erro ao salvar jogo`);
    }
  }

  remove() {
    if (window.confirm(`Deseja realmente remover o jogo "${this.jogo.titulo}?"`)) {
      this.jogoService.remove(this.jogo.id!).subscribe((success) => {
        if (success) {
          window.alert(`Jogo "${this.jogo.titulo}" removido`);
          this.router.navigate(['/jogos/']);
        } else {
          window.alert(`Ocorreu um erro ao remover o jogo "${this.jogo.titulo}"`);
        }
      });
    }
  }

  back() {
    history.back();
  }
}
