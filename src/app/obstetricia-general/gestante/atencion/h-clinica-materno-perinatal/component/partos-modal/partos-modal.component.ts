import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'app-partos-modal',
    templateUrl: './partos-modal.component.html',
    styleUrls: ['./partos-modal.component.css']
})
export class PartosModalComponent implements OnInit {
    intervaloList = [{name: 'CADA 1 HORA', code: '1'},
        {name: 'CADA 2 HORAS', code: 'CADA 2 HORAS'},
        {name: 'CADA 3 HORAS', code: 'CADA 3 HORAS'},
        {name: 'CADA 4 HORAS', code: 'CADA 4 HORAS'},
        {name: 'CADA 5 HORAS', code: 'CADA 5 HORAS'},
        {name: 'CADA 6 HORAS', code: 'CADA 6 HORAS'},
        {name: 'CADA 8 HORAS', code: 'CADA 8 HORAS'},
        {name: 'CADA 12 HORAS', code: 'CADA 12 HORAS'},
        {name: 'CADA 24 HORAS', code: 'CADA 24 HORAS'},
        {name: 'CONDICIONAL A FIEBRE', code: 'CONDICIONAL A FIEBRE'},
        {name: 'DOSIS UNICA', code: 'DOSIS UNICA'},
        {name: 'CADA 48 HORAS', code: 'CADA 48 HORAS'}
    ];

    viaAdministracionList = [{name: 'ENDOVENOSA', code: 'ENDOVENOSA'},
        {name: 'INHALADORA',code: 'INHALADORA'},
        {name: 'INTRADERMICO',code: 'INTRADERMICO'},
        {name: 'INTRAMUSCULAR',code: 'INTRAMUSCULAR'},
        {name: 'NASAL',code: 'NASAL'},
        {name: 'OFTALMICO',code: 'OFTALMICO'},
        {name: 'ORAL',code: 'ORAL'},
        {name: 'OPTICO',code: 'OPTICO'},
        {name: 'RECTAL',code: 'RECTAL'},
        {name: 'SUBCUTANEO',code: 'SUBCUTANEO'},
        {name: 'SUBLINGUAL',code: 'SUBLINGUAL'},
        {name: 'TOPICO',code: 'TOPICO'},
        {name: 'VAGINAL',code: 'VAGINAL'},
    ];
    medicamento:{};
    medicamentoFG: FormGroup;

    constructor(public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,) {
        this.medicamento = config.data;
        // console.log(this.medicamento)
        // this.buildForm();
    }

    getFC(control: string): AbstractControl {
        return this.medicamentoFG.get(control);
    }
    getMedicamento(data:any){
        // if (this.medicacion != ' ') {
            this.getFC('medicamento').setValue(data.medicamento);
            this.getFC('cantidad').setValue(data.cantidad);
            this.getFC('dosis').setValue(data.dosis);
            this.getFC('intervalo').setValue(data.intervalo);
            this.getFC('viaAdministracion').setValue(data.viaAdministracion);
            this.getFC('duracion').setValue(data.duracion);
            this.getFC('indicacionAdicional').setValue(data.indicacionAdicional);
        // }
    }
    ngOnInit(): void {
        this.buildForm();
        this.getMedicamento(this.medicamento)
    }
    buildForm() {
        this.medicamentoFG = new FormGroup({
            medicamento: new FormControl("", Validators.required),
            cantidad: new FormControl("", Validators.required),
            dosis: new FormControl("", Validators.required),
            intervalo: new FormControl("", Validators.required),
            viaAdministracion: new FormControl("", Validators.required),
            duracion: new FormControl("", Validators.required),
            indicacionAdicional: new FormControl("", Validators.required),
        });
    }

    agregarActualizar() {
        const input={
            medicamento:this.getFC('medicamento').value,
            cantidad:this.getFC('cantidad').value,
            dosis:this.getFC('dosis').value,
            intervalo:this.getFC('intervalo').value,
            viaAdministracion:this.getFC('viaAdministracion').value,
            duracion:this.getFC('duracion').value,
            indicacionAdicional:this.getFC('indicacionAdicional').value,
        }
        this.ref.close(input)
    }
    close(){
        this.ref.close();
    }

}
