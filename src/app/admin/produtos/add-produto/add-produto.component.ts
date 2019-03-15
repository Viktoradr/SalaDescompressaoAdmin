import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';
import { ProdutoService } from 'src/app/shared/services/produto/produto.service';
import { take } from 'rxjs/operators';
import { ProdutoProvider } from 'src/app/shared/providers/produto/produto.provider';
import { PNotifyProvider } from 'src/app/shared/providers/pnotify/pnotify.provider';
import { MESSAGES } from 'src/app/app.messages';
import { MASKS } from 'src/app/app.mask';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.component.html',
  styleUrls: ['./add-produto.component.scss']
})
export class AddProdutoComponent implements OnInit {

  @ViewChild('file') file: ElementRef;
  produto: Produto;
  mask = MASKS.valorMask;

  constructor(
    private notify: PNotifyProvider,
    private produtoService: ProdutoService,
    private produtoProvider: ProdutoProvider
  ) { 
    this.produto = new Produto();
  }

  ngOnInit() {}

  novoProduto() {
    console.log(this.produto)
    this.produtoService.addProduto(this.produto)
    .pipe(take(1))
    .subscribe((res: Produto) => {
      if(res) {
        this.produto = new Produto();
        this.produtoProvider.eventProduto(res);
        this.notify.success('Cadastrado!', MESSAGES._success_cad_prod);
      } else {
        this.notify.info('Aviso!', MESSAGES._aviso);
      }
    }, err => {
      this.notify.error('Erro', MESSAGES._erro);
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log("reader", reader)
      reader.onload = () => {
        this.produto.imagemNome = file.name;
        this.produto.file = reader.result;

        if (this.verificarExtensao(this.produto.imagemNome)) {
          this.notify.info('Aviso!', MESSAGES._imagem_extensao_invalida);
          this.produto.file = null;
          this.produto.imagemNome = '';
        }
      };
    }
  }

  verificarExtensao(nome) {
    let ext = nome.split('.')[1];
    if (ext != 'png' && ext != 'jpg') return true;
    else return false;
  }

}
