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
  public mudo = true

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.tocar()
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
    this.botao
    const audio = new Audio('../../../assets/audio/somDeFundo/Lobby.mp3')
    audio.play()
    audio.volume = 0.1
    audio.loop = true
    // if (this.mudo == false) {
    //   this.mudo = !this.mudo
    // } else {     
    //   this.mudo = !this.mudo
    // }
  }

  botao() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/botao-katana.mp3',
    )
    audioAbertura.play()
  }
}
