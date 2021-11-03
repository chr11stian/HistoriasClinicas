import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReorderableColumn } from 'primeng/table';
import { Departamentos, Distrito, Provincias } from 'src/app/core/models/ubicacion.models';
import { IpressService } from 'src/app/core/services/ipress/ipress.service';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { DocumentoIdentidadService } from 'src/app/mantenimientos/services/documento-identidad/documento-identidad.service';
import { EtniaService } from 'src/app/mantenimientos/services/etnia/etnia.service';
import { UbicacionService } from 'src/app/mantenimientos/services/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  dialogPaciente: boolean;
  formPaciente: FormGroup;
  listaDocumentos: any;
  listaIpress: any;
  listaPacientes: any;
  dataPaciente: any;
  dataDepartamentos: any;
  dataProvincia: any;
  dataDistrito: any;
  dataCentroPoblado: any;
  dataEtnia: any;
  iddd: string;
  update: boolean = false;
  dpto: Departamentos;
  prov: Provincias;
  dist: Distrito;
  ccpp: any;
  id: string;
  auxipress: string = "615b30b37194ce03d782561c";
  listaEstadoCivil = [
    'Soltero',
    'Casado',
    'Conviviente',
    'Separado',
    'Divorciado',
    'Viudo'
  ]
  listaNacionalidades = [
    'Peruano',
    'Extranjero'
  ]
  listaSexo = [
    'Masculino',
    'Femenino'
  ]
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
  ]

  constructor(
    private fb: FormBuilder,
    private documentoIdentidadService: DocumentoIdentidadService,
    private ipressService: IpressService,
    private pacienteService: PacienteService,
    private ubicacionService: UbicacionService,
    private etniaService: EtniaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.cargarPacientes();
    this.cargarEtnia();
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
    });
  }

  cargarPacientes() {
    this.pacienteService.getPacientes().subscribe((res: any) => {
      this.listaPacientes = res.object;
      // console.log('lista de pacientes ', this.listaPacientes)
    });
  }

  cargarDocumentos() {
    this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
      this.listaDocumentos = res.object;
      // console.log('documentos ident ', this.listaDocumentos)
    });
  }

  cargarIpress() {
    this.ipressService.getIpress().subscribe((res: any) => {
      this.listaIpress = res.object
      // console.log('lista ipress ', this.listaIpress)
    });
  }

  cargarEtnia() {
    this.etniaService.getEtnia().subscribe((res: any) => {
      this.dataEtnia = res.object;
      console.log('lista de etnia ', this.dataEtnia)
    });
  }

  recuperarDatos() {
    let aux = this.formPaciente.value.etnia;
    this.dataPaciente = {
      tipoDoc: this.formPaciente.value.tipoDoc.abreviatura,
      primerNombre: this.formPaciente.value.primerNombre,
      otrosNombres: this.formPaciente.value.otrosNombres,
      apePaterno: this.formPaciente.value.apPaterno,
      apeMaterno: this.formPaciente.value.apMaterno,
      celular: this.formPaciente.value.celular,
      tipoSeguro: this.formPaciente.value.tipoSeguro,
      nacionalidad: this.formPaciente.value.nacionalidad,
      procedencia: this.formPaciente.value.procedencia,
      nacimiento: {
        fechaNacimiento: this.formPaciente.value.fechaNacimiento
      },
      domicilio: {
        departamento: this.dpto.departamento,
        provincia: this.prov.provincia,
        distrito: this.dist.distrito,
        direccion: this.formPaciente.value.direccion,
        idccpp: this.ccpp.idccpp,
        ccpp: this.ccpp.ccpp,
        ubigeo: this.dpto.iddd + this.prov.idpp + this.dist.iddis
      },
      estadoCivil: this.formPaciente.value.estadoCivil,
      etnia: {
        tipoEtnia: aux.tipoEtnia,
        etnia: aux.descripcion
      },
      gradoInstruccion: this.formPaciente.value.gradoInstruccion,
      sexo: this.formPaciente.value.sexo,
      fechaNacimiento: this.formPaciente.value.fechaNacimiento,
      fechaInscripcion: this.formPaciente.value.fechaInscripcion,
      fechaEmision: this.formPaciente.value.fechaEmision,
      restricion: this.formPaciente.value.restriccion,
      discapacidad: this.formPaciente.value.discapacidad,
      // nombrePadre: this.formPaciente.value.nombrePadre,
      // nombreMadre: this.formPaciente.value.nombreMadre,
      idIpress: this.auxipress,
      nroDoc: this.formPaciente.value.nroDoc
    }
  }

  getDepartamentos() {
    this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
      this.dataDepartamentos = resp.object;
    });
  }

  openDialogPaciente() {
    this.dpto = {};
    this.prov = {};
    this.dist = {};
    this.ccpp = {};
    this.update = false;
    this.formPaciente.reset();
    this.dialogPaciente = true;
    this.cargarDocumentos();
    this.cargarEtnia();
    this.getDepartamentos();
  }

  closeDialogPaciente() {
    this.dialogPaciente = false;
  }

  aceptarDialogPaciente() {
    this.recuperarDatos();
    console.log('datos paciente ', this.dataPaciente)
    this.pacienteService.postPacientes(this.dataPaciente).subscribe((res: any) => {
      console.log('res ', res)
      this.formPaciente.reset();
      this.cargarPacientes();
      this.closeDialogPaciente();
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: res.mensaje });
    });
  }

  openEditarPaciente(row) {
    console.log('row ', row)
    this.dpto = {};
    this.prov = {};
    this.dist = {};
    this.ccpp = {};
    this.getDepartamentos();
    this.update = true;
    this.formPaciente.reset();
    this.dialogPaciente = true;
    this.documentoIdentidadService.getDocumentosIdentidad().subscribe((res: any) => {
      this.listaDocumentos = res.object;
      let auxTipoDoc = this.listaDocumentos.filter(item => item.abreviatura == row.tipoDoc)
      this.formPaciente.patchValue({ tipoDoc: auxTipoDoc[0] })
    })
    // 
    console.log('edit etnia ', row.etnia)
    // this.formPaciente.patchValue({ tipoDoc: row.tipoDoc });
    this.formPaciente.patchValue({ nroDoc: row.nroDoc });
    this.formPaciente.patchValue({ primerNombre: row.primerNombre });
    this.formPaciente.patchValue({ otrosNombres: row.otrosNombres });
    this.formPaciente.patchValue({ apPaterno: row.apePaterno });
    this.formPaciente.patchValue({ apMaterno: row.apeMaterno });
    this.formPaciente.patchValue({ celular: row.celular });
    this.formPaciente.patchValue({ tipoSeguro: row.tipoSeguro });
    this.formPaciente.patchValue({ nacionalidad: row.nacionalidad });
    this.formPaciente.patchValue({ procedencia: row.procedencia });
    this.formPaciente.patchValue({ estadoCivil: row.estadoCivil });
    this.formPaciente.patchValue({ etnia: row.etnia });
    this.formPaciente.patchValue({ gradoInstruccion: row.gradoInstruccion });
    this.formPaciente.patchValue({ sexo: row.sexo });
    this.formPaciente.patchValue({ fechaNacimiento: row.nacimiento.fechaNacimiento });
    this.formPaciente.patchValue({ fechaInscripcion: row.fechaInscripcion });
    this.formPaciente.patchValue({ fechaEmision: row.fechaEmision });
    this.formPaciente.patchValue({ restriccion: row.restriccion });
    this.formPaciente.patchValue({ discapacidad: row.discapacidad });
    this.formPaciente.patchValue({ direccion: row.domicilio.direccion });
    let auxDep = row.domicilio.ubigeo.slice(0, 2);
    let auxProv = row.domicilio.ubigeo.slice(2, 4);
    let auxDist = row.domicilio.ubigeo.slice(4, 6);
    let dep = {
      departamento: row.domicilio.departamento,
      iddd: auxDep
    }

    this.dpto = dep;
    console.log('dpto ', this.dpto);
    this.ubicacionService.getProvincias(dep).subscribe((res: any) => {
      this.dataProvincia = res.object;
    });

    this.prov = {
      idpp: auxProv,
      provincia: row.domicilio.provincia
    }

    let provAux = {
      iddd: auxDep,
      idpp: auxProv
    }
    this.ubicacionService.getDistritos(provAux).subscribe((res: any) => {
      this.dataDistrito = res.object;
    });

    this.dist = {
      iddis: auxDist,
      distrito: row.domicilio.distrito
    }

    let distAux = {
      iddd: auxDep,
      idpp: auxProv,
      iddis: auxDist
    }
    this.ubicacionService.getCentroPoblado(distAux).subscribe((res: any) => {
      this.dataCentroPoblado = res.object;
    });
    this.ccpp = {
      idccpp: row.domicilio.idccpp,
      ccpp: row.domicilio.ccpp
    }
    this.id = row.id;
  }

  eliminarPaciente(row) {
    this.confirmationService.confirm({
      header: 'Eliminar Paciente',
      icon: 'pi pi-info-circle',
      message: "¿Esta seguro que desea eliminar este registro?",
      acceptLabel: "Eliminar",
      rejectLabel: 'Cancelar',
      accept: () => {
        this.pacienteService.deletePaciente(row.id).subscribe((res: any) => {
          console.log('res ', res)
          this.cargarPacientes();
          this.messageService.add({
            severity: "success",
            summary: "Exito",
            detail: res.mensaje
          });
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "warn",
          summary: "No se Elimino el registro"
        });
      }
    });
    // this.pacienteService.deletePaciente(row.id).subscribe((res: any) => {
    //   console.log('res delete ', res)
    //   this.cargarPacientes();
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'success',
    //     title: 'Se Elimino exitosamente el Registro ',
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    // });
  }

  selectedDepartamento() {
    let dpto = {
      iddd: this.dpto.iddd
    }
    this.dataDistrito = '';
    this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
      this.dataProvincia = res.object;
    });
  }

  selectedProvincia() {
    let provincia = {
      iddd: this.dpto.iddd,
      idpp: this.prov.idpp
    };
    this.ubicacionService.getDistritos(provincia).subscribe((res: any) => {
      this.dataDistrito = res.object;
    });
  }

  selectedDistrito() {
    let distrito = {
      iddd: this.dpto.iddd,
      idpp: this.prov.idpp,
      iddis: this.dist.iddis
    }
    this.ubicacionService.getCentroPoblado(distrito).subscribe((res: any) => {
      this.dataCentroPoblado = res.object;
    });
  }

  aceptarEditarPaciente() {
    this.recuperarDatos();
    this.dataPaciente.id = this.id;
    console.log('control name ', this.formPaciente.value.etnia);
    console.log('actualizar ', this.formPaciente.value.etnia);
    // this.pacienteService.putPaciente(this.dataPaciente).subscribe((res: any) => {
    //   this.cargarPacientes();
    //   this.closeDialogPaciente();
    //   console.log('se actualizo correctamente ', res)
    //   this.messageService.add({
    //     severity: "success",
    //     summary: "Exito",
    //     detail: res.mensaje
    //   });
    // })
    // console.log('aceptar editar paciente')
  }

  pacienteByNroDoc() {
    let auxNroDoc = {
      tipoDoc: "DNI",
      nroDoc: "24015415"
    }
    this.pacienteService.getPacienteByNroDoc(auxNroDoc).subscribe((res: any) => {
      console.log('paciente por doc ', res.object)
    });
  }
}