import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {PacienteService} from 'src/app/core/services/paciente/paciente.service';
import {DocumentoIdentidadService} from 'src/app/mantenimientos/services/documento-identidad/documento-identidad.service';
import {EtniaService} from 'src/app/mantenimientos/services/etnia/etnia.service';
import {UbicacionService} from 'src/app/mantenimientos/services/ubicacion/ubicacion.service';
import {image} from 'src/assets/images/image.const';
import Swal from 'sweetalert2';

// import { image } from '../../../assets/images/image.const';

@Component({
    selector: 'app-dialog-paciente',
    templateUrl: './dialog-paciente.component.html',
    styleUrls: ['./dialog-paciente.component.css']
})
export class DialogPacienteComponent implements OnInit {
    formPaciente: FormGroup;
    isUpdate: boolean = false;
    listaDocumentos: any[] = [];
    dataEtnia: any[] = [];
    dataCentroPoblado: any[] = [];
    datePipe = new DatePipe('en-US');
    peruvian: boolean = true;
    dataPaciente: any;
    codUbigeo: any;
    nacionalidad: string;
    codCCPP: any;
    auxipress: string = "615b30b37194ce03d782561c";
    imagePath: string = image;
    listaEstadoCivil = [
        'SOLTERO',
        'CASADO',
        'CONVIVIENTE',
        'SEPARADO',
        'DIVORCIADO',
        'VIUDO'
    ];
    listaNacionalidades = [
        'PERUANO',
        'EXTRANJERO'
    ];
    listaSexo = [
        'MASCULINO',
        'FEMENINO'
    ];
    listaTipoSeguro = [
        'SIS',
        'NO SIS',
        'EsSalud',
        'SOAT',
        'SANIDAD FAP',
        'SANIDAD NAVAL',
        'SANIDAD EP',
        'SANIDAD PNP',
        'PRIVADOS',
        'SIS SEMISUBSIDIADO',
        'OTROS'
    ];
    listaGradoInstruccion = [
        'ANALFABETO',
        'PRIMARIA INCOMPLETA',
        'PRIMARIA COMPLETA',
        'SECUNDARIA INCOMPLETA',
        'SECUNDARIA COMPLETA',
        'SUPERIOR'
    ];

    constructor(
        private fb: FormBuilder,
        private pacienteService: PacienteService,
        private etniaService: EtniaService,
        private documentoIdentidadService: DocumentoIdentidadService,
        private ubicacionService: UbicacionService,
        private ref: DynamicDialogRef
    ) {
        this.inicializarForm();
        this.cargarDocumentos();
        this.cargarEtnia();
    }

    ngOnInit(): void {
    }

    inicializarForm() {
        this.formPaciente = this.fb.group({
            idRed: new FormControl(''),
            tipoDoc: new FormControl(''),
            nroDoc: new FormControl(''),
            nroHcl: new FormControl(''),
            primerNombre: new FormControl(''),
            otrosNombres: new FormControl(''),
            apPaterno: new FormControl(''),
            apMaterno: new FormControl(''),
            celular: new FormControl(''),
            tipoSeguro: new FormControl(''),
            nacionalidad: new FormControl(''),
            procedencia: new FormControl(''),
            estadoCivil: new FormControl(''),
            etnia: new FormControl(''),
            gradoInstruccion: new FormControl(''),
            sexo: new FormControl(''),
            fechaNacimiento: new FormControl(''),
            fechaInscripcion: new FormControl(''),
            fechaEmision: new FormControl(''),
            restriccion: new FormControl(''),
            discapacidad: new FormControl(''),
            nombrePadre: new FormControl(''),
            nombreMadre: new FormControl(''),
            ipress: new FormControl(''),
            direccion: new FormControl(''),
            departamento: new FormControl(''),
            provincia: new FormControl(''),
            distrito: new FormControl(''),
            ccpp: new FormControl(''),
            HCL: new FormControl(''),
            lugarNacimiento: new FormControl(''),
            codSeguro: new FormControl(''),
            // dataCentroPoblado: new FormControl(''),
        });
    }

    cargarDocumentos() {
        this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
            this.listaDocumentos = res.object;
            this.formPaciente.get("tipoDoc").setValue(this.listaDocumentos[0].abreviatura);
            console.log('documentos ident ', this.listaDocumentos)
        });
    }

    cargarEtnia() {
        this.etniaService.getEtnia().subscribe((res: any) => {
            this.dataEtnia = res.object;
            console.log('lista de etnia ', this.dataEtnia)
        });
    }

    cargarDatosReniec() {
        let nroDoc: String = String(this.formPaciente.value.nroDoc);
        if (nroDoc.length < 8)
            return
        console.log(nroDoc);
        this.pacienteService.getDataReniecPaciente(nroDoc).subscribe((res: any) => {
            console.log('res de consulta reniec ', res);
            console.log(res.nombres);
            let nameAux = res.nombres.split(" ");
            let firstName = nameAux[0];
            let otherName: string = '';
            this.codUbigeo = res.idUbigeo;
            let cpAux = {
                iddd: res.idUbigeo.slice(0, 2),
                idpp: res.idUbigeo.slice(2, 4),
                iddis: res.idUbigeo.slice(4, 6),
            }
            this.ubicacionService.getCentroPoblado(cpAux).subscribe((res: any) => {
                this.dataCentroPoblado = res.object;
            });
            for (let i = 1; i < nameAux.length; i++) {
                otherName = otherName + ' ' + nameAux[i];
            }
            this.formPaciente.get("primerNombre").setValue(firstName);
            this.formPaciente.get("otrosNombres").setValue(otherName.trim());
            this.formPaciente.get("apPaterno").setValue(res.apePaterno);
            this.formPaciente.get("apMaterno").setValue(res.apeMaterno);
            let aux = res.ubigeo.split("/", 3);
            this.formPaciente.get("departamento").setValue(aux[0]);
            this.formPaciente.get("provincia").setValue(aux[1]);
            this.formPaciente.get("distrito").setValue(aux[2]);
            this.formPaciente.get("HCL").setValue(res.nroDocumento);
            this.formPaciente.get("lugarNacimiento").setValue('');
            // if(res.genero="0"){ this.formPaciente.get("sexo").setValue("FEMENINO");}else{"MASCULINO"}
            this.formPaciente.get("restriccion").setValue(res.restriccion);
            this.formPaciente.get("estadoCivil").setValue(res.estadoCivil);
            this.formPaciente.get("direccion").setValue(res.direccion);
            if (res.tipoSeguro == "01") {
                this.formPaciente.get("tipoSeguro").setValue("SIS");
            }
            // this.formPaciente.get("fechaInscripcion").setValue(res.fecAfiliacion);
            this.formPaciente.get("tipoSeguro").setValue(res.descTipoSeguro);
            this.formPaciente.get("sexo").setValue(res.genero == "" ? "" : (res.genero == "0" ? "FEMENINO" : "MASCULINO"));
            this.formPaciente.get("fechaNacimiento").setValue(res.fecNacimiento == null ? "" : res.fecNacimiento.split("T", 1)[0]);
            this.formPaciente.get("fechaInscripcion").setValue(res.fecAfiliacion == null ? "" : res.fecAfiliacion.split("T", 1)[0]);
            this.imagePath = res.foto;

            // console.log('lista ipress ', this.listaIpress)
        });
    }

    selectedTipoDoc(event) {
        if (event.value == 'DNI') {
            this.peruvian = true;
        } else {
            this.peruvian = false;
        }
    }

    recuperarDatos() {
        let nameAux = this.formPaciente.value.lugarNacimiento.split(',');
        let nacDepartamento = nameAux[0]
        let nacDistrito = nameAux[1]
        let nacProvincia = nameAux[2]

        // console.log('data centro poblado ', this.formPaciente.value.ccpp);
        if (this.formPaciente.value.ccpp == '') {
            Swal.fire({
                icon: 'warning',
                title: 'Seleccione Centro Poblado',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        let aux = this.formPaciente.value.etnia;
        let auxNroHcl: string;
        if (this.peruvian) {
            auxNroHcl = this.formPaciente.value.nroDoc;
            this.nacionalidad = 'PERUANO'
        } else {
            auxNroHcl = this.formPaciente.value.nroHcl;
            this.nacionalidad = 'EXTRANJERO'
        }
        console.log('data de centro poblado ', this.formPaciente.value.ccpp);
        this.dataPaciente = {
            nroHcl: String(auxNroHcl),
            tipoDoc: this.formPaciente.value.tipoDoc,
            nroDoc: String(this.formPaciente.value.nroDoc),
            primerNombre: this.formPaciente.value.primerNombre,
            otrosNombres: this.formPaciente.value.otrosNombres,
            apePaterno: this.formPaciente.value.apPaterno,
            apeMaterno: this.formPaciente.value.apMaterno,
            sexo: this.formPaciente.value.sexo,
            nacimiento: {
                departamento: nacDepartamento,
                provincia: nacDistrito,
                distrito: nacProvincia,
                fechaNacimiento: this.datePipe.transform(this.formPaciente.value.fechaNacimiento, 'yyyy-MM-dd HH:mm:ss'),
            },
            celular: String(this.formPaciente.value.celular),
            tipoSeguro: this.formPaciente.value.tipoSeguro,
            discapacidad: this.formPaciente.value.discapacidad == '' ? [] : this.formPaciente.value.discapacidad,
            nacionalidad: this.nacionalidad,
            estadoCivil: this.formPaciente.value.estadoCivil,
            procedencia: this.formPaciente.value.procedencia,
            etnia: {
                tipoEtnia: aux.tipoEtnia,
                etnia: aux.descripcion
            },
            gradoInstruccion: this.formPaciente.value.gradoInstruccion,
            fechaInscripcion: this.datePipe.transform(this.formPaciente.value.fechaInscripcion, 'yyyy-MM-dd HH:mm:ss'),
            fechaEmision: this.datePipe.transform(this.formPaciente.value.fechaEmision, 'yyyy-MM-dd HH:mm:ss'),
            restricion: this.formPaciente.value.restriccion,
            domicilio: {
                departamento: this.formPaciente.value.departamento,
                provincia: this.formPaciente.value.provincia,
                distrito: this.formPaciente.value.distrito,
                direccion: this.formPaciente.value.direccion,
                idccpp: this.formPaciente.value.ccpp.idccpp,
                ccpp: this.formPaciente.value.ccpp.ccpp,
                ubigeo: this.codUbigeo
            },
            // nombrePadre: this.formPaciente.value.nombrePadre,
            // nombreMadre: this.formPaciente.value.nombreMadre,
            // this.datePipe.transform(this.formPaciente.value.fechaInscripcion, 'dd/MM/yyyy')
            idIpress: this.auxipress,
        }
    }

    saveForm() {
        this.recuperarDatos();
        this.pacienteService.postPacientes(this.dataPaciente).subscribe((res: any) => {
            this.closeDialog();
            Swal.fire({
                icon: 'success',
                title: 'Se Registro Exitosamente',
                showConfirmButton: false,
                timer: 1500
            })
        });
    }

    closeDialog() {
        this.ref.close()
    }

    editarDatos() {

    }

}
