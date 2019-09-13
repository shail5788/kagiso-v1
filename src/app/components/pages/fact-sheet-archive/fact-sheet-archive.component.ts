import { Component, OnInit } from "@angular/core";
import { WPAPIService } from "../../../../services/wpapi.service";

@Component({
  selector: "app-fact-sheet-archive",
  templateUrl: "./fact-sheet-archive.component.html",
  styleUrls: ["./fact-sheet-archive.component.css"]
})
export class FactSheetArchiveComponent implements OnInit {
  getCategories;
  subCategory;
  getSelected;
  categoryData;
  currentSubCate;
  isfirst = false;
  constructor(private wpservice: WPAPIService) {}

  ngOnInit() {
    this.wpservice.getCategory("?parent=127&per_page=20").subscribe(categories => {
      this.getCategories = categories;
    });
  }
  getYearPost(category, e, toggle) {
    if (this.currentSubCate) {
      if (category == this.currentSubCate) {
        this.isfirst = !toggle;
      } else {
        this.isfirst = true;
      }
      this.currentSubCate = category;
    } else {
      this.isfirst = !toggle;
      this.currentSubCate = category;
    }

    this.categoryData = null;
    this.wpservice.getCategory(`?parent=${category.id}`).subscribe(subCate => {
      this.subCategory = subCate;
      this.subCategory.sort((a, b) => b.name - a.name);
      this.subCategory = subCate;
      console.log(this.subCategory);
    });
  }
  getSubCategoryData(sub, e) {
    this.wpservice
      .getPostFromCategory(`?categories=${sub.id}`)
      .subscribe(data => {
        this.categoryData = data;
      });
  }
}
