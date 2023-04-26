import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabela-hiragana',
  templateUrl: './tabela-hiragana.page.html',
  styleUrls: ['./tabela-hiragana.page.scss'],
})
export class TabelaHiraganaPage implements OnInit {

  constructor() {}

  ngOnInit() {}

  botao() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/botao-katana.mp3',
    )
    audioAbertura.play()
  }

}
