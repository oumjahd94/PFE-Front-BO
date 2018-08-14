import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {HistoriqueModel} from "../Model/Historique";
import {HttpErrorResponse} from "@angular/common/http/src/response";

@Injectable()
export class HistoriqueService {

    private message : any;
    private _historiqueArray = "http://localhost:8888/api/fondsDataHistoriques";
    myFiles:string [] = [];
    sMsg:string = '';
    fondsId:"4";
    datePublication : any;
    dateExpiration : any;

    constructor(private http: Http) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    }

    getHistoriqueByFonds(idTypeCredilog): Observable<HistoriqueModel[]> {
        return this.http
            .get(`${this._historiqueArray}/${idTypeCredilog}`)
            .map((response: Response) => {
                return <HistoriqueModel[]>response.json();
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


    getFileDetails (e) {
        //console.log (e.target.files);
        for (var i = 0; i < e.target.files.length; i++) {
            this.myFiles.push(e.target.files[i]);
        }
    }

    ajouterHistorique () {

        const frmData = new FormData();
        this.datePublication = ((document.getElementById("datePublication") as HTMLInputElement).value);
        this.dateExpiration = ((document.getElementById("dateExpiration") as HTMLInputElement).value);
        frmData.append("datePublication", this.datePublication);
        frmData.append("dateExpiration", this.dateExpiration);

        for (var i = 0; i < this.myFiles.length; i++) {
            frmData.append("file", this.myFiles[i]);
        }

        console.log(frmData);
        this.http.post('http://localhost:8888/api/fondsDataHistoriques/historique', frmData).subscribe(
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
    deleteHistoriqueById(historiqueId: string): Observable<number> {
        return this.http.delete(this._historiqueArray +"/"+ historiqueId)
            .map(success => success.status)
            .catch(this.handleError);
    }
}
