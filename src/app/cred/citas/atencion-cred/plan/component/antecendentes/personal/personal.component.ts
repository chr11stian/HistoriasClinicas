import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, Validators, FormControl} from '@angular/forms';
import {AntecedentesService} from '../../../services/antecedentes/antecedentes.service';
import {AntecedentesPersonalesFormType} from '../../models/antecedentes.interface';
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {dato} from "../../../../../models/data";

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
    @Output() personalEmit: EventEmitter<AntecedentesPersonalesFormType> = new EventEmitter<AntecedentesPersonalesFormType>();

    stateOptions: any[];
    stateOptions1: any[];
    personalFG: FormGroup;
    nroDoc: string = ''
    attributeLocalS = 'documento'
    data: dato
    antecedentes: Antecedentes;
    hayDatos:boolean=false;

    constructor(private formBuilder: FormBuilder,
                private antecedentesService: AntecedentesService,
                private route: ActivatedRoute,
                private router: Router) {
        this.buildForm();
        this.stateOptions = [{label: 'SI', value: true},
            {label: 'NO', value: false}];

        this.stateOptions1 = [{label: '1m', value: 1},
            {label: '5m', value: 5}];


    }

    getFC(control: string): AbstractControl {
        return this.personalFG.get(control)
    }

    buildForm(): void {
        this.personalFG = this.formBuilder.group({
            patologiasE1: [''],
            patologiasE2: [''],
            normalE: [null],
            complicadoE: [null],
            nroE1: [''],
            atencionPrenaE: [true],
            nroE2: [''],
            lugarApn: [''],

            patologiasP: [''],
            partoE: [true],
            complicadoP: [false],
            eessP: [true],
            domicilioP: [false],
            consultaPP: [false],
            profSaludP: [true],
            tecnicoP: [false],
            acsP: [false],
            familiarP: [false],
            otroP: [false],
            otroDetalleP: [''],
            edadN: [''],
            pesoN: [''],
            tallaN: [''],
            perimetroCefaN: [''],
            perimetroTorN: [''],
            inmediatoN: [true],
            apgarN: [true],
            reanimacionN: [false],
            patologiaNeoN: [false],
            detallePatologiaN: [''],
            hospitalizacionN: [true],
            tiempoHospN: [''],
            lmeA: [true],
            mixtaA: [false],
            ArtificialA: [false],
            iniAlimentacionC: [''],
            suplementoFe: [false],
            menor2anios: [true],
            tbcP: [false],
            asmaP: [false],
            epilepsiaP: [false],
            infeccionesP: [false],
            hospitalizPato: [false],
            transSangp: [false],
            cirugiaP: [false],
            alergiaMediP: [false],
            detalleAlergiaMed: [''],
            otrosAntP: [false],
            detalleOtrosAntP: [''],
        })
    }

    recuperarDatos() {
        this.antecedentesService.getAntecedentesPersonales(this.nroDoc).subscribe((r: any) => {
            this.antecedentes = r.object;
            console.log('object', r.object);
            console.log('antecedentes', this.antecedentes)
            if(this.antecedentes!=null){this.hayDatos=true}
        })
    }

    getQueryParams(): void {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.nroDoc = this.data.nroDocumento
        // this.route.queryParams
        //     .subscribe(params => {
        //         this.nroDoc = params['nroDoc']
        //     })
    }

    ngOnInit(): void {
        this.getQueryParams()
        this.recuperarDatos();
    }

    cambio(e, nombre: string) {
        console.log(e.value, nombre);
        this.getFC(nombre).setValue(!e.value)
    }

    cambio2(e, nombre1: string, nombre2: string) {
        if (this.getFC(nombre1).value === false && this.getFC(nombre2).value === false) {
            return
        }
        if (e.value === false) {
            return
        }

        this.getFC(nombre1).setValue(!e.value)
        this.getFC(nombre2).setValue(!e.value)
    }

    cambio3(e, nombre1: string, nombre2: string, nombre3: string, nombre4: string) {
        if (this.getFC(nombre1).value === false && this.getFC(nombre2).value === false && this.getFC(nombre3).value === false && this.getFC(nombre4).value === false) {
            return
        }
        if (e.value === false) {
            return
        }
        this.getFC(nombre1).setValue(!e.value)
        this.getFC(nombre2).setValue(!e.value)
        this.getFC(nombre3).setValue(!e.value)
        this.getFC(nombre4).setValue(!e.value)
    }

    cambio4(e, nombre1: string, nombre2: string, nombre3: string) {
        if (this.getFC(nombre1).value === false && this.getFC(nombre2).value === false && this.getFC(nombre3).value === false) {
            return
        }
        if (e.value === false) {
            return
        }
        this.getFC(nombre1).setValue(!e.value)
        this.getFC(nombre2).setValue(!e.value)
        this.getFC(nombre3).setValue(!e.value)
    }

    save() {
        let aux: Antecedentes = {
            embarazo: {
                tipoEmbarazo: this.getFC('normalE').value ? 'Normal' : 'Complicado',
                patologiaDuranteGestacion: this.getFC('patologiasE1').value,
                nroEmbarazo: this.getFC('nroE1').value,
                atencionPrenatal: this.getFC('atencionPrenaE').value,
                nroAP: this.getFC('nroE2').value,
                lugarApn: this.getFC('lugarApn').value
            },
            parto: {
                tipoParto: !this.getFC('complicadoP').value ? 'Eptopico' : 'Complicado',
                complicacionesDelParto: this.getFC('patologiasP').value,
                lugarParto: this.getFC('eessP').value ? 'EE.SS' : (this.getFC('domicilioP').value ? 'Domicilio' : 'Consulta'),
                atendidoPor: this.getFC('profSaludP').value ? 'Profesional' : (this.getFC('tecnicoP').value ? 'Tecnico' : (this.getFC('acsP').value ? 'ACS' : (this.getFC('familiarP').value ? 'Familiar' : this.getFC('otroDetalleP').value)))
            },
            nacimiento: {
                edadGestacionalAlNacer: this.getFC('edadN').value,
                pesoAlNacer: this.getFC('pesoN').value,
                tallaAlNacer: this.getFC('tallaN').value,
                perimetroCefalico: this.getFC('perimetroCefaN').value,
                perimetroToracico: this.getFC('perimetroTorN').value,
                respiracionLlantoNacerInmediato: this.getFC('inmediatoN').value,
                apgar: this.getFC('apgarN').value ? 1 : 5,
                reanimacion: this.getFC('reanimacionN').value,
                patologiaNeonatal: this.getFC('patologiaNeoN').value,
                especifique: this.getFC('detallePatologiaN').value,
                hospitalizacion: this.getFC('hospitalizacionN').value,
                tiempoHospitalizacion: {
                    anio: '',
                    mes: '',
                    dia: this.getFC('tiempoHospN').value
                }
            },
            alimentacion: {
                LME: this.getFC('lmeA').value,
                mixta: this.getFC('mixtaA').value,
                artificial: this.getFC('ArtificialA').value,
                inicioAlimentacionComplemetaria: this.getFC('iniAlimentacionC').value,
                suplementoHierro: this.getFC('suplementoFe').value,
                menosDosAnios: this.getFC('menor2anios').value
            },
            patologias: [
                {
                    codigo: "PATOLOGIA_1",
                    nombre: "TBC",
                    valor: this.getFC('tbcP').value
                },
                {
                    codigo: "PATOLOGIA_2",
                    nombre: "SOBA/ Asma",
                    valor: this.getFC('asmaP').value
                },
                {
                    codigo: "PATOLOGIA_3",
                    nombre: "Epilepsia",
                    valor: this.getFC('epilepsiaP').value
                },
                {
                    codigo: "PATOLOGIA_4",
                    nombre: "Infecciones",
                    valor: this.getFC('infeccionesP').value
                },
                {
                    codigo: "PATOLOGIA_5",
                    nombre: "Hospitalizaciones",
                    valor: this.getFC('hospitalizPato').value
                },
                {
                    codigo: "PATOLOGIA_6",
                    nombre: "Tranfusiones Sangre",
                    valor: this.getFC('transSangp').value
                },
                {
                    codigo: "PATOLOGIA_7",
                    nombre: "Cirugía",
                    valor: this.getFC('cirugiaP').value
                },
                {
                    codigo: "PATOLOGIA_8",
                    nombre: "Alegia a Medicamentos",
                    valor: this.getFC('alergiaMediP').value
                }
            ],
            otroAntecedentes: this.getFC('detalleOtrosAntP').value
        }
        if(this.hayDatos==false){
            this.antecedentesService.addAntecedentesPersonales(this.nroDoc, aux).subscribe(
                (resp) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Guardo el registro con correctamente',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            )
        }
        else{
            this.antecedentesService.updateAntecedentesPersonales(this.nroDoc, aux).subscribe(
                (resp) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado correctamente',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            )
        }
    }
    limpiar() {
        this.personalFG.reset();
    }
}

export interface Antecedentes {
    embarazo: Embarazo;
    parto: Parto;
    nacimiento: Nacimiento;
    alimentacion: Alimentacion;
    patologias: Patologia[];
    otroAntecedentes: string;
}

export interface Alimentacion {
    LME: string;
    mixta: string,
    artificial: string,
    inicioAlimentacionComplemetaria: string;
    suplementoHierro: boolean;
    menosDosAnios: boolean;
}

export interface Embarazo {
    tipoEmbarazo: string;
    patologiaDuranteGestacion: string;
    nroEmbarazo: number;
    atencionPrenatal: boolean;
    nroAP: number;
    lugarApn: string;
}

export interface Nacimiento {
    edadGestacionalAlNacer: number;
    pesoAlNacer: number;
    tallaAlNacer: number;
    perimetroCefalico: number;
    perimetroToracico: number;
    respiracionLlantoNacerInmediato: boolean;
    apgar: number;
    reanimacion: boolean;
    patologiaNeonatal: boolean;
    especifique: string;
    hospitalizacion: boolean;
    tiempoHospitalizacion: TiempoHospitalizacion;
}

export interface TiempoHospitalizacion {
    anio: string;
    mes: string;
    dia: string;
}

export interface Parto {
    tipoParto: string;
    complicacionesDelParto: string;
    lugarParto: string;
    atendidoPor: string;
}

export interface Patologia {
    codigo: string;
    nombre: string;
    valor: boolean;
}
