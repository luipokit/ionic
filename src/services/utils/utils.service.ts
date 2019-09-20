import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import {
  HTTP
} from '@ionic-native/http/ngx';
import {
  Platform
} from '@ionic/angular';

export interface Work {
  confirmation: string;
  data: object;
  pages: number;
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  // testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  // buddhaURL = 'https://deerpark.app/api/v1/allworks';

  DEV_SERVER_URL = 'http://localhost:3000/api/';
  // PROD_SERVER_URL = 'https://mongo_proj-8xweov.turbo360-vertex.com/api/buddha?size=10';
  PROD_SERVER_URL = 'https://mongo_proj-8xweov.turbo360-vertex.com/api/buddha';

  constructor(
    public http: HttpClient,
    public nativeHttp: HTTP,
    public platform: Platform
  ) {}

  HttpGet(
    url: string,
    parameters: any,
    headers: any,
    success: (result: any) => void,
    error ?: (error: any) => void,
    done ?: () => void
  ) {

    if (!parameters) {
      parameters = {};
    }

    if (!headers) {
      headers = {};
    }

    if (!error) {
      error = (error: any) => {}
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

    if (this.platform.is('cordova')) {

      console.log('cordova', url, parameters, headers);

      // this.nativeHttp.setDataSerializer('json');

      this.nativeHttp.get(
        url,
        parameters,
        headers
      ).then(data => {
        success(data.data);
      }).catch(error => {
        error(error);
      }).finally(() => {
        done;
      })

    } else {
      this.http.get(url, options)
        .subscribe((result: any) => {
          console.log(result);
          success(result);
        }, (result: any) => {
          error(JSON.parse(result.error));
        }).add(done);
    }
  }

  httpPost(
    url: string,
    body: any,
    headers: any,
    success: (result: any) => void,
    error ?: (error: any) => void,
    done ?: () => void
  ) {

    if (!error) {
      error = (error: any) => {
        // this.httpDefaultError(error.error);
      }
    }
    if (!done) {
      done = () => {}
    }

    let options: any = {};
    options.headers = new HttpHeaders(headers);

    this.http.post(url, body, options)
      .subscribe((result: any) => {
        success(result.data);
      }, (result: any) => {
        console.log(result.error);
        error(result.error);
      }).add(done);
  }
}
