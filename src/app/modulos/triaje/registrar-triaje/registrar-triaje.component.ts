import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConsultasService} from 'src/app/obstetricia-general/gestante/atencion/consultorio-obstetrico/services/consultas.service';
import {ConsultaObstetriciaService} from 'src/app/obstetricia-general/gestante/consulta/services/consulta-obstetricia/consulta-obstetricia.service';
import {CuposTriajeService} from '../services/cupos-triaje/cupos-triaje.service';
import {image} from '../../../../assets/images/image.const';
import {imageNina} from '../../../../assets/images/imageNina.const';
import {imageNino} from '../../../../assets/images/imageNino.const';
import {PersonalService} from 'src/app/core/services/personal-services/personal.service';
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-registrar-triaje',
    templateUrl: './registrar-triaje.component.html',
    styleUrls: ['./registrar-triaje.component.css']
})
export class RegistrarTriajeComponent implements OnInit {
    formTriaje: FormGroup;
    triaje: Triaje;
    datosPersonales: any;
    idCupo: string;
    dataTriaje: any;
    imcOption: number;
    imagePath: string = image;
    dataPIDE: any;
    imc: any;
    ver = false;
    datePipe = new DatePipe('en-US');

    alertaTalta: boolean = false;
    alertaTbaja: boolean = false;
    alertaPAs: boolean = false;
    alertaPAd: boolean = false;
    alertaFR: boolean = false;
    alertaFC: boolean = false;

    constructor(
        private fb: FormBuilder,
        private dialog: DialogService,
        private triajeService: CuposTriajeService,
        private personalService: PersonalService,
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        private messageService: MessageService,
    ) {
        this.inicializarForm();
        console.log('data of listar ', config.data.data);
        this.datosPersonales = config.data.data;
        this.idCupo = this.datosPersonales.id;
        if (this.datosPersonales.paciente.edadAnio < 18) {
            if (this.datosPersonales.paciente.sexo == "FEMENINO")
                this.imagePath = imageNina;
            else
                this.imagePath = imageNino;
        } else {
            this.traerFoto();
        }
        if (config.data.option == 2) {
            this.ver = true;
            this.formTriaje.patchValue({temperatura: this.datosPersonales.funcionesVitales.temperatura});
            this.formTriaje.patchValue({presionSis: this.datosPersonales.funcionesVitales.presionSistolica});
            this.formTriaje.patchValue({presionDias: this.datosPersonales.funcionesVitales.presionDiastolica});
            this.formTriaje.patchValue({fc: this.datosPersonales.funcionesVitales.fc});
            this.formTriaje.patchValue({fr: this.datosPersonales.funcionesVitales.fr});
            this.formTriaje.patchValue({peso: this.datosPersonales.funcionesVitales.peso});
            this.formTriaje.patchValue({talla: this.datosPersonales.funcionesVitales.talla});
            this.calcularIMC();
            this.formTriaje.get("temperatura").disable();
            this.formTriaje.get("presionSis").disable();
            this.formTriaje.get("presionDias").disable();
            this.formTriaje.get("fc").disable();
            this.formTriaje.get("fr").disable();
            this.formTriaje.get("peso").disable();
            this.formTriaje.get("talla").disable();
        }
        if (config.data.option == 3) {
            this.formTriaje.patchValue({temperatura: this.datosPersonales.funcionesVitales.temperatura});
            this.formTriaje.patchValue({presionSis: this.datosPersonales.funcionesVitales.presionSistolica});
            this.formTriaje.patchValue({presionDias: this.datosPersonales.funcionesVitales.presionDiastolica});
            this.formTriaje.patchValue({fc: this.datosPersonales.funcionesVitales.fc});
            this.formTriaje.patchValue({fr: this.datosPersonales.funcionesVitales.fr});
            this.formTriaje.patchValue({peso: this.datosPersonales.funcionesVitales.peso});
            this.formTriaje.patchValue({talla: this.datosPersonales.funcionesVitales.talla});
            this.calcularIMC();
        }
    }

    onChangeTemperatura(){
        let temp=parseFloat(this.formTriaje.value.temperatura);
        if (temp<35){   
            this.alertaTbaja=true
            this.alertaTalta=false
        }
        else  {
            if (temp>=37.5){
                this.alertaTbaja=false
                this.alertaTalta=true
            }
            else {
                this.alertaTbaja=false
                this.alertaTalta=false
            }
        }
    }
    onChangePAs(){
        let temp=parseFloat(this.formTriaje.value.presionSis);
        if (temp>=140) this.alertaPAs=true
        else this.alertaPAs=false
    }
    onChangePAd(){
        let temp=parseFloat(this.formTriaje.value.presionDias);
        if (temp>90) this.alertaPAd=true
        else this.alertaPAd=false
    }
    onChangeFR(){
        let temp=parseFloat(this.formTriaje.value.fr);
        if (temp>100) this.alertaFR=true
        else this.alertaFR=false
    }
    onChangeFC(){
        let temp=parseFloat(this.formTriaje.value.fc);
        if (temp>22) this.alertaFC=true
        else this.alertaFC=false
    }
    traerFoto() {
        this.personalService.getDatosReniec(this.datosPersonales.paciente.nroDoc).subscribe((res: any) => {
            this.dataPIDE = res;
            console.log(res);
            this.imagePath = res.foto;
        });
    }

    ngOnInit(): void {
    }

    inicializarForm() {
        this.formTriaje = this.fb.group({
            temperatura: new FormControl(""),
            presionSis: new FormControl(""),//sistolica
            presionDias: new FormControl(""),//diastolica
            fc: new FormControl(""),
            fr: new FormControl(""),
            peso: new FormControl(""),
            talla: new FormControl(""),
        });
    }

    recuperarDatos() {
        this.triaje = {
            temperatura: parseFloat(this.formTriaje.value.temperatura),
            presionSistolica: parseInt(this.formTriaje.value.presionSis),
            presionDiastolica: parseInt(this.formTriaje.value.presionDias),
            fc: parseInt(this.formTriaje.value.fc),
            fr: parseInt(this.formTriaje.value.fr),
            peso: parseFloat(this.formTriaje.value.peso),
            talla: parseFloat(this.formTriaje.value.talla),
            imc: this.imc
        }
    }

    guardarTriaje() {
        this.recuperarDatos();
        console.log('data to show ', this.triaje);
        this.triajeService.postTriaje(this.idCupo, this.triaje).subscribe((res: any) => {
            Swal.fire({
                icon: 'success',
                title: 'Registro',
                text: 'Fue creado con exito',
                showConfirmButton: false,
                timer: 1500,
            })
            this.ref.close(this.triaje);
        });

    }

    closeDialog() {
        this.ref.close();
    }

    ponerEdadEnLetras() {
        let anios = this.datosPersonales.paciente.edadAnio;
        let meses = this.datosPersonales.paciente.edadMes;
        let dias = this.datosPersonales.paciente.edadDia;
        let cadena = ""
        if (anios > 1) {
            cadena += anios + " años,";
        } else {
            if (anios != 0)
                cadena += anios + " año,"
        }
        if (meses > 1) {
            cadena += meses + " meses, ";
        } else {
            cadena += meses + " mes, "
        }
        if (dias > 1) {
            cadena += dias + " dias";
        } else {
            cadena += dias + " dia"
        }
        return cadena;
    }

    loadData() {
        this.formTriaje.patchValue({temperatura: ''});
        this.formTriaje.patchValue({presionSis: ''});
        this.formTriaje.patchValue({presionDias: ''});
        this.formTriaje.patchValue({fc: ''});
        this.formTriaje.patchValue({fr: ''});
        this.formTriaje.patchValue({peso: ''});
        this.formTriaje.patchValue({talla: ''});
    }

    calcularIMC() {
        let pesoAux: number = this.formTriaje.value.peso;
        let tallaAux: number = (this.formTriaje.value.talla) * 0.01;
        let imc = pesoAux / (tallaAux * tallaAux)
        console.log('imc ', imc);
        if (imc < 18.5) {
            this.imcOption = 1
        }
        if (imc >= 18.5 && imc <= 24.9) {
            this.imcOption = 2
        }
        if (imc >= 25.0 && imc <= 29.9) {
            this.imcOption = 3
        }
        if (imc > 30) {
            this.imcOption = 4
        }
        this.imc = imc;
    }
}

interface Triaje {
    temperatura: number,
    presionSistolica: number,
    presionDiastolica: number,
    fc: number,
    fr: number,
    peso: number,
    talla: number,
    imc: number
}
