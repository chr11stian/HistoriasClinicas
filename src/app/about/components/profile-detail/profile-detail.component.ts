import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-profile-detail",
  templateUrl: "./profile-detail.component.html",
  styleUrls: ["./profile-detail.component.css"],
})
export class ProfileDetailComponent implements OnInit {
  auxData: any = {};
  profile: any = {};
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.profile =
        JSON.parse(localStorage.getItem("profileLocalStorage")) === null
          ? {}
          : JSON.parse(localStorage.getItem("profileLocalStorage"));
      console.log(this.profile);
    }, 600);
  }
}
