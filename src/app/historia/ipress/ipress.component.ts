import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { DatePipe } from '@angular/common';
import { Ipress } from 'src/app/core/models/mantenimiento.models';
import { IpressService } from 'src/app/core/services/ipress/ipress.service';
import { CategoriaEstablecimientoService } from 'src/app/mantenimientos/services/categoria-establecimiento/categoria-establecimiento.service';
import { UbicacionService } from 'src/app/mantenimientos/services/ubicacion/ubicacion.service';
import { RedServiciosSaludService } from 'src/app/mantenimientos/services/red-servicios-salud/red-servicios-salud.service';

@Component({
  selector: 'app-ipress',
  templateUrl: './ipress.component.html',
  styleUrls: ['./ipress.component.css']
})
export class IpressComponent implements OnInit {

  // Creacion del formulario
  form: FormGroup;
  formEncargado: FormGroup;
  formJurisdiccion: FormGroup;
  formAmbiente: FormGroup;
  formTurno: FormGroup;

  loading: boolean = false;
  //datos a usar
  isUpdate: boolean = false;
  isUpdateEncargado: boolean = false;
  isUpdateJurisdiccion: boolean = false;
  isUpdateAmbiente: boolean = false;
  isUpdateTurno: boolean = false;

  idUpdate: string = "";
  nombrePersonal: string = "";
  idIpress: string = "";

  //listas a usar
  stateOptions: any[];
  departamentosList: any[];
  provinciasList: any[];
  distritosList: any[];
  CCPPList: any[];
  //ipressList: any[];
  categoriasList: any[];
  redesList: any[];
  microRedesList: any[];

  //data de dialogs
  data: Ipress[] = [];
  encargados: any[];
  jurisdicciones: any[];
  ambientes: any[];
  turnos: any[];

  //dialogs
  ipressDialog: boolean;
  encargadoDialog: boolean;
  jurisdiccionDialog: boolean;
  ambienteDialog: boolean;
  turnoDialog: boolean;

  datePipe = new DatePipe('en-US');
  centro: any;

  constructor(
    private ipressservice: IpressService,
    private categoriaservice: CategoriaEstablecimientoService,
    private ubicacionService: UbicacionService,
    private redServiciosSaludService: RedServiciosSaludService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getIpress();
    this.getCategorias();
    this.getDepartamentos();
    this.getRedServiciosSalud();
    this.stateOptions = [{ label: 'Activo', value: true }, { label: 'Inactivo', value: false }];
  }

  getIpress() {
    this.ipressservice.getIpress().subscribe((res: any) => {
      this.data = res.object;
    });
  }
  getCategorias() {
    this.categoriaservice.getCategoriaEstablecimiento().subscribe((res: any) => {
      this.categoriasList = res.object;
      console.log(this.categoriasList)
    });
  }
  getDepartamentos() {
    this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
      this.departamentosList = resp.object;
      console.log(this.departamentosList)
    });
  }
  getRedServiciosSalud() {
    this.redServiciosSaludService.getRedServiciosSalud().subscribe((res: any) => {
      this.redesList = res.object;
      console.log('data res ', this.redesList)
    })
  }
  changeRedSelected() {
    console.log(this.form.value.red);
    this.redServiciosSaludService.getMicroRedServiciosSalud(this.form.value.red.idRed).subscribe((res: any) => {
      console.log(res);
      this.microRedesList = res.object;
      if (this.microRedesList[0].idMicroRed == null) {
        this.microRedesList = [];
      }
      console.log('res change red ', this.microRedesList)
    })
  }
  buildForm() {
    this.form = this.formBuilder.group({
      codRENAES: ['', [Validators.required]],
      nombreEESS: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      ubigeo: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      centroPoblado: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      red: ['', [Validators.required]],
      microRed: ['', [Validators.required]],
    })
    this.formEncargado = this.formBuilder.group({
      idPersonal: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      fechaAsignacion: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    })
    this.formJurisdiccion = this.formBuilder.group({
      ubigeo: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      centroPoblado: ['', [Validators.required]],
    })
    this.formAmbiente = this.formBuilder.group({
      codAmbiente: ['', [Validators.required]],
      ambiente: ['', [Validators.required]],
      nombreUPS: ['', [Validators.required]],
    })
    this.formTurno = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      nroHoras: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
    })
  }

  buscarUbigeo() {
    const ubigeo = {
      ubigeo: this.form.value.ubigeo,
    }
    if (this.form.value.ubigeo.trim()!=""){
      this.loading = true;
      this.ubicacionService.buscarUbigeo(ubigeo).subscribe((res: any) => {
        console.log(res.object);
        this.form.get('departamento').setValue({ iddd: res.object[0].iddd, departamento: res.object[0].departamento });
        this.selectedDepartamento();
        this.form.get('provincia').setValue({ idpp: res.object[0].idpp, provincia: res.object[0].provincia });
        this.selectedProvincia();
        this.form.get('distrito').setValue({ iddis: res.object[0].iddis, distrito: res.object[0].distrito });
        this.selectedDistrito();
        this.loading = false;
      })
    }
  }

  selectedDepartamento() {
    const dpto = {
      departamento: this.form.value.departamento,
    }
    let rowData = dpto.departamento;
    console.log(rowData)
    this.ubicacionService.getProvincias(rowData).subscribe((res: any) => {
      this.provinciasList = res.object;
      console.log('data provincias', this.provinciasList )
    })
  }

  selectedProvincia() {
    const rowData = {
      departamento: this.form.value.departamento,
      provincia: this.form.value.provincia,
    };

    let d = rowData.departamento.iddd;
    let p = rowData.provincia.idpp;

    let aux = {
      iddd: d,
      idpp: p
    }
    console.log(aux)
    this.ubicacionService.getDistritos(aux).subscribe((res: any) => {
      this.distritosList = res.object;
      console.log('data distritos', this.distritosList)
    })
  }

  selectedDistrito() {
    const rowData = {
      departamento: this.form.value.departamento,
      provincia: this.form.value.provincia,
      distrito: this.form.value.distrito,
    };

    let d = rowData.departamento.iddd;
    let p = rowData.provincia.idpp;
    let dt = rowData.distrito.iddis;

    let aux = {
      iddd: d,
      idpp: p,
      iddis: dt
    }
    this.ubicacionService.getCentroPoblado(aux).subscribe((res: any) => {
      this.CCPPList = res.object;
      console.log('data centro poblado', this.CCPPList)
    })
    this.ubicacionService.getUbigeoDistrito(aux).subscribe((res: any) => {
      this.form.get('ubigeo').setValue(res.object[0].ubigeo);
    })

  }

  saveForm() {
    this.isUpdate = false;

    let aux = {
      iddd: this.form.value.departamento.iddd,
      idpp: this.form.value.provincia.idpp,
      iddis: this.form.value.distrito.iddis,
      ccpp: this.form.value.centroPoblado.ccpp,
    }
    this.ubicacionService.getCCPPDatos(aux).subscribe((res: any) => {
      this.centro=res.object[0];
      const req = {
        codRENAES: this.form.value.codRENAES,
        nombreEESS: this.form.value.nombreEESS,
        categoria: {
          abreviatura: this.form.value.categoria.abreviatura,
          descripcion:this.form.value.categoria.descripcion,
          nivelEESS:this.form.value.categoria.nivel,
        },
        ubicacion: {
          ubigeo: this.form.value.ubigeo,
          departamento: this.form.value.departamento.departamento,
          provincia: this.form.value.provincia.provincia,
          distrito: this.form.value.distrito.distrito,
          centroPoblado: this.form.value.centroPoblado.ccpp,
          altura: this.centro.altura,
          latitud: this.centro.latitude,
          longitud: this.centro.longitude,
          direccion: this.form.value.direccion,
        },
        red: {
          _id: this.form.value.red.idRed,
          nombreRed: this.form.value.red.nombreRed,
          idMicroRed: this.form.value.microRed.idMicroRed,
          nombreMicroRed: this.form.value.microRed.nombreMicroRed,
        }
      };
      if (req.codRENAES.trim() !== "") {
        this.ipressservice.createIpress(req).subscribe(
            result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.getIpress();
                this.ipressDialog = false;
            }
        )
      }
    })
    
  }

  openNew() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('codRENAES').setValue("");
    this.form.get('nombreEESS').setValue("");
    this.form.get('categoria').setValue("");
    this.form.get('ubigeo').setValue("");
    this.form.get('departamento').setValue("");
    this.form.get('provincia').setValue("");
    this.form.get('distrito').setValue("");
    this.form.get('centroPoblado').setValue("");
    this.form.get('direccion').setValue("");
    this.form.get('red').setValue("");
    this.form.get('microRed').setValue("");
    this.ipressDialog = true;
  }
  editar(rowData) {
    this.isUpdate = true;
    this.form.reset();
    console.log(rowData);
    this.form.get('codRENAES').setValue(rowData.codRENAES);
    this.form.get('nombreEESS').setValue(rowData.nombreEESS);
    //this.form.get('categoria').setValue(this.categoriasList.find(cat => cat.abreviatura === rowData.categoria.abreviatura));
    this.form.get('ubigeo').setValue(rowData.ubigeo);
    //this.form.get('departamento').setValue(this.departamentosList.find(dep => dep.departamento === rowData.ubicacion.departamento));
    this.selectedDepartamento();
    //this.form.get('provincia').setValue(this.provinciasList.find(prov => prov.provincia === rowData.ubicacion.provincia ));
    this.selectedProvincia();
    //this.form.get('distrito').setValue(this.distritosList.find(dis => dis.distrito === rowData.ubicacion.distrito ));
    this.selectedDistrito();
    //this.form.get('centroPoblado').setValue(this.CCPPList.find(cp => cp.ccpp === rowData.ubicacion.centroPoblado));
    this.form.get('direccion').setValue(rowData.ubicacion.direccion);
    //this.form.get('red').setValue(this.redesList.find(red => red.idRed === rowData.red.id));
    //this.form.get('microRed').setValue(this.microRedesList.find(microred => microred.idMicroRed === rowData.red.idMicroRed));
    console.log("Datos del formulario ", this.form.value)
    this.idUpdate = rowData.id;
    this.ipressDialog = true;
  }
  editarDatos(rowData) {
    this.isUpdate = true;
    //let ipressSelected = this.ipressList.find(ipress => ipress.id === this.form.value.detalleIpress);
    const req = {
      id: this.idUpdate,
      tipoDoc: this.form.value.tipoDoc,
      nroDoc: this.form.value.nroDoc,
      apePaterno: this.form.value.apePaterno,
      apeMaterno: this.form.value.apeMaterno,
      fechaNacimiento: this.datePipe.transform(this.form.value.fechaNacimiento, 'yyyy-MM-dd'),
      sexo: this.form.value.sexo,
      contratoAbreviatura: this.form.value.contratoAbreviatura,
      colegiatura: this.form.value.colegiatura,
      estado: this.form.value.estado,
      detalleIpress: {
        idIpress: this.form.value.detalleIpress,
        //eess: ipressSelected.nombreEESS,
        fechaInicio: this.datePipe.transform(this.form.value.fechaInicio, 'yyyy-MM-dd') + " 00:00:00",
      },
    }

    /*this.personalservice.editPersonal(req).subscribe(
        result => {
            Swal.fire({
                icon: 'success',
                title: 'Editado correctamente',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })
            this.getPersonal();
            this.personalDialog = false;
        }
    )*/
  }

  eliminar(rowData) {
    this.isUpdate = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ipressservice.deleteIpress(rowData.id).subscribe(
            result => {
                this.getIpress()
            }
        );
        Swal.fire({
            icon: 'success',
            title: 'Eliminado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500
        })
      }
    })
  }
  canceled() {
    Swal.fire({
      icon: 'warning',
      title: 'Cancelado...',
      text: '',
      showConfirmButton: false,
      timer: 1000
    })
    this.ipressDialog = false;
  }
  titulo() {
    if (this.isUpdate) return "Edite IPRESS";
    else return "Ingrese Nueva IPRESS";
  }

  // modulos para todos los dialogs
  close() {
    this.encargadoDialog = false;
    this.jurisdiccionDialog = false;
    this.ambienteDialog = false;
    this.turnoDialog = false;
    this.guardarNuevoEncargado();
    this.guardarNuevaJurisdiccion();
    this.guardarNuevoAmbiente();
    this.guardarNuevoTurno();
  }

  // modulos de encargado
  newEncargado(rowData) {
    this.encargados = rowData.encargado;
    this.idIpress = rowData.id;
    this.formEncargado.reset();
    this.encargadoDialog = true;
  }
  newJurisdiccion(rowData) {
    this.jurisdicciones = rowData.jurisdiccion;
    this.idIpress = rowData.id;
    this.formJurisdiccion.reset();
    this.jurisdiccionDialog = true;
  }
  newAmbiente(rowData) {
    this.ambientes = rowData.ambiente;
    this.idIpress = rowData.id;
    this.formAmbiente.reset();
    this.ambienteDialog = true;
  }
  newTurno(rowData) {
    this.turnos = rowData.turno;
    this.idIpress = rowData.id;
    this.formTurno.reset();
    this.turnoDialog = true;
  }

  guardarNuevoEncargado() {
    this.isUpdateEncargado = false;
    this.formEncargado.reset();
    this.formEncargado.get('idPersonal').setValue("");
    this.formEncargado.get('nombre').setValue("");
    this.formEncargado.get('fechaAsignacion').setValue("");
    this.formEncargado.get('estado').setValue("");
  }
  guardarNuevaJurisdiccion() {
    this.isUpdateJurisdiccion = false;
    this.formJurisdiccion.reset();
    this.formJurisdiccion.get('ubigeo').setValue("");
    this.formJurisdiccion.get('departamento').setValue("");
    this.formJurisdiccion.get('provincia').setValue("");
    this.formJurisdiccion.get('distrito').setValue("");
    this.formJurisdiccion.get('centroPoblado').setValue("");
  }
  guardarNuevoAmbiente() {
    this.isUpdateAmbiente = false;
    this.formAmbiente.reset();
    this.formAmbiente.get('codAmbiente').setValue("");
    this.formAmbiente.get('ambiente').setValue("");
    this.formAmbiente.get('nombreUPS').setValue("");

  }
  guardarNuevoTurno() {
    this.isUpdateTurno = false;
    this.formTurno.reset();
    this.formTurno.get('nombre').setValue("");
    this.formTurno.get('nroHoras').setValue("");
    this.formTurno.get('horaInicio').setValue("");
    this.formTurno.get('horaFin').setValue("");

  }

  editarEncargado(rowData) {
    this.isUpdateEncargado = true;
    this.formEncargado.get('idPersonal').setValue(rowData.idPersonal);
    this.formEncargado.get('nombre').setValue(rowData.nombre);
    this.formEncargado.get('fechaAsignacion').setValue(rowData.fechaAsignacion);
    this.formEncargado.get('estado').setValue(rowData.estado);
  }
  editarJurisdiccion(rowData) {
    this.isUpdateJurisdiccion = true;
    this.formJurisdiccion.get('ubigeo').setValue(rowData.ubigeo);
    this.formJurisdiccion.get('departamento').setValue(rowData.departamento);
    this.formJurisdiccion.get('provincia').setValue(rowData.provincia);
    this.formJurisdiccion.get('distrito').setValue(rowData.distrito);
    this.formJurisdiccion.get('centroPoblado').setValue(rowData.centroPoblado);
  }
  editarAmbiente(rowData) {
    this.isUpdateAmbiente = true;
    this.formAmbiente.get('codAmbiente').setValue(rowData.codAmbiente);
    this.formAmbiente.get('ambiente').setValue(rowData.ambiente);
    this.formAmbiente.get('nombreUPS').setValue(rowData.nombreUPS);
  }
  editarTurno(rowData) {
    this.isUpdateTurno = true;
    this.formTurno.get('nombre').setValue(rowData.nombre);
    this.formTurno.get('nroHoras').setValue(rowData.nroHoras);
    this.formTurno.get('horaInicio').setValue(rowData.horaInicio);
    this.formTurno.get('horaFin').setValue(rowData.horaFin)
  }

  tituloEncargado() {
    if (this.isUpdateEncargado) return "Edite Encargado";
    else return "Ingrese Nuevo Encargado";
  }
  tituloJurisdiccion() {
    if (this.isUpdateJurisdiccion) return "Edite Jurisdiccion";
    else return "Ingrese Nueva Jurisdiccion";
  }
  tituloAmbiente() {
    if (this.isUpdateAmbiente) return "Edite Ambiente";
    else return "Ingrese Nuevo Ambiente";
  }
  tituloTurno() {
    if (this.isUpdateTurno) return "Edite Turno";
    else return "Ingrese Nuevo Turno";
  }

  eliminarEncargado(rowData) {
    this.isUpdateEncargado = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        /*this.personalservice.deletePersonalEspecialidad(this.idEspecialidad,rowData.nombre).subscribe(
            result => {
                this.getPersonalIdEspecialidad()
            }
        );
        Swal.fire({
            icon: 'success',
            title: 'Eliminado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500
        })*/
      }
    })
  }
  eliminarJurisdiccion(rowData) {
    this.isUpdateJurisdiccion = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        /*this.personalservice.deletePersonalEspecialidad(this.idEspecialidad,rowData.nombre).subscribe(
            result => {
                this.getPersonalIdEspecialidad()
            }
        );
        Swal.fire({
            icon: 'success',
            title: 'Eliminado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500
        })*/
      }
    })
  }
  eliminarAmbiente(rowData) {
    this.isUpdateAmbiente = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        /*this.personalservice.deletePersonalEspecialidad(this.idEspecialidad,rowData.nombre).subscribe(
            result => {
                this.getPersonalIdEspecialidad()
            }
        );
        Swal.fire({
            icon: 'success',
            title: 'Eliminado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500
        })*/
      }
    })
  }
  eliminarTurno(rowData) {
    this.isUpdateTurno = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        /*this.personalservice.deletePersonalEspecialidad(this.idEspecialidad,rowData.nombre).subscribe(
            result => {
                this.getPersonalIdEspecialidad()
            }
        );
        Swal.fire({
            icon: 'success',
            title: 'Eliminado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500
        })*/
      }
    })
  }
  saveEncargado(rowData) {
    /*let est=this.especialidadesList.find( espe => espe.nombre === this.formEspecialidad.value.nombre);
    const req = {
        nombre: this.formEspecialidad.value.nombre,
        nroEspecialidad: this.formEspecialidad.value.nroEspecialidad,
        estado: est.estado
    }

    this.personalservice.createPersonalEspecialidad(this.idEspecialidad,req).subscribe(
        result => {
            Swal.fire({
                icon: 'success',
                title: 'Agregado correctamente',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })
            this.getPersonalIdEspecialidad();
            this.guardarNuevoEspecialidad();
        }
    )*/
  }
  saveJurisdiccion(rowData) {
    /*let est=this.especialidadesList.find( espe => espe.nombre === this.formEspecialidad.value.nombre);
    const req = {
        nombre: this.formEspecialidad.value.nombre,
        nroEspecialidad: this.formEspecialidad.value.nroEspecialidad,
        estado: est.estado
    }

    this.personalservice.createPersonalEspecialidad(this.idEspecialidad,req).subscribe(
        result => {
            Swal.fire({
                icon: 'success',
                title: 'Agregado correctamente',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })
            this.getPersonalIdEspecialidad();
            this.guardarNuevoEspecialidad();
        }
    )*/
  }
  saveAmbiente(rowData) {
    /*let est=this.especialidadesList.find( espe => espe.nombre === this.formEspecialidad.value.nombre);
    const req = {
        nombre: this.formEspecialidad.value.nombre,
        nroEspecialidad: this.formEspecialidad.value.nroEspecialidad,
        estado: est.estado
    }

    this.personalservice.createPersonalEspecialidad(this.idEspecialidad,req).subscribe(
        result => {
            Swal.fire({
                icon: 'success',
                title: 'Agregado correctamente',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })
            this.getPersonalIdEspecialidad();
            this.guardarNuevoEspecialidad();
        }
    )*/
  }
  saveTurno(rowData) {
    /*let est=this.especialidadesList.find( espe => espe.nombre === this.formEspecialidad.value.nombre);
    const req = {
        nombre: this.formEspecialidad.value.nombre,
        nroEspecialidad: this.formEspecialidad.value.nroEspecialidad,
        estado: est.estado
    }

    this.personalservice.createPersonalEspecialidad(this.idEspecialidad,req).subscribe(
        result => {
            Swal.fire({
                icon: 'success',
                title: 'Agregado correctamente',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })
            this.getPersonalIdEspecialidad();
            this.guardarNuevoEspecialidad();
        }
    )*/
  }
  saveEdicionEncargado() {
    /*let est=this.especialidadesList.find( espe => espe.nombre === this.formEspecialidad.value.nombre);
    console.log(est);
    const req = {
        nombre: this.formEspecialidad.value.nombre,
        nroEspecialidad: this.formEspecialidad.value.nroEspecialidad,
        estado: this.estadoUpdateEspecialidad

    }
    console.log(req);

    this.personalservice.editPersonalEspecialidad(this.idEspecialidad,req).subscribe(
        result => {
            Swal.fire({
                icon: 'success',
                title: 'Editado correctamente',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })
            this.getPersonalIdEspecialidad();
            this.guardarNuevoEspecialidad();
        }
    )*/
  }
  saveEdicionJurisdiccion() {
    /*let est=this.especialidadesList.find( espe => espe.nombre === this.formEspecialidad.value.nombre);
    console.log(est);
    const req = {
        nombre: this.formEspecialidad.value.nombre,
        nroEspecialidad: this.formEspecialidad.value.nroEspecialidad,
        estado: this.estadoUpdateEspecialidad

    }
    console.log(req);

    this.personalservice.editPersonalEspecialidad(this.idEspecialidad,req).subscribe(
        result => {
            Swal.fire({
                icon: 'success',
                title: 'Editado correctamente',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })
            this.getPersonalIdEspecialidad();
            this.guardarNuevoEspecialidad();
        }
    )*/
  }
  saveEdicionAmbiente() {
    /*let est=this.especialidadesList.find( espe => espe.nombre === this.formEspecialidad.value.nombre);
    console.log(est);
    const req = {
        nombre: this.formEspecialidad.value.nombre,
        nroEspecialidad: this.formEspecialidad.value.nroEspecialidad,
        estado: this.estadoUpdateEspecialidad

    }
    console.log(req);

    this.personalservice.editPersonalEspecialidad(this.idEspecialidad,req).subscribe(
        result => {
            Swal.fire({
                icon: 'success',
                title: 'Editado correctamente',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })
            this.getPersonalIdEspecialidad();
            this.guardarNuevoEspecialidad();
        }
    )*/
  }
  saveEdicionTurno() {
    /*let est=this.especialidadesList.find( espe => espe.nombre === this.formEspecialidad.value.nombre);
    console.log(est);
    const req = {
        nombre: this.formEspecialidad.value.nombre,
        nroEspecialidad: this.formEspecialidad.value.nroEspecialidad,
        estado: this.estadoUpdateEspecialidad

    }
    console.log(req);

    this.personalservice.editPersonalEspecialidad(this.idEspecialidad,req).subscribe(
        result => {
            Swal.fire({
                icon: 'success',
                title: 'Editado correctamente',
                text: '',
                showConfirmButton: false,
                timer: 1500,
            })
            this.getPersonalIdEspecialidad();
            this.guardarNuevoEspecialidad();
        }
    )*/
  }

  ngOnInit(): void {
  }
}
