import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
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
    @Output() onPersonal:EventEmitter<boolean>=new EventEmitter<boolean>();
    @Input() isEditable:boolean
    //aparte
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

    listaAntecedentes: any[] = [];
    patologias: PatologiasGestacion[] = []
    isUpdate: boolean
    listPatologias: string[] = []
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
        this.listaAntecedentes = [{codigo: 'ALERGIAS', value: 'ALERGIAS'},
            {codigo: 'EPILEPSIA', value: 'EPILEPSIA'},
            {codigo: 'DIABETES', value: 'DIABETES'},
            {codigo: 'ENFERMEDADES CONGÉNITAS', value: 'ENFERMEDADES CONGÉNITAS'},
            {codigo: 'EMBARAZO MÚLTIPLE', value: 'EMBARAZO MÚLTIPLE'},
            {codigo: 'MALARIA', value: 'MALARIA'},
            {codigo: 'HIPERTENSION ARTERIAL', value: 'HIPERTENSION ARTERIAL'},
            {codigo: 'HIPOTIROIDISMO', value: 'HIPOTIROIDISMO'},
            {codigo: 'NEOPLÁSICA', value: 'NEOPLÁSICA'},
            {codigo: 'TBC PULMONAR', value: 'TBC PULMONAR'},
            {codigo: 'SOBA/ASMA BRONQUIAL', value: 'SOBA/ASMA BRONQUIAL'},
            {codigo: 'ANEMIA', value: 'ANEMIA'},
            {codigo: 'ARTRITIS', value: 'ARTRITIS'},
            {codigo: 'CÁNCER', value: 'CÁNCER'},
            {codigo: 'CARDIOPATÍAS', value: 'CARDIOPATÍAS'},
            {codigo: 'ARTERIOESCLEROSIS', value: 'ARTERIOESCLEROSIS'},
            {codigo: 'SIFILIS', value: 'SIFILIS'},
            {codigo: 'BLENORRAGIA', value: 'BLENORRAGIA'},
            {codigo: 'VIH/SIDA', value: 'VIH/SIDA'},
            {codigo: 'REUMATISMO', value: 'REUMATISMO'},
            {codigo: 'DISLIPIDEMIAS', value: 'DISLIPIDEMIAS'},
            {codigo: 'ALCOHOLISMO', value: 'ALCOHOLISMO'},
            {codigo: 'ABORTO HABITUAL/RECURRENTE', value: 'ABORTO HABITUAL/RECURRENTE'},
            {codigo: 'VIOLENCIA', value: 'VIOLENCIA'},
            {codigo: 'CIRUGÍA PÉLVICA UTERINA', value: 'CIRUGÍA PÉLVICA UTERINA'},
            {codigo: 'ECLAMPSIA', value: 'ECLAMPSIA'},
            {codigo: 'PRE ECLAMPSIA', value: 'PRE ECLAMPSIA'},
            {codigo: 'HEMORRAGIA POSTPARTO', value: 'HEMORRAGIA POSTPARTO'},
            {codigo: 'ALERGIA A MEDICAMENTOS', value: 'ALERGIA A MEDICAMENTOS'},
            {codigo: 'ENFERMEDADES CONGÉNITAS', value: 'ENFERMEDADES CONGÉNITAS'},
            {codigo: 'ENFERMEDADES INFECCIOSAS', value: 'ENFERMEDADES INFECCIOSAS'},
            {codigo: 'CONSUMO DE HOJA DE COCA', value: 'CONSUMO DE HOJA DE COCA'},
            {codigo: 'CONSUMO DE DROGAS', value: 'CONSUMO DE DROGAS'},
            {codigo: 'CONSUMO DE TABACO', value: 'CONSUMO DE TABACO'},
            {codigo: 'INFERTILIDAD', value: 'INFERTILIDAD'},
            {codigo: 'PARTO PROLONGADO', value: 'PARTO PROLONGADO'},
            {codigo: 'PREMATURIDAD', value: 'PREMATURIDAD'},
            {codigo: 'RETENCION DE PLACENTA', value: 'RETENCION DE PLACENTA'},
            {codigo: 'TRANSTORNOS MENTALES', value: 'TRANSTORNOS MENTALES'},
            {codigo: 'HOSPITALIZACIONES', value: 'HOSPITALIZACIONES'},
            {codigo: 'TRANSFUSIONES SANGUINEAS', value: 'TRANSFUSIONES SANGUINEAS'},
            {codigo: 'OTRAS CIRUGIAS', value: 'OTRAS CIRUGIAS'},
            {codigo: 'CIRUGÍA PÉLVICA UTERINA', value: 'CIRUGÍA PÉLVICA UTERINA'},
            {codigo: 'HEPATITIS B', value: 'HEPATITIS B'},
        ]

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
            nroE1: new FormControl(''),
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
            edadN: new FormControl('',Validators.required),
            pesoN: [''],
            tallaN: [''],
            perimetroCefaN: [''],
            perimetroTorN: [''],
            inmediatoN: [false],
            apgar1m: [''],
            apgar5m: [''],
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
        this.patologias.push(a)

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
                this.patologias = this.antecedentes.embarazo.listaPatologiasGestacion
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
                this.personalFG.get('apgar1m').setValue(this.antecedentes.nacimiento.apgar1)
                this.personalFG.get('apgar5m').setValue(this.antecedentes.nacimiento.apgar5)
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
            if (r.cod!='2402'){
                console.log('depurando',r)
                this.listPatologias = r.object.antecedentesPersonales
                if (this.listPatologias.length > 0) this.list = true

            }
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
        console.log('isEditable',this.isEditable);
        
        if(!this.isEditable){
            this.getFC('edadN').disable()
        }
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
        console.log(this.getFC('edadN').invalid)
        let aux: AntecedentesPerinatales = {
            embarazo: {
                tipoEmbarazo: this.getFC('normalE').value,
                listaPatologiasGestacion: this.patologias,
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
                apgar1: this.getFC('apgar1m').value,
                apgar5: this.getFC('apgar5m').value,
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
                    title: 'Guardo el registro correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.onPersonal.emit(true)
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
            console.log('auxp', auxp)
            this.antecedentesService.addAntecedentesPersonalesPatologicos(auxp).subscribe((r) => {
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
        this.patologias.splice(index, 1)
    }

    eliminarAntecedente(index) {
        this.listPatologias.splice(index, 1)
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
        if(this.personalFG.get('patologia').value==''){
            return
        }

        if (this.listPatologias.find((rol) => rol === this.personalFG.value.patologia.value) === undefined)
            this.listPatologias.push(this.personalFG.value.patologia.value);
        console.log(this.listPatologias)
        //this.listPatologias.push(this.personalFG.value.patologia.value)
        this.personalFG.get('patologia').setValue('')
    }

    filterItems(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;

        this.listaAntecedentes.map((item: any) => {
            if (item.value.toLowerCase().indexOf(query.toLowerCase()) == 0)
                filtered.push(item)
        })

        this.listaAntecedentes = filtered;
    }
}

