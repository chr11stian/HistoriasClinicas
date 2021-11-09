import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-partos",
  templateUrl: "./partos.component.html",
  styleUrls: ["./partos.component.css"],
})
export class PartosComponent implements OnInit {
  treeOptionsOptions: any[];

  signosOptions: any[];

  constructor() {
    this.signosOptions = [
      { label: "Si", value: "Si" },
      {
        label: "No",
        value: "No",
      },
    ];
    this.treeOptionsOptions = [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No Apli.", value: "no aplica" },
    ];
  }
  ngOnInit(): void {}
}
