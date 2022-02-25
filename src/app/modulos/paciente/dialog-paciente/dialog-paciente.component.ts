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
    auxipress: string = "615b30b37194ce03d782561c";//logeo
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
        this.getDepartamentos();
        this.inicializarForm();
        this.cargarDocumentos();
        this.cargarEtnia();

    }

    ngOnInit(): void {
        this.dataPacienteEditar = JSON.parse(localStorage.getItem('pacienteLocalStorage'));
        console.log("PACIENTE SELECCIONADO", this.dataPacienteEditar)

        if (this.dataPacienteEditar !== null) {
            this.editarDatos()
        }
    }

    /**Lista todos los departamento **/
    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamentos = resp.object;
            console.log("Departamento", this.dataDepartamentos);
        });
    }

    /**Selecciona un departamento y lista las provincias**/
    selectedDepartamento() {
        let depa = this.formPaciente.value.departamento;
        this.dataDepartamentos.forEach(object => {
            if (object.departamento === depa) {
                console.log("Departamento:", object);
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
                console.log("Provincia:", object);
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
                console.log("Distrito:", object);
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
            nroDoc: new FormControl(''),
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

    /**Recupera las provincias  de un determinado departamento cuando buscas un paciente por su dni**/
    listarUbicacionPacienteProvincias() {
        let Departamento = '';
        if (this.dataPacienteEditar !== null) {
            Departamento = this.dataPacienteEditar.domicilio.departamento;


        } else {
            let nameAux = this.dataPacienteReniec.ubigeo.split("/");
            Departamento = nameAux[0];
        }
        console.log("Departamento XXX", this.dataDepartamentos)

        console.log("Departamento:", Departamento);
        this.dataDepartamentos.forEach(object => {
            if (object.departamento === Departamento) {
                console.log("Departamento:", object);
                this.DepartamentoIDSelct = object.iddd
            }
        });
        let dpto = {
            iddd: this.DepartamentoIDSelct
        }
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
            console.log("PROVINCIA:", this.dataProvincia);
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
                console.log("Provincia:", object);
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
                console.log("Distrito:", object);
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
            console.log('res de consulta reniec ', res);
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
        console.log('data de Etnia ', aux);
        this.dataPaciente = {
            nroHcl: this.formPaciente.value.HCL,
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

    /**Actualiza datos de un paciente**/
    EditarPaciente() {
        this.recuperarDatos();
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
        console.log('aceptar editar paciente')
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
        return
    }

}
