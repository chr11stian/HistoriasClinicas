import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MedicamentosService} from "../../services/medicamentos/medicamentos.service";
import Swal from "sweetalert2";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ModalTratamientoComponent} from "../../../obstetricia-general/gestante/atencion/consultorio-obstetrico/component/tratamiento/modal-tratamiento/modal-tratamiento.component";
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
  openDialogTratamientoComun(){
    this.ref = this.dialog.open(ModalMedicamentosComponent, {
      header: "MEDICAMENTOS",
      contentStyle:{
        overflow:"auto",
      },
    })
    this.ref.onClose.subscribe((data:any)=>{
      console.log("data de modal tratamiento",data)
      if(data!==undefined)
        this.medicamentos.push(data);
        this.agregarMedicamentos(data);
      console.log(this.medicamentos);
    })
  }

  async agregarMedicamentos(data){
    await this.medicamentosService.addMedicamentos(data).subscribe((res: any) => {
      console.log(res)
      if(res.object!=null){
        this.medicamentos = res['object']
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


  editarMedicamento(rowData: any) {

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