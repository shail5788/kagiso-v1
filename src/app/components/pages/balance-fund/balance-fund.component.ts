import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { WPAPIService } from "../../../../services/wpapi.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-balance-fund",
  templateUrl: "./balance-fund.component.html",
  styleUrls: ["./balance-fund.component.css"]
})
export class BalanceFundComponent implements OnInit {
  @Input() getStatus;
  @Input() getBalancedData;
  getGraphData; 
  currentRoute;
  selectedRoute;
  csvData;
  getCurrentTab;
  constructor(private wpservice: WPAPIService, private router: Router) {}

  ngOnInit() {
    this.wpservice
      .readCSVGraphDataServer(this.getBalancedData.acf.csv_file_graph)
      .subscribe(data => {
        this.csvData = data;
        this.getCurrentTab = 5;
        this.getGraphData = this.makeDataSets(data);
        //console.log(this.getGraphData);
      });
    this.currentRoute = this.router.url.slice(1);
    this.selectedRoute = "";
  }
  getConditionalCSV(years = null) {
    if (years != null) {
      //this.createDataConditionalDataset(years);
      switch (years) {
        case 5:
          this.getCurrentTab = 5;
          this.wpservice
            .readCSVGraphDataServer(this.getBalancedData.acf.csv_file_graph)
            .subscribe(data => {
              this.csvData = data;
              this.getGraphData = this.makeDataSets(data);
            });
          break;
        case 7:
          this.getCurrentTab = 7;
          this.wpservice
            .readCSVGraphDataServer(this.getBalancedData.acf.csv_file)
            .subscribe(data => {
              this.csvData = data;
              this.getGraphData = this.makeDataSets(data);
            });
          break;
        case 10:
          this.getCurrentTab = 10;
          this.wpservice
          .readCSVGraphDataServer(this.getBalancedData.acf.ten_year_csv)
          .subscribe(data => {
            this.csvData = data;
            this.getGraphData = this.makeDataSets(data);
          });
          
          break;
        case "all":
          console.log("all");
          this.getCurrentTab = "all";
          this.wpservice
            .readCSVGraphDataServer(
              this.getBalancedData.acf.since_inception_csv
            )
            .subscribe(data => {
              this.csvData = data;

              this.getGraphData = this.makeDataSets(data);
              //console.log(this.getGraphData);
            });
      }
      this.getGraphData = this.makeDataSets(this.csvData, years);
    }
  }
  createDataConditionalDataset(length) {
    // console.log(this.getGraphData);
  }
  makeDataSets(data, cond = null) {
    var lines = data.split("\n");
    var yearCond = cond * 12;
    var showYear;
    var startingPoint;
    //console.log(lines);
    // if (cond) {
    //   if (lines.length == yearCond) {
    //     showYear = lines.length;
    //   } else if (lines.length > yearCond) {
    //     showYear = yearCond;
    //     startingPoint = lines.length - yearCond;
    //   } else {
    //     showYear = lines.length;
    //   }
    // } else {
    //   showYear = lines.length;
    // }

    // if (startingPoint) {
    //   startingPoint = startingPoint - 1;
    // } else {
    //   startingPoint = 1;
    // }
    //console.log(startingPoint);
    var result = [];
    var headers = lines[0].split(",");
    var dates = [];
    var fundReturn = [];
    var benchMark = [];
    var graphDataSet = {
      dates: null,
      fundReturn: null,
      benchMark: null
    };
    for (var i = 1; i < lines.length - 1; i++) {
      var currentline = lines[i].split(",");
      dates.push(currentline[0]);
      fundReturn.push(currentline[1]);
      benchMark.push(currentline[2]);
    }
    graphDataSet.dates = dates;
    graphDataSet.fundReturn = fundReturn;
    graphDataSet.benchMark = benchMark;

    return graphDataSet;
  }
  getFundOnChange(e) {
    // console.log(this.router.url);
    this.currentRoute = this.router.url;
    this.selectedRoute = e.target.value;
    console.log(this.selectedRoute);
    console.log(this.currentRoute);
    this.router.navigate(["/" + e.target.value]);
  }
}
