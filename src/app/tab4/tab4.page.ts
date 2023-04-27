import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Firestore, collection } from '@angular/fire/firestore';

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
  public uid: any
  imagePerfil: any

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private storage: Storage,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe((data) => {
      this.userprofile = data
      this.uid = this.userprofile.uid;
      console.log(this.uid)
      this.nivel = this.userprofile.nivel
      this.name = this.userprofile.name
      this.email = this.userprofile.email
      this.imagePerfil = this.userprofile.imagePerfil
      console.log(this.imagePerfil)
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

  // async takePicture() {
  //   try {
  //     if(Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       //allowEditing: false,
  //       source: CameraSource.Prompt,
  //       width: 600,
  //       resultType: CameraResultType.DataUrl
  //     });
  //     console.log('iamge', image);
  //     this.image = image.dataUrl
  //     const blob = this.dataURLtoBlob(image.dataUrl);
  //     const url = await this.uploadImage(blob, image)
  //     console.log(url)
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }

  // dataURLtoBlob(dataurl: any) {
  //   var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  //   bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  //   while(n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new Blob([u8arr], {type:mime})
  // }

  // async uploadImage(blob: any, imageData: any) {
  //   try{
  //     const currentDate = Date.now();
  //     const filePath = `imagePerfil/${currentDate}.${imageData.format}`;
  //     const fileRef = ref(this.storage, filePath);
  //     const task = await uploadBytes(fileRef, blob);
  //     console.log('task: ', task);
  //     const url = getDownloadURL(fileRef);
  //     this.imagePerfil = url;
  //     const response = await this.authService.userCreate();
  //     console.log(response)
  //     return url;
  //   } catch(e) {
  //     throw(e);
  //   }
  // }


}
