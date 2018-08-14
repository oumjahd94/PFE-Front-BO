import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {CashflowModel} from "../Model/CashflowModel";
import {HttpErrorResponse} from "@angular/common/http/src/response";

@Injectable()
export class CashflowService {

    private message : any;
    private _cashflowArray = "http://localhost:8888/api/fondsDataCashflows";
    myFiles:string [] = [];
    sMsg:string = '';
    fondsId:"4";
    datePublication : any;
    dateExpiration : any;
    scenariora : any;
    scenarioddt : any;


    constructor(private http: Http) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    }


    getCashflowByFonds(idTypeCredilog): Observable<CashflowModel[]> {
        return this.http
            .get(`${this._cashflowArray}/${idTypeCredilog}`)
            .map((response: Response) => {
                return <CashflowModel[]>response.json();
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

    ajouterCashflow () {

        const frmData = new FormData();
        this.datePublication = ((document.getElementById("datePublication") as HTMLInputElement).value);
        this.dateExpiration = ((document.getElementById("dateExpiration") as HTMLInputElement).value);
        this.scenariora = ((document.getElementById("scenariora") as HTMLInputElement).value);
        this.scenarioddt = ((document.getElementById("scenarioddt") as HTMLInputElement).value);


      console.log('vérifiant nous l affichabilité des dates :  date de pub ====>'+ this.datePublication + " date exp ===> "+ this.dateExpiration)


        frmData.append("datePublication", this.datePublication);
        frmData.append("dateExpiration", this.dateExpiration);
        frmData.append("scenariora", this.scenariora);
        frmData.append("scenarioddt", this.scenarioddt);


       for (var i = 0; i < this.myFiles.length; i++) {
            frmData.append("file", this.myFiles[i]);
        }

        this.http.post('http://localhost:8888/api/fondsDataCashflows/cashflow', frmData).subscribe(
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
    deleteCashflowById(cashflowId: string): Observable<number> {
        return this.http.delete(this._cashflowArray +"/"+ cashflowId)
            .map(success => success.status)
            .catch(this.handleError);
    }
}
