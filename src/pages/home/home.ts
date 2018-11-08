import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuizProvider } from '../../providers/quiz/quiz'
import { Question } from '../../models/question';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  questions: Question[];
  questionIndex: number = 0;
  isCorrect = false;
  answers: string[] = new Array();


  constructor(public navCtrl: NavController, public quiz: QuizProvider) {
    this.getAllQuestions();
  }

  getAllQuestions(){
    this.quiz.getAllQuestions()
    .then(res => this.questions = res)
    .catch(err => console.error(err));
  }

  getCurrentQuestion(){
    return this.questions[this.questionIndex];
  }

  getAnswers(){
    if(this.answers.length == 0){
      this.answers.push(this.getCurrentQuestion().correct_answer);

      for(let badAnswer of this.getCurrentQuestion().incorrect_answers){
        this.answers.push(badAnswer);
      }

      this.answers = this.shuffle(this.answers);
    }

    return this.answers;
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  selectAnswer(answer: string){
    this.isCorrect=this.getCurrentQuestion().correct_answer==answer;
  }
}
