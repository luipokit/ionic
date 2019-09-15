import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Events
} from '@ionic/angular';
import {
  map
} from 'rxjs/operators';


// import 'rxjs/add/operator/toPromise';

export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userImgUrl: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public http: HttpClient, public events: Events) {
    console.log('Hello ChatService Provider');
  }

  getMsglist() {
    const msgListUrl = '../../../assets/data/message_list.json';
    return this.http.get(msgListUrl);
  }

  sendMsg(msg: ChatMessage) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, Math.random() * 1000)
    }).then(() => {
      setTimeout(() => {
        this.events.publish('chat:received', {
          messageId: Date.now().toString(),
          userId: '210000198410281948',
          userName: 'Vegeta',
          userImgUrl: '../../../assets/img/vegeta.png',
          toUserId: '140000198202211138',
          time: Date.now(),
          message: msg.message,
          status: 'success'
        }, Date.now());
      }, Math.random() * 1800)
    })
  }

}