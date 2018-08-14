import {ScenarioDdtModel} from "./ScenarioDDT";
import {ScenarioRaModel} from "./ScenarioRa";
export class EcheancerPrevisionnel{
    idEcheancierPrevisionnel : number;
    scenarioFondsDdt  : ScenarioDdtModel;
    scenarioFondsRa : ScenarioRaModel;
    datePublication : Date;
    dateExpiration : Date;
}