import { AuthService } from './../../services/auth.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-hiragana',
  templateUrl: './hiragana.page.html',
  styleUrls: ['./hiragana.page.scss'],
})
export class HiraganaPage implements OnInit {
  profile: any = {}
  profileAuth: any = {}
  nivel: any
  userNivel: any
  niveis = [
    'block', // tutorial - a
    'block',
    'none',
    'none',
    'none',
    'none', // ka
    'none',
    'none',
    'none',
    'none',
    'none', // sa 10
    'none',
    'none',
    'none',
    'none',
    'none', // ta
    'none',
    'none',
    'none',
    'none',
    'none', // na 20
    'none',
    'none',
    'none',
    'none',
    'none', // ha
    'none',
    'none',
    'none',
    'none',
    'none', // ma 30
    'none',
    'none',
    'none',
    'none',
    'none', // ya
    'none', // yu
    'none', // yo
    'none', // ra
    'none',
    'none', //40
    'none',
    'none',
    'none', // wa
    'none', // wo
    'none', // n
    'none', // ga
    'none',
    'none',
    'none',
    'none',
    'none', // za 50
    'none',
    'none',
    'none',
    'none',
    'none', // da
    'none',
    'none',
    'none',
    'none',
    'none', // ba 60
    'none',
    'none',
    'none',
    'none',
    'none', // pa
    'none',
    'none',
    'none',
    'none',
  ]

  n0 = 'block'
  n1 = 'block'
  n2 = 'none'
  n3 = 'none'
  n4 = 'none'
  n5 = 'none'
  n6 = 'none'
  n7 = 'none'
  n8 = 'none'
  n9 = 'none'
  n10 = 'none'
  n11 = 'none'
  n12 = 'none'
  n13 = 'none'
  n14 = 'none'
  n15 = 'none'
  n16 = 'none'
  n17 = 'none'
  n18 = 'none'
  n19 = 'none'
  n20 = 'none'
  n21 = 'none'
  n22 = 'none'
  n23 = 'none'
  n24 = 'none'
  n25 = 'none'
  n26 = 'none'
  n27 = 'none'
  n28 = 'none'
  n29 = 'none'
  n30 = 'none'
  n31 = 'none'
  n32 = 'none'
  n33 = 'none'
  n34 = 'none'
  n35 = 'none'
  n36 = 'none'
  n37 = 'none'
  n38 = 'none'
  n39 = 'none'
  n40 = 'none'
  n41 = 'none'
  n42 = 'none'
  n43 = 'none'
  n44 = 'none'
  n45 = 'none'
  n46 = 'none'
  n47 = 'none'
  n48 = 'none'
  n49 = 'none'
  n50 = 'none'
  n51 = 'none'
  n52 = 'none'
  n53 = 'none'
  n54 = 'none'
  n55 = 'none'
  n56 = 'none'
  n57 = 'none'
  n58 = 'none'
  n59 = 'none'
  n60 = 'none'
  n61 = 'none'
  n62 = 'none'
  n63 = 'none'
  n64 = 'none'
  n65 = 'none'
  n66 = 'none'
  n67 = 'none'
  n68 = 'none'
  n69 = 'none'
  n70 = 'none'

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe((data) => {
      this.profile = data
      this.nivel = this.profile.nivel
    })
    this.aparecerNiveis()
  }



  jogar(n: string) {
    this.botao()
    this.router.navigateByUrl('/nova-carta/' + n)
  }

  async aparecerNiveis() {
    this.authService.getUserProfile().subscribe((data) => {
      this.profile = data
      this.userNivel = this.profile.nivel
      for (let i = 0; i <= this.userNivel; i++) {
        this.niveis[i] = 'block'
      }
      this.n2 = this.niveis[2] // U
      this.n3 = this.niveis[3] // E
      this.n4 = this.niveis[4] // O
      this.n5 = this.niveis[5] // ka
      this.n6 = this.niveis[6] // ki
      this.n7 = this.niveis[7] // ku
      this.n8 = this.niveis[8] // ke
      this.n9 = this.niveis[9] // ko
      this.n10 = this.niveis[10] // sa
      this.n11 = this.niveis[11]
      this.n12 = this.niveis[12]
      this.n13 = this.niveis[13]
      this.n14 = this.niveis[14]
      this.n15 = this.niveis[15] // ta
      this.n16 = this.niveis[16]
      this.n17 = this.niveis[17]
      this.n18 = this.niveis[18]
      this.n19 = this.niveis[19]
      this.n20 = this.niveis[20] // na
      this.n21 = this.niveis[21]
      this.n22 = this.niveis[22]
      this.n23 = this.niveis[23]
      this.n24 = this.niveis[24]
      this.n25 = this.niveis[25] // ha
      this.n26 = this.niveis[26]
      this.n27 = this.niveis[27]
      this.n28 = this.niveis[28]
      this.n29 = this.niveis[29]
      this.n30 = this.niveis[30] // ma
      this.n31 = this.niveis[31]
      this.n32 = this.niveis[32]
      this.n33 = this.niveis[33]
      this.n34 = this.niveis[34]
      this.n35 = this.niveis[35] // ya
      this.n36 = this.niveis[36] // yu
      this.n37 = this.niveis[37] // yo
      this.n38 = this.niveis[38] // ra
      this.n39 = this.niveis[39]
      this.n40 = this.niveis[40]
      this.n41 = this.niveis[41]
      this.n42 = this.niveis[42]
      this.n43 = this.niveis[43] // wa
      this.n44 = this.niveis[44] // wo
      this.n45 = this.niveis[45] // n
      this.n46 = this.niveis[46] // ga
      this.n47 = this.niveis[47]
      this.n48 = this.niveis[48]
      this.n49 = this.niveis[49]
      this.n50 = this.niveis[50]
      this.n51 = this.niveis[51] // za
      this.n52 = this.niveis[52]
      this.n53 = this.niveis[53]
      this.n54 = this.niveis[54]
      this.n55 = this.niveis[55]
      this.n56 = this.niveis[56] // da
      this.n57 = this.niveis[57]
      this.n58 = this.niveis[58]
      this.n59 = this.niveis[59]
      this.n60 = this.niveis[60]
      this.n61 = this.niveis[61] // ba
      this.n62 = this.niveis[62]
      this.n63 = this.niveis[63]
      this.n64 = this.niveis[64]
      this.n65 = this.niveis[65]
      this.n66 = this.niveis[66] // pa
      this.n67 = this.niveis[67]
      this.n68 = this.niveis[68]
      this.n69 = this.niveis[69]
      this.n70 = this.niveis[70]
    })
  }

  botao() {
    const audioAbertura = new Audio(
      '../../../assets/audio/somDeFundo/botao-katana.mp3',
    )
    audioAbertura.play()
  }

}
