import { doc } from 'firebase/firestore';
import { Component, OnInit } from '@angular/core'
import { Auth, user } from '@angular/fire/auth'
import { Firestore, docData } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { ActionSheetController } from '@ionic/angular'
import { AuthService } from 'src/app/services/auth.service'
import { collection, query, where } from "firebase/firestore";
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  result: string | undefined
  nivel: any
  userprofile: any = {}
  colocados:any = [];
  imagePerfil: any

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private authService: AuthService,
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {
      this.authService.listUsers().subscribe(data => {
        this.colocados = data;
      });
  }

  ngOnInit() {

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
          handler: () => {
            this.router.navigateByUrl('/ranking')
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
    await this.authService.logout()
    this.router.navigateByUrl('login', { replaceUrl: true })
  }
}
