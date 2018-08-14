import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import { RapportModel } from '../Model/Rapport';
import {HttpErrorResponse} from '@angular/common/http/src/response';


@Injectable()
export  class RapportService{

    private urlRapport = "http://localhost:8888/api/FondsDataRapport";
    public  datePublication : any;
    public  dateExpiration : any;
    public dateRapport : any ;
    public anneeRapport :any ;
    public  myFiles:string [] = [];
    public sMsg:string = '';

  constructor(private http: Http) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    }


  getFileDetails (e) {
    console.log ("voir si on peut bien avoir ça ===> "+e.target.files);

      this.myFiles.push(e.target.files[0]);

    console.log("affaicher le fichier ===>" + this.myFiles) ;
  }


    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }


    ListeRapportByFonds(idTypeCredilog) : Observable<RapportModel[]> {

        return this.http.get(`${this.urlRapport}/${idTypeCredilog}`)
            .map((response: Response) => {
                return <RapportModel[]>response.json();
            })
            .catch(this.handleError);
    }

    AddRapport(){

      const frmData = new FormData();
      this.datePublication = ((document.getElementById("datePublication") as HTMLInputElement).value);
      this.dateExpiration = ((document.getElementById("dateExpiration") as HTMLInputElement).value);
      this.dateRapport = ((document.getElementById("dateRapport") as HTMLInputElement).value) ;
      this.anneeRapport = ((document.getElementById("anneeRapport") as HTMLInputElement).value) ;

      frmData.append("datePublication", this.datePublication);
      frmData.append("dateExpiration", this.dateExpiration);
      frmData.append("dateRapport", this.dateRapport) ;
      frmData.append("anneeRapport", this.anneeRapport) ;
      frmData.append("file", this.myFiles[0]);

      console.log('on va en premier affciher nos infos ===>'+ 'date pub = '+ this.dateExpiration+ 'date exp = '
        +this.dateExpiration+ 'dateRapport  ='+ this.dateRapport+ 'anneRapport'+ this.anneeRapport)

      this.http.post('http://localhost:8888/api/FondsDataRapport/addRapports', frmData).subscribe(
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

  //Delete rapport
  deleteRapportById(rapportId: string): Observable<number> {

    return this.http.delete(this.urlRapport +"/"+ rapportId)
      .map(success => success.status)
      .catch(this.handleError);

  }

}
