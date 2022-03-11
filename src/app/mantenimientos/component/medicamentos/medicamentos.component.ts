import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MedicamentosService} from "../../services/medicamentos/medicamentos.service";
import Swal from "sweetalert2";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ModalMedicamentosComponent} from "./modal-medicamentos/modal-medicamentos.component";

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css'],
  providers:[DialogService]

})
export class MedicamentosComponent implements OnInit {
  medicamentos: medicamentos[]=[];
  ref: DynamicDialogRef;
  formMedicamentos: FormGroup;
  constructor(private fb: FormBuilder,
              private dialog:DialogService,
              private medicamentosService: MedicamentosService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.listarMedicamentosAll();
  }
  buildForm() {
    this.formMedicamentos = this.fb.group({
      id: new FormControl(''),
      codigo: new FormControl(''),
      nombre: new FormControl(''),
      ff: new FormControl(''),
      concentracion: new FormControl(''),
      viaAdministracion: new FormControl(''),
    })
  }
  /*DATOS RECIBIDOS DE LOS MODALES*/
  openDialogMedicamento(){
    this.ref = this.dialog.open(ModalMedicamentosComponent, {
      header: "MEDICAMENTOS",
      // contentStyle:{
      //   position:"relative",
      // },
    })
    this.ref.onClose.subscribe((data:any)=>{
      console.log("data de modal tratamiento",data)
      if(data!==undefined)
        this.agregarMedicamentos(data);
      console.log(this.medicamentos);
    })
  }

  async agregarMedicamentos(data){
    await this.medicamentosService.addMedicamentos(data).subscribe((res: any) => {
      console.log(res)
      if(res.object!=null){
        this.medicamentos.push(res['object']);
        Swal.fire({
          icon: 'success',
          title: 'Medicamento',
          text: 'Se agrego con éxito un medicamento!',
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se agrego Medicamentos!',
        })
      }
    });

  }

  async listarMedicamentosAll() {
    await this.medicamentosService.getMedicamentosAll().subscribe((res: any) => {
      console.log(res)
      if(res.object!=null){
        this.medicamentos = res.object;
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No existen registros de Medicamentos!',
        })
      }
    });
  }

  async editarMedicamento(row,index){
    let aux={
      index: index,
      row: row
    }
    this.ref = this.dialog.open(ModalMedicamentosComponent, {
      header: " EDITAR MEDICAMENTOS",
      // height:'50%',
      data: aux
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log('data de modal tratamiento ', data)
      if(data!==undefined) {
        this.medicamentos.splice(data.index, 1,data.row);
        let codigo = data.row.codigo;
        console.log(codigo);
        let aux = {
          codigo: codigo,
          nombre: data.row.nombre,
          ff: data.row.ff,
          concentracion: data.row.concentracion,
          viaAdministracion: data.row.viaAdministracion
        }
        console.log(aux);
        this.medicamentosService.updateMedicamentos(codigo,aux).subscribe((res: any) => {
          console.log(res)
          if(res.object!=null){
            // this.medicamentos = res.object;
            Swal.fire({
              icon: 'success',
              title: 'Medicamento',
              text: 'Se corrigió con éxito!',
            })
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se corrigió el registro!',
            })
          }
        });

      };
    })
  }

  editarMedicamento2(rowData: any) {
    let codigo = rowData.codigo;
    const data = {};
    this.medicamentosService.updateMedicamentos(codigo,data).subscribe((res: any) => {
      console.log(res)
      if(res.object!=null){
        this.medicamentos = res.object;
        Swal.fire({
          icon: 'success',
          title: 'Medicamento',
          text: 'Se corrigió con éxito!',
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se corrigió el registro!',
        })
      }
    });
  }
}
interface medicamentos{
  id?:string,
  codigo?:string,
  nombre?:string,
  ff?:string,
  concentracion?:string,
  viaAdministracion?:string
}