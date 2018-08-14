import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {ScenarioRaModel} from '../Model/ScenarioRa';
import {HttpErrorResponse} from "@angular/common/http/src/response";

@Injectable()
export class ScenarioRaService {

    private _scenarioRaArray = "http://localhost:8888/api/scenariosFondsRa/";
    dateCreation : any;
    dateExpiration : any;
    defaultScenarioRa : any;
    scenarioRa2 : any;
    sMsg:string = '';
    scenarioRa3 : any;

    constructor(private http: Http) {
    }


    getScenarioRaByFonds(idTypeCredilog): Observable<ScenarioRaModel[]> {


        return this.http
            .get(`${this._scenarioRaArray}/${idTypeCredilog}`)
            .map((response: Response) => {
                return <ScenarioRaModel[]>response.json();
            })
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }



    deleteScenarioRaById(idScenarioFondsRa:string): Observable<number> {
        return this.http.delete(this._scenarioRaArray + idScenarioFondsRa)
            .map(success => success.status)
            .catch(this.handleError);
    }

    ajouterScenariosRa () {

        const frmData = new FormData();
        this.dateCreation = ((document.getElementById("dateCreationScenarioRa") as HTMLInputElement).value);

        this.dateExpiration = ((document.getElementById("dateExpirationScenarioRa") as HTMLInputElement).value);

        this.defaultScenarioRa = ((document.getElementById("defaultScenarioRa") as HTMLInputElement).value);

        this.scenarioRa2 = ((document.getElementById("ScenarioRa2") as HTMLInputElement).value);

        this.scenarioRa3 = ((document.getElementById("ScenarioRa3") as HTMLInputElement).value);

        frmData.append("dateCreation", this.dateCreation);
        frmData.append("dateExpiration", this.dateExpiration);
        frmData.append("defaultScenarioRa", this.defaultScenarioRa);
        frmData.append("ScenarioRa2", this.scenarioRa2);
        frmData.append("ScenarioRa3", this.scenarioRa3);

        // appel au service web
        this.http.post('http://localhost:8888/api/scenariosFondsRa/scenario', frmData).subscribe(
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
