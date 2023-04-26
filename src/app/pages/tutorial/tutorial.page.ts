import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      const a = new Audio('../../../assets/audio/a.mp3');
      a.play();  
    }, 400); 
  }

}
