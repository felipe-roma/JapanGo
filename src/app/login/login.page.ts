import { Plugins } from '@capacitor/core/types/global'
import { getAuth, sendPasswordResetEmail } from '@angular/fire/auth'
import { User, onAuthStateChanged } from '@firebase/auth'
import { AuthService } from './../services/auth.service'
import {
  LoadingController,
  ToastController,
  AlertController,
  isPlatform,
  ActionSheetController,
} from '@ionic/angular'
import { Router, ActivatedRoute } from '@angular/router'
import { Component, Input, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms'
// import '@codetrix-studio/capacitor-google-auth';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import firebase from 'firebase/compat/app'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { error } from 'console'
// import { error } from 'console'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userInfo = null
  usu_id: String = ''
  credentials!: FormGroup
  handlerMessage = ''
  public registerUser = false;

  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private toastController: ToastController,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
  ) {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize()
    }
  }

  ngOnInit() {
    this.tocar();
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      nome: ['', [Validators.required]],
    })

  }

  get email() {
    return this.credentials.get('email')
  }

  get password() {
    return this.credentials.get('password')
  }

  // loginWithGoogle() {
  //   this.authService.loginWithGoogle().then((result) => {
  //     console.log(result);
  //   }).catch((error) => {
  //     console.log('Erro')
  //   });
  // }

  async login() {
    const loading = await this.loadingController.create()
    await loading.present()

    const user = await this.authService.login(this.credentials.value)
    await loading.dismiss()

    if (user) {
      // console.log(user.user.uid);
      // this.notes.push =user.user.uid, user.user.uid;
      // console.log(this.notes);

      //Criação no Banco de Dados

      this.router.navigateByUrl('', { replaceUrl: true })
    } else {
      // console.log(error);
      this.showAlert('Login falhou', 'Tente Novamente')
    }
  }

  // ------- Método de Cadastro de Usuario ------------
  async register() {
    const loading = await this.loadingController.create()
    await loading.present()

    const user = await this.authService.register(this.credentials.value)
    await loading.dismiss()

    if (user) {
      // this.notes.push =user.user.uid, user.user.uid;
      // console.log(this.notes);
      this.router.navigateByUrl('', { replaceUrl: true })
    } else {
      this.showAlert('Registro falhou', 'Tente Novamente')
    }
  }

  async register2() {
        this.registerUser = true;
    // const alert = await this.alertCtrl.create({
    //   header: 'Criar conta',
    //   inputs: [

    //     {
    //       name: 'email',
    //       placeholder: 'E-mail',
    //       type: 'text',
    //     },
    //     {
    //       name: 'password',
    //       placeholder: 'Senha',
    //       type: 'password',
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancelar',
    //       role: 'cancel',
    //     },
    //     {
    //       text: 'Cadastrar',
    //       handler: async () => {
    //         const loading = await this.loadingController.create()
    //         await loading.present()

    //         const user = await this.authService.register(this.credentials.value)
    //         await loading.dismiss()

    //         if (user) {
    //           // this.notes.push =user.user.uid, user.user.uid;
    //           // console.log(this.notes);
    //           this.router.navigateByUrl('', { replaceUrl: true })
    //         } else {
    //           this.showAlert('Registro falhou', 'Tente Novamente')
    //         }
    //       },
    //     },
    //   ],
    // })
    // await alert.present()
  }

  VoltarLogin() {
    this.registerUser = false;
  }

  async showAlert(header: any, message: any) {
    const toast = await this.alertController.create({
      header,
      message,
      buttons: ['ok'],
    })
    await toast.present()
  }

  async mensagem(header: any, message: any) {
    const toast = await this.toastController.create({
      header,
      message,
      duration: 2000,
      buttons: ['ok'],
    })
    await toast.present()
  }

  async mensagemRecuperarSenha(header: any) {
    const toast = await this.toastController.create({
      header,
      duration: 2000,
      buttons: ['ok'],
    })
    await toast.present()
  }
  async mensagemRecuperarSenhaErro(header: any, message: any) {
    const toast = await this.toastController.create({
      header,
      message,
      duration: 2000,
      buttons: ['ok'],
    })
    await toast.present()
  }

  async alertAlterarMensagem() {
    const toast = await this.alertController.create({
      header: 'Digite o Email para ser enviado o link de alteração de senha',
      inputs: [
        {
          name: 'input',
          type: 'email',
          placeholder: 'Email',
        },
      ],
      buttons: [
        {
          text: 'Enviar',
          role: 'submit',
          handler: (alertData) => {
            console.log(alertData.input)
            this.handlerMessage = 'true'
            this.recuperarSenha(this.handlerMessage, alertData.input)
          },
        },
      ],
    })
    await toast.present()
  }

  //Método de Criação de Usuário no Banco de Dados
  async addNote() {
    // handler: (res: any) => {
    //   this.authService.addUser(user: { id: res.user.uid, email: res.user.email, name: aleatorio });
    // }
  }

  tocar() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/Abertura.mp3',
    )
    audioAbertura.play()
  }

  async recuperarSenha(mens: any, email: any) {
    console.log(email)
    console.log(this.handlerMessage)

    if (this.handlerMessage == 'true') {
      const auth = getAuth()
      sendPasswordResetEmail(auth, email)
        .then(() => {
          this.mensagemRecuperarSenha('Email Enviado')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
          switch (errorCode) {
            case 'auth/user-not-found':
              this.mensagemRecuperarSenhaErro(
                'Email Nâo Cadastrado',
                'Tente Novamente',
              )
              break
            case 'auth/invalid-email':
              this.mensagemRecuperarSenhaErro(
                'Email Inválido',
                'Verifique o email digitado',
              )
              break
            case 'auth/missing-email':
              this.mensagemRecuperarSenhaErro(
                'Email Vazio',
                'Preencha o campo email',
              )
              break
          }
        })
    }
  }
}
