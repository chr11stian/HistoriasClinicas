import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CitasService } from 'src/app/core/services/citas/citas.service';
import { RolGuardiaService } from 'src/app/core/services/rol-guardia/rol-guardia.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  form: FormGroup;
  data: any[];
  fecha: Date = new Date();
  datePipe = new DatePipe("en-US");
  idIpress: String = "";
  nombreIpress: String = "";
  servicios: any[];

  constructor(
    private rolGuardiaService: RolGuardiaService,
    private citasService: CitasService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.buildForm();
    this.idIpress = "616de45e0273042236434b51";
    this.nombreIpress = "la posta medica";
    this.data = [];
    this.servicios = [];
    
    this.getListaServiciosXIpress();
    this.getListaCitasXServicio();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      fechaFiltroInicio: [new Date()],
      fechaFiltroFin: [new Date()],
      servicio: [""],
      nroDoc: [""],
    })
    // this.formOfertas = this.formBuilder.group({
    //   nroDoc: [""],
    //   nombre: [""],
    //   servicio: [""],
    //   fecha: [""],
    //   ambiente: [''],
    //   nroOfertasActuales: [''],
    //   nroOfertasAgregar: ['', [Validators.required]]
    // })
  }

  /**lista los Servicios por IPRESS**/
  getListaServiciosXIpress() {
    this.rolGuardiaService.getServiciosPorIpress(this.idIpress).subscribe((res: any) => {
      this.servicios = res.object;
      console.log('LISTA DE SERVICIOS DE IPRESS', this.servicios);
    })
  }

  getListaCitasXServicio() {
    let data={
      fechaInicio: this.datePipe.transform(this.form.value.fechaFiltroInicio, 'yyyy-MM-dd'),
      fechaFin : this.datePipe.transform(this.form.value.fechaFiltroFin, 'yyyy-MM-dd'),
      servicio : this.form.value.servicio,
    }
    
    console.log('DATA ', data);

    this.citasService.listarCitasXservicio(data).subscribe((res: any) => {
      this.data = res.object;
      console.log('LISTA DE CITAS X SERVICIO IPRESS', this.data);
    })
  }

  getListaTentativaXServicios(){
    
  }

  getListaOfertaXDocumento(){
    let data = {
      tipoDoc: "DNI",
      nroDoc: this.form.value.nroDoc,
      nombreIpress: this.nombreIpress,
    }
    console.log('DATA ', data);

    // this.ofertasService.buscarOfertaXPersonal(data).subscribe((res: any) => {
    //   this.data = res.object;
    //   console.log('LISTA OFERTAS X DNI', this.data);
    // })
  }

  ngOnInit(): void {
  }

}
