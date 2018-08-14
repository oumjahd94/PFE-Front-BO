import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {ScenarioDdtModel} from '../Model/ScenarioDDT';
import {HttpErrorResponse} from "@angular/common/http/src/response";

@Injectable()
export class ScenarioDdtService {
    dateCreationDdt : any;
    DateExpirationDdt : any;
    defaultScenarioDdt : any;
    ScenarioDdt2 : any;
    ScenarioDdt3 : any;
    sMsg:string = '';
    private _scenarioDdtArray = "http://localhost:8888/api/scenariosFondsDDT/";

    constructor(private http: Http) {
    }

    getScenarioDdtByFonds(idTypeCredilog): Observable<ScenarioDdtModel[]> {
        return this.http
            .get(`${this._scenarioDdtArray}/${idTypeCredilog}`)
            .map((response: Response) => {
                return <ScenarioDdtModel[]>response.json();
            })
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
    deleteScenarioDdtById(idScenarioDdt:string): Observable<number> {
        return this.http.delete(this._scenarioDdtArray + idScenarioDdt)
            .map(success => success.status)
            .catch(this.handleError);
    }
    ajouterScenariosDdt () {
        const frmData = new FormData();
        this.dateCreationDdt = ((document.getElementById("dateCreationScenarioDdt") as HTMLInputElement).value);
        console.log("Date Création:"+this.dateCreationDdt);
        this.DateExpirationDdt = ((document.getElementById("dateExpirationScenarioDdt") as HTMLInputElement).value);
        console.log("Date expiration:"+this.DateExpirationDdt);
        this.defaultScenarioDdt = ((document.getElementById("defaultScenarioDdt") as HTMLInputElement).value);
        console.log("defaultScenarioDdt:"+this.defaultScenarioDdt);
        this.ScenarioDdt2 = ((document.getElementById("ScenarioDdt2") as HTMLInputElement).value);
        console.log("ScenarioDdt2:"+this.defaultScenarioDdt);
        this.ScenarioDdt3 = ((document.getElementById("ScenarioDdt3") as HTMLInputElement).value);
        console.log("ScenarioDdt3:"+this.ScenarioDdt2);
        frmData.append("dateCreationDdt", this.dateCreationDdt);
        frmData.append("DateExpirationDdt", this.DateExpirationDdt);
        frmData.append("defaultScenarioDdt", this.defaultScenarioDdt);
        frmData.append("ScenarioDdt2", this.ScenarioDdt2);
        frmData.append("ScenarioDdt3", this.ScenarioDdt3);
        // appel au service web
        this.http.post('http://localhost:8888/api/scenariosFondsDDT/scenario', frmData).subscribe(
            data => {
                // SHOW A MESSAGE RECEIVED FROM THE WEB API.
                this.sMsg = data.toString();
                console.log (this.sMsg);
            },
            (err: HttpErrorResponse) => {
                console.log (err.message);    // SHOW ERRORS IF ANY.
            }
        );
        // select all data
        location.reload();
    }
}
