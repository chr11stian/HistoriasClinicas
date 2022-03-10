import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, Validators, FormControl} from '@angular/forms';
import {AntecedentesService} from '../../../services/antecedentes/antecedentes.service';
import {AntecedentesPersonalesFormType} from '../../models/antecedentes.interface';
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {dato, PatologiasGestacion, AntecedentesPerinatales, antecedentesPatologicos} from "../../../../../models/data";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
    @Output() personalEmit: EventEmitter<AntecedentesPersonalesFormType> = new EventEmitter<AntecedentesPersonalesFormType>();
    datePipe = new DatePipe('en-US');
    stateOptions: any[];
    stateOptions1: any[];
    personalFG: FormGroup;
    formAcuerdos: FormGroup
    nroDoc: string = ''
    attributeLocalS = 'documento'
    data: dato
    antecedentes: AntecedentesPerinatales;
    hayDatos: boolean = false;
    dialogAcuerdos: boolean;

    patalogias: PatologiasGestacion[] = []
    isUpdate: boolean
    listPatologias: antecedentesPatologicos[] = []
    list: boolean = false

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

    nombre: string;
    fecha: Date;
    cie10: string;

    buildForm(): void {
        this.formAcuerdos = this.formBuilder.group({
            nombre: new FormControl("", []),
            fecha: new FormControl("", []),
            cie10: new FormControl("", []),
        });
        this.personalFG = this.formBuilder.group({
            patologiasE1: [''],
            patologiasE2: [''],
            normalE: [null],
            complicadoE: [null],
            nroE1: [''],
            atencionPrenaE: [false],
            nroE2: [''],
            lugarApn: [''],

            patologiasP: [''],
            partoE: [false],
            complicadoP: [false],
            eessP: [false],
            domicilioP: [false],
            consultaPP: [false],
            profSaludP: [false],
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
            inmediatoN: [false],
            apgarN: [false],
            reanimacionN: [false],
            patologiaNeoN: [false],
            detallePatologiaN: [''],
            hospitalizacionN: [false],
            tiempoHospN: [''],
            lmeA: [false],
            mixtaA: [false],
            ArtificialA: [false],
            iniAlimentacionC: [''],
            suplementoFe: [false],
            menor2anios: [false],
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
            patologia: [''],
        })
    }

    openAcuerdo() {
        this.formAcuerdos.reset();
        this.formAcuerdos.get('nombre').setValue("");
        this.formAcuerdos.get('cie10').setValue("");
        this.dialogAcuerdos = true;
    }

    saveAcuerdo() {
        //this.isUpdate = false;
        let a: PatologiasGestacion = {
            nombre: this.formAcuerdos.value.nombre,
            fecha: this.datePipe.transform(this.formAcuerdos.value.fecha, 'yyyy-MM-dd'),
            cie10: this.formAcuerdos.value.cie10
        }
        this.patalogias.push(a)

        //console.log("acuerdos", this.acuerdosComprimisos)
        Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
        })
        this.dialogAcuerdos = false;
    }

    recuperarDatos() {
        this.antecedentesService.getAntecedentesPersonales(this.nroDoc).subscribe((r: any) => {
            this.antecedentes = r.object;
            if (this.antecedentes != null) {
                this.personalFG.get('normalE').setValue(this.antecedentes.embarazo.tipoEmbarazo)
                this.patalogias = this.antecedentes.embarazo.listaPatologiasGestacion
                this.personalFG.get('nroE1').setValue(this.antecedentes.embarazo.nroEmbarazo)
                this.personalFG.get('atencionPrenaE').setValue(this.antecedentes.embarazo.atencionPrenatal)
                this.personalFG.get('nroE2').setValue(this.antecedentes.embarazo.nroAPN)
                this.personalFG.get('lugarApn').setValue(this.antecedentes.embarazo.lugarAPN)

                this.personalFG.get('complicadoP').setValue(this.antecedentes.parto.tipoParto)
                this.personalFG.get('patologiasP').setValue(this.antecedentes.parto.complicacionesDelParto)
                if (this.antecedentes.parto.lugarParto == 1)
                    this.personalFG.get('eessP').setValue(true)
                if (this.antecedentes.parto.lugarParto == 2)
                    this.personalFG.get('domicilioP').setValue(true)
                if (this.antecedentes.parto.lugarParto == 3)
                    this.personalFG.get('consultaPP').setValue(true)
                if (this.antecedentes.parto.atendidoPor == 1)
                    this.personalFG.get('profSaludP').setValue(true)
                if (this.antecedentes.parto.atendidoPor == 2)
                    this.personalFG.get('tecnicoP').setValue(true)
                if (this.antecedentes.parto.atendidoPor == 3)
                    this.personalFG.get('acsP').setValue(true)
                if (this.antecedentes.parto.atendidoPor == 4)
                    this.personalFG.get('familiarP').setValue(true)
                if (this.antecedentes.parto.atendidoPor == 5)
                    this.personalFG.get('otroP').setValue(true)
                this.personalFG.get('otroDetalleP').setValue(this.antecedentes.parto.atendidoPorOtro)

                this.personalFG.get('edadN').setValue(this.antecedentes.nacimiento.edadGestacionalAlNacer)
                this.personalFG.get('pesoN').setValue(this.antecedentes.nacimiento.pesoAlNacer)
                this.personalFG.get('tallaN').setValue(this.antecedentes.nacimiento.tallaAlNacer)
                this.personalFG.get('perimetroCefaN').setValue(this.antecedentes.nacimiento.perimetroCefalico)
                this.personalFG.get('perimetroTorN').setValue(this.antecedentes.nacimiento.perimetroToracico)
                this.personalFG.get('inmediatoN').setValue(this.antecedentes.nacimiento.respiracionLlantoNacerInmediato)
                this.personalFG.get('apgarN').setValue(this.antecedentes.nacimiento.apgar ? 1 : 5)
                this.personalFG.get('reanimacionN').setValue(this.antecedentes.nacimiento.reanimacion)
                this.personalFG.get('patologiaNeoN').setValue(this.antecedentes.nacimiento.patologiaNeonatal)
                this.personalFG.get('detallePatologiaN').setValue(this.antecedentes.nacimiento.especifique)
                this.personalFG.get('hospitalizacionN').setValue(this.antecedentes.nacimiento.hospitalizacion)
                this.personalFG.get('tiempoHospN').setValue(this.antecedentes.nacimiento.tiempoHospitalizacion)

                if (this.antecedentes.alimentacion.alimentacion == 1)
                    this.personalFG.get('lmeA').setValue(true)
                if (this.antecedentes.alimentacion.alimentacion == 2)
                    this.personalFG.get('mixtaA').setValue(true)
                if (this.antecedentes.alimentacion.alimentacion == 3)
                    this.personalFG.get('ArtificialA').setValue(true)
                this.personalFG.get('iniAlimentacionC').setValue(this.antecedentes.alimentacion.inicioAlimentacionComplementaria)
                this.personalFG.get('suplementoFe').setValue(this.antecedentes.alimentacion.suplementoFe)
            }
        })
        this.antecedentesService.getAntecedentesPersonalesPatologicos(this.nroDoc).subscribe((r: any) => {
            this.listPatologias = r.object.antecedentesPersonales
            if (this.listPatologias.length > 0) this.list = true
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
        let aux: AntecedentesPerinatales = {
            embarazo: {
                tipoEmbarazo: this.getFC('normalE').value,
                listaPatologiasGestacion: this.patalogias,
                nroEmbarazo: this.getFC('nroE1').value,
                atencionPrenatal: this.getFC('atencionPrenaE').value,
                nroAPN: this.getFC('nroE2').value,
                lugarAPN: this.getFC('lugarApn').value
            },
            parto: {
                tipoParto: this.getFC('complicadoP').value,
                complicacionesDelParto: this.getFC('patologiasP').value,
                lugarParto: this.getFC('eessP').value ? 1 : (this.getFC('domicilioP').value ? 2 : 3),
                atendidoPor: this.getFC('profSaludP').value ? 1 : (this.getFC('tecnicoP').value ? 2 : (this.getFC('acsP').value ? 3 : (this.getFC('familiarP').value ? 4 : 5))),
                atendidoPorOtro: this.getFC('otroDetalleP').value
            },
            nacimiento: {
                edadGestacionalAlNacer: this.getFC('edadN').value,
                pesoAlNacer: this.getFC('pesoN').value,
                tallaAlNacer: this.getFC('tallaN').value,
                perimetroCefalico: this.getFC('perimetroCefaN').value,
                perimetroToracico: this.getFC('perimetroTorN').value,
                respiracionLlantoNacerInmediato: this.getFC('inmediatoN').value,
                apgar: this.getFC('apgarN').value,
                reanimacion: this.getFC('reanimacionN').value,
                patologiaNeonatal: this.getFC('patologiaNeoN').value,
                especifique: this.getFC('detallePatologiaN').value,
                hospitalizacion: this.getFC('hospitalizacionN').value,
                tiempoHospitalizacion: this.getFC('tiempoHospN').value
            },
            alimentacion: {
                alimentacion: this.getFC('lmeA').value ? 1 : (this.getFC('mixtaA').value ? 2 : 3),
                inicioAlimentacionComplementaria: this.datePipe.transform(this.getFC('iniAlimentacionC').value, 'yyyy-MM-dd'),
                suplementoFe: this.getFC('suplementoFe').value
            },
        }
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


        if (this.list === false) {
            let auxp = {
                tipoDoc: this.nroDoc,
                nroDoc: this.nroDoc,
                nroHcl: this.nroDoc,
                antecedentesPersonales: this.listPatologias
            }
            this.antecedentesService.addAntecedentesPersonalesPatologicos(auxp).subscribe((r) => {
                console.log('se agrego')
            })
        } else {
            let auxp = {
                nroHcl: this.nroDoc,
                antecedentesPersonales: this.listPatologias
            }
            console.log('auxp',auxp)
            this.antecedentesService.updateAntecedentesPersonalesPatologicos(auxp).subscribe((r) => {
                console.log('se actualizo')
            })
        }
    }

    limpiar() {
        this.personalFG.reset();
    }


    cancelAcuerdo() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.dialogAcuerdos = false;
    }

    eliminarAcuerdo(index) {
        //this.acuerdosComprimisos.splice(index, 1)
    }

    editarAcuerdo(row, index) {
        //this.isUpdate3 = false;
        //this.bool3 = true;
        //this.index3 = index
        this.formAcuerdos.reset();
        this.formAcuerdos.get('descripcionAcuerdo').setValue(row.descripcionAcuerdo);
        this.dialogAcuerdos = true;
    }

    Agregar() {
        let a: antecedentesPatologicos = {
            nombre: this.personalFG.get('patologia').value,
            fechaDiagnosticado: '',
            edadAnio: 0,
            edadMes: 0,
            edadDia: 0
        }
        this.listPatologias.push(a)
        this.personalFG.get('patologia').setValue('')
    }
}

