import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core"
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms"
import {DatosGeneralesService} from "../../services/datos-generales/datos-generales.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {dato} from "../../../../models/data";

@Component({
    selector: "app-datos-generales",
    templateUrl: "./datos-generales.component.html",
    styleUrls: ["./datos-generales.component.css"],
})
export class DatosGeneralesComponent implements OnInit {
    @Input() isFirstConsulta=false
    @Output() onChangeIndice:EventEmitter<number>=new EventEmitter<number>();

    form: FormGroup
    data: dato
    attributeLocalS = 'documento'
    options: string[]
    stateOptions: any[]
    stateOptions1: any[]
    stateOptions2: any[]

    generalInfoFG: FormGroup
    apoderadoInfoFG: FormGroup

    respuestaDatosGenerales: DatosGenerales
    edad: string = ''
    nroDoc: string = ''

    /** Get one form control*/
    getGeneralInfoFC(control: string): AbstractControl {
        return this.generalInfoFG.get(control)
    }

    /** Get Value Form Control */
    valueGeneralInfoFC(control: string): any {
        return this.getGeneralInfoFC(control).value
    }

    /** Set Value Form Control */
    setValueGeneralInfoFC(formControl: string, value: any) {
        this.getGeneralInfoFC(formControl).setValue(value)
    }

    constructor(private DatosGeneralesService: DatosGeneralesService, private route: ActivatedRoute,
                private router: Router) {
        this.buildForm()
        this.options = ["SIN ESTUDIOS",
            "PRIMARIA",
            "PRIMARIA INCOMPLETA",
            "SECUNDARIA",
            "SECUNDARIA INCOMPLETA",
            "SUPERIOR"
        ]
        this.stateOptions = [
            {label: "M", value: true},
            {label: "F", value: false},
        ]
        this.stateOptions1 = [
            {label: "GS", value: true},
            {label: "NO", value: false},
        ]
        this.stateOptions2 = [
            {label: "RH", value: true},
            {label: "NO", value: false},
        ]
    }

    ngOnInit(): void {
    }

    buildForm(): void {
        this.getQueryParams()
        this.build();
        this.recuperarInformacion()
    }

    getQueryParams(): void {
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.nroDoc = this.data.nroDocumento
        /*this.route.queryParams
            .subscribe(params => {
                this.nroDoc = params['nroDoc']
            })*/
    }

    build() {
        this.generalInfoFG = new FormGroup({
            nombre: new FormControl({value: '', disabled: false}, [Validators.required]),
            apellidos: new FormControl({value: '', disabled: false}, [Validators.required]),
            sexo: new FormControl({value: null, disabled: false}),
            lugar: new FormControl({value: '', disabled: false}, [Validators.required]),
            fechaNacimiento: new FormControl({value: null, disabled: false}, [Validators.required]),
            domicilio: new FormControl({value: '', disabled: false}, [Validators.required]),
            dni: new FormControl({value: '', disabled: false}, [Validators.required]),
            GS: new FormControl({value: '', disabled: false}, [Validators.required]),
            RH: new FormControl({value: 'null', disabled: false}, [Validators.required]),
            gradoInstruccion: new FormControl({value: 'null', disabled: false}, [Validators.required]),
            centroEducativo: new FormControl({value: 'null', disabled: false}, [Validators.required])
        })

        this.apoderadoInfoFG = new FormGroup({
            gradoInstruccionMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            nombreMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            estadoMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            telefonoMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            edadMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            dniMadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            codigoMadre: new FormControl({value: null, disabled: false}),
            codigoAfiliacionMadre: new FormControl({value: '', disabled: false}, [Validators.required]),

            gradoInstruccionPadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            estadoPadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            telefonoPadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            nombrePadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            edadPadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            dniPadre: new FormControl({value: '', disabled: false}, [Validators.required]),
            codigoPadre: new FormControl({value: null, disabled: false}),
            codigoAfiliacionPadre: new FormControl({value: '', disabled: false}, [Validators.required])
        })
    }

    recuperarInformacion() {
        this.DatosGeneralesService.getDatosGenerales(this.nroDoc).subscribe((r: any) => {
            this.respuestaDatosGenerales = r.object
            console.log('respuestas---->>>>>>>', this.respuestaDatosGenerales)
            this.edad = this.respuestaDatosGenerales.edad.anio + ' años ' + this.respuestaDatosGenerales.edad.mes + ' meses ' + this.respuestaDatosGenerales.edad.dia + 'dias'
            console.log('datos generales ', this.respuestaDatosGenerales)
            this.generalInfoFG.get('nombre').setValue(this.respuestaDatosGenerales.nombres)
            this.generalInfoFG.get('apellidos').setValue(this.respuestaDatosGenerales.apellidos)
            this.generalInfoFG.get('sexo').setValue(this.respuestaDatosGenerales.sexo)
            this.generalInfoFG.get('lugar').setValue(this.respuestaDatosGenerales.lugarNacimiento)
            let date: Date = new Date(this.respuestaDatosGenerales.fechaNacimiento)
            this.generalInfoFG.get('fechaNacimiento').setValue(date)
            this.generalInfoFG.get('domicilio').setValue(this.respuestaDatosGenerales.domicilio)
            this.generalInfoFG.get('centroEducativo').setValue(this.respuestaDatosGenerales.centroEducativo)
            this.generalInfoFG.get('dni').setValue(this.respuestaDatosGenerales.nroDoc)
            this.generalInfoFG.get('GS').setValue(this.respuestaDatosGenerales.gs === null ? '' : this.respuestaDatosGenerales.gs)
            this.generalInfoFG.get('RH').setValue(this.respuestaDatosGenerales.rh === null ? '' : this.respuestaDatosGenerales.rh)
            this.generalInfoFG.get('gradoInstruccion').setValue(this.respuestaDatosGenerales.gradoInstruccion)

            if (this.respuestaDatosGenerales.responsable) {
                this.apoderadoInfoFG.get('nombreMadre').setValue(this.respuestaDatosGenerales.responsable[1].nombreApellidosMadrePadre_tutor),
                    this.apoderadoInfoFG.get('estadoMadre').setValue(this.respuestaDatosGenerales.responsable[1].estadoCivil),
                    this.apoderadoInfoFG.get('telefonoMadre').setValue(this.respuestaDatosGenerales.responsable[1].telefono),
                    this.apoderadoInfoFG.get('edadMadre').setValue(this.respuestaDatosGenerales.responsable[1].edad),
                    this.apoderadoInfoFG.get('dniMadre').setValue(this.respuestaDatosGenerales.responsable[1].nroDoc),
                    this.apoderadoInfoFG.get('codigoMadre').setValue(this.respuestaDatosGenerales.responsable[1].tipoSeguro),
                    this.apoderadoInfoFG.get('gradoInstruccionMadre').setValue(this.respuestaDatosGenerales.responsable[1].gradoInstruccion),
                    this.apoderadoInfoFG.get('codigoAfiliacionMadre').setValue(this.respuestaDatosGenerales.responsable[1].codAfiliacionSeguro),
                    this.apoderadoInfoFG.get('nombrePadre').setValue(this.respuestaDatosGenerales.responsable[0].nombreApellidosMadrePadre_tutor),
                    this.apoderadoInfoFG.get('estadoPadre').setValue(this.respuestaDatosGenerales.responsable[0].estadoCivil),
                    this.apoderadoInfoFG.get('telefonoPadre').setValue(this.respuestaDatosGenerales.responsable[0].telefono),
                    this.apoderadoInfoFG.get('edadPadre').setValue(this.respuestaDatosGenerales.responsable[0].edad),
                    this.apoderadoInfoFG.get('dniPadre').setValue(this.respuestaDatosGenerales.responsable[0].nroDoc),
                    this.apoderadoInfoFG.get('codigoPadre').setValue(this.respuestaDatosGenerales.responsable[0].tipoSeguro),
                    this.apoderadoInfoFG.get('codigoAfiliacionPadre').setValue(this.respuestaDatosGenerales.responsable[0].codAfiliacionSeguro),
                    this.apoderadoInfoFG.get('gradoInstruccionPadre').setValue(this.respuestaDatosGenerales.responsable[0].gradoInstruccion)
            }
        })
    }
    guardarDatosGenerales(){
        this.save();

        this.onChangeIndice.emit(2);

    }

    save() {
        let auxResponsableP: responsable = {
            nombreApellidosMadrePadre_tutor: this.apoderadoInfoFG.value.nombrePadre,
            edad: this.apoderadoInfoFG.value.edadPadre,
            tipoDoc: 'dni',
            nroDoc: this.apoderadoInfoFG.value.dniPadre,
            tipoSeguro: this.apoderadoInfoFG.value.codigoPadre,
            codAfiliacionSeguro: this.apoderadoInfoFG.value.codigoAfiliacionPadre,
            gradoInstruccion: this.apoderadoInfoFG.value.gradoInstruccionPadre,
            ocupacion: '',
            estadoCivil: this.apoderadoInfoFG.value.estadoPadre,
            religion: '',
            telefono: this.apoderadoInfoFG.value.telefonoPadre
        }
        let auxResponsableM: responsable = {
            nombreApellidosMadrePadre_tutor: this.apoderadoInfoFG.value.nombreMadre,
            edad: this.apoderadoInfoFG.value.edadMadre,
            tipoDoc: 'dni',
            nroDoc: this.apoderadoInfoFG.value.dniMadre,
            tipoSeguro: this.apoderadoInfoFG.value.codigoMadre,
            codAfiliacionSeguro: this.apoderadoInfoFG.value.codigoAfiliacionMadre,
            gradoInstruccion: this.apoderadoInfoFG.value.gradoInstruccionMadre,
            ocupacion: '',
            estadoCivil: this.apoderadoInfoFG.value.estadoMadre,
            religion: '',
            telefono: this.apoderadoInfoFG.value.telefonoMadre
        }
        let auxResponsable: responsable[] = []
        auxResponsable.push(auxResponsableP)
        auxResponsable.push(auxResponsableM)

        let auxDataGeneral: DatosGenerales = {
            nroHistoriaClinica: this.respuestaDatosGenerales.nroHistoriaClinica,
            codSeguro: this.respuestaDatosGenerales.codSeguro,
            apellidos: this.respuestaDatosGenerales.apellidos,
            nombres: this.respuestaDatosGenerales.nombres,
            sexo: this.generalInfoFG.value.sexo,
            edad: this.respuestaDatosGenerales.edad,
            fechaNacimiento: this.respuestaDatosGenerales.fechaNacimiento,
            lugarNacimiento: this.generalInfoFG.value.lugar,
            domicilio: this.generalInfoFG.value.domicilio,
            tipoDoc: 'dni',
            nroDoc: this.respuestaDatosGenerales.nroDoc,
            gs: this.generalInfoFG.value.GS,
            rh: this.generalInfoFG.value.RH,
            gradoInstruccion: this.generalInfoFG.value.gradoInstruccion,
            centroEducativo: this.generalInfoFG.value.centroEducativo,
            responsable: auxResponsable
        }

        console.log('auxData ', auxDataGeneral)

        this.DatosGeneralesService.updateDataGeneral(this.nroDoc, auxDataGeneral)
            .subscribe(
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


export interface DatosGenerales {
    nroHistoriaClinica: string;
    codSeguro: string;
    apellidos: string;
    nombres: string;
    sexo: boolean;
    edad: Edad;
    fechaNacimiento: Date;
    lugarNacimiento: string;
    domicilio: string;
    tipoDoc: string;
    nroDoc: string;
    gs: string;
    rh: string;
    gradoInstruccion: string;
    centroEducativo: string;
    responsable: responsable[];
}

export interface responsable {
    nombreApellidosMadrePadre_tutor: string;
    edad: number;
    tipoDoc: string;
    nroDoc: string;
    tipoSeguro: boolean;
    codAfiliacionSeguro: string;
    gradoInstruccion: string;
    ocupacion: string;
    estadoCivil: string;
    religion: string;
    telefono: string;
}

export interface Edad {
    anio: number;
    mes: number;
    dia: number;
}
