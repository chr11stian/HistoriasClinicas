import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from 'src/app/core/services/paciente/paciente.service';
import { DocumentoIdentidadService } from 'src/app/mantenimientos/services/documento-identidad/documento-identidad.service';
import { EtniaService } from 'src/app/mantenimientos/services/etnia/etnia.service';
import { UbicacionService } from 'src/app/mantenimientos/services/ubicacion/ubicacion.service';
import { image } from 'src/assets/images/image.const';

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
      // if(res.genero="0"){ this.formPaciente.get("sexo").setValue("FEMENINO");}else{"MASCULINO"}
      this.formPaciente.get("restriccion").setValue(res.restriccion);
      this.formPaciente.get("estadoCivil").setValue(res.estadoCivil);
      this.formPaciente.get("direccion").setValue(res.direccion);
      if (res.tipoSeguro == "01") { this.formPaciente.get("tipoSeguro").setValue("SIS"); }
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
    console.log('centro poblado ', this.formPaciente.value.ccpp);
    let aux = this.formPaciente.value.etnia;
    let auxNroHcl: string;
    if (this.peruvian) {
      auxNroHcl = this.formPaciente.value.nroDoc;
    } else {
      auxNroHcl = this.formPaciente.value.nroHcl;
    }
    this.dataPaciente = {
      nroHcl: auxNroHcl,
      tipoDoc: this.formPaciente.value.tipoDoc,
      nroDoc: this.formPaciente.value.nroDoc,
      primerNombre: this.formPaciente.value.primerNombre,
      otrosNombres: this.formPaciente.value.otrosNombres,
      apePaterno: this.formPaciente.value.apPaterno,
      apeMaterno: this.formPaciente.value.apMaterno,
      sexo: this.formPaciente.value.sexo,
      nacimiento: {
        // fechaNacimiento: this.formPaciente.value.fechaNacimiento
        fechaNacimiento: this.formPaciente.value.fechaNacimiento + ' 00:00:00',
      },
      celular: this.formPaciente.value.celular,
      tipoSeguro: this.formPaciente.value.tipoSeguro,
      discapacidad: this.formPaciente.value.discapacidad == '' ? [] : this.formPaciente.value.discapacidad,
      nacionalidad: this.formPaciente.value.nacionalidad,
      estadoCivil: this.formPaciente.value.estadoCivil,
      procedencia: this.formPaciente.value.procedencia,
      etnia: {
        tipoEtnia: aux.tipoEtnia,
        etnia: aux.descripcion
      },
      gradoInstruccion: this.formPaciente.value.gradoInstruccion,
      fechaInscripcion: this.formPaciente.value.fechaInscripcion,
      fechaEmision: this.formPaciente.value.fechaEmision,
      restricion: this.formPaciente.value.restriccion,
      domicilio: {
        departamento: this.formPaciente.value.departamento,
        provincia: this.formPaciente.value.provincia,
        distrito: this.formPaciente.value.distrito,
        direccion: this.formPaciente.value.direccion,
        idccpp: this.formPaciente.value.ccpp.ccpp,
        ccpp: this.formPaciente.value.ccpp.idccpp,
        ubigeo: this.codUbigeo
      },
      // nombrePadre: this.formPaciente.value.nombrePadre,
      // nombreMadre: this.formPaciente.value.nombreMadre,
      idIpress: this.auxipress,
    }
    console.log('data paciente to save ', this.dataPaciente);
  }

  saveForm() {
    // this.isUpdate = false;
    // let otrosNombres = this.form.value.nombres.split(" ", 2);
    // let otros = otrosNombres.shift();
    // otrosNombres = otrosNombres.join(" ");
    // let primerNombre = this.form.value.nombres.split(" ")[0];
    // console.log(this.form.value.fechaNacimiento);
    // const req = {
    //   tipoDoc: this.form.value.tipoDoc,
    //   nroDoc: this.form.value.nroDoc,
    //   apePaterno: this.form.value.apePaterno,
    //   apeMaterno: this.form.value.apeMaterno,
    //   primerNombre: primerNombre,
    //   otrosNombres: otrosNombres,
    //   fechaNacimiento: this.datePipe.transform(
    //     this.form.value.fechaNacimiento,
    //     "yyyy-MM-dd"
    //   ),
    //   sexo: this.form.value.sexo,
    // };
    // console.log(req);
    // if (req.nroDoc.trim() !== "") {
    //   this.personalservice.createPersonal(req).subscribe((result) => {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Agregado correctamente",
    //       text: "",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     this.getPersonal();
    //     this.personalDialog = false;
    //   });
    // }
  }
  closeDialog() {

  }
  editarDatos() {

  }

}
