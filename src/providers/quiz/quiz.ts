import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../models/question';
import 'rxjs/add/operator/map';

/*
  Generated class for the QuizProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuizProvider {

  constructor(public http: HttpClient) {
  }

  public getAllQuestions(): Promise<Question[]>{
    return this.http.get('https://opentdb.com/api.php?amount=50&type=multiple')
    .map((res:any)=>{
      return res.results;
    }).toPromise();
  }
}
