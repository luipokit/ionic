import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuddhaService {

  url = 'https://jsonplaceholder.typicode.com/todos/1';
  deployURL = 'https://mongo_proj-8xweov.turbo360-vertex.com/api/profile';
  turboServerURL = 'http://localhost:3000/api/profile';

  constructor(private http: HttpClient) { }

  showData() {
    return this.http.get(this.deployURL);
  }
}
