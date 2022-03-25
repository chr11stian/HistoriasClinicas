import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-lab-solicitud',
    templateUrl: './lab-solicitud.component.html',
    styleUrls: ['./lab-solicitud.component.css']
})
export class LabSolicitudComponent implements OnInit {
    formSolicitudLab: FormGroup;

    constructor(private ref: DynamicDialogRef,
                public config: DynamicDialogConfig,
                private form: FormBuilder) {
    }

    ngOnInit(): void {
        this.buildForm();
        // this.add();
    }

    buildForm() {
        this.formSolicitudLab = this.form.group({
            hemoglobina: new FormControl(''),
            Hematocrito: new FormControl(''),
            HemogCompleto: new FormControl(''),
            TiempoCoagulacion: new FormControl(''),
            TiempoSangria: new FormControl(''),
            VSG: new FormControl(''),
            RecuentoPlaquetas: new FormControl(''),
            RecuentoGlobulosRojos: new FormControl(''),
            RecuentoGlobulosBlancos: new FormControl(''),
            ConstantesCorpusculares: new FormControl(''),
            CompatibilidadSanguinea: new FormControl(''),
            GrupoSanguineo: new FormControl(''),
            ProteinaCReactiva: new FormControl(''),
            ReaccionWidal: new FormControl(''),
            FactorReumatoide: new FormControl(''),
            RPR: new FormControl(''),
            VIH: new FormControl(''),
            AntigenoSuperficieHepatitisB: new FormControl(''),
            BHGG: new FormControl(''),
            Antiestreptolisinas: new FormControl(''),
            antigenoFebrilBrucela: new FormControl(''),
            Covid: new FormControl(''),
            glucosa: new FormControl(''),
            ColesterolTotal: new FormControl(''),
            Trigliceridos: new FormControl(''),
            Urea: new FormControl(''),
            Creatinina: new FormControl(''),
            TGO: new FormControl(''),
            TGP: new FormControl(''),
            BilirrubinasTotal: new FormControl(''),
            ProteinasTotales: new FormControl(''),
            Albumina: new FormControl(''),
            FosfatasaAlcalina: new FormControl(''),

            ExParasitologiaDirecto: new FormControl(''),
            ExParasitologiaSeriado: new FormControl(''),
            TestGraham: new FormControl(''),
            Coprofuncional: new FormControl(''),
            ThevenonHeces: new FormControl(''),
            ReaccionInflamatoria: new FormControl(''),

            ExamenComplentoOrina: new FormControl(''),
            SedimientoUrinario: new FormControl(''),
            ProteinuriaCC: new FormControl(''),
            TestAcidoSulfosalicilico: new FormControl(''),
            ExamenDirSecrecion: new FormControl(''),
        })
    }

    add() {
        // this.formSolicitudLab.get('hemoglobina').setValue(this.formSolicitudLab.value.hemoglobina);
        console.log("sdsd", this.formSolicitudLab.value.hemoglobina)
        console.log("sdsd", this.formSolicitudLab.value.Hematocrito)
        console.log("sdsd", this.formSolicitudLab.value.HemogCompleto)
    }
}
