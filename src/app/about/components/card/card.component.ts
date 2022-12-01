import { Component, OnInit,Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input("profile") profile:any={};
  
  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  verPerfil(row){
    localStorage.removeItem("profileLocalStorage");
    localStorage.setItem(
      "profileLocalStorage",
      JSON.stringify(row)
    );
    this.router.navigate(['/dashboard/about/profile-detail'])

}
}
