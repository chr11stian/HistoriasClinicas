import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ColegioProfesionalService } from '../../services/colegio-profesional/colegio-profesional.service';
import { ColegioProfesionalModalComponent } from '../colegio-profesional-modal/colegio-profesional-modal.component';

@Component({
  selector: 'app-colegio-profesional',
  templateUrl: './colegio-profesional.component.html',
  styleUrls: ['./colegio-profesional.component.css'],
  providers: [DialogService]
})
export class ColegioProfesionalComponent implements OnInit {
  data: any[] = [];
  isUpdate: boolean = false;

  constructor(
    private colegioProfesionalservice: ColegioProfesionalService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {
    this.getColegioProfesional();
  }
  getColegioProfesional() {
    this.colegioProfesionalservice.getColegioProfesional().subscribe((res: any) => {
      this.data = res.object;
      console.log(this.data);
    });
  }
  agregar() {
    const ref = this.dialogService.open(ColegioProfesionalModalComponent, {
      header: "Ingrese Colegio Profesional",
      width: "60%",
    });
    ref.onClose.subscribe(() => {
      this.messageService.add({ severity: "info", summary: "Car Selected" });
    });
  }

  ngOnInit(): void {}
}
