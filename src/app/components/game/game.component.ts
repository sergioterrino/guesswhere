import { Router, RouterLink } from '@angular/router';
import { Place, places } from './places';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  places: Place[];
  currentImage: string = '';
  nameCurrentImage: string = '';
  theOtherName: string = '';
  option1: string = '';
  option2: string = '';
  score: number = 0;
  highScore: number = 0;
  //chronometer properties
  circleStyle = { background: `conic-gradient(transparent 0deg, green 360deg)` };
  progressValue: number = 10;
  progressEndValue: number = 0;
  interval: any;

  constructor(private router: Router) {
    this.places = places;
    this.nextImage();
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      this.highScore = parseInt(savedHighScore);
    }
  }

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    this.stopTimer();
    this.nextImage();
    this.setOptions();
    this.startTimer();
    this.setUpButtonListeners();
  }

  nextImage() {
    const randomCountry = this.getRandomPlace();
    this.currentImage = randomCountry.imageUrl;
    this.nameCurrentImage = randomCountry.name;
  }

  //elije al azar una img del array countries y la devuelve
  getRandomPlace(): Place {
    const randomIndex = Math.floor(Math.random() * this.places.length);
    return this.places[randomIndex];
  }

  setOptions(){
    //firstly I want to set the place for the name of the photo, random
    //I set or 1 or 2. And this will be the position of the name of the currentImage
    const randomPosition = Math.floor(Math.random() * 2) + 1;
    console.log(randomPosition);

    //Now I must choose the second name, random, but it must different to first name
    this.theOtherName = this.getRandomPlace().name;
    while (this.theOtherName === this.nameCurrentImage ) {
      this.theOtherName = this.getRandomPlace().name;
    }

    switch (randomPosition){
      case 1:
        this.option1 = this.nameCurrentImage;
        this.option2 = this.theOtherName;
        break;
      case 2:
        this.option2 = this.nameCurrentImage;
        this.option1 = this.theOtherName;
        break;
    }
  }

  startTimer() {
    this.circleStyle = { background: `conic-gradient(transparent 0deg, green 360deg)` };
    this.progressValue = 10;
    this.progressEndValue = 0;
    let circulo = 0;
    const speed = 1000;

    this.interval = setInterval(() => {
      this.progressValue--;
      circulo++;
      this.circleStyle = { background: `conic-gradient(transparent ${circulo * 36}deg, green ${circulo * 36}deg)`};
      if (this.progressValue === this.progressEndValue) {
        this.stopTimer();
        this.gameOver();
      }
    }, speed);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  checkAnswerL() {
    if ( this.option1 === this.nameCurrentImage ) {
      this.score++;
      this.initializeGame();
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
    } else {
      this.gameOver();
    }
  }

  checkAnswerR() {
    if ( this.option2 === this.nameCurrentImage ) {
      this.score++;
      this.initializeGame();
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
    } else {
      this.gameOver();
    }
  }

  // Guardar el high score en un almacenamiento persistente, como localStorage. Lo recojemos en constructor
  //en el routing paso el score para recogerlo en game-over
  gameOver() {
    this.router.navigate(['/game-over'], { queryParams: { score: this.score } });
    localStorage.setItem('highScore', this.highScore.toString());
  }


  //funcion para aumentar el brillo de los botones cuando pasan el mouse sobre ellos
  setUpButtonListeners() {
    let btnL = document.getElementById("btnL") as HTMLElement;
    let btnR = document.getElementById("btnR") as HTMLElement;
    let option1 = document.getElementById("option1") as HTMLElement;
    let option2 = document.getElementById("option2") as HTMLElement;

    // Agrega un event listener al botón L para detectar cuando el cursor está sobre él
    btnL.addEventListener("mouseenter", () => {
      // Aplica estilos al botón R
      btnR.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      option1.style.color = "red";
    });

    // Agrega un event listener al botón L para detectar cuando el cursor sale de él
    btnL.addEventListener("mouseleave", () => {
      // Restablece los estilos del botón R
      btnR.style.backgroundColor = "";
      option1.style.color = "";
    });

    // Agrega un event listener al botón R para detectar cuando el cursor está sobre él
    btnR.addEventListener("mouseenter", () => {
      // Aplica estilos al botón L
      btnL.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      option2.style.color = "red";
    });

    // Agrega un event listener al botón R para detectar cuando el cursor sale de él
    btnR.addEventListener("mouseleave", () => {
      // Restablece los estilos del botón L
      btnL.style.backgroundColor = "";
      option2.style.color = "";
    });
  }
}
