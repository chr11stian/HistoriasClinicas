import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatosGeneralesComponent } from "../datos-generales/datos-generales.component";
import { MotivoConsultaComponent } from "../motivo-consulta/motivo-consulta.component";
import { DiagnosticoConsultaComponent } from "../../../../../cred/citas/atencion-cred/consulta-principal/component/diagnostico-consulta/diagnostico-consulta.component";
import { AcuerdosComponent } from "../acuerdos/acuerdos.component";
import { DiagnosticoComponent } from "../diagnostico/diagnostico.component";
import { TratamientoComponent } from "../tratamiento/tratamiento.component";
import { ProcedimientoComponent } from "../procedimiento/procedimiento.component";
import { EvaluacionesComponent } from "../evaluaciones/evaluaciones.component";

@Component({
    selector: "app-step-general",
    templateUrl: "./step-general.component.html",
    styleUrls: ["./step-general.component.css"],
})
export class StepGeneralComponent implements OnInit {
    dataFromLocal:any
    itemsStep: any[];
    j: number = 100;
    indiceActivo: number = 0;
    stepName = "datos";
    listaTitulo :any[]
    buscarTipoConsulta(codigo) {
        const aux = this.listaTitulo.find((element) => {
            return element.code == codigo;
        });
        return aux?.display || "SERVICIO NO DISPONIBLE";
    }
    @ViewChild(DatosGeneralesComponent) datosGeneralesConsulta: DatosGeneralesComponent;
    @ViewChild(MotivoConsultaComponent) motivoConsulta: MotivoConsultaComponent;
    @ViewChild(EvaluacionesComponent) evaluacionesConsulta: EvaluacionesComponent;
    @ViewChild(DiagnosticoComponent) diagnosticoConsulta: DiagnosticoComponent;
    @ViewChild(AcuerdosComponent) AcuerdosComponent: AcuerdosComponent;
    @ViewChild(ProcedimientoComponent) procedimientoConsulta: ProcedimientoComponent;
    @ViewChild(TratamientoComponent) tratamientoConsulta: TratamientoComponent;

    constructor() {
        this.dataFromLocal = <any>JSON.parse(localStorage.getItem("documento"));
        this.itemsStep = [
            { label: "Datos Generales", styleClass: "icon" },
            { label: "Motivo de Consulta", styleClass: "icon1" },
            { label: "Exámenes Auxiliares", styleClass: "icon2" },
            { label: "Diagnóstico", styleClass: "icon3" },
            { label: "Procedimientos", styleClass: "icon6" },
            { label: "Tratamiento", styleClass: "icon5" },
            { label: "Interconsulta", styleClass: "icon7" },
        ];
        this.listaTitulo = [
            { code: "NIÑO_NIÑA", display: "MEDICINA GENERAL NIÑO/NIÑA" },
            { code: "ADOLESCENTE", display: "MEDICINA GENERAL ADOLESCENTE" },
            { code: "JOVEN", display: "MEDICINA GENERAL JOVEN" },
            { code: "ADULTO", display: "MEDICINA GENERAL ADULTO" },
            { code: "ADULTO MAYOR", display: "MEDICINA GENERAL ADULTO MAYOR" },
            { code: "ODONTOLOGIA GENERAL", display: "ODONTOLOGIA" },
            { code: "PSICOLOGIA", display: "PSICOLOGIA" },
            { code: "NUTRICION", display: "NUTRICION" },
            { code: "CONSULTA GESTANTE EXTERNA", display: "CONSULTORIO OBSTETRICO"},
        ];
    }
    ngDoCheck() {
        this.saveStep();
    }
     ngOnInit() {
    }
    //--cambia los nombres de los steps según el indice
    name() {
        switch (this.indiceActivo) {
            case 6:
                this.stepName = "finalizar";
                break;
            case 5:
                this.stepName = "tratamiento";
                break;
            case 4:
                this.stepName = "procedimiento";
                break;
            case 3:
                this.stepName = "diagnostico";
                break;
            case 2:
                this.stepName = "evaluaciones";
                break;
            case 1:
                this.stepName = "motivo";
                break;
            case 0:
                this.stepName = "datos";
                break;
        }
    }

    //--cambia step
    ChangeStep(event: number) {
        this.indiceActivo = event;
        this.name();
    }

    // pasamos al siguiente step
    nextPage() {
        switch (this.stepName) {
            case "datos":
                this.datosGeneralesConsulta.guardarActualizar();
                this.stepName = "motivo";
                this.indiceActivo = 1;
                break;
            case "motivo":
                this.motivoConsulta.save();
                this.stepName = "evaluaciones";
                this.indiceActivo = 2;
                break;
            case "evaluaciones":
                // this.motivoConsulta.save()
                this.stepName = "diagnostico";
                this.indiceActivo = 3;
                break;
            case "diagnostico":
                // this.diagnosticoConsulta.saveDiagnostico();
                this.stepName = "procedimiento";
                this.indiceActivo = 4;
                break;
            case "procedimiento":
                // this.procedimientoConsulta.saveProcedimiento();
                this.stepName = "tratamiento";
                this.indiceActivo = 5;
                break;
            case "tratamiento":
                this.tratamientoConsulta.his()
                /* this.stepName = "finalizar";
                this.indiceActivo = 6; */
                break;

            case "finalizar":
                this.AcuerdosComponent.save();
                // this.finalizarConsulta.save()
                break;
        }
    }

    // regresamos al anterior step
    prevPage() {
        switch (this.stepName) {
            case "finalizar":
                console.log("fi ", this.stepName);
                this.stepName = "tratamiento";
                this.indiceActivo = 5;
                break;
            case "tratamiento":
                this.stepName = "procedimiento";
                this.indiceActivo = 4;
                break;
            case "procedimiento":
                console.log("fi ", this.stepName);
                this.stepName = "diagnostico";
                this.indiceActivo = 3;
                break;

            case "diagnostico":
                this.stepName = "evaluaciones";
                this.indiceActivo = 2;
                break;
            case "evaluaciones":
                this.stepName = "motivo";
                this.indiceActivo = 1;
                break;
            case "motivo":
                this.stepName = "datos";
                this.indiceActivo = 0;
                break;
            // case 'datos':
            //   this.stepName = 'datos';
            //   this.indiceActivo = 0;
            //   break;
        }
    }

    saveStep() {
        if (this.indiceActivo !== this.j) {
            // console.log("j ", this.indiceActivo, this.j);
            switch (this.j) {
                case 7:
                    // this.finalizarConsulta.save()
                    break;
                case 6:
                    // this.finalizarConsulta.save()
                    break;
                case 5:
                    //this.tratamientoConsulta.save()
                    break;
                case 4:
                    // this.diagnosticoConsulta.save()
                    break;
                case 3:
                    break;
                case 2:
                    break;
                case 1:
                    // this.motivoConsulta.save()
                    break;
                case 0:
                    // this.datosGeneralesConsulta.save()
                    break;
            }
            this.j = this.indiceActivo;
        }
    }
}
interface data {
    name: string;
    code: number;
}
