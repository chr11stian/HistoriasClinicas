import {Location} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
    DialogConsultaUniversalComponent
} from "../../historia-consultas/dialog-consulta-universal/dialog-consulta-universal.component";
import {DialogConsultaComponent} from "./dialog-consulta/dialog-consulta.component";
import {ConsultaObstetriciaService} from "./services/consulta-obstetricia/consulta-obstetricia.service";
import {ObstetriciaGeneralService} from "../../services/obstetricia-general.service";
import {Router} from "@angular/router";
import {ConsultasService} from "../atencion/consultorio-obstetrico/services/consultas.service";

@Component({
    selector: "app-consulta",
    templateUrl: "./consulta.component.html",
    styleUrls: ["./consulta.component.css"],
    providers: [DialogService],
})
export class ConsultaComponent implements OnInit {
    listaDocumentos: any;
    formConsulta: FormGroup;
    consultas = [];
    ref: DynamicDialogRef;

    tipoDocRecuperado: string;
    nroDocRecuperado: string;
    idRecuperado: string;
    nroEmbarazo: string;
    nroHcl: string;

    Gestacion: any;
    DataFiliacionPaciente: any;

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private dialog: DialogService,
        private consultaObstetriciaService: ConsultaObstetriciaService,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
        private consultasService: ConsultasService,
        private router: Router
    ) {
        this.inicializarForm();

        //localstorage datos
        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.DataFiliacionPaciente = JSON.parse(localStorage.getItem('dataPaciente'));
        console.log("GESTACION desde lista consultas", this.Gestacion);


        if (this.Gestacion == null) {
            this.tipoDocRecuperado = this.DataFiliacionPaciente.tipoDoc;
            this.nroDocRecuperado = this.DataFiliacionPaciente.nroDoc;
            this.nroEmbarazo = this.DataFiliacionPaciente.nroEmbarazo;
            this.nroHcl = this.DataFiliacionPaciente.nroHcl;
        } else {
            this.tipoDocRecuperado = this.Gestacion.tipoDoc;
            this.nroDocRecuperado = this.Gestacion.nroDoc;
            this.idRecuperado = this.Gestacion.id;
            this.nroEmbarazo = this.Gestacion.nroEmbarazo;
            this.nroHcl = this.Gestacion.nroHcl;
        }
        // this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        // this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        // this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        // this.nroHcl = this.obstetriciaGeneralService.nroHcl;
        this.recuperarConsultas();
    }

    ngOnInit(): void {
        console.log(this.consultas);
        console.log("TipoDocRecuperado", this.tipoDocRecuperado);
        console.log("NroDocRecuparado", this.nroDocRecuperado);
        console.log("NroHCL", this.nroHcl);
        console.log("Nro Embarazo", this.nroEmbarazo);
    }

    inicializarForm() {
        this.formConsulta = this.fb.group({
            tipoDoc: new FormControl(""),
            nroDoc: new FormControl(""),
        });
    }

    regresar() {
        this.location.back();
    }

    // openDialogConsultaNuevo() {
    //     this.ref = this.dialog.open(DialogConsultaComponent, {
    //         header: "CONSULTA",
    //         width: "95%",
    //         contentStyle: {
    //             "max-height": "700px",
    //         },
    //         autoZIndex: false,
    //     })
    //     this.ref.onClose.subscribe((data: any) => {
    //         console.log('data de otro dialog ', data)
    //         if (data !== undefined) this.recuperarConsultas();
    //     })
    // }

    // openDialogConsultaEditar(row, index) {
    //     let aux = {
    //         index: index,
    //         row: row
    //     }
    //     this.ref = this.dialog.open(DialogConsultaComponent, {
    //         header: "CONSULTA",
    //         width: "95%",
    //         autoZIndex: false,
    //         contentStyle: {
    //             "max-height": "800px",
    //             overflow: "auto",
    //         },
    //         data: aux
    //     })
    //     this.ref.onClose.subscribe((data: any) => {
    //         console.log('data de otro dialog ', data)
    //         if (data !== undefined) {
    //             this.recuperarConsultas();
    //         }
    //         ;
    //     })
    // }

    //recupera la lista de todas las atenciones prenatales
    recuperarConsultas() {
        let data = {
            "nroHcl": this.nroHcl,
            "nroEmbarazo": this.nroEmbarazo
        }
        this.consultaObstetriciaService.getDatosConsultasObstetricasListar(data).subscribe((res: any) => {
            console.log('trajo datos exito ', res)
            this.consultas = res.object ? res.object : [];
        })
    }

    //crear una nueva consulta, no mandamos ningun dato
    irConsultaNew(edicion) {
        localStorage.removeItem('IDConsulta');
        this.router.navigate(['/dashboard/obstetricia-general/citas/gestante/obstetricia/consultorio-obstetrico']);
        localStorage.setItem("consultaEditarEstado", edicion);
        let data = {
            nroHcl: this.nroHcl
        }
        this.consultasService.getUltimaConsultaControl(data).subscribe((res: any) => {
            let informacion = res.object;
            //guardar en el ls el nroAtencion
            localStorage.setItem("nroConsultaNueva", informacion.nroUltimaAtencion + 1);
        })

    }

    //editar consulta o visualizar na ma, mandamos la data de la fila
    irConsultaVisualizar(event, edicion) {
        this.router.navigate(['/dashboard/obstetricia-general/citas/gestante/obstetricia/consultorio-obstetrico'])
        localStorage.setItem("nroConsultaEditar", event.nroAtencion);
        localStorage.setItem("consultaEditarEstado", edicion);
        // console.log(event)
        localStorage.removeItem('IDConsulta');
        localStorage.setItem('IDConsulta', JSON.stringify(event.id));
    }
}
