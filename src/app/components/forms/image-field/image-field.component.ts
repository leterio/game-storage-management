import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Image } from '../../../entity/image/image';
import { AbstractField } from '../abstract-field';

@Component({
  selector: 'image-field[fieldValue]',
  templateUrl: './image-field.component.html',
  styleUrls: ['./image-field.component.css', '../forms-commom.css'],
})
export class ImageFieldComponent extends AbstractField<Image> {
  acceptedTypes: string[] = ['image/png', 'image/jpeg', 'image/bmp'];

  imageLoadingAfterPick: boolean = false;

  @ViewChild('imagePicker') imagePicker!: ElementRef;

  onRemove(): void {
    this.imagePicker.nativeElement.value = '';
    this.fieldValue!.src = '';
  }

  onFilePick(fileInput: any): boolean {
    if (fileInput.target.files && fileInput.target.files[0]) {
      let file: File = fileInput.target.files[0];
      if (!this.acceptedTypes.includes(file.type)) {
        window.alert('Tipo de arquivo não suportado.');
        return false;
      }
      if (file.size > 1024 * 1024) {
        window.alert('Tamanho do arquivo excede os limites');
        return false;
      }
      this.imageLoadingAfterPick = true;
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        this.updateImage(e.target.result);
      };
      fileReader.readAsDataURL(file);
    } else {
      window.alert('Nenhum arquivo selecionado.');
    }
    return true;
  }

  updateImage(src: string): void {
    this.fieldValue!.src = src;
    this.imageLoadingAfterPick = false;
  }
}
