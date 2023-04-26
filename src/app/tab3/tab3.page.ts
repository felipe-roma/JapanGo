import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  result: string | undefined
  nivel: any
  userprofile: any = {}

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
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
