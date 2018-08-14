import {ScenarioRaModel} from "./ScenarioRa";
import {ScenarioRaService} from "../Service/ScenarioRaService";
import {ScenarioDdtModel} from "./ScenarioDDT";

export class CashflowModel {

    idFondsDataCashflow : number;
    datePublication  : Date;
    dateExpiration : Date;
    scenarioFondsDdt : ScenarioDdtModel;
    scenariosFondsRa : ScenarioRaModel;
}
