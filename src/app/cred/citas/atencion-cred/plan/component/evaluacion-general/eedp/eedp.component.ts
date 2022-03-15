import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { escalaEval_EEDP_0_4_anios } from '../models/EscalaEEDP';
import { EvalAlimenService } from '../service/eval-alimen.service';
import { EscalaEvaluacionEEDPComponent } from '../escala-evaluacion-eedp/escala-evaluacion-eedp.component'
import { EedpService } from '../../../../consulta-principal/component/evaluaciones-consulta/components/desarrollo-psicomotor/services/eedp.service';
import { DatosConsulta } from '../../../../consulta-principal/component/evaluaciones-consulta/components/desarrollo-psicomotor/components/models/eedp';

@Component({
    selector: 'app-eedp',
    templateUrl: './eedp.component.html',
    styleUrls: ['./eedp.component.css'],
    providers: [DialogService]
})
export class EEDPComponent implements OnInit {

    datosMeses: any[];
    escalaEEDP: escalaEval_EEDP_0_4_anios[];
    datosNinio = [];
    resultListEEDP: any;
    dataPaciente: DatosConsulta;
    ref: DynamicDialogRef;

    constructor(
        private evalAlimenService: EvalAlimenService,
        private dialog: DialogService,
        private eedpService: EedpService
    ) {
        this.dataPaciente = JSON.parse(localStorage.getItem('documento'));
        console.log('se selecciono el resumen de eedp ', this.dataPaciente);
        this.getEEDPByNroHcl();
    }

    ngOnInit(): void {

    }
    async getEEDPByNroHcl() {
        await this.eedpService.getPromiseEEDPxNroHcl(this.dataPaciente.nroDocumento).then(data => {
            this.resultListEEDP = data
        });
        console.log('datos de eedp por nro de historia', this.resultListEEDP);
    }

    openEvaluacionEEDP() {
        const header = "Escala Evaluacion EEDP";
        let currentIndex = 0;
        if (this.escalaEEDP) {
            currentIndex = this.escalaEEDP.length
        }
        // const ref = this.dialogService.open(EscalaEvaluacionEEDPComponent, {
        //     header: header,
        //     height: "90%",
        //     width: "85%",
        //     baseZIndex: 100000,
        //     data: {
        //         dataEEDP: this.escalaEEDP,
        //         currentIndex: currentIndex
        //     }
        // });
        // ref.onClose.subscribe(() => {
        //     this.datosNinio = [];
        // })
    }
    openShowEEDPDialog(dataEEDP, index) {
        this.ref = this.dialog.open(EscalaEvaluacionEEDPComponent, {
            header: "PERFIL DESARROLLO PSICOMOTOR",
            width: "90%",
            // height: "100%",
            data: dataEEDP,
        });
    }
}   
