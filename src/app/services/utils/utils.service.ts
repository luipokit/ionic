import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  // testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  // buddhaURL = 'https://deerpark.app/api/v1/allworks';

  DEV_SERVER_URL = 'http://localhost:3000/api/';
  // PROD_SERVER_URL = 'https://mongo_proj-8xweov.turbo360-vertex.com/api/buddha?size=10';
  PROD_SERVER_URL = 'https://mongo_proj-8xweov.turbo360-vertex.com/api/buddha';

  constructor(public http: HttpClient) { }

  HttpGet(
    url: string, 
    parameters: any, 
    headers: any, 
    success: (result: any) => void, 
    error?: (error: any) => void, 
    done?: () => void
  ) {

    if (!parameters) {
      parameters = {};
    }

    if (!headers) {
      headers = {};
    }
    
    if (!error) {
      error = (error:any) => {}
    }

    if (!done) {
      done = () => {}
    }

    let options: any = {
      params: new HttpParams()
    };

    for (let key in parameters) {
      options.params = options.params.set(key, parameters[key]);
    }

    this.http.get(url, options)
      .subscribe((result:any) => {
        success(result)
      }, (result:any) => {
       error(JSON.parse(result.error));
    }).add(done);
  }

  httpPost(
    url: string, 
    body: any, 
    headers: any, 
    success: (result: any) => void, 
    error?: (error: any) => void, 
    done?: () => void
  ) {
  
    if (!error) {
      error = (error:any) => {
        // this.httpDefaultError(error.error);
      }
    }
    if (!done) {
      done = () => {}
    }

    let options: any = {};
    options.headers = new HttpHeaders(headers);

    this.http.post(url, body, options)
      .subscribe((result:any) => {
        success(result.data)
      }, (result:any) => {
        console.log(result.error);
        error(result.error);
      }).add(done);
  }
}
