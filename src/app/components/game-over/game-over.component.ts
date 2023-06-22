import { Component } from '@angular/core';
import { gifs } from './gifs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent {

  gameOverGif:string = '';
  score: number = 0;

  constructor(private route: ActivatedRoute){
    this.getRandomGif();
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.score = params['score'];
    });
  }

  getRandomGif(){
    const gifIndex = Math.floor(Math.random() * gifs.length);
    this.gameOverGif = gifs[gifIndex];
  }
}
