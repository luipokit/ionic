import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuddhaService {

  testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  buddhaURL = 'https://deerpark.app/api/v1/allworks';

  DEV_SERVER_URL = 'http://localhost:3000/api/';
  PROD_SERVER_URL = 'https://mongo_proj-8xweov.turbo360-vertex.com/api/buddha?pageNo=1&size=10';

  // http://localhost:3000/api/buddha?pageNo=1&size=10

  constructor(private http: HttpClient) { }

  showData() {
    // return this.http.get(this.PROD_SERVER_URL + this.Profile);
  }

  showRealData() {
    // return this.http.get(this.PROD_SERVER_URL)
    return this.http.get(this.PROD_SERVER_URL).pipe(
      map(results => results['data'])
    )
  }
}
