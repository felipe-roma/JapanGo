import { doc, setDoc } from 'firebase/firestore'
import { Firestore } from '@angular/fire/firestore'
import { AuthService } from './../../services/auth.service'
import { getAuth } from '@angular/fire/auth'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AlertController, ToastController } from '@ionic/angular'

@Component({
  selector: 'app-carta',
  templateUrl: './carta.page.html',
  styleUrls: ['./carta.page.scss'],
})
export class CartaPage implements OnInit {
  romaji = [
    'A', // romaji[0]
    'I',
    'U',
    'E',
    'O',
    'KA', // romaji[5]
    'KI',
    'KU',
    'KE',
    'KO',
    'SA', // romaji[10]
    'SHI',
    'SU',
    'SE',
    'SO',
    'TA', // romaji[15]
    'CHI',
    'TSU',
    'TE',
    'TO',
    'NA', // romaji[20]
    'NI',
    'NU',
    'NE',
    'NO',
    'HA', // romaji[25]
    'HI',
    'FU',
    'HE',
    'HO',
    'MA', // romaji[30]
    'MI',
    'MU',
    'ME',
    'MO',
    'YA', // romaji[35]
    'YU',
    'YO',
    'RA',
    'RI',
    'RU', // romaji[40]
    'RE',
    'RO',
    'WA',
    'O',
    'N', // romaji[45]
    'GA',
    'GI',
    'GU',
    'GE',
    'GO', // romaji[50]
    'ZA',
    'JI',
    'ZU',
    'ZE',
    'ZO', // romaji[55]
    'DA',
    'JI',
    'ZU',
    'DE',
    'DO', // romaji[60]
    'BA',
    'BI',
    'BU',
    'BE',
    'BO', // romaji[65]
    'PA',
    'PI',
    'PU',
    'PE',
    'PO', // romaji[70]
  ]

  hiragana = [
    'あ', // hiragana[0]
    'い',
    'う',
    'え',
    'お',
    'か', // hiragana[5]
    'き',
    'く',
    'け',
    'こ',
    'さ', // hiragana[10]
    'し',
    'す',
    'せ',
    'そ',
    'た', // hiragana[15]
    'ち',
    'つ',
    'て',
    'と',
    'な', // hiragana[20]
    'に',
    'ぬ',
    'ね',
    'の',
    'は', // hiragana[25]
    'ひ',
    'ふ',
    'へ',
    'ほ',
    'ま', // hiragana[30]
    'み',
    'む',
    'め',
    'も',
    'や', // hiragana[35]
    'ゆ',
    'よ',
    'ら',
    'り',
    'る', // hiragana[40]
    'れ',
    'ろ',
    'わ',
    'を',
    'ん', // hiragana[45]
    'が',
    'ぎ',
    'ぐ',
    'げ',
    'ご', // hiragana[50]
    'ざ',
    'じ',
    'ず',
    'ぜ',
    'ぞ', // hiragana[55]
    'だ',
    'ぢ',
    'づ',
    'で',
    'ど', // hiragana[60]
    'ば',
    'び',
    'ぶ',
    'べ',
    'ぼ', // hiragana[65]
    'ぱ',
    'ぴ',
    'ぷ',
    'ぺ',
    'ぽ', // hriagana[70]
  ]

  audios = [
    '../../../assets/audio/a.mp3', // audios[0]
    '../../../assets/audio/i.mp3',
    '../../../assets/audio/u.mp3',
    '../../../assets/audio/e.mp3',
    '../../../assets/audio/o.mp3',
    '../../../assets/audio/ka.mp3', // audios[5]
    '../../../assets/audio/ki.mp3',
    '../../../assets/audio/ku.mp3',
    '../../../assets/audio/ke.mp3',
    '../../../assets/audio/ko.mp3',
    '../../../assets/audio/sa.mp3', // audios[10]
    '../../../assets/audio/shi.mp3',
    '../../../assets/audio/su.mp3',
    '../../../assets/audio/se.mp3',
    '../../../assets/audio/so.mp3',
    '../../../assets/audio/ta.mp3', // audios[15]
    '../../../assets/audio/chi.mp3',
    '../../../assets/audio/tsu.mp3',
    '../../../assets/audio/te.mp3',
    '../../../assets/audio/to.mp3',
    '../../../assets/audio/na.mp3', // audios[20]
    '../../../assets/audio/ni.mp3',
    '../../../assets/audio/nu.mp3',
    '../../../assets/audio/ne.mp3',
    '../../../assets/audio/no.mp3',
    '../../../assets/audio/ha.mp3', // audios[25]
    '../../../assets/audio/hi.mp3',
    '../../../assets/audio/fu.mp3',
    '../../../assets/audio/he.mp3',
    '../../../assets/audio/ho.mp3',
    '../../../assets/audio/ma.mp3', // audios[30]
    '../../../assets/audio/mi.mp3',
    '../../../assets/audio/mu.mp3',
    '../../../assets/audio/me.mp3',
    '../../../assets/audio/mo.mp3',
    '../../../assets/audio/ya.mp3', // audios[35]
    '../../../assets/audio/yu.mp3',
    '../../../assets/audio/yo.mp3',
    '../../../assets/audio/ra.mp3',
    '../../../assets/audio/ri.mp3',
    '../../../assets/audio/ru.mp3', // audios[40]
    '../../../assets/audio/re.mp3',
    '../../../assets/audio/ro.mp3',
    '../../../assets/audio/wa.mp3',
    '../../../assets/audio/o.mp3', // "WO" se pronuncia "O"
    '../../../assets/audio/n.mp3', // audios[45]
    '../../../assets/audio/ga.mp3',
    '../../../assets/audio/gi.mp3',
    '../../../assets/audio/gu.mp3',
    '../../../assets/audio/ge.mp3',
    '../../../assets/audio/go.mp3', // audios[50]
    '../../../assets/audio/za.mp3',
    '../../../assets/audio/ji.mp3',
    '../../../assets/audio/zu.mp3',
    '../../../assets/audio/ze.mp3',
    '../../../assets/audio/zo.mp3', // audios[55]
    '../../../assets/audio/da.mp3',
    '../../../assets/audio/ji.mp3',
    '../../../assets/audio/zu.mp3',
    '../../../assets/audio/de.mp3',
    '../../../assets/audio/do.mp3', // audios[60]
    '../../../assets/audio/ba.mp3',
    '../../../assets/audio/bi.mp3',
    '../../../assets/audio/bu.mp3',
    '../../../assets/audio/be.mp3',
    '../../../assets/audio/bo.mp3', // audios[65]
    '../../../assets/audio/pa.mp3',
    '../../../assets/audio/pi.mp3',
    '../../../assets/audio/pu.mp3',
    '../../../assets/audio/pe.mp3',
    '../../../assets/audio/po.mp3', // audios[70]
  ]

  botoes = [
    'block', // botoes[0]
    'block',
    'none',
    'none',
    'none',
    'none', // botoes[5]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[10]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[15]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[20]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[25]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[30]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[35]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[40]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[45]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[50]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[55]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[60]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[65]
    'none',
    'none',
    'none',
    'none',
    'none', // botoes[70]
  ]

  b0 = 'block' // a - tutorial
  b1 = 'block' // i - nivel 1
  b2 = 'none'
  b3 = 'none'
  b4 = 'none'
  b5 = 'none' // ka
  b6 = 'none'
  b7 = 'none'
  b8 = 'none'
  b9 = 'none'
  b10 = 'none' // sa
  b11 = 'none'
  b12 = 'none'
  b13 = 'none'
  b14 = 'none'
  b15 = 'none' // ta
  b16 = 'none'
  b17 = 'none'
  b18 = 'none'
  b19 = 'none'
  b20 = 'none' // na
  b21 = 'none'
  b22 = 'none'
  b23 = 'none'
  b24 = 'none'
  b25 = 'none' // ha
  b26 = 'none'
  b27 = 'none'
  b28 = 'none'
  b29 = 'none'
  b30 = 'none' // ma
  b31 = 'none'
  b32 = 'none'
  b33 = 'none'
  b34 = 'none'
  b35 = 'none' // ya
  b36 = 'none' // yu
  b37 = 'none' // yo
  b38 = 'none' // ra
  b39 = 'none'
  b40 = 'none'
  b41 = 'none'
  b42 = 'none'
  b43 = 'none' // wa
  b44 = 'none' // wo
  b45 = 'none' // n
  b46 = 'none' // ga
  b47 = 'none'
  b48 = 'none'
  b49 = 'none'
  b50 = 'none'
  b51 = 'none' // za
  b52 = 'none'
  b53 = 'none'
  b54 = 'none'
  b55 = 'none'
  b56 = 'none' // da
  b57 = 'none'
  b58 = 'none'
  b59 = 'none'
  b60 = 'none'
  b61 = 'none' // ba
  b62 = 'none'
  b63 = 'none'
  b64 = 'none'
  b65 = 'none'
  b66 = 'none' // pa
  b67 = 'none'
  b68 = 'none'
  b69 = 'none'
  b70 = 'none'

  bt36 = 'none'
  bt37 = 'none'
  bt44 = 'none'
  bt70 = 'none'

  resposta = ''
  front = ''
  back = ''
  random: number = 0
  p: number
  modificar = 1
  display1 = 'block'
  display2 = 'none'

  profile: any = {}
  profileAuth: any = {}
  userNivel: any
  subirNivel: any

  contador = 0

  constructor(
    private alertController: AlertController,
    private router: Router,
    private actRouter: ActivatedRoute,
    private authService: AuthService,
    private firestore: Firestore,
  ) {
    this.actRouter.params.subscribe((n) => {
      this.subirNivel = parseInt(n['subirNivel'])
      this.random = this.sortear(this.subirNivel)
      this.front = this.hiragana[this.random]
      this.back = this.romaji[this.random]
    })
    this.p = 0
    this.modificar = 1
  }

  ngOnInit() {
    this.actRouter.params.subscribe((n) => {
      this.subirNivel = parseInt(n['subirNivel'])
    })
    this.authService.getUserProfile().subscribe((data) => {
      this.profile = data
      this.userNivel = this.profile.nivel
    })
    this.aparecerBotoes()
  }

  sortear(r: number) {
    return Math.floor(Math.random() * (r + 1))
  }

  progredir(v: number) {
    this.p += v
    if (this.p >= 100) {
      setTimeout(() => {
        this.concluir()
        this.p = 0
      }, 1500)
    } else if (this.p <= 0) {
      this.p = 0
    }
  }

  responder(r: string, id: string) {
    var teclado = document.querySelector('.tampar')
    teclado?.classList.add('bloqueioDeClick3')
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
        teclado?.classList.remove('bloqueioDeClick3')
        this.contador++
        if (this.contador == 4) {
          this.random = this.subirNivel
          this.contador = 0
        } else {
          this.random = this.sortear(this.subirNivel)
        }
        e?.classList.remove(
          'animate__animated',
          'animate__zoomOut',
          'animate__faster',
        )
        setTimeout(() => {
          this.front = this.hiragana[this.random]
          this.back = this.romaji[this.random]
        }, 240)
      }, 1500)
    }, 600)
    this.tocar()
  }

  verificar(r: string) {
    let v = this.hiragana.indexOf(this.front)
    let el = document.getElementById('monitor')

    if (r == this.front) {
      if (v == this.userNivel) {
        if (this.subirNivel < 10) {
          this.progredir(30)
        } else if (this.subirNivel < 20) {
          this.progredir(20)
        } else {
          this.progredir(10)
        }
      } else {
        if (this.subirNivel < 10) {
          this.progredir(10)
        } else if (this.subirNivel < 20) {
          this.progredir(5)
        } else {
          this.progredir(3)
        }
      }
      setTimeout(() => {
        el?.classList.add('monitorVerde')
        setTimeout(() => {
          el?.classList.remove('monitorVerde')
        }, 1000)
      }, 200)
    } else {
      if (this.subirNivel < 10) {
      } else if (this.subirNivel < 20) {
        this.progredir(-2)
      } else {
        this.progredir(-5)
      }
      setTimeout(() => {
        el?.classList.add('monitorVermelho')
        setTimeout(() => {
          el?.classList.remove('monitorVermelho')
        }, 1000)
      }, 200)
    }
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
    this.modificar = 0
    this.trocarTeclado()
  }

  async concluir() {
    this.updateNivel()
    const alert = await this.alertController.create({
      header: 'MUITO BEM!',
      subHeader: `Nível concluído`,
      buttons: ['OK'],
    })
    // alert.classList.add('animate__animated', 'animate__heartBeat')
    await alert.present()
    if (this.userNivel == 44 || this.userNivel == 46) {
      this.router.navigateByUrl('/tabela-hiragana', { replaceUrl: true })
    } else {
      this.router.navigateByUrl('/hiragana', { replaceUrl: true })
    }
  }

  trocarTeclado() {
    if (this.modificar == 1) {
      this.display1 = 'none'
      this.display2 = 'block'
      this.modificar = 0
    } else {
      this.display1 = 'block'
      this.display2 = 'none'
      this.modificar = 1
    }
  }

  tocar() {
    const a = new Audio(`${this.audios[this.random]}`)
    setTimeout(() => {
      a.play()
    }, 500)
  }

  async aparecerBotoes() {
    this.authService.getUserProfile().subscribe((data) => {
      this.profile = data
      this.userNivel = this.profile.nivel
      for (let i = 0; i <= this.userNivel; i++) {
        this.botoes[i] = 'block'
      }
      this.b0 = this.botoes[0] // A
      this.b1 = this.botoes[1] // I
      this.b2 = this.botoes[2] // U
      this.b3 = this.botoes[3] // E
      this.b4 = this.botoes[4] // O
      this.b5 = this.botoes[5] // ka
      this.b6 = this.botoes[6]
      this.b7 = this.botoes[7]
      this.b8 = this.botoes[8]
      this.b9 = this.botoes[9]
      this.b10 = this.botoes[10] // sa
      this.b11 = this.botoes[11]
      this.b12 = this.botoes[12]
      this.b13 = this.botoes[13]
      this.b14 = this.botoes[14]
      this.b15 = this.botoes[15] // ta
      this.b16 = this.botoes[16]
      this.b17 = this.botoes[17]
      this.b18 = this.botoes[18]
      this.b19 = this.botoes[19]
      this.b20 = this.botoes[20] // na
      this.b21 = this.botoes[21]
      this.b22 = this.botoes[22]
      this.b23 = this.botoes[23]
      this.b24 = this.botoes[24]
      this.b25 = this.botoes[25] // ha
      this.b26 = this.botoes[26]
      this.b27 = this.botoes[27]
      this.b28 = this.botoes[28]
      this.b29 = this.botoes[29]
      this.b30 = this.botoes[30] // ma
      this.b31 = this.botoes[31]
      this.b32 = this.botoes[32]
      this.b33 = this.botoes[33]
      this.b34 = this.botoes[34]
      this.b35 = this.botoes[35] // ya
      this.b36 = this.botoes[36] // yu
      this.b37 = this.botoes[37] // yo
      this.b38 = this.botoes[38] //ra
      this.b39 = this.botoes[39]
      this.b40 = this.botoes[40]
      this.b41 = this.botoes[41]
      this.b42 = this.botoes[42]
      this.b43 = this.botoes[43] // wa
      this.b44 = this.botoes[44] // wo
      this.b45 = this.botoes[45] // n
      this.b46 = this.botoes[46] // ga
      this.b47 = this.botoes[47]
      this.b48 = this.botoes[48]
      this.b49 = this.botoes[49]
      this.b50 = this.botoes[50]
      this.b51 = this.botoes[51] // za
      this.b52 = this.botoes[52]
      this.b53 = this.botoes[53]
      this.b54 = this.botoes[54]
      this.b55 = this.botoes[55]
      this.b56 = this.botoes[56] // da
      this.b57 = this.botoes[57]
      this.b58 = this.botoes[58]
      this.b59 = this.botoes[59]
      this.b60 = this.botoes[60]
      this.b61 = this.botoes[61] // ba
      this.b62 = this.botoes[62]
      this.b63 = this.botoes[63]
      this.b64 = this.botoes[64]
      this.b65 = this.botoes[65]
      this.b66 = this.botoes[66] // pa
      this.b67 = this.botoes[67]
      this.b68 = this.botoes[68]
      this.b69 = this.botoes[69]
      this.b70 = this.botoes[70]

      if (this.userNivel == 36) {
        // botões desativados
        this.bt36 = 'block'
      } else if (this.userNivel >= 37 && this.userNivel <= 43) {
        this.bt36 = 'block'
        this.bt37 = 'block'
      } else if (this.userNivel >= 44) {
        this.bt36 = 'block'
        this.bt37 = 'block'
        this.bt44 = 'block'
      } else if (this.userNivel == 70) {
        this.bt36 = 'block'
        this.bt37 = 'block'
        this.bt44 = 'block'
        this.bt70 = 'block'
      }
    })
  }

  //  --------- Metodo de Update de Nivel ------------ //

  async updateNivel() {
    const auth = getAuth()
    const user = auth.currentUser

    this.userNivel = this.profile.nivel
    this.profileAuth = user

    try {
      var nivel = +this.userNivel
      if (this.subirNivel == this.userNivel) {
        nivel = nivel + 1
        if (nivel == 46) {
          const melodia = new Audio(
            '../../../assets/audio/somDeFundo/Gojuon_melody.mp3',
          )
          melodia.play()
        }
        const email = this.profile.email
        const name = this.profile.name
        const imagePerfil = this.profile.imagePerfil

        const userDocRef = doc(this.firestore, `users/${this.profileAuth.uid}`)
        await setDoc(userDocRef, {
          nivel,
          email,
          name,
          imagePerfil
        })
      }
    } catch (error) {
      console.log('Erro', 'Erro na atualizacao no nivel')
    }
  }

  botao() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/botao-katana.mp3',
    )
    audioAbertura.play()
    audioAbertura.volume = 0.02;
  }

  btn() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/click.wav',
    )
    audioAbertura.play()
  }

  // https://www.pacdv.com/sounds/
}
