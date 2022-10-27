import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { UbigeoData } from 'src/app/mantenimientos/models/ubicacion.interface';
import { DocumentoIdentidadService } from 'src/app/mantenimientos/services/documento-identidad/documento-identidad.service';
import { EtniaService } from 'src/app/mantenimientos/services/etnia/etnia.service';
import { UbicacionService } from 'src/app/mantenimientos/services/ubicacion/ubicacion.service';
import { image } from 'src/assets/images/image.const';
import Swal from 'sweetalert2';
import { PidePatient } from '../../admision/models/model';

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
    datePipe = new DatePipe('en-US');
    peruvian: boolean = true;
    dataPaciente: any;
    nacionalidad: string;
    auxipress: string = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    imagePath: string = image;
    dataDepartamentos: any;
    dataProvincia: any;
    dataDistrito: any;
    dataCentroPoblado: any;
    // ccpp: any;
    dataPacienteReniec: any;

    /**ID de los datos seleccionados**/
    DepartamentoIDSelct: any;
    ProvinciaIDSelct: any;
    DistritoIDSelct: any;
    listaPacientes: any;

    dataPacienteEditar: any = null;
    toEdit: boolean = false;
    patientData: PidePatient;

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

    listaGradoInstruccion = [
        'SIN ESTUDIOS',
        'PRIMARIA INCOMPLETA',
        'PRIMARIA COMPLETA',
        'SECUNDARIA INCOMPLETA',
        'SECUNDARIA COMPLETA',
        'SUPERIOR'
    ];
    listaSexo = [
        { name: 'MASCULINO', code: 'MASCULINO' },
        { name: 'FEMENINO', code: 'FEMENINO' }
    ]
    ubigeoData: UbigeoData[] = [];
    arrayPopulatedCenter: CentroPoblado[] = [];

    constructor(
        private fb: FormBuilder,
        private pacienteService: PacienteService,
        private etniaService: EtniaService,
        private documentoIdentidadService: DocumentoIdentidadService,
        private ubicacionService: UbicacionService,
        private ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
    ) {
        // console.log('data del dialog ggggggg ', this.config);
        this.config.data == undefined ? this.toEdit = false : this.config.data.typeData == 1 ? this.toEdit = true : this.toEdit = false;
        this.getDepartamentos();
        this.inicializarForm();
        this.cargarDocumentos();
        this.cargarEtnia();
        console.log('data del usuario ', this.config.data);
    }

    ngOnInit(): void {
        if (this.toEdit) {
            this.dataPacienteEditar = this.config.data.dataPaciente;
        }
        if (!this.toEdit && this.config.data.typeData == 2) {
            this.patientData = this.config.data.dataPaciente;
            this.assignPatientData(this.patientData);
        }
        console.log('data del paciente ', this.patientData);
        console.log('para editarrrrrrrrrrrrrr ', this.toEdit);
        if (this.dataPacienteEditar !== null) {
            this.editarDatos()
            this.toEdit = true;
        }
    }

    /**Lista todos los departamento **/
    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamentos = resp.object;
        });
    }

    /**Selecciona un departamento y lista las provincias**/
    selectedDepartamento() {
        let depa = this.formPaciente.value.departamento;
        this.dataDepartamentos.forEach(object => {
            if (object.departamento === depa) {
                this.DepartamentoIDSelct = object.iddd
            }
        });
        let dpto = {
            iddd: this.DepartamentoIDSelct
        }
        this.dataDistrito = '';
        this.dataCentroPoblado = '';
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
        });
        this.formPaciente.get('ccpp').setValue('');
    }

    /**Selecciona un Provincia y lista los Distritos**/
    selectedProvincia() {
        // DistritoIDSelct
        let provinciaX = this.formPaciente.value.provincia;
        this.dataProvincia.forEach(object => {
            if (object.provincia === provinciaX) {
                this.ProvinciaIDSelct = object.idpp
            }
        });

        let provincia = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
        };
        this.dataCentroPoblado = '';
        this.ubicacionService.getDistritos(provincia).subscribe((res: any) => {
            this.dataDistrito = res.object;
        });
        this.formPaciente.get('ccpp').setValue('');

    }

    /**Selecciona un Distrito y lista los Centros Poblados**/
    selectedDistrito() {
        let distritoX = this.formPaciente.value.distrito;
        this.dataDistrito.forEach(object => {
            if (object.distrito === distritoX) {
                this.DistritoIDSelct = object.iddis
            }
        });
        let distrito = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
            iddis: this.DistritoIDSelct,
        }
        this.ubicacionService.getCentroPoblado(distrito).subscribe((res: any) => {
            this.dataCentroPoblado = res.object;
        });
    }

    inicializarForm() {
        this.formPaciente = this.fb.group({
            idRed: new FormControl(''),
            tipoDoc: new FormControl(''),
            nroDoc: new FormControl({ value: '', disabled: this.toEdit }),
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
        });
    }

    cargarEtnia() {
        this.etniaService.getEtnia().subscribe((res: any) => {
            this.dataEtnia = res.object;
        });
    }

    /**Recupera las provincias  de un determinado departamento cuando buscas un paciente por su dni**/
    listarUbicacionPacienteProvincias() {
        let Departamento = '';
        if (this.dataPacienteEditar !== null) {
            Departamento = this.dataPacienteEditar.domicilio.departamento;


        } else {
            let nameAux = this.dataPacienteReniec.ubigeo.split("/");
            Departamento = nameAux[0];
        }
        this.dataDepartamentos.forEach(object => {
            if (object.departamento === Departamento) {
                this.DepartamentoIDSelct = object.iddd
            }
        });
        let dpto = {
            iddd: this.DepartamentoIDSelct
        }
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
            this.listarUbicacionPacientedistritos();
        });
    }

    /**Recupera los Distritos de un determinado provincia cuando buscas un paciente por su dni**/
    listarUbicacionPacientedistritos() {
        let Provincia = '';
        if (this.dataPacienteEditar !== null) {
            Provincia = this.dataPacienteEditar.domicilio.provincia;
        } else {
            let nameAux = this.dataPacienteReniec.ubigeo.split("/");
            Provincia = nameAux[1];
        }


        this.dataProvincia.forEach(object => {
            if (object.provincia === Provincia) {
                this.ProvinciaIDSelct = object.idpp
            }
        });
        let provincia1 = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
        };
        this.ubicacionService.getDistritos(provincia1).subscribe((res: any) => {
            this.dataDistrito = res.object;
            this.listarUbicacionPacienteCCPP();
        });

    }

    /**Recupera los Centros poblados de un determinado Distrito cuando buscas un paciente por su dni**/
    listarUbicacionPacienteCCPP() {
        let Distrito
        if (this.dataPacienteEditar !== null) {
            Distrito = this.dataPacienteEditar.domicilio.distrito;
        } else {
            let nameAux = this.dataPacienteReniec.ubigeo.split("/");
            Distrito = nameAux[2];
        }
        this.dataDistrito.forEach(object => {
            if (object.distrito === Distrito) {
                this.DistritoIDSelct = object.iddis
            }
        });
        let distrito1 = {
            iddd: this.DepartamentoIDSelct,
            idpp: this.ProvinciaIDSelct,
            iddis: this.DistritoIDSelct,
        }
        this.ubicacionService.getCentroPoblado(distrito1).subscribe((res: any) => {
            this.dataCentroPoblado = res.object;
        });
    }

    /**Cargar datos de reniec**/
    cargarDatosReniec() {
        let nroDoc: String = String(this.formPaciente.value.nroDoc);
        if (nroDoc.length < 8)
            return
        console.log(nroDoc);
        this.pacienteService.getDataReniecPaciente(nroDoc).subscribe((res: any) => {
            this.dataPacienteReniec = res;
            this.listarUbicacionPacienteProvincias();
            console.log(res.nombres);
            let nameAux = res.nombres.split(" ");
            let firstName = nameAux[0];
            let otherName: string = '';
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
            this.formPaciente.get("restriccion").setValue(res.restriccion);
            this.formPaciente.get("estadoCivil").setValue(res.estadoCivil);
            this.formPaciente.get("direccion").setValue(res.direccion);
            if (res.tipoSeguro == "01") {
                this.formPaciente.get("tipoSeguro").setValue("SIS");
            }
            this.formPaciente.get("tipoSeguro").setValue(res.descTipoSeguro);
            this.formPaciente.get("sexo").setValue(res.genero == "" ? "" : (res.genero == "0" ? "FEMENINO" : "MASCULINO"));
            this.formPaciente.get("fechaNacimiento").setValue(res.fecNacimiento == null ? "" : res.fecNacimiento.split("T", 1)[0]);
            this.formPaciente.get("fechaInscripcion").setValue(res.fecAfiliacion == null ? "" : res.fecAfiliacion.split("T", 1)[0]);
            this.imagePath = res.foto;
        });
    }

    selectedTipoDoc(event) {
        if (event.value == 'DNI') {
            this.peruvian = true;
        } else {
            this.peruvian = false;
        }
    }

    /**Recopila datos en formato JSON**/
    recuperarDatos() {
        let nameAux = this.formPaciente.value.lugarNacimiento.split(',');
        let nacDepartamento = nameAux[0]
        let nacDistrito = nameAux[1]
        let nacProvincia = nameAux[2]

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
        this.dataPaciente = {
            nroHcl: this.formPaciente.value.HCL,
            tipoDoc: this.formPaciente.value.tipoDoc,
            nroDoc: String(this.formPaciente.getRawValue().nroDoc),
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
            codSeguro: this.formPaciente.value.codSeguro,
            discapacidad: [this.formPaciente.value.discapacidad],
            nacionalidad: this.formPaciente.value.nacionalidad,
            estadoCivil: this.formPaciente.value.estadoCivil,
            procedencia: this.formPaciente.value.procedencia,
            etnia: {
                tipoEtnia: this.formPaciente.value.etnia,
                etnia: this.formPaciente.value.etnia,
            },
            gradoInstruccion: this.formPaciente.value.gradoInstruccion,
            fechaInscripcion: this.datePipe.transform(this.formPaciente.value.fechaInscripcion, 'yyyy-MM-dd HH:mm:ss'),
            fechaEmision: this.datePipe.transform(this.formPaciente.value.fechaEmision, 'yyyy-MM-dd HH:mm:ss'),
            restriccion: this.formPaciente.value.restriccion,
            domicilio: {
                departamento: this.formPaciente.value.departamento,
                provincia: this.formPaciente.value.provincia,
                distrito: this.formPaciente.value.distrito,
                direccion: this.formPaciente.value.direccion,
                ccpp: this.formPaciente.value.ccpp,
                ubigeo: this.DepartamentoIDSelct + '' + this.ProvinciaIDSelct + '' + this.DistritoIDSelct
            },
            idIpress: this.auxipress,
        }
    }

    /**Metodo si va actualizar o agregar un paciente**/
    updateOEdith() {
        if (this.dataPacienteEditar == null) {
            this.saveForm();
        } else {
            this.EditarPaciente();
        }
    }

    /**Agrega un nuevo paciente**/
    saveForm() {
        this.recuperarDatos();
        console.log('data del paciente ', this.dataPaciente);
        // let auxVal: boolean = this.validateDoc();
        // if (auxVal) {
        //     this.pacienteService.postPacientes(this.dataPaciente).subscribe((res: any) => {
        //         this.closeDialog();
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Se Registro Exitosamente',
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //         console.log("RESPUESTA", res)
        //     });
        // } else {
        //     console.log('nose guarda');
        // }

    }

    /**Actualiza datos de un paciente**/
    EditarPaciente() {
        this.recuperarDatos();
        console.log('editarrrrrrr');
        this.dataPaciente.id = this.dataPacienteEditar.id;
        console.log(this.formPaciente.value.fechaNacimiento, 'data to edit ', this.dataPaciente);
        this.pacienteService.putPaciente(this.dataPaciente).subscribe((res: any) => {
            this.closeDialog();
            console.log('se actualizo correctamente ', res)
            Swal.fire({
                icon: 'success',
                title: 'Se Actualizo Exitosamente',
                showConfirmButton: false,
                timer: 1500
            })
        })
        // console.log('aceptar editar paciente')
    }

    /**Recupera todos los pacientes de la lista**/
    GetPacientes() {
        this.pacienteService.getPacientes().subscribe((res: any) => {
            this.listaPacientes = res.object;
            console.log('lista de pacientes ', this.listaPacientes)
        });
    }

    /**Cerar Componete dialog**/
    closeDialog() {
        this.ref.close()
        this.GetPacientes();

    }

    /**Recupera un paciente en el formulario**/
    editarDatos() {
        this.dataDepartamentos = null;
        this.dataDepartamentos = JSON.parse(localStorage.getItem('pacienteDepartamento'));
        this.listarUbicacionPacienteProvincias()

        this.pacienteService.getDataReniecPaciente(this.dataPacienteEditar.nroDoc).subscribe((res: any) => {
            this.imagePath = res.foto;
        })

        if ((this.dataPacienteEditar !== null) || (this.dataPacienteEditar !== undefined)) {
            console.log("DATA RECUPERADO PACIENTE", this.dataPacienteEditar)
            this.formPaciente.get("tipoDoc").setValue(this.dataPacienteEditar.tipoDoc);
            this.formPaciente.get("nroDoc").setValue(this.dataPacienteEditar.nroDoc);
            this.formPaciente.get("apPaterno").setValue(this.dataPacienteEditar.apeMaterno);
            this.formPaciente.get("apMaterno").setValue(this.dataPacienteEditar.apePaterno);
            this.formPaciente.get("primerNombre").setValue(this.dataPacienteEditar.primerNombre);
            this.formPaciente.get("otrosNombres").setValue(this.dataPacienteEditar.otrosNombres);
            this.formPaciente.get("HCL").setValue(this.dataPacienteEditar.nroHcl);
            this.formPaciente.get("celular").setValue(this.dataPacienteEditar.celular);
            this.formPaciente.get("sexo").setValue(this.dataPacienteEditar.sexo);
            this.formPaciente.get("gradoInstruccion").setValue(this.dataPacienteEditar.gradoInstruccion);
            this.formPaciente.get("fechaNacimiento").setValue(this.datePipe.transform(this.dataPacienteEditar.nacimiento.fechaNacimiento, 'yyyy-MM-dd'));
            this.formPaciente.get("fechaInscripcion").setValue(this.datePipe.transform(this.dataPacienteEditar.fechaInscripcion, 'yyyy-MM-dd'));
            this.formPaciente.get("fechaEmision").setValue(this.datePipe.transform(this.dataPacienteEditar.fechaEmision, 'yyyy-MM-dd'));
            this.formPaciente.get("estadoCivil").setValue(this.dataPacienteEditar.estadoCivil);
            this.formPaciente.get("etnia").setValue(this.dataPacienteEditar.etnia.tipoEtnia);
            this.formPaciente.get("lugarNacimiento").setValue(this.dataPacienteEditar.nacimiento.departamento + ',' + this.dataPacienteEditar.nacimiento.provincia + ',' + this.dataPacienteEditar.nacimiento.distrito);
            this.formPaciente.get("nacionalidad").setValue(this.dataPacienteEditar.nacionalidad);
            this.formPaciente.get("restriccion").setValue(this.dataPacienteEditar.restriccion);
            this.formPaciente.get("discapacidad").setValue(this.dataPacienteEditar.discapacidad[0]);

            this.formPaciente.get("departamento").setValue(this.dataPacienteEditar.domicilio.departamento);
            this.formPaciente.get("provincia").setValue(this.dataPacienteEditar.domicilio.provincia);
            this.formPaciente.get("distrito").setValue(this.dataPacienteEditar.domicilio.distrito);
            this.formPaciente.get("direccion").setValue(this.dataPacienteEditar.domicilio.direccion);
            this.formPaciente.get("ccpp").setValue(this.dataPacienteEditar.domicilio.ccpp);
            this.formPaciente.get("tipoSeguro").setValue(this.dataPacienteEditar.tipoSeguro);
            this.formPaciente.get("codSeguro").setValue(this.dataPacienteEditar.codSeguro);
            //     nombrePadre: new FormControl(''),
            //     nombreMadre: new FormControl(''),
            //     ipress: new FormControl(''),
        }
        return;
    }

    assignPatientData(patientData: PidePatient): void {
        let auxName = patientData.nombres.split(' ');
        this.formPaciente.patchValue({
            tipoDoc: patientData.tipoDocumento,
            nroDoc: patientData.nroDocumento,
            primerNombre: auxName[0],
            otrosNombres: auxName[1],
            apPaterno: patientData.apePaterno,
            apMaterno: patientData.apeMaterno,
            HCL: patientData.nroDocumento,
            sexo: patientData.genero,
            fechaNacimiento: patientData.fecNacimiento,
            nacionalidad: patientData.tipoDocumento == "DNI" ? patientData.genero == "MASCULINO" ? "PERUANO" : "PERUANA" : "",
            tipoSeguro: patientData.descTipoSeguro,
            codSeguro:patientData.tipoSeguro
        })
        this.searchUbigeo(patientData.eessUbigeo)
    }

    searchUbigeo(ubigeo: string): void {
        let idDep: string = ubigeo.slice(0, 2);
        let idProv: string = ubigeo.slice(2, 4);
        let idDist: string = ubigeo.slice(4, 6);
        this.ubicacionService.getCPbyUbigeo(ubigeo).then((res: any) => {
            if (res.status) {
                console.log('error ');
                return
            }
            this.ubigeoData = res.object
            if (this.ubigeoData.length > 0) {
                this.ubigeoData.forEach(item => {
                    let auxCP: CentroPoblado = {
                        ccpp: item.ccpp,
                        idccpp: item.idccpp
                    }
                    this.arrayPopulatedCenter.push(auxCP);
                });
                let dpto = {
                    iddd: idDep
                }
                let prov = {
                    iddd: idDep,
                    idpp: idProv
                }
                this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
                    this.dataProvincia = res.object;
                });
                this.ubicacionService.getDistritos(prov).subscribe((res: any) => {
                    this.dataDistrito = res.object;
                });
                this.dataCentroPoblado = this.arrayPopulatedCenter;
                this.formPaciente.patchValue({
                    departamento: this.ubigeoData[0].departamento,
                    provincia: this.ubigeoData[0].provincia,
                    distrito: this.ubigeoData[0].distrito
                });
            }
        });
    }

    validateDoc(): boolean {
        let dni = String(this.formPaciente.value.nroDoc);
        let tipoDoc = this.formPaciente.value.tipoDoc;
        let validateDocument: boolean = true;
        // console.log('tipo doc', tipoDoc, 'nro doc', dni);
        if (dni.length < 8) {
            Swal.fire({
                icon: 'warning',
                title: 'El documento ingresado tiene menos de 8 digitos',
                text: 'Ingrese correctamente por favor',
                showConfirmButton: false,
                timer: 2000
            })
            validateDocument = false;
        }
        return validateDocument;
    }

    testComp() {
        let aux = this.formPaciente.value.departamento
        console.log('data del dep', aux);
    }
}

interface CentroPoblado {
    ccpp: string;
    idccpp: string
}
