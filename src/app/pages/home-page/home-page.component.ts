import { Component, OnInit } from '@angular/core';
import { IImage } from 'src/app/image/iimage';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  private _jogosImageArray: IImage[] = [];
  private _plataformasImageArray: IImage[] = [];

  ngOnInit(): void {
    this.loadJogosImageArray();
    this.loadPlataformasImageArray();
  }

  public get jogosImageArray(): IImage[] {
    return this._jogosImageArray;
  }
  
  public get plataformasImageArray(): IImage[] {
    return this._plataformasImageArray;
  }

  private loadJogosImageArray(): void {
    const images: IImage[] = [
      { alt: 'JOGO 1', src: '/assets/img/fakeimg1.png' },
      { alt: 'JOGO 2', src: '/assets/img/fakeimg2.png' },
      { alt: 'JOGO 3', src: '/assets/img/fakeimg3.png' },
      { alt: 'JOGO 4', src: '/assets/img/fakeimg4.png' },
    ];
    this._jogosImageArray = images;
  }

  private loadPlataformasImageArray(): void {
    const images: IImage[] = [
      { alt: 'JOGO 1', src: '/assets/img/fakeimg1.png' },
      { alt: 'JOGO 2', src: '/assets/img/fakeimg2.png' },
      { alt: 'JOGO 3', src: '/assets/img/fakeimg3.png' },
      { alt: 'JOGO 4', src: '/assets/img/fakeimg4.png' },
    ];
    this._plataformasImageArray = images;
  }
}
