import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AnnuaireModel} from '../Model/Annuaire';
import {HttpErrorResponse} from '@angular/common/http/src/response';

@Injectable()
export class AnnuaireService{

  private _annuaireURL = "http://localhost:8088/api/annuaires/";
  private nom : string ;
  private email : string ;
  private login : string ;
  private pwd : string ;
  sMsg:string = '';


  constructor(private http: Http) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  public getUsers(): Observable<AnnuaireModel[]> {

    console.log('je suis là pr l instant !! ')
    return this.http
      .get(`${this._annuaireURL}`)
      .map((response: Response) => {
        return <AnnuaireModel[]>response.json();
      })
      .catch(this.handleError);
  }


  //Delete user
  deleteAnnuaireById(UserId: number): Observable<number> {
    return this.http.delete(this._annuaireURL +"/deleteUser/"+ UserId)
      .map(success => success.status)
      .catch(this.handleError);
  }


  addAnnuaire () {

    const frmData = new FormData();
    this.nom = ((document.getElementById("nomUser") as HTMLInputElement).value);
    this.email = ((document.getElementById("emailUser") as HTMLInputElement).value);
    this.login = ((document.getElementById("loginUser") as HTMLInputElement).value);
    this.pwd = ((document.getElementById("pwdUser") as HTMLInputElement).value);

    frmData.append("nomUser", this.nom);
    frmData.append("emailUser", this.email);
    frmData.append("loginUser", this.login);
    frmData.append("pwdUser",this.pwd) ;


    console.log('voyant d abord est ce qu on a recupere datas nom ==> '+this.nom +" email ===>"+ this.email+" login ==>"+ this.login+" pwd ==>"+this.pwd) ;

    this.http.post(this._annuaireURL+'/addUser', frmData).subscribe(
      data => {
        this.sMsg = data.toString();
        console.log (this.sMsg);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}
