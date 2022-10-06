import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RolGuardiaService } from 'src/app/core/services/rol-guardia/rol-guardia.service';
import { ConsultaGeneralService } from 'src/app/cred/citas/atencion-cred/consulta-principal/services/consulta-general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inteconsulta-obstetricia-modal',
  templateUrl: './inteconsulta-obstetricia-modal.component.html',
  styleUrls: ['./inteconsulta-obstetricia-modal.component.css']
})
export class InteconsultaObstetriciaModalComponent implements OnInit {
  datePipe = new DatePipe('en-US');
  consulta=JSON.parse(localStorage.getItem('datosConsultaActual'))
  interconsultaFG:FormGroup;
  listaServicios:any[]=[]
  listaInterconsulta:any[]=[]
  loading:boolean=false
  listaNivelUrgencia = [
    { name: "Nivel 1", code: "Nivel 1" },
    { name: "Nivel 2", code: "Nivel 2" },
    { name: "Nivel 3", code: "Nivel 3" },
    { name: "Nivel 4", code: "Nivel 4" },
    { name: "Nivel 5", code: "Nivel 5" },
  ];

  constructor(private rolGuardiaService: RolGuardiaService,
              private consultaGeneralService: ConsultaGeneralService) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.getServicios()
    this.getListaInterconsulta();
  }
  buildForm(){
    this.interconsultaFG=new FormGroup({
      fecha:new FormControl(new Date(),Validators.required),
      motivo:new FormControl('',Validators.required),
      servicio:new FormControl('',Validators.required),
      urgencia:new FormControl('',Validators.required),
      
    })
  }
  getFC(control:string):AbstractControl{
    return this.interconsultaFG.get(control)
  }
  getServicios() {
    let idIpress = JSON.parse(localStorage.getItem("usuario")).ipress.idIpress;
    this.rolGuardiaService
      .getServiciosPorIpress(idIpress)
      .subscribe((res: any) => {
        this.listaServicios = res.object;
      });
  }
  getListaInterconsulta() {
    this.consultaGeneralService
      .listInterconsulta(this.consulta.id)
      .subscribe((r: any) => {
        this.listaInterconsulta = r.object;
      });
  }
  
  agregarInterconsulta(){
    if(this.interconsultaFG.invalid){
      Swal.fire({
        icon: "error",
        title: "Datos Requeridos",
        text: "Todos los datos son necesarios",
        showConfirmButton: false,
        timer: 1500,
      });
      return
    }
    const inputRequest={
      fecha:this.datePipe.transform(this.getFC('fecha').value,'yyyy-MM-dd'),
      motivo:this.getFC('motivo').value,
      servicio:this.getFC('servicio').value,
      nivelUrgencia:this.getFC('urgencia').value
    }
    this.consultaGeneralService .addInterconsulta(this.consulta.id, inputRequest)
    .subscribe((r: any) => {
      Swal.fire({
        icon: "success",
        title: "Agregado correctamente",
        text: "",
        showConfirmButton: false,
        timer: 1500,
      });
      this.getListaInterconsulta()
      this.interconsultaFG.reset()
      
    });
  }
  eliminarInterconsulta(rowData) {
    // this.listInterconsulta.splice(index, 1);
    // console.log();
    this.consultaGeneralService.deleteInterconsulta(this.consulta.id, rowData.idCupos).subscribe((r: any) => {
      Swal.fire({
        icon: "success",
        title: "Elemento eliminado",
        text: "",
        showConfirmButton: false,
        timer: 1500,
      });
        this.getListaInterconsulta()
      })
  }
  changeServicios(){

  }

}
