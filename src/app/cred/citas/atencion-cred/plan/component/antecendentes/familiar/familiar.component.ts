import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
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
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.nroDoc = this.data.nroDocumento
    }

    async getTablaDatos() {
        await this.familiarServicio.getDatosGenerales(this.nroDoc)
            .toPromise().then(res => <AntecedentesFamiliaresType[]>res['object'])
            .then(data => {
                this.datosFamiliares = data;
                console.log(this.datosFamiliares);
                this.rellenarForm(this.datosFamiliares);
            })
            .catch(error => {
                return error;
            });
    }

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
        this.familiarFG = this.formBuilder.group({
            patologia: [''],
            quien: [''],
            tuberculosis: [null],
            tuberculosisQuien: [''],
            asma: [null],
            asmaQuien: [''],
            sida: [null],
            sidaQuien: [''],
            diabetes: [null],
            diabetesQuien: [''],
            epilepsia: [null],
            epilepsiaQuien: [''],
            alergiam: [null],
            alergiamQuien: [''],
            violenciaF: [null],
            violenciaFQuien: [''],
            alcoholismo: [null],
            alcoholismoQuien: [''],
            droga: [null],
            drogaQuien: [''],
            hepatitisB: [null],
            hepatitisBQuien: [''],

        })
    }


    rellenarForm(tabla: AntecedentesFamiliaresType[]): void {
        this.getFC('tuberculosis').setValue(tabla[0].valor)
        this.getFC('tuberculosisQuien').setValue(tabla[0].quien)
        this.getFC('asma').setValue(tabla[1].valor)
        this.getFC('asmaQuien').setValue(tabla[1].quien)
        this.getFC('sida').setValue(tabla[2].valor)
        this.getFC('sidaQuien').setValue(tabla[2].quien)
        this.getFC('diabetes').setValue(tabla[3].valor)
        this.getFC('diabetesQuien').setValue(tabla[3].quien)
        this.getFC('epilepsia').setValue(tabla[4].valor)
        this.getFC('epilepsiaQuien').setValue(tabla[4].quien)
        this.getFC('alergiam').setValue(tabla[5].valor)
        this.getFC('alergiamQuien').setValue(tabla[5].quien)
        this.getFC('violenciaF').setValue(tabla[6].valor)
        this.getFC('violenciaFQuien').setValue(tabla[6].quien)
        this.getFC('alcoholismo').setValue(tabla[7].valor)
        this.getFC('alcoholismoQuien').setValue(tabla[7].quien)
        this.getFC('droga').setValue(tabla[8].valor)
        this.getFC('drogaQuien').setValue(tabla[8].quien)
        this.getFC('hepatitisB').setValue(tabla[9].valor)
        this.getFC('hepatitisBQuien').setValue(tabla[9].quien)

    }

    ngOnInit(): void {
        this.getTablaDatos();
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
        let a: antecedentesFamiliares = {
            nombre: this.familiarFG.value.patologia.value,
            pariente: this.familiarFG.value.quien.toUpperCase(),
            fechaDiagnosticado: '',
            edadAnio: 0,
            edadMes: 0,
            edadDia: 0,
        }
        console.log('a', a)
        this.listPatologias.push(a)
        this.familiarFG.get('patologia').setValue('')
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
