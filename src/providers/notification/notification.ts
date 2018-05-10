import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  apiUrl: string = 'https://fcm.googleapis.com/fcm/send';
  opts: FirebaseListFactoryOpts;
  constructor(public http: HttpClient) {
    console.log('Hello NotificationProvider Provider');
  }

  sendNotificetionTo(uid: string, topic: string, detail: string) {
    let data = {
      "notification": {
        "title": topic,
        "body": detail,
        //"click_action" : "https://dummypage.com"
      },
      "to": "/topics/" + uid
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, JSON.stringify(data), {
        headers: new HttpHeaders().set('Authorization', ['key=AIzaSyAl7wlMin0mpzY3K8ZOW3kSPf4sxGEYHvE']).set('Content-Type', ['application/json']),
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }

}
