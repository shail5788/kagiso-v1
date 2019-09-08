import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-bread-crumb",
  templateUrl: "./bread-crumb.component.html",
  styleUrls: ["./bread-crumb.component.css"]
})
export class BreadCrumbComponent implements OnInit {
  @Input() CurrentUrl;
  breadCrumb;
  constructor() {}

  ngOnInit() {
    // console.log(this.CurrentUrl);
    var parent = this.CurrentUrl.parent.split("-");
    var menu = this.CurrentUrl.child.split("-");
    menu.length >= 3
      ? (this.CurrentUrl.child = menu[0] + " " + menu[1] + " " + menu[2])
      : (this.CurrentUrl.child = menu[0] + " " + menu[1]);

    this.CurrentUrl.parent = parent[0] + " " + parent[1];

    if (
      this.CurrentUrl.parent !== " undefined" &&
      this.CurrentUrl.parent !== ""
    ) {
      if (menu.length >= 3) {
        this.breadCrumb =
          parent[0] +
          " " +
          parent[1] +
          " > " +
          menu[0] +
          " " +
          menu[1] +
          " " +
          menu[2];
      } else {
        this.breadCrumb =
          parent[0] + " " + parent[1] + " > " + menu[0] + " " + menu[1];
      }
    } else {
      this.breadCrumb = menu[0] + " " + menu[1];
    }
  }
}
