import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FiliancionService } from "../../services/filiancion-atenciones/filiancion.service";
import Swal from "sweetalert2";
import { ObstetriciaGeneralService } from "../../../../../services/obstetricia-general.service";
import { image } from "../../../../../../../assets/images/image.const";
import { UbicacionService } from "../../../../../../mantenimientos/services/ubicacion/ubicacion.service";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-datos-generales-filiacion',
    templateUrl: './datos-generales-filiacion.component.html',
    styleUrls: ['./datos-generales-filiacion.component.css']
})
export class DatosGeneralesFiliacionComponent implements OnInit {

    fecha: Date;//fecha Actual
    departamentos: any;
    provincias: any;
    distritos: any
    options: any;
    familiares: any
    studies: any;
    dataPacientes: any = null;
    id: any;
    fechanacimiento: string;
    edad: any;
    dataIDfiliacion: any;
    dataPacientesReniec: any;
    imagePath: string = image;
    formDatos_Generales: FormGroup;


    idRecuperado: string = null;
    tipoDocRecuperado: string;
    nroDocRecuperado: string;

    fechaConvertido: string;
    dataDepartamentos: any;
    dataProvincia: any;
    ProvinciaIDSelct: any;
    dataDistrito: any;
    DistritoIDSelct: any;
    dataCentroPoblado: any;
    DepartamentoIDSelct: any;
    Gestacion: any;
    dataPaciente2: any;
    pacientesFiliacion: any;
    datePipe = new DatePipe('en-US');
    filiationId: string;

    constructor(private fb: FormBuilder,
        private filiancionService: FiliancionService,
        private ubicacionService: UbicacionService,
        private obstetriciaGeneralService: ObstetriciaGeneralService) {

        this.Gestacion = JSON.parse(localStorage.getItem('gestacion'));
        this.dataPaciente2 = JSON.parse(localStorage.getItem('dataPaciente'));

        // console.log("DATA PACIENTE 2", this.dataPaciente2);

        if (this.Gestacion == null) {
            this.tipoDocRecuperado = this.dataPaciente2.tipoDoc;
            this.nroDocRecuperado = this.dataPaciente2.nroDoc;
            this.idRecuperado = JSON.parse(localStorage.getItem('idGestacionRegistro'));


        } else {
            this.tipoDocRecuperado = this.Gestacion.tipoDoc;
            this.nroDocRecuperado = this.Gestacion.nroDoc;
            this.idRecuperado = this.Gestacion.id;
        }


        this.options = [
            { booleano: true, name: "SI" },
            { booleano: false, name: "NO" }
        ];

        this.studies = [
            'ANALFABETO',
            'PRIMARIA INCOMPLETA',
            'PRIMARIA COMPLETA',
            'SECUNDARIA INCOMPLETA',
            'SECUNDARIA COMPLETA',
            'SUPERIOR'
        ];
    }


    ngOnInit(): void {
        this.getDepartamentos();
        this.obternerFechaActual();
        this.buildForm();

        if (this.idRecuperado == null) {
            this.getpacienteByNroDoc();
        } else this.getpacienteFiiacionByID();

    }

    buildForm() {
        this.formDatos_Generales = this.fb.group({
            HCL: new FormControl({ value: '', disabled: true }),
            apePaterno: new FormControl({ value: '', disabled: true }),
            apeMaterno: new FormControl({ value: '', disabled: true }),
            primerNombre: new FormControl({ value: '', disabled: true }),
            establecimiento: new FormControl(''),
            estabOrigen: new FormControl(''),
            aplica: new FormControl(''),
            referencia: new FormControl(''),
            codAficiaconSIS: new FormControl(''),
            tipoSeguro: new FormControl(''),
            docIndentidad: new FormControl({ value: '', disabled: true }),
            fechaNacimiento: new FormControl({ value: '', disabled: true }),
            ocupacion: new FormControl(''),
            edad: new FormControl({ value: '', disabled: true }),
            direccion: new FormControl(''),
            gradoInstruccion: new FormControl(''),
            amiosAprobados: new FormControl(''),
            nombreNroSector: new FormControl(''),
            estadoCivil: new FormControl(''),
            departamento: new FormControl(''),
            provincia: new FormControl(''),
            distrito: new FormControl(''),
            nombreRN: new FormControl(''),
            pabreRN: new FormControl(''),
            religion: new FormControl(''),
            cel1: new FormControl('', [Validators.required, Validators.min(1), Validators.max(9)]),
            cel2: new FormControl(''),
            idioma: new FormControl(''),
        })
    }

    /**Lista todos los departamento **/
    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamentos = resp.object;
            // console.log("Departamento observer", this.dataDepartamentos);
        });
    }

    /**Selecciona un departamento y lista las provincias**/
    selectedDepartamento() {
        let depa = this.formDatos_Generales.value.departamento;
        this.dataDepartamentos.forEach(object => {
            if (object.departamento === depa) {
                // console.log("Departamento:", object);
                this.DepartamentoIDSelct = object.iddd
            }
        });
        let dpto = {
            iddd: this.DepartamentoIDSelct
        }
        this.dataDistrito = '';
        this.dataCentroPoblado = '';
        this.dataProvincia = '';
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
        });
    }

    /**Selecciona un Provincia y lista los Distritos**/
    selectedProvincia() {
        // DistritoIDSelct
        let provinciaX = this.formDatos_Generales.value.provincia;
        this.dataProvincia.forEach(object => {
            if (object.provincia === provinciaX) {
                // console.log("Provincia:", object);
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
    }

    /**Selecciona un Distrito y lista los Centros Poblados**/
    selectedDistrito() {
        let distritoX = this.formDatos_Generales.value.distrito;
        this.dataDistrito.forEach(object => {
            if (object.distrito === distritoX) {
                // console.log("Distrito:", object);
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

    listarUbicacionPacienteProvincias() {
        let Departamento;
        if (this.dataPacientes == null) {
            Departamento = this.dataIDfiliacion.departamento;
        } else {
            Departamento = this.dataPacientes.domicilio.departamento;
        }
        // console.log("Departamento XXX", this.dataPacientes)

        // console.log("Departamento:", this.dataDepartamentos);
        if (this.dataDepartamentos) {
            this.dataDepartamentos.forEach(object => {
                if (object.departamento === Departamento) {
                    // console.log("Departamento:", object);
                    this.DepartamentoIDSelct = object.iddd
                }
            });
            let dpto = {
                iddd: this.DepartamentoIDSelct
            }
            this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
                this.dataProvincia = res.object;
                // console.log("PROVINCIA:", this.dataProvincia);
                this.listarUbicacionPacientedistritos();
            });
        }
    }

    listarUbicacionPacientedistritos() {

        let Provincia;
        if (this.dataPacientes == null) {
            Provincia = this.dataIDfiliacion.provincia;
        } else {
            Provincia = this.dataPacientes.domicilio.provincia;
        }

        this.dataProvincia.forEach(object => {
            if (object.provincia === Provincia) {
                // console.log("Provincia:", object);
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

    listarUbicacionPacienteCCPP() {
        let Distrito
        if (this.dataPacientes == null) {
            Distrito = this.dataIDfiliacion.distrito;
        } else {
            Distrito = this.dataPacientes.domicilio.distrito;
        }

        this.dataDistrito.forEach(object => {
            if (object.distrito === Distrito) {
                // console.log("Distrito:", object);
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

    obternerFechaActual() {
        this.fecha = new Date();
        let dd = this.fecha.getDate();
        let mm = this.fecha.getMonth() + 1;
        let yy = this.fecha.getFullYear();
        this.fechaConvertido = dd + '-' + mm + '-' + yy;
        // console.log("FECHAS ACTUAL", this.fechaConvertido);
    }

    ageCalculator() {
        if (this.fechaConvertido) {
            const convertAge = new Date(this.fechaConvertido);
            const timeDiff = Math.abs(Date.now() - convertAge.getTime());
            this.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
            // console.log("edad", this.edad);
        }
    }


    agrgarFiliacionDatoPersonales() {
        const req = {
            nroHcl: this.formDatos_Generales.getRawValue().HCL,
            nroGestante: 0,
            nombreApellidos: "",
            ipressNombre: this.formDatos_Generales.value.establecimiento,
            ipressOrigen: this.formDatos_Generales.value.estabOrigen,
            noAplica: this.formDatos_Generales.value.aplica,
            referencia: this.formDatos_Generales.value.referencia,
            codigoAfiliacionSis: this.formDatos_Generales.value.codAficiaconSIS,
            nroDoc: this.formDatos_Generales.getRawValue().docIndentidad,
            fechaNacimiento: this.transformDate(this.formDatos_Generales.getRawValue().fechaNacimiento),
            ocupacion: this.formDatos_Generales.value.ocupacion,
            edad: this.formDatos_Generales.getRawValue().edad,
            direccion: this.formDatos_Generales.value.direccion,
            estudios: this.formDatos_Generales.value.gradoInstruccion,
            aniosAprobados: this.formDatos_Generales.value.amiosAprobados,
            nombreNroSector: this.formDatos_Generales.value.nombreNroSector,
            departamento: this.formDatos_Generales.value.departamento,
            provincia: this.formDatos_Generales.value.provincia,
            distrito: this.formDatos_Generales.value.distrito,
            religion: this.formDatos_Generales.value.religion,
            nroCelular: [
                this.formDatos_Generales.value.cel1, this.formDatos_Generales.value.cel2,
            ],
            idioma: this.formDatos_Generales.value.idioma,
            nombreRecienNacido: this.formDatos_Generales.value.nombreRN,
            padreRecienNacido: this.formDatos_Generales.value.pabreRN,
            estadoCivil: this.formDatos_Generales.value.estadoCivil,
            proceso: "proceso de gestacion",
            apePaterno: this.formDatos_Generales.getRawValue().apePaterno,
            apeMaterno: this.formDatos_Generales.getRawValue().apeMaterno,
            primerNombre: this.formDatos_Generales.getRawValue().primerNombre,
            otrosNombres: "",
        };
        // console.log('data to res ', req);
        if (this.idRecuperado == null) {
            this.filiancionService.addPacienteFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado, req).subscribe(
                result => {
                    // console.log("RESPUESTA", result)
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro',
                        text: 'Fue creado con exito',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    this.getpacientesFiliadosGestacion();
                }
            )
        } else {
            this.filiancionService.UpdatePacienteFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado, req).subscribe(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro',
                    text: 'Fue actualizado con exito',
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.getpacientesFiliadosGestacion();
            })
        }
    }

    getpacienteByNroDoc() {
        this.filiancionService.getPacienteNroDocFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientes = res.object;
            // this.traerDataReniec();
            // this.listarUbicacionPacienteProvincias();
            // console.log('paciente por doc ', this.dataPacientes)
            this.formDatos_Generales.get('apePaterno').setValue(this.dataPacientes.apePaterno);
            this.formDatos_Generales.get('apeMaterno').setValue(this.dataPacientes.apeMaterno);
            this.formDatos_Generales.get('primerNombre').setValue(this.dataPacientes.primerNombre);
            this.formDatos_Generales.get('HCL').setValue(this.dataPacientes.nroHcl);
            this.formDatos_Generales.get('docIndentidad').setValue(this.dataPacientes.nroDoc);
            this.formDatos_Generales.get('establecimiento').setValue(this.dataPacientes.nombreEESS);
            this.formDatos_Generales.get('estadoCivil').setValue(this.dataPacientes.estadoCivil);
            this.formDatos_Generales.get('codAficiaconSIS').setValue(this.dataPacientes.codSeguro);
            this.formDatos_Generales.get('tipoSeguro').setValue(this.dataPacientes.tipoSeguro);
            this.formDatos_Generales.get('direccion').setValue(this.dataPacientes.domicilio.direccion);
            this.formDatos_Generales.get('departamento').setValue(this.dataPacientes.domicilio.departamento);
            this.formDatos_Generales.get('provincia').setValue(this.dataPacientes.domicilio.provincia);
            this.formDatos_Generales.get('distrito').setValue(this.dataPacientes.domicilio.distrito);
            this.formDatos_Generales.get('nombreNroSector').setValue(this.dataPacientes.domicilio.ccpp);
            this.formDatos_Generales.get('gradoInstruccion').setValue(this.dataPacientes.gradoInstruccion);
            this.formDatos_Generales.get('cel1').setValue(this.dataPacientes.celular);

            this.fechanacimiento = this.datePipe.transform(this.dataPacientes.nacimiento.fechaNacimiento, 'dd-MM-yyyy')
            this.convertiFecha();
            this.formDatos_Generales.get('fechaNacimiento').setValue(this.fechanacimiento);
            this.ageCalculator();

            // this.calcularEdad2("1990-09-21");
            this.formDatos_Generales.get('edad').setValue(this.edad);
            this.locationAssibnmentByUbigeo(this.dataPacientes.domicilio.ubigeo, this.dataPacientes.domicilio.departamento, this.dataPacientes.domicilio.provincia, this.dataPacientes.domicilio.distrito);

        });
    }

    convertiFecha() {
        let values = this.fechanacimiento.split('-');
        // console.log('fecha de nac', this.fechanacimiento , values);
        let fecha = values[2];

        this.fechaConvertido = fecha;
        // console.log("fecha Convertido", this.fechaConvertido);
    }


    getpacienteFiiacionByID() {
        this.filiancionService.getPacienteFiliacionId(this.idRecuperado).subscribe((res: any) => {
            this.dataIDfiliacion = res.object;
            // console.log('data del paciente de filiacon ', this.dataIDfiliacion);
            this.listarUbicacionPacienteProvincias();
            this.traerDataReniec();
            this.formDatos_Generales.patchValue({
                apePaterno: this.dataIDfiliacion.apePaterno,
                apeMaterno: this.dataIDfiliacion.apeMaterno,
                primerNombre: this.dataIDfiliacion.primerNombre + ' ' + this.dataIDfiliacion.otrosNombres,
                HCL: this.dataIDfiliacion.nroHcl,
                establecimiento: this.dataIDfiliacion.ipressNombre,
                estadoCivil: this.dataIDfiliacion.estadoCivil,
                aplica: this.dataIDfiliacion.noAplica,
                referencia: this.dataIDfiliacion.referencia,
                codAficiaconSIS: this.dataIDfiliacion.codigoAfiliacionSis,
                docIndentidad: this.dataIDfiliacion.nroDoc,
                fechaNacimiento: this.datePipe.transform(this.dataIDfiliacion.fechaNacimiento, 'dd-MM-yyyy'),
                direccion: this.dataIDfiliacion.direccion,
                departamento: this.dataIDfiliacion.departamento,
                provincia: this.dataIDfiliacion.provincia,
                distrito: this.dataIDfiliacion.distrito,
                ocupacion: this.dataIDfiliacion.ocupacion,
                gradoInstruccion: this.dataIDfiliacion.estudios,
                estabOrigen: this.dataIDfiliacion.ipressOrigen,
                religion: this.dataIDfiliacion.religion,
                nombreRN: this.dataIDfiliacion.nombreRecienNacido,
                pabreRN: this.dataIDfiliacion.padreRecienNacido,
                idioma: this.dataIDfiliacion.idioma,
                amiosAprobados: this.dataIDfiliacion.aniosAprobados,
                nombreNroSector: this.dataIDfiliacion.nombreNroSector,
                cel1: this.dataIDfiliacion.nroCelular[0],
                cel2: this.dataIDfiliacion.nroCelular[1],
                edad: this.dataIDfiliacion.edad
            })
        });
    }

    traerDataReniec() {
        this.filiancionService.getDatosReniec(this.nroDocRecuperado).subscribe((res: any) => {
            this.dataPacientesReniec = res;
            // console.log(res);
            this.imagePath ? res.foto : image;
        });
    }

    getpacientesFiliadosGestacion() {
        this.obstetriciaGeneralService.getPacienteFiliacion(this.tipoDocRecuperado, this.nroDocRecuperado).subscribe((res: any) => {
            this.pacientesFiliacion = res.object
            console.log('paciente con nro de gestacion ', this.pacientesFiliacion)
            let index = this.pacientesFiliacion.length - 1;
            this.idRecuperado = this.pacientesFiliacion[index].id;
            console.log('id de filiacion ', this.idRecuperado);
            localStorage.setItem('idGestacionRegistro', JSON.stringify(this.idRecuperado));
            // console.log('ARREGLO ULTIMA POSICION', this.idRecuperado);
            this.getpacienteFiiacionByID();
        });
    }

    async locationAssibnmentByUbigeo(ubigeo: string, departamento: string, provincia: string, distrito: string): Promise<void> {
        let idDep: string = ubigeo.slice(0, 2);
        let idProv: string = ubigeo.slice(2, 4);
        let idDist: string = ubigeo.slice(4, 6);

        let dpto = {
            iddd: idDep
        }
        let prov = {
            iddd: idDep,
            idpp: idProv
        }
        let dist = {
            iddd: idDep,
            idpp: idProv,
            iddis: idDist
        }
        await this.ubicacionService.getPromiseDepartamentos().then((res: any) => {
            this.dataDepartamentos = res.object;
        });
        await this.ubicacionService.getPromiseProvincias(dpto).then((res: any) => {
            this.dataProvincia = res.object;
        });
        await this.ubicacionService.getPromiseDistritos(prov).then((res: any) => {
            this.dataDistrito = res.object;
        });
        await this.ubicacionService.getProimiseCentroPoblado(dist).then((res: any) => {
            this.dataCentroPoblado = res.object;
        })
        this.formDatos_Generales.patchValue({
            departamento: departamento,
            provincia: provincia,
            distrito: distrito
        });
    }
    transformDate(date: string): string {
        let auxDate = date.split("-");
        let newDate: string;
        newDate = `${auxDate[2]}-${auxDate[1]}-${auxDate[0]}`
        return newDate;
    }
}
