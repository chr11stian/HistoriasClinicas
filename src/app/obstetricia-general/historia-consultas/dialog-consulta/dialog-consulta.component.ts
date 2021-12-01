import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dialog-consulta',
    templateUrl: './dialog-consulta.component.html',
    styleUrls: ['./dialog-consulta.component.css']
})
export class DialogConsultaComponent implements OnInit {

    form: FormGroup;
    prueba: any[];
    isUpdate: boolean = false;
    listaSituacion = [
        { name: "Longitudinal", code: "1" },
        { name: "Transversal", code: "2" },
        { name: "No Aplica", code: "3" },
    ];
    listaPresentacion = [
        { name: "Cefalica", code: "1" },
        { name: "Pelvica", code: "2" },
        { name: "No Aplica", code: "3" },
    ];
    listaPosicion = [
        { name: "Derecha", code: "1" },
        { name: "Izquierda", code: "2" },
        { name: "No Aplica", code: "3" },
    ];

    constructor(
        private fb: FormBuilder,
        private ref: DynamicDialogRef,
    ) {
        this.prueba = [{
            tratamientos: "Tomar paracetamol 500mg",
            diagnostico: "Presenta sintomas de alerta",
        },
        {
            tratamientos: "Mantener Reposo",
            diagnostico: "Presenta sintomas leves",
        },
        {
            tratamientos: "Tomar paracetamol 500mg",
            diagnostico: "Presenta sintomas de peligro",
        },
        {
            tratamientos: "Tomar paracetamol 500mg",
            diagnostico: "Presenta sintomas leves",
        }]
    }

    ngOnInit(): void {
        this.inicializarForm();
    }

    inicializarForm() {
        this.form = this.fb.group({
            fecha: new FormControl(""),
            edad: new FormControl(""),
            nroAtencion: new FormControl(""),
            nroControlSis: new FormControl(""),
            direccion: new FormControl(""),

            psicoProfilaxis: new FormControl(""),
            fechaPsicoProfilaxis: new FormControl(""),

            //funciones biologicas
            apetito: new FormControl(""),
            sed: new FormControl(""),
            sueño: new FormControl(""),
            estadoAnimo: new FormControl(""),
            orina: new FormControl(""),
            deposiciones: new FormControl(""),

            //funciones vitales
            temperatura: new FormControl(""),
            presionSis: new FormControl(""),//sistolica y diastoloica
            presionDias: new FormControl(""),
            fc: new FormControl(""),
            fr: new FormControl(""),
            peso: new FormControl(""),
            talla: new FormControl(""),
            imc: new FormControl(""),

            //interrogatorio
            motivoConsulta: new FormControl(""),
            tiempoEnfermedad: new FormControl(""),
            interrogatorioOtro: new FormControl(""),
            examenFisicoObservaciones: new FormControl(""),

            //examen fisico items
            piel: new FormControl(""),
            mucosas: new FormControl(""),
            cabeza: new FormControl(""),
            cuello: new FormControl(""),
            cardioVascular: new FormControl(""),
            pulmones: new FormControl(""),
            mamas: new FormControl(""),
            pezones: new FormControl(""),
            abdomen: new FormControl(""),
            examenFisicoOtro: new FormControl(""),

            //examen Obstetrico
            alturaUterina: new FormControl(""),
            selectSitiacion: new FormControl(""),
            selectPresentacion: new FormControl(""),
            listaPosicion: new FormControl(""),
            fetal: new FormControl(""),
            clinico: new FormControl(""),
            movimientoFetal: new FormControl(""),
            latidosCardiacosFetales: new FormControl(""),
            miembrosInferiores: new FormControl(""),
            osteotendinoso: new FormControl(""),
            genitalesExter: new FormControl(""),
            vagina: new FormControl(""),
            cuelloUterino: new FormControl(""),
        });
    }
    boton(){
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 5000,
            
        })
    }
    closeDialog() {
        this.ref.close();
    }

}
