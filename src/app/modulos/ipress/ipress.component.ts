import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from "@angular/forms";
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
import { UnidadEjecutoraService } from 'src/app/mantenimientos/services/unidad-ejecutora/unidad-ejecutora.service';

@Component({
  selector: 'app-ipress',
  templateUrl: './ipress.component.html',
  styleUrls: ['./ipress.component.css']
})
export class IpressComponent implements OnInit {

  // Creacion del formulario
  ipressFG: FormGroup;
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
  categorizacionesList: any[];
  clasificacionesTipoList: any[];
  clasificacionesNombreList: any[];
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
    private unidadEjecutoraService: UnidadEjecutoraService,
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
    this.getCategorizaciones();
    this.getClasificaciones();
    this.getUnidadesEjecutoras();
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
      this.horarios = res.object.horario;
    });
  }
  getCategorias() {
    this.categoriaservice.getCategoriaEstablecimiento().subscribe((res: any) => {
      this.categoriasList = res.object;
      console.log('lista de categorias',this.categoriasList);
      
    });
  }
  getDepartamentos() {
    this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
      this.departamentosList = resp.object;
    });
  }
  getCategorizaciones() {
    this.ipressservice.listarCategorizaciones().subscribe((res: any) => {
      this.categorizacionesList = res.tipoDocCategorizacion;
      console.log("categorizacion", this.categorizacionesList);
    });
  }
  getClasificaciones() {
    this.ipressservice.listarClasificaciones().subscribe((res: any) => {
      this.clasificacionesTipoList = res.object;
      console.log("clasificaciones tipo", this.clasificacionesTipoList);
    });
  }
  getUnidadesEjecutoras() {
    this.unidadEjecutoraService.getUnidadesEjecutoras().subscribe((res: any) => {
      this.unidadesList = res.object;
      console.log("unidades", this.unidadesList);
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
    this.redServiciosSaludService.getMicroRedServiciosSalud(this.ipressFG.value.red.idRed).subscribe((res: any) => {
      this.microRedesList = res.object;
      if (this.microRedesList[0].idMicroRed == null) {
        this.microRedesList = [];
      }
    })
  }
  changeRedSelectedEditar(rowData) {
    this.redServiciosSaludService.getMicroRedServiciosSalud(this.ipressFG.value.red?.idRed).subscribe((res: any) => {
      console.log('red',this.ipressFG.value.red?.idRed);
      this.microRedesList = res.object;
      if (this.microRedesList[0].idMicroRed == null) {
        this.microRedesList = [];
      }
      this.ipressFG.get('microRed').setValue(this.microRedesList.find(microred => microred.idMicroRed === rowData.red.idMicroRed));
    })
  }
  changeClasificacionTipo() {
    this.clasificacionesNombreList = this.ipressFG.value.clasificacionTipo.clasificaciones;
    console.log(this.ipressFG.value.clasificacionTipo.clasificaciones);
  }
  isInvalid(control: string): boolean {
    const formControl: AbstractControl = this.getFC(control);
    return (
        formControl.invalid && (formControl.touched || formControl.dirty)
    );
  }
  getFC(control: string): AbstractControl {
    return this.ipressFG.get(control);  
  }
  buildForm() {
    this.ipressFG = this.formBuilder.group({
      renipress: ['', [Validators.required]], /* cod renaes */
      ruc: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      nombreEESS: ['', [Validators.required]],
      unidad: ['', [Validators.required]],

      clasificacionTipo: ['', [Validators.required]],
      clasificacion: ['', [Validators.required]],

      categorizacionTipo: ['', [Validators.required]],
      categorizacionNro: ['', [Validators.required]],

      ubigeo: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      centroPoblado: ['', [Validators.required]],
      direccion: ['', [Validators.required]],

      red: ['', [Validators.required]],
      microRed: ['', [Validators.required]],
      /* end fc Ipress */
      docPersonal: [''],
      nombrePersonal: [''],

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
      ubigeo: this.ipressFG.value.ubigeo,
    }
    if (this.ipressFG.value.ubigeo.trim() != "") {
      this.loading = true;
      this.ubicacionService.buscarUbigeo(ubigeo).subscribe((res: any) => {
        this.ipressFG.get('departamento').setValue({ iddd: res.object[0].iddd, departamento: res.object[0].departamento });
        this.selectedDepartamento();
        this.ipressFG.get('provincia').setValue({ idpp: res.object[0].idpp, provincia: res.object[0].provincia });
        this.selectedProvincia();
        this.ipressFG.get('distrito').setValue({ iddis: res.object[0].iddis, distrito: res.object[0].distrito });
        this.selectedDistrito();
        this.loading = false;
      })
    }
  }

  selectedDepartamento() {
    const dpto = {
      departamento: this.ipressFG.value.departamento,
    }
    let rowData = dpto.departamento;
    this.ubicacionService.getProvincias(rowData).subscribe((res: any) => {
      this.provinciasList = res.object;
    })
  }

  selectedProvincia() {
    const rowData = {
      departamento: this.ipressFG.value.departamento,
      provincia: this.ipressFG.value.provincia,
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
      departamento: this.ipressFG.value.departamento,
      provincia: this.ipressFG.value.provincia,
      distrito: this.ipressFG.value.distrito,
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
      this.ipressFG.get('ubigeo').setValue(res.object[0].ubigeo);
    })
  }
  selectedEditar(rowData) {
    this.ipressFG.get('departamento').setValue(this.departamentosList.find(dep => dep.departamento === rowData.ubicacion.departamento));

    const dpto = {
      departamento: this.ipressFG.value.departamento,
    }

    this.ubicacionService.getProvincias(dpto.departamento).subscribe((res: any) => {
      this.provinciasList = res.object;
      this.ipressFG.get('provincia').setValue(this.provinciasList.find(prov => prov.provincia === rowData.ubicacion.provincia));

      const data = {
        departamento: this.ipressFG.value.departamento,
        provincia: this.ipressFG.value.provincia,
      };

      let d = data.departamento.iddd;
      let p = data.provincia.idpp;

      let aux = {
        iddd: d,
        idpp: p
      }
      this.ubicacionService.getDistritos(aux).subscribe((res: any) => {
        this.distritosList = res.object;
        this.ipressFG.get('distrito').setValue(this.distritosList.find(dis => dis.distrito === rowData.ubicacion.distrito));

        const data = {
          departamento: this.ipressFG.value.departamento,
          provincia: this.ipressFG.value.provincia,
          distrito: this.ipressFG.value.distrito,
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
          this.ipressFG.get('centroPoblado').setValue(this.CCPPList.find(cp => cp.ccpp === rowData.ubicacion.centroPoblado));
        })
      })

    })
  }

  saveForm() {
    if(this.ipressFG.invalid){
      this.ipressFG.markAllAsTouched();
      return
    } 
    this.isUpdate = false;

    let aux = {
      iddd: this.ipressFG.value.departamento.iddd,
      idpp: this.ipressFG.value.provincia.idpp,
      iddis: this.ipressFG.value.distrito.iddis,
      ccpp: this.ipressFG.value.centroPoblado.ccpp,
    }

    this.ubicacionService.getCCPPDatos(aux).subscribe((res: any) => {
      this.centro = res.object[0];
      const req = {
        renipress: this.ipressFG.value.renipress,
        nombreEESS: this.ipressFG.value.nombreEESS,
        ruc: this.ipressFG.value.ruc,
        categoria: {
          abreviatura: this.ipressFG.value.categoria.abreviatura,
          descripcion: this.ipressFG.value.categoria.descripcion,
          nivelEESS: this.ipressFG.value.categoria.nivel,
        },
        ubicacion: {
          ubigeo: this.ipressFG.value.ubigeo,
          departamento: this.ipressFG.value.departamento.departamento,
          provincia: this.ipressFG.value.provincia.provincia,
          distrito: this.ipressFG.value.distrito.distrito,
          centroPoblado: this.ipressFG.value.centroPoblado.ccpp,
          altura: this.centro.altura,
          latitud: this.centro.latitude,
          longitud: this.centro.longitude,
          direccion: this.ipressFG.value.direccion,
        },
        red: {
          idRed: this.ipressFG.value.red.idRed,
          nombreRed: this.ipressFG.value.red.nombreRed,
          idMicroRed: this.ipressFG.value.microRed.idMicroRed,
          nombreMicroRed: this.ipressFG.value.microRed.nombreMicroRed,
        },
        categorizacion: {
          tipoDocCategorizacion: this.ipressFG.value.categorizacionTipo,
          nroDocCategorizacion: this.ipressFG.value.categorizacionNro
        },
        clasificacion: {
          clasificacion: this.ipressFG.value.clasificacion,
          tipo: this.ipressFG.value.clasificacionTipo.tipo
        },
        unidadEjecutora: {
          unidadEjecutora: this.ipressFG.value.unidad.nombre,
          codUnidadEjecutora: this.ipressFG.value.unidad.codigo
        }
      };
  
      this.ipressservice.createIpress(req).subscribe((resp:any) => {
          console.log('respuesta guardar',resp);
          if(resp.cod=="2405"){ 
            Swal.fire({
              icon: 'success',
              title: 'Se actualizox| correctamente',
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
        }
      )
     
    })

  }

  openNew() {
    this.isUpdate = false;
    this.ipressFG.reset();
    this.ipressFG.get('renipress').setValue("");
    this.ipressFG.get('nombreEESS').setValue("");
    this.ipressFG.get('categoria').setValue("");
    this.ipressFG.get('ubigeo').setValue("");
    this.ipressFG.get('departamento').setValue("");
    this.ipressFG.get('provincia').setValue("");
    this.ipressFG.get('distrito').setValue("");
    this.ipressFG.get('centroPoblado').setValue("");
    this.ipressFG.get('direccion').setValue("");
    this.ipressFG.get('red').setValue("");
    this.ipressFG.get('microRed').setValue("");
    this.ipressDialog = true;
  }
  editar(rowData) {
    console.log('data Ipress-->',rowData);
    this.isUpdate = true;
    this.ipressFG.reset();
    console.log('lista de redes ', this.redesList);
    this.ipressFG.get('renipress').setValue(rowData.renipress);
    this.ipressFG.get('nombreEESS').setValue(rowData.nombreEESS);
    this.ipressFG.get('ruc').setValue(rowData.ruc);
    this.ipressFG.get('categoria').setValue(rowData.categoria !== null ? this.categoriasList.find(cat => cat.abreviatura === rowData.categoria.abreviatura) : "");
    this.ipressFG.get('ubigeo').setValue(rowData.ubicacion.ubigeo);
    this.selectedEditar(rowData);
    this.ipressFG.get('direccion').setValue(rowData.ubicacion.direccion);
    if(rowData.red?.nombreRed!="NO PERTENECE A NINGUNA RED" && rowData.red?.nombreMicroRed!="NO PERTENECE A NINGUNA MICRORED"){ 
      const redSelected= this.redesList.find(red => red.nombreRed === (rowData.red.nombreRed).toUpperCase())
      this.ipressFG.get('red').setValue(redSelected);
      this.changeRedSelectedEditar(rowData);
    }
    // const redSelected=rowData.red !== null ? this.redesList.find(red => red.nombreRed === (rowData.red.nombreRed).toUpperCase()) : ""
    // console.log('red selected',rowData.red.nombreRed);
    
    //agregar clasificacion, categorizacion y unidad ejecutora aqui usando find
    if (rowData.categorizacion != null) {
      this.ipressFG.get('categorizacionTipo').setValue(rowData.categorizacion.tipoDocCategorizacion);
      this.ipressFG.get('categorizacionNro').setValue(rowData.categorizacion.nroDocCategorizacion);
    }
    if(rowData.clasificacion != null && (rowData.clasificacion.clasificacion!='')){

      const clasificacion=this.clasificacionesTipoList.find(clasi => clasi.tipo === rowData.clasificacion.tipo)
      console.log('clasificacion',clasificacion);
      
      this.ipressFG.get('clasificacionTipo').setValue(clasificacion)
      this.clasificacionesNombreList=clasificacion.clasificaciones
      this.ipressFG.get('clasificacion').setValue(rowData.clasificacion.clasificacion);

    }
    else{
      console.log('--------entranos else---------');

       this.ipressFG.get('clasificacionTipo').setValue('')
    }


    // this.form.get('clasificacionTipo').setValue(rowData.clasificacion !== null ? this.clasificacionesTipoList.find(clasi => clasi.tipo === rowData.clasificacion.tipo) : "");
    // this.clasificacionesNombreList = this.form.value.clasificacionTipo.clasificaciones;
    // this.form.get('clasificacion').setValue(rowData.clasificacion!= null? rowData.clasificacion.clasificacion:'');



    this.ipressFG.get('unidad').setValue(rowData.unidadEjecutora !== null ? this.unidadesList.find(uni => uni.nombre === rowData.unidadEjecutora.unidadEjecutora) : "");

    this.idUpdate = rowData.id;
    this.ipressDialog = true;
  }
  editarDatos(rowData) {
    if(this.ipressFG.invalid){
      this.ipressFG.markAllAsTouched();
      return
    }
    this.isUpdate = true;
    let aux = {
      iddd: this.ipressFG.value.departamento.iddd,
      idpp: this.ipressFG.value.provincia.idpp,
      iddis: this.ipressFG.value.distrito.iddis,
      ccpp: this.ipressFG.value.centroPoblado.ccpp,
    }
    this.ubicacionService.getCCPPDatos(aux).subscribe((res: any) => {
      this.centro = res.object[0];
      const req = {
        ruc: this.ipressFG.value.ruc,
        categoria: {
          abreviatura: this.ipressFG.value.categoria.abreviatura,
          // descripcion: this.form.value.categoria.descripcion,
          nivelEESS: this.ipressFG.value.categoria.nivel,
        },
        nombreEESS: this.ipressFG.value.nombreEESS,
        renipress: this.ipressFG.value.renipress,
        unidadEjecutora: {
          unidadEjecutora: this.ipressFG.value.unidad.nombre,
          codUnidadEjecutora: this.ipressFG.value.unidad.codigo
        },
        clasificacion: {
          clasificacion: this.ipressFG.value.clasificacion,
          tipo: this.ipressFG.value.clasificacionTipo.tipo
        },
        categorizacion: {
          tipoDocCategorizacion: this.ipressFG.value.categorizacionTipo,
          nroDocCategorizacion: this.ipressFG.value.categorizacionNro
        },
        red: {
          idRed: this.ipressFG.value.red.idRed,
          nombreRed: this.ipressFG.value.red.nombreRed,
          idMicroRed: this.ipressFG.value.microRed.idMicroRed,
          nombreMicroRed: this.ipressFG.value.microRed.nombreMicroRed,
          DISA:"disa defecto"
        },
        ubicacion: {
          ubigeo: this.ipressFG.value.ubigeo,
          departamento: this.ipressFG.value.departamento.departamento,
          provincia: this.ipressFG.value.provincia.provincia,
          distrito: this.ipressFG.value.distrito.distrito,
          centroPoblado: this.ipressFG.value.centroPoblado.ccpp,
          altura: this.centro.altura,
          latitud: this.centro.latitude,
          longitud: this.centro.longitude,
          direccion: this.ipressFG.value.direccion,
        },
        // id: this.idUpdate,
      };
       this.ipressservice.editIpress2(this.idUpdate,req).subscribe((result) => {
          if(result.cod=="2126"){
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
        }
      )

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
    this.encargadoDialog = true;
    this.isUpdateEncargado = false;
    
    console.log('data ipress-->',rowData);
    // this.idIpress = rowData.id;
    if (rowData.encargado) {
      this.isUpdateEncargado = true;
      this.encargadoActual = rowData.encargado[rowData.encargado.length - 1]
      this.formEncargado.get('nombre').setValue(rowData.encargado[rowData.encargado.length - 1].nombre);
      this.formEncargado.get('nroDoc').setValue(rowData.encargado[rowData.encargado.length - 1].nroDoc?rowData.encargado[rowData.encargado.length - 1].nroDoc:'');
      const tipoDoc=this.tipoDocumentosList.find(tipo => tipo.abreviatura === rowData.encargado[rowData.encargado.length - 1].tipoDoc)
      this.formEncargado.get('tipoDocumento').setValue(tipoDoc?tipoDoc:'');
      // this.onChangeTipoDocumento();
    }
    else {
      this.formEncargado.reset();
    }
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
    console.log('nueva juridiccion:',rowData);
    
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
      // idIpress: this.idIpress,
      idIpress: "6350222d6486bd618a057fa0",
      tipoDoc: this.formEncargado.value.tipoDocumento.abreviatura,
      nroDoc: this.formEncargado.value.nroDoc,
    }
    if (this.encargadoActual == null || req.nroDoc !== this.encargadoActual.nroDoc) {
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
        nombreCompleto = personal.apePaterno + " " + personal.apeMaterno + " " + personal.primerNombre + " " + personal.otrosNombres;
      else
        nombreCompleto = personal.apePaterno + " " + personal.apeMaterno + " " + personal.primerNombre;

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
    let horaInicio = this.datePipe.transform(this.formTurno.value.horaInicio, 'HH:mm:ss')
    let horaFin = this.datePipe.transform(this.formTurno.value.horaFin, 'HH:mm:ss')
    const req = {
      nombre: this.formTurno.value.nombre.nombre,
      abreviatura: this.formTurno.value.nombre.abreviatura,
      nroHoras: this.formTurno.value.nroHoras,
      horaInicio: horaInicio,
      horaFin: horaFin
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
    let horaInicio = this.datePipe.transform(this.formTurno.value.horaInicio, 'HH:mm:ss')
    let horaFin = this.datePipe.transform(this.formTurno.value.horaFin, 'HH:mm:ss')
    const req = {
      nombre: this.formTurno.value.nombre.nombre,
      abreviatura: this.formTurno.value.nombre.abreviatura,
      nroHoras: this.formTurno.value.nroHoras,
      horaInicio: horaInicio,
      horaFin: horaFin
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

  openHorario(rowData, id) {
    this.horarios = rowData;
    this.idIpress = id;
    this.formHorario.reset();
    this.horarioDialog = true;
    this.isUpdateHorario = false;
    console.log(rowData);
    if (rowData !== null) {
      this.formHorario.get('lunesInicioManiana').setValue(new Date(`2021-01-01 ${rowData[0].horas[0].horaInicio}`));
      this.formHorario.get('lunesFinManiana').setValue(new Date(`2021-01-01 ${rowData[0].horas[0].horaFin}`));
      this.formHorario.get('lunesInicioTarde').setValue(new Date(`2021-01-01 ${rowData[0].horas[1].horaInicio}`));
      this.formHorario.get('lunesFinTarde').setValue(new Date(`2021-01-01 ${rowData[0].horas[1].horaFin}`));
      this.formHorario.get('martesInicioManiana').setValue(new Date(`2021-01-01 ${rowData[1].horas[0].horaInicio}`));
      this.formHorario.get('martesFinManiana').setValue(new Date(`2021-01-01 ${rowData[1].horas[0].horaFin}`));
      this.formHorario.get('martesInicioTarde').setValue(new Date(`2021-01-01 ${rowData[1].horas[1].horaInicio}`));
      this.formHorario.get('martesFinTarde').setValue(new Date(`2021-01-01 ${rowData[1].horas[1].horaFin}`));
      this.formHorario.get('miercolesInicioManiana').setValue(new Date(`2021-01-01 ${rowData[2].horas[0].horaInicio}`));
      this.formHorario.get('miercolesFinManiana').setValue(new Date(`2021-01-01 ${rowData[2].horas[0].horaFin}`));
      this.formHorario.get('miercolesInicioTarde').setValue(new Date(`2021-01-01 ${rowData[2].horas[1].horaInicio}`));
      this.formHorario.get('miercolesFinTarde').setValue(new Date(`2021-01-01 ${rowData[2].horas[1].horaFin}`));
      this.formHorario.get('juevesInicioManiana').setValue(new Date(`2021-01-01 ${rowData[3].horas[0].horaInicio}`));
      this.formHorario.get('juevesFinManiana').setValue(new Date(`2021-01-01 ${rowData[3].horas[0].horaFin}`));
      this.formHorario.get('juevesInicioTarde').setValue(new Date(`2021-01-01 ${rowData[3].horas[1].horaInicio}`));
      this.formHorario.get('juevesFinTarde').setValue(new Date(`2021-01-01 ${rowData[3].horas[1].horaFin}`));
      this.formHorario.get('viernesInicioManiana').setValue(new Date(`2021-01-01 ${rowData[4].horas[0].horaInicio}`));
      this.formHorario.get('viernesFinManiana').setValue(new Date(`2021-01-01 ${rowData[4].horas[0].horaFin}`));
      this.formHorario.get('viernesInicioTarde').setValue(new Date(`2021-01-01 ${rowData[4].horas[1].horaInicio}`));
      this.formHorario.get('viernesFinTarde').setValue(new Date(`2021-01-01 ${rowData[4].horas[1].horaFin}`));
      this.formHorario.get('sabadoInicioManiana').setValue(new Date(`2021-01-01 ${rowData[5].horas[0].horaInicio}`));
      this.formHorario.get('sabadoFinManiana').setValue(new Date(`2021-01-01 ${rowData[5].horas[0].horaFin}`));
      this.formHorario.get('sabadoInicioTarde').setValue(new Date(`2021-01-01 ${rowData[5].horas[1].horaInicio}`));
      this.formHorario.get('sabadoFinTarde').setValue(new Date(`2021-01-01 ${rowData[5].horas[1].horaFin}`));
      this.formHorario.get('domingoInicioManiana').setValue(new Date(`2021-01-01 ${rowData[6].horas[0].horaInicio}`));
      this.formHorario.get('domingoFinManiana').setValue(new Date(`2021-01-01 ${rowData[6].horas[0].horaFin}`));
      this.formHorario.get('domingoInicioTarde').setValue(new Date(`2021-01-01 ${rowData[6].horas[1].horaInicio}`));
      this.formHorario.get('domingoFinTarde').setValue(new Date(`2021-01-01 ${rowData[6].horas[1].horaFin}`));
    }
    else {
      this.formHorario.get('lunesInicioManiana').setValue("");
      this.formHorario.get('lunesFinManiana').setValue("");
      this.formHorario.get('lunesInicioTarde').setValue("");
      this.formHorario.get('lunesFinTarde').setValue("");
      this.formHorario.get('martesInicioManiana').setValue("");
      this.formHorario.get('martesFinManiana').setValue("");
      this.formHorario.get('martesInicioTarde').setValue("");
      this.formHorario.get('martesFinTarde').setValue("");
      this.formHorario.get('miercolesInicioManiana').setValue("");
      this.formHorario.get('miercolesFinManiana').setValue("");
      this.formHorario.get('miercolesInicioTarde').setValue("");
      this.formHorario.get('miercolesFinTarde').setValue("");
      this.formHorario.get('juevesInicioManiana').setValue("");
      this.formHorario.get('juevesFinManiana').setValue("");
      this.formHorario.get('juevesInicioTarde').setValue("");
      this.formHorario.get('juevesFinTarde').setValue("");
      this.formHorario.get('viernesInicioManiana').setValue("");
      this.formHorario.get('viernesFinManiana').setValue("");
      this.formHorario.get('viernesInicioTarde').setValue("");
      this.formHorario.get('viernesFinTarde').setValue("");
      this.formHorario.get('sabadoInicioManiana').setValue("");
      this.formHorario.get('sabadoFinManiana').setValue("");
      this.formHorario.get('sabadoInicioTarde').setValue("");
      this.formHorario.get('sabadoFinTarde').setValue("");
      this.formHorario.get('domingoInicioManiana').setValue("");
      this.formHorario.get('domingoFinManiana').setValue("");
      this.formHorario.get('domingoInicioTarde').setValue("");
      this.formHorario.get('domingoFinTarde').setValue("");
    }
    this.clickDisableHorarios();
  }

  clickEditarHorarios() {
    this.isUpdateHorario = true;
    this.formHorario.get('lunesInicioManiana').enable();
    this.formHorario.get('lunesFinManiana').enable();
    this.formHorario.get('lunesInicioTarde').enable();
    this.formHorario.get('lunesFinTarde').enable();
    this.formHorario.get('martesInicioManiana').enable();
    this.formHorario.get('martesFinManiana').enable();
    this.formHorario.get('martesInicioTarde').enable();
    this.formHorario.get('martesFinTarde').enable();
    this.formHorario.get('miercolesInicioManiana').enable();
    this.formHorario.get('miercolesFinManiana').enable();
    this.formHorario.get('miercolesInicioTarde').enable();
    this.formHorario.get('miercolesFinTarde').enable();
    this.formHorario.get('juevesInicioManiana').enable();
    this.formHorario.get('juevesFinManiana').enable();
    this.formHorario.get('juevesInicioTarde').enable();
    this.formHorario.get('juevesFinTarde').enable();
    this.formHorario.get('viernesInicioManiana').enable();
    this.formHorario.get('viernesFinManiana').enable();
    this.formHorario.get('viernesInicioTarde').enable();
    this.formHorario.get('viernesFinTarde').enable();
    this.formHorario.get('sabadoInicioManiana').enable();
    this.formHorario.get('sabadoFinManiana').enable();
    this.formHorario.get('sabadoInicioTarde').enable();
    this.formHorario.get('sabadoFinTarde').enable();
    this.formHorario.get('domingoInicioManiana').enable();
    this.formHorario.get('domingoFinManiana').enable();
    this.formHorario.get('domingoInicioTarde').enable();
    this.formHorario.get('domingoFinTarde').enable();
  }

  clickDisableHorarios() {
    this.formHorario.get('lunesInicioManiana').disable();
    this.formHorario.get('lunesFinManiana').disable();
    this.formHorario.get('lunesInicioTarde').disable();
    this.formHorario.get('lunesFinTarde').disable();
    this.formHorario.get('martesInicioManiana').disable();
    this.formHorario.get('martesFinManiana').disable();
    this.formHorario.get('martesInicioTarde').disable();
    this.formHorario.get('martesFinTarde').disable();
    this.formHorario.get('miercolesInicioManiana').disable();
    this.formHorario.get('miercolesFinManiana').disable();
    this.formHorario.get('miercolesInicioTarde').disable();
    this.formHorario.get('miercolesFinTarde').disable();
    this.formHorario.get('juevesInicioManiana').disable();
    this.formHorario.get('juevesFinManiana').disable();
    this.formHorario.get('juevesInicioTarde').disable();
    this.formHorario.get('juevesFinTarde').disable();
    this.formHorario.get('viernesInicioManiana').disable();
    this.formHorario.get('viernesFinManiana').disable();
    this.formHorario.get('viernesInicioTarde').disable();
    this.formHorario.get('viernesFinTarde').disable();
    this.formHorario.get('sabadoInicioManiana').disable();
    this.formHorario.get('sabadoFinManiana').disable();
    this.formHorario.get('sabadoInicioTarde').disable();
    this.formHorario.get('sabadoFinTarde').disable();
    this.formHorario.get('domingoInicioManiana').disable();
    this.formHorario.get('domingoFinManiana').disable();
    this.formHorario.get('domingoInicioTarde').disable();
    this.formHorario.get('domingoFinTarde').disable();
  }

  funcionReturnMinutos(minutos) {
    if (minutos >= 10)
      return minutos;
    else return ("0" + minutos.toString());
  }
  clickGuardarHorarios() {
    let LunesInicioManiana = new Date(this.formHorario.value.lunesInicioManiana);
    let LunesFinManiana = new Date(this.formHorario.value.lunesFinManiana);
    let LunesInicioTarde = new Date(this.formHorario.value.lunesInicioTarde);
    let LunesFinTarde = new Date(this.formHorario.value.lunesFinTarde);
    let MartesInicioManiana = new Date(this.formHorario.value.martesInicioManiana);
    let MartesFinManiana = new Date(this.formHorario.value.martesFinManiana);
    let MartesInicioTarde = new Date(this.formHorario.value.martesInicioTarde);
    let MartesFinTarde = new Date(this.formHorario.value.martesFinTarde);
    let MiercolesInicioManiana = new Date(this.formHorario.value.miercolesInicioManiana);
    let MiercolesFinManiana = new Date(this.formHorario.value.miercolesFinManiana);
    let MiercolesInicioTarde = new Date(this.formHorario.value.miercolesInicioTarde);
    let MiercolesFinTarde = new Date(this.formHorario.value.miercolesFinTarde);
    let JuevesInicioManiana = new Date(this.formHorario.value.juevesInicioManiana);
    let JuevesFinManiana = new Date(this.formHorario.value.juevesFinManiana);
    let JuevesInicioTarde = new Date(this.formHorario.value.juevesInicioTarde);
    let JuevesFinTarde = new Date(this.formHorario.value.juevesFinTarde);
    let ViernesInicioManiana = new Date(this.formHorario.value.viernesInicioManiana);
    let ViernesFinManiana = new Date(this.formHorario.value.viernesFinManiana);
    let ViernesInicioTarde = new Date(this.formHorario.value.viernesInicioTarde);
    let ViernesFinTarde = new Date(this.formHorario.value.viernesFinTarde);
    let SabadoInicioManiana = new Date(this.formHorario.value.sabadoInicioManiana);
    let SabadoFinManiana = new Date(this.formHorario.value.sabadoFinManiana);
    let SabadoInicioTarde = new Date(this.formHorario.value.sabadoInicioTarde);
    let SabadoFinTarde = new Date(this.formHorario.value.sabadoFinTarde);
    let DomingoInicioManiana = new Date(this.formHorario.value.domingoInicioManiana);
    let DomingoFinManiana = new Date(this.formHorario.value.domingoFinManiana);
    let DomingoInicioTarde = new Date(this.formHorario.value.domingoInicioTarde);
    let DomingoFinTarde = new Date(this.formHorario.value.domingoFinTarde);
    let data = {
      horarios: [
        {
          dia: "lunes",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(LunesInicioManiana.getHours())}:${this.funcionReturnMinutos(LunesInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(LunesFinManiana.getHours())}:${this.funcionReturnMinutos(LunesFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(LunesInicioTarde.getHours())}:${this.funcionReturnMinutos(LunesInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(LunesFinTarde.getHours())}:${this.funcionReturnMinutos(LunesFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "martes",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(MartesInicioManiana.getHours())}:${this.funcionReturnMinutos(MartesInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(MartesFinManiana.getHours())}:${this.funcionReturnMinutos(MartesFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(MartesInicioTarde.getHours())}:${this.funcionReturnMinutos(MartesInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(MartesFinTarde.getHours())}:${this.funcionReturnMinutos(MartesFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "miercoles",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(MiercolesInicioManiana.getHours())}:${this.funcionReturnMinutos(MiercolesInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(MiercolesFinManiana.getHours())}:${this.funcionReturnMinutos(MiercolesFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(MiercolesInicioTarde.getHours())}:${this.funcionReturnMinutos(MiercolesInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(MiercolesFinTarde.getHours())}:${this.funcionReturnMinutos(MiercolesFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "jueves",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(JuevesInicioManiana.getHours())}:${this.funcionReturnMinutos(JuevesInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(JuevesFinManiana.getHours())}:${this.funcionReturnMinutos(JuevesFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(JuevesInicioTarde.getHours())}:${this.funcionReturnMinutos(JuevesInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(JuevesFinTarde.getHours())}:${this.funcionReturnMinutos(JuevesFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "viernes",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(ViernesInicioManiana.getHours())}:${this.funcionReturnMinutos(ViernesInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(ViernesFinManiana.getHours())}:${this.funcionReturnMinutos(ViernesFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(ViernesInicioTarde.getHours())}:${this.funcionReturnMinutos(ViernesInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(ViernesFinTarde.getHours())}:${this.funcionReturnMinutos(ViernesFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "sabado",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(SabadoInicioManiana.getHours())}:${this.funcionReturnMinutos(SabadoInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(SabadoFinManiana.getHours())}:${this.funcionReturnMinutos(SabadoFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(SabadoInicioTarde.getHours())}:${this.funcionReturnMinutos(SabadoInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(SabadoFinTarde.getHours())}:${this.funcionReturnMinutos(SabadoFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "domingo",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(DomingoInicioManiana.getHours())}:${this.funcionReturnMinutos(DomingoInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(DomingoFinManiana.getHours())}:${this.funcionReturnMinutos(DomingoFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(DomingoInicioTarde.getHours())}:${this.funcionReturnMinutos(DomingoInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(DomingoFinTarde.getHours())}:${this.funcionReturnMinutos(DomingoFinTarde.getMinutes())}:00`,
            }
          ]
        }
      ]
    }

    this.ipressservice.updateHorariosIpress(this.idIpress, data).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.getIpress();
        this.isUpdateHorario = false;
        this.clickDisableHorarios();
      }
    )
  }

  clickCancelarEdicion() {
    this.getIpressId();
    this.isUpdateHorario = false;
    this.clickDisableHorarios();
    this.getIpress();
    this.openHorario(this.horarios, this.idIpress);
  }

  clickSalirHorarios() {
    this.getIpress();
    this.isUpdateHorario = false;
    this.horarioDialog = false;
  }

  ngOnInit(): void {
  }
}
