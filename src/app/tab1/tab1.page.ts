import { AuthService } from './../services/auth.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ActionSheetController } from '@ionic/angular'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  result: string | undefined
  nivel: any
  userprofile: any = {}

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.tocar();
    this.authService.getUserProfile().subscribe((data) => {
      this.userprofile = data
      this.nivel = this.userprofile.nivel
    })
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
          handler:() => {
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

  tocar() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/Lobby.mp3',
    )
    audioAbertura.volume = 0.2
    audioAbertura.play()
  }
}
