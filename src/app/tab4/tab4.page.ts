import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  nivelFoto = ['./../../assets/img/nivel1.png','./../../assets/img/nivel20.png','./../../assets/img/nivel46.png','./../../assets/img/nivelFinal.png']
  result: string | undefined
  nivel: any
  email: any
  name: any
  userprofile: any = {}
  image: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe((data) => {
      this.userprofile = data
      this.nivel = this.userprofile.nivel
      this.name = this.userprofile.name
      this.email = this.userprofile.email
      this.alterarImagem()
    })
  }

  async profileModal() {
    console.log('showModal()');
    const modal = await this.modalCtrl.create({
      component: ModalPagePage
     });

     await modal.present();
  }

  async profile() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.userprofile.email,
      buttons: [
        {
          text: 'Ranking Geral',
          data: {
            action: 'cancel',
          },
        },
        {
          text: 'Sair',
          role: '',
          handler: () => {
            this.logout()
          },
        },
      ],
    })

    await actionSheet.present()

    const result = await actionSheet.onDidDismiss()
    this.result = JSON.stringify(result, null, 2)
  }

  async logout() {
    this.botao()
    await this.authService.logout()
    this.router.navigateByUrl('login', { replaceUrl: true })
  }

  alterarImagem() {
    const foto = document.getElementById("foto")
    if (this.nivel > 19 && this.nivel < 46) {
      foto?.setAttribute("src", "./../../assets/img/nivel20.png")
    } else if (this.nivel > 45 && this.nivel < 71) {
      foto?.setAttribute("src", "./../../assets/img/nivel46.png")
    } else if (this.nivel > 70 ) {
      foto?.setAttribute("src", "./../../assets/img/nivelFinal.png")
    }
  }

  ouvir() {
    if (this.nivel > 70) {
      const a = new Audio('../../../assets/audio/yamete_kudasai.mp3');
      a.play();
    }
  }

  botao() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/botao-katana.mp3',
    )
    audioAbertura.play()
  }

  async takePicture() {
    try {
      if(Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 90,
        //allowEditing: false,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.DataUrl
      });
      console.log('iamge', image);
      this.image = image.dataUrl
    } catch(e) {
      console.log(e)
    }
  }
}
