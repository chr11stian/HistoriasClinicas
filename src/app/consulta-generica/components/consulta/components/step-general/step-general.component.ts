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
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { InteconsultaObstetriciaModalComponent } from "src/app/obstetricia-general/gestante/atencion/consultorio-obstetrico/component/inteconsulta-obstetricia-modal/inteconsulta-obstetricia-modal.component";

@Component({
    selector: "app-step-general",
    templateUrl: "./step-general.component.html",
    styleUrls: ["./step-general.component.css"],
    providers: [DialogService],
})
export class StepGeneralComponent implements OnInit {
    ref: DynamicDialogRef;
    dataFromLocal:any
    itemsStep: any[];
    j: number = 100;
    indiceActivo: number = 0;
    stepName = "datos";
    listaTitulo :any[]
    tooltipItems: MenuItem[];
    estadoAtencion:number=1
    readonlyStepState=true
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

    constructor(private dialogS: DialogService) {
        this.dataFromLocal = <any>JSON.parse(localStorage.getItem("documento"));
        this.estadoAtencion= this.dataFromLocal.estadoAtencion;
        this.readonlyStepState= this.dataFromLocal.idConsulta=='';
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
        this.tooltipItems = [
            {
                tooltipOptions: {
                    tooltipLabel: "Interconsulta",
                    tooltipPosition: "left",
                },
                icon: "pi pi-reply",
                command: (event: Event) => {
                    this.openDialogInterconsultaObstetricia();
                },
            },
        ];
        
    }
    openDialogInterconsultaObstetricia() {
        this.ref = this.dialogS.open(InteconsultaObstetriciaModalComponent, {
            data: { idConsulta: this.dataFromLocal.idConsulta },
            header: "INTERCONSULTA",
            contentStyle: {},
            style: {
                width: "80%",
            },
        });
    }
     ngOnInit() {
    }
    //--cambia los nombres de los steps según el indice
    /* name() {
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
    } */

    //--cambia step
    /* ChangeStep(event: number) {
        this.indiceActivo = event;
        this.name();
    } */

    // pasamos al siguiente step
    nextPage() {
        switch (this.indiceActivo) {
            case 0:
                this.datosGeneralesConsulta.guardarActualizar();
                // this.stepName = "motivo";
                // this.indiceActivo = 1;
                break;
            case 1:
                this.motivoConsulta.save();
                // this.stepName = "evaluaciones";
                // this.indiceActivo = 2;
                break;
            case 2:
                this.indiceActivo+=1
                // this.motivoConsulta.save()
                // this.stepName = "diagnostico";
                // this.indiceActivo = 3;
                break;
            case 3:
                this.indiceActivo+=1
                // this.diagnosticoConsulta.saveDiagnostico();
                // this.stepName = "procedimiento";
                // this.indiceActivo = 4;
                break;
            case 4:
                this.indiceActivo+=1
                // this.procedimientoConsulta.saveProcedimiento();
                // this.stepName = "tratamiento";
                // this.indiceActivo = 5;
                break;
            case 5:
                this.tratamientoConsulta.his()
                /* this.stepName = "finalizar";
                this.indiceActivo = 6; */
                break;

            case 6:
                this.AcuerdosComponent.save();
                // this.finalizarConsulta.save()
                break;
        }
    }

    // regresamos al anterior step
    prevPage() {
        switch (this.indiceActivo) {
            case 6:
                // console.log("fi ", this.stepName);
                // this.stepName = "tratamiento";
                // this.indiceActivo = 5;
                this.indiceActivo-=1
                break;
            case 5:
                // this.stepName = "procedimiento";
                // this.indiceActivo = 4;
                this.indiceActivo-=1
                break;
            case 4:
                // console.log("fi ", this.stepName);
                // this.stepName = "diagnostico";
                // this.indiceActivo = 3;
                this.indiceActivo-=1
                break;

            case 3:
                // this.stepName = "evaluaciones";
                // this.indiceActivo = 2;
                this.indiceActivo-=1
                break;
            case 2:
                // this.stepName = "motivo";
                // this.indiceActivo = 1;
                this.indiceActivo-=1
                break;
            case 1:
                // this.stepName = "datos";
                // this.indiceActivo = 0;
                this.indiceActivo-=1
                break;
            // case 'datos':
            //   this.stepName = 'datos';
            //   this.indiceActivo = 0;
            //   break;
        }
    }
    nextStep(indiceActual){
        if(this.indiceActivo==0){
            this.readonlyStepState=false
        }
        this.indiceActivo=indiceActual+1;
    }
}
interface data {
    name: string;
    code: number;
}
