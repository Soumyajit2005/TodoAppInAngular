import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  searchSubject:BehaviorSubject<string> = new BehaviorSubject<string>("");
}
