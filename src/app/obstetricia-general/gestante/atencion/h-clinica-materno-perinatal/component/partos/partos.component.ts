import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import {PartoAbortoService} from "../../services/parto-aborto/parto-aborto.service";
import {formatDate} from "@angular/common";
import {MessageService} from 'primeng/api';
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {PartosModalComponent} from "../partos-modal/partos-modal.component";
@Component({
    selector: "app-partos",
    templateUrl: "./partos.component.html",
    styleUrls: ["./partos.component.css"],
    providers: [DialogService]
})
export class PartosComponent implements OnInit {
    isUpdate:boolean=false;
    idPaciente:string;
    treeOptionsOptions: any[];
    twoOptions: any[];
    TFOptions:any[];
    myGroup: FormGroup;

    medicacionList=[]
    medicamentoList=[]
    constructor(public fb: FormBuilder,
                private partoAbortoService:PartoAbortoService,
                private messageService: MessageService,
                private obstetriciaGeneralService: ObstetriciaGeneralService,
                public dialogService: DialogService
    ) {
        this.idPaciente=obstetriciaGeneralService.idGestacion;
        console.log('hola:',this.idPaciente);
        this.twoOptions = [
            { label: "Si", value: "si" },
            { label: "No", value: "no" },
        ];
        this.treeOptionsOptions = [
            { label: "Si", value: "si" },
            { label: "No", value: "no" },
            { label: "No Aplica", value: "no aplica" },
        ];
        this.TFOptions=[
            {label :"Si",value:true},
            {label:"No",value:false}
        ]
        this.buildForm();
    }
    buildForm() {
        this.myGroup = new FormGroup({
            hcmp: new FormControl("", [Validators.required]),
            pc: new FormControl("", [Validators.required]),
            orden: new FormControl("", Validators.required),
            ingresoEstablecimientoPartoFecha: new FormControl("", Validators.required),
            referenciaIngreso: new FormControl("", Validators.required),
            pulsoMaterno: new FormControl("", Validators.required),
            presionArterial: new FormControl("", Validators.required),
            frecuenciaRespiratoria: new FormControl("", Validators.required),
            temperatura: new FormControl("", Validators.required),
            peso: new FormControl("", Validators.required),
            eg: new FormControl("", Validators.required),
            situacion: new FormControl("", Validators.required),
            posicion: new FormControl("", Validators.required),
            tamanoFetalAcorde: new FormControl("", Validators.required),
            inicio: new FormControl("", Validators.required),
            dilatacion: new FormControl("", Validators.required),
            presentacion: new FormControl("", Validators.required),
            alturaUterina: new FormControl("", Validators.required),
            fcf: new FormControl("", Validators.required),
            menbranas: new FormControl("", Validators.required),
            liquidoAmniotico: new FormControl("", Validators.required),
            fechaRuptura: new FormControl("", Validators.required),

            anasarca: new FormControl("", Validators.required),
            cianosis: new FormControl("", Validators.required),
            escotomas: new FormControl("", Validators.required),
            epigastralgia: new FormControl("", Validators.required),
            dolorDerecho: new FormControl("", Validators.required),
            hermaturia: new FormControl("", Validators.required),
            hipoOrtostatica: new FormControl("", Validators.required),
            ictericia: new FormControl("", Validators.required),
            petequies: new FormControl("", Validators.required),
            proteuniria: new FormControl("", Validators.required),
            // tercera fila
            corticoidesAntenatales: new FormControl("", Validators.required),
            semanaInicio: new FormControl("", Validators.required),
            cesaria: new FormControl("", Validators.required),
            aborto: new FormControl("", Validators.required),
            // cuarta fila
            terminacionFecha: new FormControl("", Validators.required),
            terminacion: new FormControl("", Validators.required),
            desgarros: new FormControl("", Validators.required),
            posicionGestante: new FormControl("", Validators.required),
            duracion: new FormControl("", Validators.required),
            alumbramiento: new FormControl("", Validators.required),
            partoGrama: new FormControl("", Validators.required),
            muerteIntrauterina: new FormControl("", Validators.required),
            placenta: new FormControl("", Validators.required),
            partoAcompanante: new FormControl("", Validators.required),
            episiotomia: new FormControl("", Validators.required),
            ligaduraCordon: new FormControl("", Validators.required),
            indicacionPrincipalHubo: new FormControl("", Validators.required),
            indicacionPrincipalPartoOperatorio: new FormControl(
                "",
                Validators.required
            ),
            // quinta fila
            nivel: new FormControl("", Validators.required),
            partoLegrado: new FormControl("", Validators.required),
            neonato: new FormControl("", Validators.required),
            responsableAtencionParto:new FormControl("",Validators.required),
            responsableAtencionNeonato:new FormControl("",Validators.required),
            listaMedicacion:new FormControl("",Validators.required)
        });
    }
    ngOnInit(): void {

        this.getPartoAborto();

    }
    getFC(control: string): AbstractControl {
        return this.myGroup.get(control);
    }
    buscarSSAlarma(lista,nombre){
        const found = lista.find(element => element.nombre  == nombre);
        return found.valor;
    }
        save() {

        const partoAbortoInput:any={
            estado:{
                hcmp:this.getFC("hcmp").value,
                productoConcepcion:this.getFC("pc").value,
                orden:this.getFC("orden").value
            },
            ingresoEstablecimientoParto:{
                fechaIngreso:this.getFechaHora(this.getFC("ingresoEstablecimientoPartoFecha").value),
                referenciaIngreso:this.getFC("referenciaIngreso").value,
                pulsoMaterno:this.getFC("pulsoMaterno").value,
                presionArterial:this.getFC("presionArterial").value,
                frecuenciaRespiratoria:this.getFC("frecuenciaRespiratoria").value,
                temperatura:this.getFC("temperatura").value,
                peso:this.getFC("peso").value,
                eg:this.getFC("eg").value,
                situacion:this.getFC("situacion").value,
                presentacion:this.getFC("presentacion").value,
                posicion:this.getFC("posicion").value,
                alturaUterina:this.getFC("alturaUterina").value,
                tamFetalAcorde:this.getFC("tamanoFetalAcorde").value,
                fcf:this.getFC("fcf").value,
                inicio:this.getFC("inicio").value,
                dilatacion:this.getFC("dilatacion").value,
                membranas:this.getFC("menbranas").value,
                liquidoAmniotico:this.getFC("liquidoAmniotico").value,
                fechaRuptura:this.getFechaHora(this.getFC("fechaRuptura").value)

            },
            signoSintomaAlarma:[
                {
                    nombre:"anasarca",
                    valor:this.getFC("anasarca").value
                },
                {
                    nombre:"cianosis",
                    valor:this.getFC("cianosis").value
                },
                {
                    nombre:"escotomas",
                    valor:this.getFC("escotomas").value
                },
                {
                    nombre:"epigastralgia",
                    valor:this.getFC("epigastralgia").value
                },
                {
                    nombre:"dolorDerecho",
                    valor:this.getFC("dolorDerecho").value
                },
                {
                    nombre:"hermaturia",
                    valor:this.getFC("hermaturia").value
                },
                {
                    nombre:"hipoOrtostatica",
                    valor:this.getFC("hipoOrtostatica").value
                },
                {
                    nombre:"ictericia",
                    valor:this.getFC("ictericia").value
                },
                {
                    nombre:"petequies",
                    valor:this.getFC("petequies").value
                },
                {
                    nombre:"proteuniria",
                    valor:this.getFC("proteuniria").value
                }
            ],
            coticoidesAntenatales:{
                nombre:this.getFC("corticoidesAntenatales").value,
                semanaInicio:this.getFC("semanaInicio").value
            },
            tipoProcedimiento:{
                cesaria:this.getFC("cesaria").value,
                aborto:this.getFC("aborto").value
            },
            procedimientoParto:{
                medicacion:this.medicacionList,
                medicamentos:this.medicamentoList
            },
            indicacionPrincipalParto:this.getFC("indicacionPrincipalPartoOperatorio").value,
            hubo:this.getFC("indicacionPrincipalHubo").value,
            terminacion:{
                fecha:this.getFechaHora(this.getFC("terminacionFecha").value),
                terminacion:this.getFC("terminacion").value,
                desgarros:this.getFC("desgarros").value,
                posiGestante:this.getFC("posicionGestante").value,
                duracion:this.getFC("duracion").value,
                alumbramiento:this.getFC("alumbramiento").value,
                partoGrama:this.getFC("partoGrama").value,
                muerteIntraUterina:this.getFC("muerteIntrauterina").value,
                placenta:this.getFC("placenta").value,
                partoConAcompaniante:this.getFC("partoAcompanante").value,
                episiotomia:this.getFC("episiotomia").value,
                ligaduraCordon:this.getFC("ligaduraCordon").value
            },
            atencion:{
                nivel:this.getFC("nivel").value,
                partoLegrado:this.getFC("partoLegrado").value,
                neonato:this.getFC("neonato").value,
                responsableAtencionParto:this.getFC("responsableAtencionParto").value,
                responsableAtencionNeonato:this.getFC("responsableAtencionNeonato").value
            },
            proceso: 'parto'
        }

        this.partoAbortoService.addUpdatePartoAborto(this.idPaciente,partoAbortoInput).subscribe((resp)=>{
            // console.log(resp)
            if(this.isUpdate){
                this.messageService.add({severity:'info', summary:'Actualizado', detail:'Parto o aborto fue Actualizado satisfactoriamente'});
            }
            else{
                this.messageService.add({severity:'info', summary:'Agregado', detail:'Parto o aborto fue agregado satisfactoriamente'});

            }
        })
        // }
        // else {
        // this.partoAbortoService.addPartoAborto(this.idPaciente,partoAbortoInput).subscribe((resp)=>{
        //   this.messageService.add({severity:'su', summary:'Agregado', detail:'Parto o aborto fue agregado satisfactoriamente'});
        // })
        // }
    }
    getFechaHora(date:Date){
        // let fecha=a.toLocaleDateString();
        if(date.toString()!==''){

            let hora=date.toLocaleTimeString();
            // return fecha+' '+hora;
            let dd = date.getDate();
            let mm = date.getMonth() + 1; //January is 0!
            let yyyy = date.getFullYear();
            return yyyy+'-'+mm+'-'+dd+' '+hora
        }
        else{
            return '';
        }
    }

    getPartoAborto() {
        this.partoAbortoService.getPartoAborto(this.idPaciente).subscribe((resp)=> {
            if (resp['cod'] == '2005') {
                let respuesta = resp['object'];
                this.getFC('hcmp').setValue(respuesta.estado.hcmp);
                this.getFC('pc').setValue(respuesta.estado.productoConcepcion);
                this.getFC('orden').setValue(respuesta.estado.orden);
                if (respuesta.ingresoEstablecimientoParto.fechaIngreso) {
                    this.getFC('ingresoEstablecimientoPartoFecha').setValue(new Date(respuesta.ingresoEstablecimientoParto.fechaIngreso));
                }
                this.getFC('referenciaIngreso').setValue(respuesta.ingresoEstablecimientoParto.referenciaIngreso);
                this.getFC('pulsoMaterno').setValue(respuesta.ingresoEstablecimientoParto.pulsoMaterno);
                this.getFC('presionArterial').setValue(respuesta.ingresoEstablecimientoParto.presionArterial);
                this.getFC('frecuenciaRespiratoria').setValue(respuesta.ingresoEstablecimientoParto.frecuenciaRespiratoria);
                this.getFC('temperatura').setValue(respuesta.ingresoEstablecimientoParto.temperatura);
                this.getFC('peso').setValue(respuesta.ingresoEstablecimientoParto.peso);
                this.getFC('eg').setValue(respuesta.ingresoEstablecimientoParto.eg);
                this.getFC('situacion').setValue(respuesta.ingresoEstablecimientoParto.situacion);
                this.getFC('posicion').setValue(respuesta.ingresoEstablecimientoParto.posicion);
                this.getFC('tamanoFetalAcorde').setValue(respuesta.ingresoEstablecimientoParto.tamFetalAcorde);
                this.getFC('inicio').setValue(respuesta.ingresoEstablecimientoParto.inicio);
                this.getFC('dilatacion').setValue(respuesta.ingresoEstablecimientoParto.dilatacion);
                this.getFC('presentacion').setValue(respuesta.ingresoEstablecimientoParto.presentacion);
                this.getFC('alturaUterina').setValue(respuesta.ingresoEstablecimientoParto.alturaUterina);
                this.getFC('fcf').setValue(respuesta.ingresoEstablecimientoParto.fcf);
                this.getFC('menbranas').setValue(respuesta.ingresoEstablecimientoParto.membranas);
                this.getFC('liquidoAmniotico').setValue(respuesta.ingresoEstablecimientoParto.liquidoAmniotico);
                if (respuesta.ingresoEstablecimientoParto.fechaRuptura) {
                    this.getFC('fechaRuptura').setValue(new Date(respuesta.ingresoEstablecimientoParto.fechaRuptura));
                }
                //tercera fila->>>

                this.getFC('anasarca').setValue(this.buscarSSAlarma(respuesta.signoSintomaAlarma, "anasarca"));
                this.getFC('cianosis').setValue(this.buscarSSAlarma(respuesta.signoSintomaAlarma, "cianosis"));
                this.getFC('escotomas').setValue(this.buscarSSAlarma(respuesta.signoSintomaAlarma, "escotomas"));
                this.getFC('epigastralgia').setValue(this.buscarSSAlarma(respuesta.signoSintomaAlarma, "epigastralgia"));
                this.getFC('dolorDerecho').setValue(this.buscarSSAlarma(respuesta.signoSintomaAlarma, "dolorDerecho"));
                this.getFC('hermaturia').setValue(this.buscarSSAlarma(respuesta.signoSintomaAlarma, "hermaturia"));
                this.getFC('hipoOrtostatica').setValue(this.buscarSSAlarma(respuesta.signoSintomaAlarma, "hipoOrtostatica"));
                this.getFC('ictericia').setValue(this.buscarSSAlarma(respuesta.signoSintomaAlarma, "ictericia"));
                this.getFC('petequies').setValue(this.buscarSSAlarma(respuesta.signoSintomaAlarma, "petequies"));
                this.getFC('proteuniria').setValue(this.buscarSSAlarma(respuesta.signoSintomaAlarma, "proteuniria"));
                //
                this.getFC('corticoidesAntenatales').setValue(respuesta.coticoidesAntenatales.nombre);
                this.getFC('semanaInicio').setValue(respuesta.coticoidesAntenatales.semanaInicio);
                this.getFC('cesaria').setValue(respuesta.tipoProcedimiento.cesaria);
                this.getFC('aborto').setValue(respuesta.tipoProcedimiento.aborto);
                //la lista
                this.medicacionList=respuesta.procedimientoParto.medicacion;
                this.medicamentoList=respuesta.procedimientoParto.medicamentos;

                if (respuesta.terminacion.fecha) {
                    this.getFC('terminacionFecha').setValue(new Date(respuesta.terminacion.fecha));
                }
                this.getFC('terminacion').setValue(respuesta.terminacion.terminacion);
                this.getFC('desgarros').setValue(respuesta.terminacion.desgarros);
                this.getFC('posicionGestante').setValue(respuesta.terminacion.posiGestante);
                this.getFC('duracion').setValue(respuesta.terminacion.duracion);
                this.getFC('alumbramiento').setValue(respuesta.terminacion.alumbramiento);
                this.getFC('partoGrama').setValue(respuesta.terminacion.partoGrama);
                this.getFC('muerteIntrauterina').setValue(respuesta.terminacion.muerteIntraUterina);
                this.getFC('placenta').setValue(respuesta.terminacion.placenta);
                this.getFC('partoAcompanante').setValue(respuesta.terminacion.partoConAcompaniante);
                this.getFC('episiotomia').setValue(respuesta.terminacion.episiotomia);
                this.getFC('ligaduraCordon').setValue(respuesta.terminacion.ligaduraCordon);

                this.getFC('indicacionPrincipalHubo').setValue(respuesta.hubo);
                this.getFC('indicacionPrincipalPartoOperatorio').setValue(respuesta.indicacionPrincipalParto);

                this.getFC('nivel').setValue(respuesta.atencion.nivel);
                this.getFC('partoLegrado').setValue(respuesta.atencion.partoLegrado);
                this.getFC('neonato').setValue(respuesta.atencion.neonato);
                this.getFC('responsableAtencionParto').setValue(respuesta.atencion.responsableAtencionParto);
                this.getFC('responsableAtencionNeonato').setValue(respuesta.atencion.responsableAtencionNeonato);
                this.isUpdate=true;
                this.messageService.add({severity:'info', summary:'Recuperado', detail:'registro recuperado satisfactoriamente'});

            }
            if(resp['cod'] == '2004'){
                this.isUpdate=false;
                this.messageService.add({severity:'info', summary:'Recuperado', detail:'no existe registro parto aborto'});
            }
        });
    }



    ref: DynamicDialogRef;
    isUpdate2:boolean=false;
    isUpdate3:boolean=false
    medi:string='';
    agregarActualizar(index?:number) {
        let mandado='';
        // let header: string = "Agregar Medicacion";
        if (this.isUpdate2 && this.medi=='medicacion') {
            mandado = this.medicacionList[index];
        }
        if(this.isUpdate3 && this.medi=='medicamento'){
            mandado=this.medicamentoList[index]
        }
        this.ref = this.dialogService.open(PartosModalComponent, {
            data:  mandado ,
            width: "50%",
        });
        this.ref.onClose.subscribe((mensaje?: string) => {
            // let detail: string = "Elemento agregado satisfactoriomente";
            // let summary: string = "Agregado";

            if(mensaje!=null ){
                if(this.medi=='medicacion'){
                    if(this.isUpdate2){

                        this.medicacionList.splice(index,1,mensaje)
                    }
                    else{
                        this.medicacionList.push(mensaje)
                    }
                }
                if(this.medi=='medicamento'){
                    if(this.isUpdate3){

                        this.medicamentoList.splice(index,1,mensaje)
                    }
                    else{
                        this.medicamentoList.push(mensaje)
                    }
                }
            }
        });
    }
    delete(index){
        if(this.medi=='medicacion'){
            this.medicacionList.splice(index,1)
        }
        if(this.medi=='medicamento'){
            this.medicamentoList.splice(index,1)
        }
    }
}
