import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  NavController,
  NavParams
} from '@ionic/angular';
import {
  Events,
  IonContent
} from '@ionic/angular';
import {
  ChatService,
  ChatMessage
} from "../../services/chat/chat.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) ionContent: IonContent;

  msgList: ChatMessage[] = [];
  userId: string = '140000198202211138';
  userName: string = 'Goku';
  userImgUrl: string = '../../../assets/img/goku.png';
  toUserId: string = '210000198410281948';
  editorMsg: string = '';
  constructor(
    // public navCtrl: NavController,
    // public navParams: NavParams,
    public chatService: ChatService,
    public events: Events
  ) {

  }

  ngOnInit() {
    this.events.subscribe('chat:received',(msg,time) => {
      this.pushNewMsg(msg)
    })
    this.chatService.getMsglist().subscribe(chats => {
      this.msgList = chats['array'] as ChatMessage[];
      this.scrollToBottom();
    });
  }

  sendMsg() {
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.userId,
      userName: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.toUserId,
      time: Date.now(),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    this.chatService.sendMsg(newMsg)
      .then(() => {
        let index = this.getMsgIndexById(id);
        if (index !== -1) {
          this.msgList[index].status = 'success';
        }
      })
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  pushNewMsg(msg: ChatMessage): string {
    if (msg.userId === this.userId && msg.toUserId === this.toUserId) {
      this.msgList.push(msg);
    } else if (msg.toUserId === this.userId && msg.userId === this.toUserId) {
      this.msgList.push(msg);
    }
    this.scrollToBottom();
    return msg.messageId
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.ionContent.scrollToBottom) {
        this.ionContent.scrollToBottom();
      }
    }, 100)
  }

}