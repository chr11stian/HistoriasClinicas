import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, Validators, FormControl} from '@angular/forms';
import {AntecedenteFamiliarService} from 'src/app/cred/services/antecedentes/antecedente-familiar.service';
import {AntecedentesFamiliaresFormType, AntecedentesFamiliaresType} from '../../models/antecedentes.interface';
import {antecedentesFamiliares, dato} from "../../../../../models/data";
import {AntecedentesService} from "../../../services/antecedentes/antecedentes.service";
import Swal from "sweetalert2";
@Component({
    selector: 'app-familiar',
    templateUrl: './familiar.component.html',
    styleUrls: ['./familiar.component.css']
})
export class FamiliarComponent implements OnInit {
    @Output() onFamiliar:EventEmitter<boolean>=new EventEmitter<boolean>();
    @Input() isEditable:boolean
    //aparte
    @Output() familiarEmit: EventEmitter<AntecedentesFamiliaresFormType> = new EventEmitter<AntecedentesFamiliaresFormType>();
    familiarFG: FormGroup;
    nroDoc: string = ''
    attributeLocalS = 'documento'
    data: dato
    familiares: any[];
    stateOptions: any[];
    listaAntecedentes: any[] = [];

    datosFamiliares: AntecedentesFamiliaresType[];
    listPatologias: antecedentesFamiliares[] = []

    constructor(private formBuilder: FormBuilder,
                private familiarServicio: AntecedenteFamiliarService,
                private antecedentesService: AntecedentesService) {
        this.buildForm();
        this.stateOptions = [{label: 'SI', value: true},
            {label: 'NO', value: false}];
        this.familiares = [
            {name: 'Padre', code: 'Padre'},
            {name: 'Madre', code: 'Madre'},
            {name: 'Hermano', code: 'Hermano'},
            {name: 'Abuelo', code: 'Abuelo'},
            {name: 'Otro', code: 'Otro'}
        ];
        this.listaAntecedentes = [{name: 'ALERGIAS', code: 'ALERGIAS'},
            {name: 'EPILEPSIA', code: 'EPILEPSIA'},
            {name: 'DIABETES', code: 'DIABETES'},
            {name: 'ENFERMEDADES CONGÉNITAS', code: 'ENFERMEDADES CONGÉNITAS'},
            {name: 'EMBARAZO MÚLTIPLE', code: 'EMBARAZO MÚLTIPLE'},
            {name: 'MALARIA', code: 'MALARIA'},
            {name: 'HIPERTENSION ARTERIAL', code: 'HIPERTENSION ARTERIAL'},
            {name: 'HIPOTIROIDISMO', code: 'HIPOTIROIDISMO'},
            {name: 'NEOPLÁSICA', code: 'NEOPLÁSICA'},
            {name: 'TBC PULMONAR', code: 'TBC PULMONAR'},
            {name: 'SOBA/ASMA BRONQUIAL', code: 'SOBA/ASMA BRONQUIAL'},
            {name: 'ANEMIA', code: 'ANEMIA'},
            {name: 'ARTRITIS', code: 'ARTRITIS'},
            {name: 'CÁNCER', code: 'CÁNCER'},
            {name: 'CARDIOPATÍAS', code: 'CARDIOPATÍAS'},
            {name: 'ARTERIOESCLEROSIS', code: 'ARTERIOESCLEROSIS'},
            {name: 'SIFILIS', code: 'SIFILIS'},
            {name: 'BLENORRAGIA', code: 'BLENORRAGIA'},
            {name: 'VIH/SIDA', code: 'VIH/SIDA'},
            {name: 'REUMATISMO', code: 'REUMATISMO'},
            {name: 'DISLIPIDEMIAS', code: 'DISLIPIDEMIAS'},
            {name: 'ALCOHOLISMO', code: 'ALCOHOLISMO'},
            {name: 'ABORTO HABITUAL/RECURRENTE', code: 'ABORTO HABITUAL/RECURRENTE'},
            {name: 'VIOLENCIA', code: 'VIOLENCIA'},
            {name: 'CIRUGÍA PÉLVICA UTERINA', code: 'CIRUGÍA PÉLVICA UTERINA'},
            {name: 'ECLAMPSIA', code: 'ECLAMPSIA'},
            {name: 'PRE ECLAMPSIA', code: 'PRE ECLAMPSIA'},
            {name: 'HEMORRAGIA POSTPARTO', code: 'HEMORRAGIA POSTPARTO'},
            {name: 'ALERGIA A MEDICAMENTOS', code: 'ALERGIA A MEDICAMENTOS'},
            {name: 'ENFERMEDADES CONGÉNITAS', code: 'ENFERMEDADES CONGÉNITAS'},
            {name: 'ENFERMEDADES INFECCIOSAS', code: 'ENFERMEDADES INFECCIOSAS'},
            {name: 'CONSUMO DE HOJA DE COCA', code: 'CONSUMO DE HOJA DE COCA'},
            {name: 'CONSUMO DE DROGAS', code: 'CONSUMO DE DROGAS'},
            {name: 'CONSUMO DE TABACO', code: 'CONSUMO DE TABACO'},
            {name: 'INFERTILIDAD', code: 'INFERTILIDAD'},
            {name: 'PARTO PROLONGADO', code: 'PARTO PROLONGADO'},
            {name: 'PREMATURIDAD', code: 'PREMATURIDAD'},
            {name: 'RETENCION DE PLACENTA', code: 'RETENCION DE PLACENTA'},
            {name: 'TRANSTORNOS MENTALES', code: 'TRANSTORNOS MENTALES'},
            {name: 'HOSPITALIZACIONES', code: 'HOSPITALIZACIONES'},
            {name: 'TRANSFUSIONES SANGUINEAS', code: 'TRANSFUSIONES SANGUINEAS'},
            {name: 'OTRAS CIRUGIAS', code: 'OTRAS CIRUGIAS'},
            {name: 'CIRUGÍA PÉLVICA UTERINA', code: 'CIRUGÍA PÉLVICA UTERINA'},
            {name: 'HEPATITIS B', code: 'HEPATITIS B'},
        ]
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.nroDoc = this.data.nroDocumento
    }

    // async getTablaDatos() {
    //     await this.familiarServicio.getDatosGenerales(this.nroDoc)
    //         .toPromise().then(res => <AntecedentesFamiliaresType[]>res['object'])
    //         .then(data => {
    //             this.datosFamiliares = data;
    //             console.log(this.datosFamiliares);
    //             this.rellenarForm(this.datosFamiliares);
    //         })
    //         .catch(error => {
    //             return error;
    //         });
    // }

    recuperarData() {
        this.antecedentesService.getAntecedentesPersonalesPatologicos(this.nroDoc).subscribe((r: any) => {
            if (r.cod!='2402'){
                this.listPatologias = r.object.antecedentesFamiliares
            }
        })
    }

    getFC(control: string): AbstractControl {
        return this.familiarFG.get(control)
    }

    buildForm(): void {
        this.familiarFG = new FormGroup({
            enfermedad: new FormControl({value:'',disabled:false},[Validators.required]),
            pariente: new FormControl({value:'',disabled:false},[Validators.required]),
        })
    }

    ngOnInit(): void {
        // this.getTablaDatos();
        this.recuperarData()
    }

    save() {

        let auxp = {
            nroHcl: this.nroDoc,
            antecedentesFamiliares: this.listPatologias
        }
        console.log('auxp', auxp)
        this.antecedentesService.addAntecedentesPersonalesPatologicos(auxp).subscribe((r) => {
            {
                console.log(r)
                Swal.fire({
                    icon: 'success',
                    title: 'Guardo el registro con correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.onFamiliar.emit(true)
            }
        })

    }

    limpiar() {
        this.familiarFG.reset();
    }

    eliminarAntecedente(index) {
        this.listPatologias.splice(index, 1)
    }

    Agregar() {
        console.log(this.familiarFG.get("enfermedad").value);
        const a: antecedentesFamiliares = {
            nombre: this.familiarFG.get("enfermedad").value,
            pariente: this.familiarFG.get("pariente").value,
            fechaDiagnosticado: '',
            edadAnio: 0,
            edadMes: 0,
            edadDia: 0,
        }
        this.familiarFG.reset()
        if(this.listPatologias.find((item)=>item.nombre==a.nombre)){
            return
        }
        this.listPatologias.push(a)
        // this.familiarFG.get('patologia').setValue('')
    }

    filterItems(event) {
        console.log(event);
        
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;

        this.listaAntecedentes.map((item: any) => {
            if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0)
                filtered.push(item)
        })

        this.listaAntecedentes = filtered;
    }
}
