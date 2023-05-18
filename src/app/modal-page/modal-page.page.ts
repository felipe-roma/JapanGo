import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { getAuth } from '@angular/fire/auth';
import { type } from 'os';
import { log } from 'console';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  name: any;
  email: any;
  senha: any;
  userprofile: any = {}

  profile: any = {}
  profileAuth: any = {}
  userNivel: any

  image: any;
  imagePerfil: any;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firestore: Firestore
    ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe((data) => {
      this.userprofile = data
      this.name = this.userprofile.name
      this.email = this.userprofile.email
      this.userNivel = this.userprofile.nivel
      this.image = this.userprofile.imagePerfil

    })
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  async confirm() {
    this.botao()

    const auth = getAuth()
    const user = auth.currentUser

    this.userNivel = this.userprofile.nivel
    this.profileAuth = user

    try {
        var nivel = this.userNivel
        const email = this.email
        const name = this.name
        console.log(nivel);
        const imagePerfil = this.image
        const userDocRef = doc(this.firestore, `users/${this.profileAuth.uid}`)
        await setDoc(userDocRef, {
          nivel,
          email,
          name,
          imagePerfil
        })
    } catch (error) {
      console.log('Erro', 'Erro na atualizacao no nivel')
    }
    this.modalCtrl.dismiss();
  }

  async editarFoto() {
    try {
    let foto = await this.authService.takePicture();
      if(foto) {
        this.image = foto
        console.log(foto);
      }
    } catch(e){

    }
  }

  botao() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/botao-katana.mp3',
    )
    audioAbertura.play()
    audioAbertura.volume = 0.02;
  }

}
