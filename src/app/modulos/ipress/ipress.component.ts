import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { DatePipe } from '@angular/common';
import { Ipress } from 'src/app/core/models/mantenimiento.models';
import { IpressService } from 'src/app/core/services/ipress/ipress.service';
import { CategoriaEstablecimientoService } from 'src/app/mantenimientos/services/categoria-establecimiento/categoria-establecimiento.service';
import { UbicacionService } from 'src/app/mantenimientos/services/ubicacion/ubicacion.service';
import { RedServiciosSaludService } from 'src/app/mantenimientos/services/red-servicios-salud/red-servicios-salud.service';
import { UpsService } from 'src/app/mantenimientos/services/ups/ups.service';
import { TipoTurnoService } from 'src/app/mantenimientos/services/tipo-turno.service';
import { DocumentoIdentidadService } from 'src/app/mantenimientos/services/documento-identidad/documento-identidad.service';
import { PersonalService } from 'src/app/core/services/personal-services/personal.service';

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
  formRol: FormGroup;
  formHorario: FormGroup;

  loading: boolean = false;
  loadingEncargado: boolean = false;
  //datos a usar
  isUpdate: boolean = false;
  isUpdateEncargado: boolean = false;
  isUpdateJurisdiccion: boolean = false;
  isUpdateAmbiente: boolean = false;
  isUpdateTurno: boolean = false;
  isUpdateRol: boolean = false;
  isUpdateHorario: boolean = false;

  idUpdate: string = "";
  nombrePersonal: string = "";
  idIpress: string = "";
  encargadoActual: any;
  idPersonalEncargado: string = "";
  tamanioDocumento: number = 0;

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
  UPSList: any[];
  tipoTurnosList: any[];
  tipoDocumentosList: any[];
  categorizacionesList: any[];4
  clasificacionesList: any[];
  unidadesList: any[];

  //data de dialogs
  data: Ipress[] = [];
  jurisdicciones: any[];
  ambientes: any[];
  turnos: any[];
  roles: any[];
  horarios: any[];
  
  //dialogs
  ipressDialog: boolean;
  jurisdiccionDialog: boolean;
  ambienteDialog: boolean;
  turnoDialog: boolean;
  encargadoDialog: boolean;
  rolDialog: boolean;
  horarioDialog: boolean;

  datePipe = new DatePipe('en-US');
  centro: any;

  constructor(
    private ipressservice: IpressService,
    private categoriaservice: CategoriaEstablecimientoService,
    private ubicacionService: UbicacionService,
    private redServiciosSaludService: RedServiciosSaludService,
    private upsService: UpsService,
    private tipoturnoService: TipoTurnoService,
    private tipodocumentosService: DocumentoIdentidadService,
    private personalservice: PersonalService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.getIpress();
    this.getCategorias();
    this.getDepartamentos();
    this.getRedServiciosSalud();
    this.getUPS();
    this.getTiposTurno();
    this.getTipoDocumentos();
    this.stateOptions = [{ label: 'Activo', value: true }, { label: 'Inactivo', value: false }];
  }

  getIpress() {
    this.ipressservice.getIpress().subscribe((res: any) => {
      this.data = res.object;
    });
  }
  getIpressId() {
    this.ipressservice.getIpressID(this.idIpress).subscribe((res: any) => {
      this.jurisdicciones = res.object.jurisdiccion;
      this.ambientes = res.object.ambientes;
      this.turnos = res.object.turnos;
      this.roles = res.object.roles;
    });
  }
  getCategorias() {
    this.categoriaservice.getCategoriaEstablecimiento().subscribe((res: any) => {
      this.categoriasList = res.object;
    });
  }
  getDepartamentos() {
    this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
      this.departamentosList = resp.object;
    });
  }
  getRedServiciosSalud() {
    this.redServiciosSaludService.getRedServiciosSalud().subscribe((res: any) => {
      this.redesList = res.object;
    })
  }
  getUPS() {
    this.upsService.getUPS().subscribe((res: any) => {
      this.UPSList = res.object;
    })
  }
  getTiposTurno() {
    this.tipoturnoService.getTipoTurnos().subscribe((res: any) => {
      this.tipoTurnosList = res.object;
    })
  }
  getTipoDocumentos() {
    this.tipodocumentosService.getDocumentosIdentidad().subscribe((res: any) => {
      this.tipoDocumentosList = res.object;
    })
  }
  changeRedSelected() {
    this.redServiciosSaludService.getMicroRedServiciosSalud(this.form.value.red.idRed).subscribe((res: any) => {
      this.microRedesList = res.object;
      if (this.microRedesList[0].idMicroRed == null) {
        this.microRedesList = [];
      }
    })
  }
  changeRedSelectedEditar(rowData) {
    this.redServiciosSaludService.getMicroRedServiciosSalud(this.form.value.red.idRed).subscribe((res: any) => {
      this.microRedesList = res.object;
      if (this.microRedesList[0].idMicroRed == null) {
        this.microRedesList = [];
      }
      this.form.get('microRed').setValue(this.microRedesList.find(microred => microred.idMicroRed === rowData.red.idMicroRed));
    })
  }
  buildForm() {
    this.form = this.formBuilder.group({
      renipress: ['', [Validators.required]],
      ruc: ['', [Validators.required]],
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
      docPersonal: ['', [Validators.required]],
      nombrePersonal: ['', [Validators.required]],
      unidad: ['', [Validators.required]],
      clasificacion: ['', [Validators.required]],
      categorizacion: ['', [Validators.required]],
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
    this.formEncargado = this.formBuilder.group({
      tipoDocumento: ['', [Validators.required]],
      nroDoc: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    })
    this.formRol = this.formBuilder.group({
      nombreFuncion: ['', [Validators.required]],
      nombreUPS: ['', [Validators.required]],
      fechaRegistro: ['', [Validators.required]],
      tiempoPromedioAtencion: ['', [Validators.required]],
      tiempoPreparacion: ['', [Validators.required]],
    })
    this.formHorario = this.formBuilder.group({
      lunesInicioManiana: ['', [Validators.required]],
      lunesFinManiana: ['', [Validators.required]],
      lunesInicioTarde: ['', [Validators.required]],
      lunesFinTarde: ['', [Validators.required]],
      martesInicioManiana: ['', [Validators.required]],
      martesFinManiana: ['', [Validators.required]],
      martesInicioTarde: ['', [Validators.required]],
      martesFinTarde: ['', [Validators.required]],
      miercolesInicioManiana: ['', [Validators.required]],
      miercolesFinManiana: ['', [Validators.required]],
      miercolesInicioTarde: ['', [Validators.required]],
      miercolesFinTarde: ['', [Validators.required]],
      juevesInicioManiana: ['', [Validators.required]],
      juevesFinManiana: ['', [Validators.required]],
      juevesInicioTarde: ['', [Validators.required]],
      juevesFinTarde: ['', [Validators.required]],
      viernesInicioManiana: ['', [Validators.required]],
      viernesFinManiana: ['', [Validators.required]],
      viernesInicioTarde: ['', [Validators.required]],
      viernesFinTarde: ['', [Validators.required]],
      sabadoInicioManiana: ['', [Validators.required]],
      sabadoFinManiana: ['', [Validators.required]],
      sabadoInicioTarde: ['', [Validators.required]],
      sabadoFinTarde: ['', [Validators.required]],
      domingoInicioManiana: ['', [Validators.required]],
      domingoFinManiana: ['', [Validators.required]],
      domingoInicioTarde: ['', [Validators.required]],
      domingoFinTarde: ['', [Validators.required]],
    })
  }

  buscarUbigeo() {
    const ubigeo = {
      ubigeo: this.form.value.ubigeo,
    }
    if (this.form.value.ubigeo.trim() != "") {
      this.loading = true;
      this.ubicacionService.buscarUbigeo(ubigeo).subscribe((res: any) => {
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
    this.ubicacionService.getProvincias(rowData).subscribe((res: any) => {
      this.provinciasList = res.object;
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
    this.ubicacionService.getDistritos(aux).subscribe((res: any) => {
      this.distritosList = res.object;
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
    })
    this.ubicacionService.getUbigeoDistrito(aux).subscribe((res: any) => {
      this.form.get('ubigeo').setValue(res.object[0].ubigeo);
    })
  }
  selectedEditar(rowData) {
    this.form.get('departamento').setValue(this.departamentosList.find(dep => dep.departamento === rowData.ubicacion.departamento));

    const dpto = {
      departamento: this.form.value.departamento,
    }

    this.ubicacionService.getProvincias(dpto.departamento).subscribe((res: any) => {
      this.provinciasList = res.object;
      this.form.get('provincia').setValue(this.provinciasList.find(prov => prov.provincia === rowData.ubicacion.provincia));

      const data = {
        departamento: this.form.value.departamento,
        provincia: this.form.value.provincia,
      };

      let d = data.departamento.iddd;
      let p = data.provincia.idpp;

      let aux = {
        iddd: d,
        idpp: p
      }
      this.ubicacionService.getDistritos(aux).subscribe((res: any) => {
        this.distritosList = res.object;
        this.form.get('distrito').setValue(this.distritosList.find(dis => dis.distrito === rowData.ubicacion.distrito));

        const data = {
          departamento: this.form.value.departamento,
          provincia: this.form.value.provincia,
          distrito: this.form.value.distrito,
        };

        let d = data.departamento.iddd;
        let p = data.provincia.idpp;
        let dt = data.distrito.iddis;

        let aux = {
          iddd: d,
          idpp: p,
          iddis: dt
        }
        this.ubicacionService.getCentroPoblado(aux).subscribe((res: any) => {
          this.CCPPList = res.object;
          this.form.get('centroPoblado').setValue(this.CCPPList.find(cp => cp.ccpp === rowData.ubicacion.centroPoblado));
        })
      })

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
      this.centro = res.object[0];
      const req = {
        renipress: this.form.value.renipress,
        nombreEESS: this.form.value.nombreEESS,
        categoria: {
          abreviatura: this.form.value.categoria.abreviatura,
          descripcion: this.form.value.categoria.descripcion,
          nivelEESS: this.form.value.categoria.nivel,
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
          idRed: this.form.value.red.idRed,
          nombreRed: this.form.value.red.nombreRed,
          idMicroRed: this.form.value.microRed.idMicroRed,
          nombreMicroRed: this.form.value.microRed.nombreMicroRed,
        },
        categorizacion: {
          tipoDocCategorizacion: this.form.value.categorizacion.tipoDocCategorizacion,
          nroDocCategorizacion: this.form.value.categorizacion.nroDocCategorizacion
        },
        clasificacion: {
          clasificacion:this.form.value.clasificacion.clasificacion,
          tipo:this.form.value.clasificacion.tipo
        },
        unidadEjecutora: {
          unidadEjecutora: this.form.value.unidad.unidadEjecutora,
          codUnidadEjecutora: this.form.value.unidad.codUnidadEjecutora
        }
      };
      if (req.renipress.trim() !== "") {
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
            this.provinciasList = [];
            this.distritosList = [];
            this.CCPPList = [];
            this.microRedesList = [];
            this.ipressDialog = false;
          }
        )
      }
    })

  }

  openNew() {
    this.isUpdate = false;
    this.form.reset();
    this.form.get('renipress').setValue("");
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
    this.form.get('renipress').setValue(rowData.renipress);
    this.form.get('nombreEESS').setValue(rowData.nombreEESS);
    this.form.get('categoria').setValue(this.categoriasList.find(cat => cat.abreviatura === rowData.categoria.abreviatura));
    this.form.get('ubigeo').setValue(rowData.ubicacion.ubigeo);
    this.selectedEditar(rowData);
    this.form.get('direccion').setValue(rowData.ubicacion.direccion);
    this.form.get('red').setValue(this.redesList.find(red => red.nombreRed === rowData.red.nombreRed));
    this.changeRedSelectedEditar(rowData);
    //agregar clasificacion, categorizacion y unidad ejecutora aqui usando find
    this.idUpdate = rowData.id;
    this.ipressDialog = true;
  }
  editarDatos(rowData) {
    this.isUpdate = true;
    let aux = {
      iddd: this.form.value.departamento.iddd,
      idpp: this.form.value.provincia.idpp,
      iddis: this.form.value.distrito.iddis,
      ccpp: this.form.value.centroPoblado.ccpp,
    }
    this.ubicacionService.getCCPPDatos(aux).subscribe((res: any) => {
      this.centro = res.object[0];
      const req = {
        id: this.idUpdate,
        renipress: this.form.value.renipress,
        nombreEESS: this.form.value.nombreEESS,
        categoria: {
          abreviatura: this.form.value.categoria.abreviatura,
          descripcion: this.form.value.categoria.descripcion,
          nivelEESS: this.form.value.categoria.nivel,
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
          idRed: this.form.value.red.idRed,
          nombreRed: this.form.value.red.nombreRed,
          idMicroRed: this.form.value.microRed.idMicroRed,
          nombreMicroRed: this.form.value.microRed.nombreMicroRed,
        },
        categorizacion: {
          tipoDocCategorizacion: this.form.value.categorizacion.tipoDocCategorizacion,
          nroDocCategorizacion: this.form.value.categorizacion.nroDocCategorizacion
        },
        clasificacion: {
          clasificacion:this.form.value.clasificacion.clasificacion,
          tipo:this.form.value.clasificacion.tipo
        },
        unidadEjecutora: {
          unidadEjecutora: this.form.value.unidad.unidadEjecutora,
          codUnidadEjecutora: this.form.value.unidad.codUnidadEjecutora
        }
      };
      if (req.renipress.trim() !== "") {
        this.ipressservice.editIpress(req).subscribe(
          result => {
            Swal.fire({
              icon: 'success',
              title: 'Editado correctamente',
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
            this.getIpress();
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
    this.provinciasList = [];
    this.distritosList = [];
    this.CCPPList = [];
    this.microRedesList = [];
    this.close();
  }
  titulo() {
    if (this.isUpdate) return "Edite IPRESS";
    else return "Ingrese Nueva IPRESS";
  }

  // modulos para todos los dialogs
  close() {
    this.jurisdiccionDialog = false;
    this.ambienteDialog = false;
    this.turnoDialog = false;
    this.encargadoDialog = false;
    this.rolDialog = false;
    this.guardarNuevaJurisdiccion();
    this.guardarNuevoAmbiente();
    this.guardarNuevoTurno();
    this.guardarNuevoRol();
    this.provinciasList = [];
    this.distritosList = [];
    this.CCPPList = [];
  }
  newEncargado(rowData) {
    this.idIpress = rowData.id;
    this.isUpdateEncargado = false;
    if (rowData.encargado) {
      this.encargadoActual = rowData.encargado[rowData.encargado.length-1]
      this.isUpdateEncargado = true;
      this.formEncargado.get('tipoDocumento').setValue(this.tipoDocumentosList.find(tipo => tipo.abreviatura === rowData.encargado[rowData.encargado.length-1].tipoDoc));
      this.formEncargado.get('nroDoc').setValue(rowData.encargado[rowData.encargado.length-1].nroDoc);
      this.formEncargado.get('nombre').setValue(rowData.encargado[rowData.encargado.length-1].nombre);
      this.onChangeTipoDocumento();
    }
    else{
      this.formEncargado.reset();
    }
    this.encargadoDialog = true;
  }
  onChangeTipoDocumento() {
    this.tamanioDocumento = this.formEncargado.value.tipoDocumento.longitud;
  }
  onChangeUPS() {
    this.formRol.get('nombreFuncion').setValue(this.formRol.value.nombreUPS.tiposUPS);
  }
  buscarNombreUPS(rowData) {
    return this.UPSList.find(ups => ups.codUPS === rowData).nombreUPS;
  }
  newJurisdiccion(rowData) {
    this.jurisdicciones = rowData.jurisdiccion;
    this.idIpress = rowData.id;
    this.formJurisdiccion.reset();
    this.jurisdiccionDialog = true;
    this.provinciasList = [];
    this.distritosList = [];
    this.CCPPList = [];
  }
  newAmbiente(rowData) {
    this.ambientes = rowData.ambientes;
    this.idIpress = rowData.id;
    this.formAmbiente.reset();
    this.ambienteDialog = true;
  }
  newRol(rowData) {
    this.roles = rowData.roles;
    this.idIpress = rowData.id;
    this.formRol.reset();
    this.rolDialog = true;
  }
  newTurno(rowData) {
    this.turnos = rowData.turnos;
    this.idIpress = rowData.id;
    this.formTurno.reset();
    this.turnoDialog = true;
  }
  newHorario(rowData) {
    this.horarios = rowData.turnos;
    this.idIpress = rowData.id;
    //this.formHorario.reset();
    this.horarioDialog = true;
  }

  guardarNuevaJurisdiccion() {
    this.isUpdateJurisdiccion = false;
    this.formJurisdiccion.reset();
    this.formJurisdiccion.get('ubigeo').setValue("");
    this.formJurisdiccion.get('departamento').setValue("");
    this.formJurisdiccion.get('provincia').setValue("");
    this.formJurisdiccion.get('distrito').setValue("");
    this.formJurisdiccion.get('centroPoblado').setValue("");
    this.provinciasList = [];
    this.distritosList = [];
    this.CCPPList = [];
  }
  buscarUbigeoJurisdiccion() {
    const ubigeo = {
      ubigeo: this.formJurisdiccion.value.ubigeo,
    }
    if (this.formJurisdiccion.value.ubigeo.trim() != "") {
      this.loading = true;
      this.ubicacionService.buscarUbigeo(ubigeo).subscribe((res: any) => {
        this.formJurisdiccion.get('departamento').setValue({ iddd: res.object[0].iddd, departamento: res.object[0].departamento });
        this.selectedDepartamentoJurisdiccion();
        this.formJurisdiccion.get('provincia').setValue({ idpp: res.object[0].idpp, provincia: res.object[0].provincia });
        this.selectedProvinciaJurisdiccion();
        this.formJurisdiccion.get('distrito').setValue({ iddis: res.object[0].iddis, distrito: res.object[0].distrito });
        this.selectedDistritoJurisdiccion();
        this.loading = false;
      })
    }
  }

  selectedDepartamentoJurisdiccion() {
    const dpto = {
      departamento: this.formJurisdiccion.value.departamento,
    }
    let rowData = dpto.departamento;
    this.ubicacionService.getProvincias(rowData).subscribe((res: any) => {
      this.provinciasList = res.object;
    })
  }

  selectedProvinciaJurisdiccion() {
    const rowData = {
      departamento: this.formJurisdiccion.value.departamento,
      provincia: this.formJurisdiccion.value.provincia,
    };

    let d = rowData.departamento.iddd;
    let p = rowData.provincia.idpp;

    let aux = {
      iddd: d,
      idpp: p
    }
    this.ubicacionService.getDistritos(aux).subscribe((res: any) => {
      this.distritosList = res.object;
    })
  }

  selectedDistritoJurisdiccion() {
    const rowData = {
      departamento: this.formJurisdiccion.value.departamento,
      provincia: this.formJurisdiccion.value.provincia,
      distrito: this.formJurisdiccion.value.distrito,
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
    })
    this.ubicacionService.getUbigeoDistrito(aux).subscribe((res: any) => {
      this.formJurisdiccion.get('ubigeo').setValue(res.object[0].ubigeo);
    })
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
  guardarNuevoRol() {
    this.isUpdateRol = false;
    this.formRol.reset();
    this.formRol.get('nombreFuncion').setValue("");
    this.formRol.get('nombreUPS').setValue("");
    this.formRol.get('tiempoPreparacion').setValue("");
    this.formRol.get('tiempoPromedioAtencion').setValue("");
    this.formRol.get('fechaRegistro').setValue("");

  }
  selectedEditarJurisdiccion(rowData) {
    this.formJurisdiccion.get('departamento').setValue(this.departamentosList.find(dep => dep.departamento === rowData.departamento));

    const dpto = {
      departamento: this.formJurisdiccion.value.departamento,
    }

    this.ubicacionService.getProvincias(dpto.departamento).subscribe((res: any) => {
      this.provinciasList = res.object;
      this.formJurisdiccion.get('provincia').setValue(this.provinciasList.find(prov => prov.provincia === rowData.provincia));

      const data = {
        departamento: this.formJurisdiccion.value.departamento,
        provincia: this.formJurisdiccion.value.provincia,
      };

      let d = data.departamento.iddd;
      let p = data.provincia.idpp;

      let aux = {
        iddd: d,
        idpp: p
      }
      this.ubicacionService.getDistritos(aux).subscribe((res: any) => {
        this.distritosList = res.object;
        this.formJurisdiccion.get('distrito').setValue(this.distritosList.find(dis => dis.distrito === rowData.distrito));

        const data = {
          departamento: this.formJurisdiccion.value.departamento,
          provincia: this.formJurisdiccion.value.provincia,
          distrito: this.formJurisdiccion.value.distrito,
        };

        let d = data.departamento.iddd;
        let p = data.provincia.idpp;
        let dt = data.distrito.iddis;

        let aux = {
          iddd: d,
          idpp: p,
          iddis: dt
        }
        this.ubicacionService.getCentroPoblado(aux).subscribe((res: any) => {
          this.CCPPList = res.object;
          this.formJurisdiccion.get('centroPoblado').setValue(this.CCPPList.find(cp => cp.ccpp === rowData.centroPoblado));
        })
      })

    })
  }

  editarAmbiente(rowData) {
    this.isUpdateAmbiente = true;
    this.formAmbiente.get('codAmbiente').setValue(rowData.codAmbiente);
    this.formAmbiente.get('ambiente').setValue(rowData.ambiente);
    this.formAmbiente.get('nombreUPS').setValue(rowData.nombreUPS);
  }
  editarTurno(rowData) {
    this.isUpdateTurno = true;
    this.formTurno.get('nombre').setValue(this.tipoTurnosList.find(turno => turno.nombre === rowData.nombre));
    this.formTurno.get('nroHoras').setValue(rowData.nroHoras);
    this.formTurno.get('horaInicio').setValue(new Date(`2021-01-01 ${rowData.horaInicio}`));
    this.formTurno.get('horaFin').setValue(new Date(`2021-01-01 ${rowData.horaFin}`));
  }
  editarRol(rowData) {
    this.isUpdateRol = true;
    this.formRol.get('nombreFuncion').setValue(rowData.nombreFuncion);
    this.formRol.get('nombreUPS').setValue(this.UPSList.find(ups => ups.codUPS === rowData.codUPS));
    this.formRol.get('tiempoPreparacion').setValue(rowData.tiempoPreparacion);
    this.formRol.get('tiempoPromedioAtencion').setValue(rowData.tiempoPromedioAtencion);
    this.formRol.get('fechaRegistro').setValue(this.datePipe.transform(rowData.fechaRegistro, 'yyyy-MM-dd'));
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
  tituloEncargado() {
    if (this.isUpdateEncargado) return "Cambie de Encargado";
    else return "Ingrese Nuevo Encargado";
  }
  tituloRol() {
    if (this.isUpdateRol) return "Edite Rol";
    else return "Ingrese Nuevo Rol";
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
        let req = {
          centroPoblado: rowData.centroPoblado,
          departamento: rowData.departamento,
          distrito: rowData.distrito,
          provincia: rowData.provincia,
          ubigeo: rowData.ubigeo
        }
        this.ipressservice.deleteJurisdiccionIpress(this.idIpress, req).subscribe(
          result => {
            this.getIpressId();
            this.getIpress();
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
        this.ipressservice.deleteAmbienteIpress(this.idIpress, rowData.codAmbiente).subscribe(
          result => {
            this.getIpressId();
            this.getIpress();
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
        this.ipressservice.deleteTurnoIpress(this.idIpress, rowData.abreviatura).subscribe(
          result => {
            this.getIpressId();
            this.getIpress();
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
  eliminarRol(rowData) {
    this.isUpdateRol = false;
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'warning',
      title: 'Estas seguro de eliminar',
      text: '',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ipressservice.deleteRolIpress(this.idIpress, rowData.codUPS).subscribe(
          result => {
            this.getIpressId();
            this.getIpress();
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
  saveJurisdiccion(rowData) {
    let aux = {
      iddd: this.formJurisdiccion.value.departamento.iddd,
      idpp: this.formJurisdiccion.value.provincia.idpp,
      iddis: this.formJurisdiccion.value.distrito.iddis,
      ccpp: this.formJurisdiccion.value.centroPoblado.ccpp,
    }
    this.ubicacionService.getCCPPDatos(aux).subscribe((res: any) => {
      this.centro = res.object[0];
      const req = {
        centroPoblado: this.formJurisdiccion.value.centroPoblado.ccpp,
        departamento: this.formJurisdiccion.value.departamento.departamento,
        distrito: this.formJurisdiccion.value.distrito.distrito,
        provincia: this.formJurisdiccion.value.provincia.provincia,
        ubigeo: this.formJurisdiccion.value.ubigeo,
        altura: this.centro.altura,
        latitud: this.centro.latitude,
        longitud: this.centro.longitude
      }
      this.ipressservice.createJurisdiccionIpress(this.idIpress, req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
          })
          this.getIpressId();
          this.getIpress();
          this.guardarNuevaJurisdiccion();
          this.provinciasList = [];
          this.distritosList = [];
          this.CCPPList = [];
        })
    })
  }
  saveAmbiente(rowData) {
    const req = {
      codAmbiente: this.formAmbiente.value.codAmbiente,
      ambiente: this.formAmbiente.value.ambiente,
      nombreUPS: this.formAmbiente.value.nombreUPS
    }

    this.ipressservice.createAmbienteIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Agregado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.getIpress();
        this.guardarNuevoAmbiente();
      }
    )
  }
  saveEncargado(rowData) {
    const req = {
      idIpress: this.idIpress,
      tipoDoc: this.formEncargado.value.tipoDocumento.abreviatura,
      nroDoc: this.formEncargado.value.nroDoc,
    }
    if (this.encargadoActual==null || req.nroDoc!==this.encargadoActual.nroDoc){
      this.ipressservice.createEncargadoIpress(req).subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado correctamente',
            text: '',
            showConfirmButton: false,
            timer: 1500,
          })
          this.getIpressId();
          this.getIpress();
          this.close();
        }
      )
    }
  }
  buscarPersonal() {
    let tipoDoc = this.formEncargado.value.tipoDocumento.abreviatura;
    let nroDoc = this.formEncargado.value.nroDoc;
    this.loadingEncargado = true;
    this.personalservice.getPersonalTipoDocumento(tipoDoc, nroDoc).subscribe((res: any) => {
      let personal = res.object;
      let nombreCompleto = "";
      if (personal.otrosNombres)
        nombreCompleto = personal.apePaterno + " " + personal.apeMaterno+ " " +personal.primerNombre + " " + personal.otrosNombres;
      else
        nombreCompleto = personal.apePaterno + " " + personal.apeMaterno + " " +personal.primerNombre;

      console.log(nombreCompleto);
      this.formEncargado.get('nombre').setValue(nombreCompleto);
      this.idPersonalEncargado = personal.id;
      this.loadingEncargado = false;
    }
    );
  }
  saveRol() {
    const req = {
      nombreFuncion: this.formRol.value.nombreFuncion,
      codUPS: this.formRol.value.nombreUPS.codUPS,
      tiempoPromedioAtencion: this.formRol.value.tiempoPromedioAtencion,
      tiempoPreparacion: this.formRol.value.tiempoPreparacion,
      fechaRegistro: this.formRol.value.fechaRegistro + " " + "00:00:00"
    }

    this.ipressservice.createRolIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Agregado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.getIpress();
        this.guardarNuevoRol();
      }
    )
  }
  selectedTipoTurno() {
    this.formTurno.get('nroHoras').setValue(this.formTurno.value.nombre.nroHoras);
  }
  selectedHoraInicio() {
    let horaFin = new Date(this.formTurno.value.horaInicio);
    let nroHoras = this.formTurno.value.nroHoras;
    horaFin.setHours(horaFin.getHours() + nroHoras);
    this.formTurno.get('horaFin').setValue(new Date(`2021-01-01 ${horaFin.getHours()}: ${horaFin.getMinutes()}:00`));
  }
  saveTurno(rowData) {
    let horaInicio = new Date(this.formTurno.value.horaInicio);
    let horaFin = new Date(this.formTurno.value.horaFin);
    const req = {
      nombre: this.formTurno.value.nombre.nombre,
      abreviatura: this.formTurno.value.nombre.abreviatura,
      nroHoras: this.formTurno.value.nroHoras,
      horaInicio: `${horaInicio.getHours()}:${horaInicio.getMinutes()}:00`,
      horaFin: `${horaFin.getHours()}:${horaFin.getMinutes()}:00`
    }

    this.ipressservice.createTurnoIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Agregado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.getIpress();
        this.guardarNuevoTurno();
      }
    )
  }

  saveEdicionAmbiente() {
    const req = {
      codAmbiente: this.formAmbiente.value.codAmbiente,
      ambiente: this.formAmbiente.value.ambiente,
      nombreUPS: this.formAmbiente.value.nombreUPS
    }
    this.ipressservice.editAmbienteIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.getIpress();
        this.guardarNuevoAmbiente();
      }
    )
  }
  saveEdicionTurno() {
    let horaInicio = new Date(this.formTurno.value.horaInicio);
    let horaFin = new Date(this.formTurno.value.horaFin);
    const req = {
      nombre: this.formTurno.value.nombre.nombre,
      abreviatura: this.formTurno.value.nombre.abreviatura,
      nroHoras: this.formTurno.value.nroHoras,
      horaInicio: `${horaInicio.getHours()}:${horaInicio.getMinutes()}:00`,
      horaFin: `${horaFin.getHours()}:${horaFin.getMinutes()}:00`
    }
    this.ipressservice.editTurnoIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.getIpress();
        this.guardarNuevoTurno();
      }
    )
  }
  saveEdicionRol() {
    const req = {
      nombreFuncion: this.formRol.value.nombreFuncion,
      codUPS: this.formRol.value.nombreUPS.codUPS,
      tiempoPromedioAtencion: this.formRol.value.tiempoPromedioAtencion,
      tiempoPreparacion: this.formRol.value.tiempoPreparacion,
      fechaRegistro: this.formRol.value.fechaRegistro + " " + "00:00:00"
    }
    this.ipressservice.editRolIpress(this.idIpress, req).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Editado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.getIpress();
        this.guardarNuevoRol();
      }
    )
  }

  ngOnInit(): void {
  }
}
