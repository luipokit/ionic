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

  searchData(title: string) {
    const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    // const hasChinese = (title) => REGEX_CHINESE.test(title);
    
    let param_id: string = ''
    let param_title: string = ''

    REGEX_CHINESE.test(title) ? param_title = title : param_id = title

    // console.log(`title: ${title}`)
    // console.log(`param_id: ${param_id}`)
    // console.log(`param_title: ${param_title}`)

    return this.http.get(`${this.PROD_SERVER_URL}&title=${param_title}&id=${param_id}`).pipe(
      map(results => results['data'])
    )
  }
}
