import {Component, OnInit} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'app-lab-inmunologia',
    templateUrl: './lab-inmunologia.component.html',
    styleUrls: ['./lab-inmunologia.component.css']
})
export class LabInmunologiaComponent implements OnInit {

    constructor(private ref: DynamicDialogRef,) {
    }

    ngOnInit(): void {
    }

}
