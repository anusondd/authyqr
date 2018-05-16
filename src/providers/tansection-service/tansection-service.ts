import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ScalarQuery, FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { Tansection } from '../../models/tansection';


@Injectable()
export class TansectionServiceProvider {

  apiUrl: string = 'https://fcm.googleapis.com/fcm/send';
  opts: FirebaseListFactoryOpts;
  detail: string;

  constructor(
    public http: HttpClient,
    private Database: AngularFireDatabase
  ) {
    console.log('Hello TansectionServiceProvider Provider');
  }



  requestTansection(tansection: Tansection) {
    return this.Database.list('/tansection/').push(tansection);

    // this.detail = tansection.personal_request.firstName+' RequestTansection';
    // this.sendNotificetionTo(tansection.personal_approve.uid,'Request',this.detail).then(res=>{
    //   console.log('sendNotificetionTo',res);      
    // })
  }

  approveTansection(key: string, tansection: Tansection) {
    return this.Database.object('/tansection/' + key).update(tansection);
  }

  rejectTansection(key: string, tansection: Tansection) {
    return this.Database.object('/tansection/' + key).update(tansection);
  }

  getTansection(key: string): FirebaseObjectObservable<Tansection> {
    return this.Database.object('/tansection/' + key);
  }

  getListTansectionRequest(uid_request: string): FirebaseListObservable<Tansection[]> {
    this.opts = {
      query: {
        orderByChild: 'uid_request',
        equalTo: uid_request
      }
    };
    return this.Database.list('/tansection/', this.opts);
  }

  getListTansectionApprove(uid_approve: string): FirebaseListObservable<Tansection[]> {
    this.opts = {
      query: {
        orderByChild: 'uid_approve',
        equalTo: uid_approve
      }
    };
    return this.Database.list('/tansection/', this.opts);
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

  sendNotificetion(token: string, body: string, title: string) {
    let data = {
      "message": {
        "token": token,
        "notification": {
          "body": body,
          "title": title,
        }
      }
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
