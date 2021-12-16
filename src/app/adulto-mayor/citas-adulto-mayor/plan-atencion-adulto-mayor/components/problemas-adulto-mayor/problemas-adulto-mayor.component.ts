import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problemas-adulto-mayor',
  templateUrl: './problemas-adulto-mayor.component.html',
  styleUrls: ['./problemas-adulto-mayor.component.css']
})
export class ProblemasAdultoMayorComponent implements OnInit {
    problemasCronicos: any;
  problemasAgudos: any;

  constructor() { }

  ngOnInit(): void {
  }

  openDialogEditarProblemasCronicos(rowData: any, rowIndex: any) {
    
  }

  eliminarProblemaCronico(rowIndex: any) {
    
  }
}
