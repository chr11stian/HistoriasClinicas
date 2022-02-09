import {Location} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {DialogConsultaUniversalComponent} from "../../historia-consultas/dialog-consulta-universal/dialog-consulta-universal.component";
import {DialogConsultaComponent} from "./dialog-consulta/dialog-consulta.component";
import {ConsultaObstetriciaService} from "./services/consulta-obstetricia/consulta-obstetricia.service";
import {ObstetriciaGeneralService} from "../../services/obstetricia-general.service";
import {Router} from "@angular/router";

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
    nroEmbarazo: string;
    nroHcl: string;

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private dialog: DialogService,
        private consultaObstetriciaService: ConsultaObstetriciaService,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
        private router: Router
    ) {
        this.inicializarForm();
        this.tipoDocRecuperado = this.obstetriciaGeneralService.tipoDoc;
        this.nroDocRecuperado = this.obstetriciaGeneralService.nroDoc;
        this.nroEmbarazo = this.obstetriciaGeneralService.nroEmbarazo;
        this.nroHcl = this.obstetriciaGeneralService.nroHcl;
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

    openDialogConsultaNuevo() {
        this.ref = this.dialog.open(DialogConsultaComponent, {
            header: "CONSULTA",
            width: "95%",
            contentStyle: {
                "max-height": "700px",
            },
            autoZIndex: false,
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de otro dialog ', data)
            if (data !== undefined) this.recuperarConsultas();
        })
    }

    openDialogConsultaEditar(row, index) {
        let aux = {
            index: index,
            row: row
        }
        this.ref = this.dialog.open(DialogConsultaComponent, {
            header: "CONSULTA",
            width: "95%",
            autoZIndex: false,
            contentStyle: {
                "max-height": "800px",
                overflow: "auto",
            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de otro dialog ', data)
            if (data !== undefined) {
                this.recuperarConsultas();
            }
            ;
        })
    }

    recuperarConsultas() {
        let data = {
            "nroHcl": this.obstetriciaGeneralService.nroHcl,
            "nroEmbarazo": this.obstetriciaGeneralService.nroEmbarazo
        }
        this.consultaObstetriciaService.getDatosConsultasObstetricasListar(data).subscribe((res: any) => {
            console.log('trajo datos exito ', res)
            this.consultas = res.object ? res.object : [];
        })
    }

    irConsulta(){
        this.router.navigate(['/dashboard/obstetricia-general/citas/gestante/obstetricia/consultorio-obstetrico'])
    } 

    // openDialogConsultaUniversal() {
    //   this.ref = this.dialog.open(DialogConsultaUniversalComponent, {
    //     header: "CONSULTA UNIVERSAL",
    //     width: "95%",
    //     contentStyle: {
    //       "max-height": "500px",
    //       overflow: "auto",
    //     },
    //     data: {
    //       texto: 'datossss'
    //     }
    //   });

    //   this.ref.onClose.subscribe((data: any) => {
    //     console.log('data de otro dialog ', data)
    //   });
    // }
}
