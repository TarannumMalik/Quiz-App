import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

 @ViewChild("name") namekey!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
startQuiz(){
  //local storage se  hamara data hamere local host pr store ho jayega jab ham usse dusre laptop mein use karenge to hame dobara daalna padega
  localStorage.setItem("name",this.namekey.nativeElement.value);
}
}
