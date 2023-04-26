import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nova-carta',
  templateUrl: './nova-carta.page.html',
  styleUrls: ['./nova-carta.page.scss'],
})
export class NovaCartaPage implements OnInit {
  romaji = ['A', // romaji[0]
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
  'PO' // romaji[70]
  ]

  hiragana = ['あ', // hiragana[0]
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
    'ぽ' // hriagana[70]
  ]

  audios = ['../../../assets/audio/a.mp3', // audios[0]
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
    '../../../assets/audio/po.mp3' // audios[70]
  ]

  userprofile: any = {};
  subirNivel: any;

  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.actRouter.params.subscribe((d) => {
      this.subirNivel = d['subirNivel'];
    })
    this.authService.getUserProfile().subscribe((data) => {
      this.userprofile = data;
    })
    setTimeout(() => {
      const a = new Audio(this.audios[this.subirNivel]);
      a.play();
    }, 400); 
  }

  comecar() {
    this.router.navigateByUrl('/carta/'+this.subirNivel);
  }

  ouvir() {
    const a = new Audio(this.audios[this.subirNivel]);
    a.play();
  }

}
