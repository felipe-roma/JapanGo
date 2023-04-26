import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-carta-tutorial',
  templateUrl: './carta-tutorial.page.html',
  styleUrls: ['./carta-tutorial.page.scss'],
})
export class CartaTutorialPage implements OnInit {
  @ViewChild('popover') popover: any;
  isOpen = false;

  hiragana = ['あ']
  romaji = ['A']
  resposta = ''
  front = ''
  back = ''
  random = this.sortear()
  p: number
  // -----------------------------------------------------------------------
  nivel: number = 0;
  // -----------------------------------------------------------------------
  modificar = 1
  display1 = 'block'
  display2 = 'none'

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router,
  ) {
    this.front = this.hiragana[this.random]
    this.back = this.romaji[this.random]
    this.p = 0
    this.modificar = 1
  }

  ngOnInit() {    
    this.presentPopover();
  }

  presentPopover() {
    this.isOpen = true;
  }

  progredir(v: number) {
    this.p += v
    if (this.p == 90) {
      setTimeout(() => {
        this.concluir()
        this.p = 0
      }, 1500)
    } else if (this.p <= 0) {
      this.p = 0
    }
  }

  responder(r: string, id: string) {
    this.btn()
    const e = document.querySelector(`#${id}`)
    e?.classList.add('animate__animated', 'animate__zoomOut', 'animate__fast')
    this.resposta = this.romaji[this.hiragana.indexOf(r)]
    setTimeout(() => {
      this.verificar(r)
      this.virar()
      setTimeout(() => {
        this.resposta = ''
        this.desvirar()
        this.random = this.sortear()
        e?.classList.remove('animate__animated', 'animate__zoomOut', 'animate__faster')
        setTimeout(() => {
          this.front = this.hiragana[this.random]
          this.back = this.romaji[this.random]
        }, 240)
      }, 1500)
    }, 600)
    this.tocar();
  }

  verificar(r: string) {
    if (r == this.front) {
      setTimeout(() => {
        this.presentToast('Correto!', 'success')
      }, 200)
      setTimeout(() => {
        this.progredir(30)
      }, 1200);
    }
  }

  sortear() {
    return Math.floor(Math.random() * 1)
  }

  virar() {
    var checkbox = document.querySelector('#flip')
    function ativarCheckbox(el: any) {
      el.checked = true
    }
    ativarCheckbox(checkbox)
  }

  desvirar() {
    var checkbox = document.querySelector('#flip')
    function desativarCheckbox(el: any) {
      el.checked = false
    }
    desativarCheckbox(checkbox)
  }

  async concluir() {
    this.nivel++;
    const alert = await this.alertController.create({
      header: 'TUTORIAL CONCLUÍDO',
      message: 'A cada nível você irá desbloquear um novo ideograma',
      buttons: ['OK']
    })
    this.router.navigateByUrl('/hiragana')
    alert.classList.add('animate__animated', 'animate__heartBeat')
    await alert.present()
  }

  async presentToast(m: string, c: string) {
    const toast = await this.toastController.create({
      message: m,
      duration: 500,
      position: 'middle',
      color: c,
    })

    await toast.present()
  }

  tocar() {
    const a = new Audio('../../../assets/audio/a.mp3');
    setTimeout(() => {
      a.play();
    }, 500);
  }

  botao() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/botao-katana.mp3',
    )
    audioAbertura.play()
  }

  btn() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/click.wav',
    )
    audioAbertura.play()
  }
}
