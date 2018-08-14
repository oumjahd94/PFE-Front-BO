import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {PerformanceModel} from '../Model/Performance';
import {HistoriqueModel} from "../Model/Historique";
import {HttpErrorResponse} from "@angular/common/http/src/response";

@Injectable()
export class PerformanceService {
    private message : any;
    private _performanceArray = "http://localhost:8888/api/fondsDataCollateralPerfs";
    myFiles:string [] = [];
    sMsg:string = '';
    fondsId:"4";
    datePublication : any;
    dateExpiration : any;
    constructor(private http: Http) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    }

    getPerformanceByFonds(idTypeCredilog): Observable<PerformanceModel[]> {
        return this.http
            .get(`${this._performanceArray}/${idTypeCredilog}`)
            .map((response: Response) => {
                return <PerformanceModel[]>response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    getFileDetails (e) {
        //console.log (e.target.files);
        for (var i = 0; i < e.target.files.length; i++) {
            this.myFiles.push(e.target.files[i]);
        }
    }

    ajouterPerformance () {
        const frmData = new FormData();
        this.datePublication = ((document.getElementById("datePublication") as HTMLInputElement).value);
        this.dateExpiration = ((document.getElementById("dateExpiration") as HTMLInputElement).value);


        frmData.append("datePublication", this.datePublication);
        frmData.append("dateExpiration", this.dateExpiration);


        console.log('on va vérifer l affichabilité des données ==> '+this.datePublication+"  "+ this.dateExpiration)
        for (var i = 0; i < this.myFiles.length; i++) {
            frmData.append("file", this.myFiles[i]);
        }

        this.http.post('http://localhost:8888/api/fondsDataCollateralPerfs/performance', frmData).subscribe(
            data => {
                // SHOW A MESSAGE RECEIVED FROM THE WEB API.
                this.sMsg = data.toString();
                console.log (this.sMsg);
            },
            (err: HttpErrorResponse) => {
                console.log (err.message);    // SHOW ERRORS IF ANY.
            }
        );
    }

    //Delete article
    deletePerformanceById(performanceId: string): Observable<number> {
        return this.http.delete(this._performanceArray +"/"+ performanceId)
            .map(success => success.status)
            .catch(this.handleError);
    }
}
