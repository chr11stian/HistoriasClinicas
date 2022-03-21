import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatosGeneralesPartoService} from "./services/datos-generales-parto/datos-generales-parto.service";

@Component({
    selector: 'app-plan-parto',
    templateUrl: './plan-parto.component.html',
    styleUrls: ['./plan-parto.component.css']
})
export class PlanPartoComponent implements OnInit {
    formPlanParto: FormGroup;

    constructor(private form: FormBuilder,
                private datosGeneralesPartoService: DatosGeneralesPartoService,) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.formPlanParto = this.form.group({
            docIndentidad: new FormControl(''),
            apePaterno: new FormControl(''),
            apeMaterno: new FormControl(''),
            primerNombre: new FormControl(''),
            edad: new FormControl(''),
            HCL: new FormControl(''),
            GrupoSanguineo: new FormControl(''),
            FPP: new FormControl(''),
            direccionAnexo: new FormControl(''),
            EESS: new FormControl(''),
            MicroRed: new FormControl(''),
            Red: new FormControl(''),
            TelfEESS: new FormControl(''),
            FrecuenciaRadio: new FormControl(''),
            TelfComunidad: new FormControl(''),
        })
    }

    // consultaExistePlanParto() {
    //     this.datosGeneralesPartoService.getConsultaExistePlanParto(this.idRecuperado).subscribe((res: any) => {
    //         if (res.mensaje === "Se encontro un registro.") {
    //             console.log(res.mensaje);
    //             // this.getDatosGeneralesById();
    //         } else {
    //             // this.getpacienteByNroDoc();
    //         };
    //     })
    // }
    // getDatosGeneralesById() {
    //     this.datosGeneralesPartoService.getDatosGeneralesById(this.idRecuperado).subscribe((res: any) => {
    //         console.log('datos traidos por el plan de parto', res.object);
    //         let gestante = res.object;
    //         this.formPlanParto.get('nombreGestante').setValue(gestante.nombreGestante);
    //         this.formPlanParto.get('nroHistoria').setValue(gestante.nroHcl);
    //         this.formPlanParto.get('direccion').setValue(gestante.direccion);
    //         this.formPlanParto.get('edad').setValue(gestante.edad);
    //         this.formPlanParto.get('grupoSanguineo').setValue(gestante.grupoSanguineo);
    //         let myDate = gestante.fpp.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    //         // let newDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
    //         // this.formPlanParto.get('fpp').setValue(newDate);
    //         this.formPlanParto.get('direccionReferencia').setValue(gestante.referenciaDireccion);
    //         this.formPlanParto.get('eess').setValue(gestante.eess);
    //         this.formPlanParto.get('microRed').setValue(gestante.microRed);
    //         this.formPlanParto.get('red').setValue(gestante.nombreGestante);
    //         this.formPlanParto.get('telefonoEess').setValue(gestante.telefonoEess);
    //         this.formPlanParto.get('frecuenciaRadioEess').setValue(gestante.frecuenciaRadioEess);
    //         this.formPlanParto.get('telefonoComunidad').setValue(gestante.telefonoComunidad);
    //         this.formPlanParto.get('nombrePromotor').setValue(gestante.nombrePromotorSalud);
    //         this.formPlanParto.get('tiempoLlegarEess').setValue(gestante.tiempoLlegarEess);
    //     })
    // }



}
