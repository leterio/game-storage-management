import { Component, OnInit } from '@angular/core';
import { Jogos } from 'src/app/entity/jogo/jogo';
import { JogoService } from 'src/app/entity/jogo/jogo.service';

@Component({
  selector: 'pages-jogos-home',
  templateUrl: './jogos-home.component.html',
  styleUrls: ['./jogos-home.component.css'],
})
export class JogosHomeComponent implements OnInit {
  constructor(private jogoService: JogoService) {}

  jogos: Jogos = [];

  loadJogos(): void {
    this.jogoService.list().subscribe((jogos) => (this.jogos = jogos));
  }

  ngOnInit(): void {
    this.loadJogos();
  }
}
