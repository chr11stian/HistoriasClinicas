import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {ListaConsultaService} from "../../../cred/citas/services/lista-consulta.service";
import {dato} from "../../../cred/citas/models/data";
import {
  FiliancionService
} from "../../../obstetricia-general/gestante/atencion/h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";

@Component({
  selector: 'app-lista-consulta',
  templateUrl: './lista-consulta.component.html',
  styleUrls: ['./lista-consulta.component.css']
})
export class ListaConsultaComponent implements OnInit {

  attributeLocalS = 'documento'
  dataConsulta: any;
  dataLifiado: any;
  FormPaciente: FormGroup;
  tipoDoc: any;
  nroDoc: any;
  apellidosNombres: any;
  tipoDocRecuperado: string;
  nroDocRecuperado: string;
  data: any
  fechaNacimiento: string
  sexo: string

  constructor(private form: FormBuilder,
              // private obstetriciaGeneralService: ObstetriciaGeneralService,
              private filiancionService: FiliancionService,
              private listaConsultaService: ListaConsultaService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.consultasNroDoc();
  }

  getpacientesFiliados(nroDoc) {
    //para cred
    this.listaConsultaService.getListaConsultaXtipo('DNI',nroDoc,this.data.tipoConsulta).subscribe((r: any) => {
      this.dataConsulta = r.object;
    })
  }

  atencion(event) {
    this.listaConsultaService.getConsulta(event.id).subscribe((r: any) => {
      this.data = <any>JSON.parse(localStorage.getItem(this.attributeLocalS))
      let data: any = {
        nroDocumento: this.data.nroDocumento,
        tipoDoc: this.data.tipoDoc,
        idConsulta: event.id,
        // anio: r.object.anioEdad,
        // mes: r.object.mesEdad,
        // dia: r.object.diaEdad,
        sexo: this.sexo,
        fechaNacimiento: this.fechaNacimiento,
        tipoConsulta:this.data.tipoConsulta
      }
      localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
      setTimeout(() => {
        this.router.navigate(['/dashboard/consulta-generica/consulta'])
      }, 100)
    })
  }

  nuevaConsulta() {
    let data: any = {
      nroDocumento: this.data.nroDocumento,
      tipoDoc: this.data.tipoDoc,
      idConsulta: '',
      sexo: this.sexo,
      fechaNacimiento: this.fechaNacimiento,
      hidden: true,
      see: true,
      tipoConsulta:this.data.tipoConsulta
    }
    localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
    setTimeout(() => {
      // this.router.navigate(['/dashboard/cred/citas/atencion'])
      this.router.navigate(['/dashboard/consulta-generica/consulta'])
    }, 100)

  }

  consultasNroDoc() {
    this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS))
    this.filiancionService.getPacienteNroDocFiliacion(this.data.tipoDoc, this.data.nroDocumento).subscribe((res: any) => {

      this.dataLifiado = res.object
      this.sexo = res.object.sexo
      this.fechaNacimiento = res.object.nacimiento.fechaNacimiento
      console.log('nro doc filiacion ', res.object)
      this.tipoDoc = this.dataLifiado.tipoDoc
      this.nroDoc = this.dataLifiado.nroDoc;
      this.apellidosNombres = this.dataLifiado.apePaterno + ' ' + this.dataLifiado.apeMaterno + ' ' + this.dataLifiado.primerNombre + ' ' + this.dataLifiado.otrosNombres;
    });
    this.getpacientesFiliados(this.data.nroDocumento);
  }

  irFUA(rowData) {
    // let message1 = "Esta Seguro de Generar FUA?, se dara como finalizado la consulta"
    // let message2 = "Esta Seguro de Generar FUA?, Debe revisar el tipo de Seguro"
    // if (rowData.estadoAtencion == 0) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Consulta en Interconsulta, no es posible hacer FUA',
    //     showConfirmButton: false,
    //     timer: 2000
    //   });
    // }
    // if (rowData.estadoAtencion == 2) {
    //   this.router.navigate(['dashboard/fua/listar-fua'], rowData)
    // }
    // if (rowData.estadoAtencion == 1 || rowData.estadoAtencion == 0) {
    //   Swal.fire({
    //     title: rowData.tipoConsulta != 'CRED' ? message1 : message2,
    //     showDenyButton: true,
    //     confirmButtonText: 'Crear FUA',
    //     denyButtonText: `Cancelar`,
    //     confirmButtonColor: '#3085d6',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.router.navigate(['dashboard/fua/listar-fua'], rowData)
    //     } else if (result.isDenied) {
    //       Swal.fire({
    //         icon: 'warning',
    //         title: 'No se creo FUA',
    //         showConfirmButton: false,
    //         timer: 2000
    //       });
    //     }
    //   })
    // }
  }

  irHIS(rowData) {
    // let message1 = "Esta Seguro de Generar HIS?, se dara como finalizado la consulta"
    // if (rowData.estadoAtencion == 0) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Consulta en Interconsulta, no es posible hacer HIS',
    //     showConfirmButton: false,
    //     timer: 2000
    //   });
    // }
    // if (rowData.estadoAtencion == 2) {
    //   this.router.navigate(['dashboard/his/listar-his'], {
    //     queryParams: {
    //       'idConsulta':rowData.id,
    //       'tipoConsulta':rowData.tipoConsulta
    //     }
    //   })
    // }
    // if (rowData.estadoAtencion == 1) {
    //   Swal.fire({
    //     title: message1,
    //     showDenyButton: true,
    //     confirmButtonText: 'Crear HIS',
    //     denyButtonText: `Cancelar`,
    //     confirmButtonColor: '#3085d6',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.router.navigate(['dashboard/his/listar-his'], {
    //         queryParams: {
    //           'idConsulta':rowData.id,
    //           'tipoConsulta':rowData.tipoConsulta
    //         }
    //       })
    //     } else if (result.isDenied) {
    //       Swal.fire({
    //         icon: 'warning',
    //         title: 'No se creo HIS',
    //         showConfirmButton: false,
    //         timer: 2000
    //       });
    //     }
    //   })
    // }
  }

}
