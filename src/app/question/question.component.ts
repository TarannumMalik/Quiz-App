import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public name: string = "";
  public questionList: any = [];
  public currentquestion: number = 0;
  public points: number = 0;
  public counter = 60;
  correctanswer: number = 0;
  incorrectanswer: number = 0;
  interval$: any;
  progress: string = "0";
  isquizcompleted:boolean=false

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestion();
    this.startcounter();
  }
  getAllQuestion() {
    this.service.getQuestion().subscribe(question => {
      console.log(question.questions);
      this.questionList = question.questions

    })
  }
  nextQuestion() {
    this.currentquestion++;
  }
  previousQuestion() {
    this.currentquestion--;
  }
  answer(currentQno: number, option: any) {
    if(currentQno===this.questionList.length){
      this.isquizcompleted=true;
      this.stopcounter;
    }
    if (option.correct) {
      this.points += 10;
      // this.points =this.points+10;
      this.correctanswer++;
      setTimeout(() => {
        this.currentquestion++;
        this.resetcounter();
        this.getprogress();
      }, 1000);
    
    }
    else {
     setTimeout(() => {
      this.incorrectanswer++;
      this.currentquestion++;
      this.resetcounter()
      this.getprogress();
     }, 1000);
      this.points -= 10;
      
    }
  }
  startcounter() {
    this.interval$ = interval(1000).subscribe(val => {
      this.counter--;
      if (this.counter === 0) {
        this.currentquestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 600000);
  }
  stopcounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetcounter() {
    this.stopcounter();
    this.counter = 60;
    this.startcounter();
  }
  resetquiz() {
    this.resetcounter();
    this.getAllQuestion();
    this.points = 0;
    this.currentquestion = 0
    this.progress="0"
    // this.counter=60;
  }
  getprogress(){
    this.progress = ((this.currentquestion/this.questionList.length)*100).toString();
    return this.progress
  }
}
