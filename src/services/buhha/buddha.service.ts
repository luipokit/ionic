import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  map
} from 'rxjs/operators';
import {
  Platform
} from '@ionic/angular';
import {
  HTTP
} from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class BuddhaService {

  testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  buddhaURL = 'https://deerpark.app/api/v1/allworks';

  DEV_SERVER_URL = 'http://localhost:3000/api/';
  PROD_SERVER_URL = 'https://mongo_proj-8xweov.turbo360-vertex.com/api/buddha?size=10';

  // http://localhost:3000/api/buddha?pageNo=1&size=10

  constructor(
    private http: HttpClient,
    private nativeHttp: HTTP,
    public platform: Platform,
  ) {}

  searchData(title: string, pageNo: number) {
    const { param_title, param_id } = this.isTitleOrID(title);

    // console.log(`title: ${title}`)
    // console.log(`param_id: ${param_id}`)
    // console.log(`param_title: ${param_title}`)

    return this.http.get(`${this.PROD_SERVER_URL}&pageNo=${pageNo}&title=${param_title}&id=${param_id}`).pipe(
      // map(results => results['data'])
    );
  }

  isTitleOrID(title: string) {
    const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    // const hasChinese = (title) => REGEX_CHINESE.test(title);
    let param_id = '';
    let param_title = '';
    REGEX_CHINESE.test(title) ? param_title = title : param_id = title;
    return { param_title, param_id };
  }

  getData(url) {
    return this.http.get(url).pipe(map(results => results['data']));
  }

  getHtml(id) {
    return this.http.get(
      `https://deerpark.app/api/v1/html/${id}`, {
        responseType: 'text'
      });
  }

  getHtmlNative(id): any {
    return this.nativeHttp.get(`https://deerpark.app/api/v1/html/${id}`, {}, {})
      .then(response => {
        // console.log(`getHtmlNative response: ${response}`) // response
        // console.log(`getHtmlNative response.data: ${response.data}`) // html
        return response.data;
      }).catch(error => {
        // console.log(`getHtmlNative error: ${error}`)
        // console.log(`getHtmlNative error.data: ${error.error}`)
        return error.error;
      });
  }
}
