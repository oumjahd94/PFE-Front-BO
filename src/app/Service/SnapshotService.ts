import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import "rxjs/Rx";
import { SnapshotModel } from '../Model/Snapshot';
import { HttpErrorResponse } from "@angular/common/http/src/response";
import { Headers, URLSearchParams, RequestOptions } from '@angular/http';
@Injectable()
export class SnapshotService {

  private message : any;
  private _snapshotArray = "http://localhost:8888/api/fondsDataSnapshots";
    myFiles:string [] = [];
  sMsg:string = '';
    fondsId:"4";
    dateArrete : any;
    datePublication : any;
    dateExpiration : any;
  constructor(private http: Http) {
      // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
  }


  getSnapshotByFonds(idTypeCredilog): Observable<SnapshotModel[]> {
    return this.http
      .get(`${this._snapshotArray}/${idTypeCredilog}`)
      .map((response: Response) => {
        return <SnapshotModel[]>response.json();
      })
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

    getDateArrete (e) {
        //console.log (e.target.files);
        console.log(e.get().dateArrete);
    }


    // cette fonction permet de pusher le fichier uploader dans MyFiles
    getFileDetails (e) {
        //console.log (e.target.files);
        for (var i = 0; i < e.target.files.length; i++) {
            this.myFiles.push(e.target.files[i]);
        }
    }

    ajouterSnapshot () {

        const frmData = new FormData();
        this.dateArrete = ((document.getElementById("dateArrete") as HTMLInputElement).value);
        this.datePublication = ((document.getElementById("datePublication") as HTMLInputElement).value);
        this.dateExpiration = ((document.getElementById("dateExpiration") as HTMLInputElement).value);

        frmData.append("dateArrete", this.dateArrete);
        frmData.append("datePublication", this.datePublication);
        frmData.append("dateExpiration", this.dateExpiration);

        console.log(this.dateExpiration +" ////// "+this.datePublication + " ///// "+ this.dateArrete) ;
        for (var i = 0; i < this.myFiles.length; i++) {
            frmData.append("file", this.myFiles[i]);
        }

        console.log(frmData);
        this.http.post('http://localhost:8888/api/fondsDataSnapshots/uploadFile', frmData).subscribe(
            data => {
                // SHOW A MESSAGE RECEIVED FROM THE WEB API.
                this.sMsg = data.toString();
                console.log (this.sMsg);
            },
            (err: HttpErrorResponse) => {
                console.log (err.message);
            }
        );
    }

    //Delete article
    deleteSnapshotById(snapshotId: string): Observable<number> {
        return this.http.delete(this._snapshotArray +"/"+ snapshotId)
            .map(success => success.status)
            .catch(this.handleError);
    }
}
