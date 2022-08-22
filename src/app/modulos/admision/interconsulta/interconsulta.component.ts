import { interconsulta } from "./../models/model";
import { InterconsultaService } from "./../services/interconsulta.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-interconsulta",
  templateUrl: "./interconsulta.component.html",
  styleUrls: ["./interconsulta.component.css"],
})
export class InterconsultaComponent implements OnInit {
  listInterconsulta: interconsulta[] = [];
  constructor(private serviceInterconsulta: InterconsultaService) {}

  ngOnInit(): void {
    this.serviceInterconsulta.listInterconsulta().subscribe((r: any) => {
      this.listInterconsulta = r.object;
      console.log(this.listInterconsulta)
    });
  }
}
