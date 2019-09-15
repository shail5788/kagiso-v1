import { Component, OnInit, Input } from "@angular/core";
import { WPAPIService } from "../../../../../services/wpapi.service";
import { MalihuScrollbarService } from "ngx-malihu-scrollbar";
import { from } from "rxjs";
@Component({
  selector: "app-fund-tab",
  templateUrl: "./fund-tab.component.html",
  styleUrls: ["./fund-tab.component.css"]
})
export class FundTabComponent implements OnInit {
  constructor(
    private wpservice: WPAPIService,
    private scrollbarService: MalihuScrollbarService
  ) {}
  @Input() getApiData;
  getTabDateSet;
  getSelected;
  getPriceData;
  getHeader;

  ngOnInit() {
    this.getSelected = "overview";

    this.getTabDateSet = this.getApiData.acf.overview;
  }
  ngAfterViewInit() {
    this.scrollbarService.initScrollbar("#scrollable", {
      axis: "y",
      theme: "dark",
      scrollButtons: { enable: true }
    });
  }

  getTabData(clicked, data) {
    //console.log(this.getApiData);
    var keys = Object.keys(this.getApiData.acf);
    keys.map(key => {
      if (key == clicked) {
        if (clicked == "prices") {
          this.getTabDateSet = null;
          var url = this.getCSVByParent(this.getApiData);
          console.log(url);
          this.wpservice.getCSVData(`${url}`).subscribe(data => {
            this.getPriceData = this.convertCSVToJson(data);
            this.getHeader = Object.keys(this.convertCSVToJson(data).data[0]);
            console.log(this.getPriceData);
          });
        } else {
          this.getPriceData = null;
          this.getTabDateSet = this.getApiData.acf[key];
        }
      }
    });
    this.getSelected = clicked;
  }
  convertCSVToJson(data) {
    var mainObj = { isPrice: false, data: null };
    var lines = data.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    mainObj.isPrice = true;
    mainObj.data = result;
    return mainObj;
  }
  getCSVByParent(data) {
      //Individual Investor
    if (data.equityAlphaStatus && data.getParent == "individual-investor") {
      return "assets/data/prices/Kagiso-Equity-Alpha.csv";
    } else if (
      data.balaceFundStatus &&
      data.getParent == "individual-investor"
    ) {
      return "assets/data/prices/Individual-Kagiso-Balanced.csv";
    } else if (
      data.protectorStatus &&
      data.getParent == "individual-investor"
    ) {
      return "assets/data/prices/Individual-Kagiso-Protector.csv";
    } else if (
      data.globalEquityStatus &&
      data.getParent == "individual-investor"
    ) {
      return "assets/data/prices/Individual-Kagiso-Global-Equity.csv";
    }
      else if (
      data.globalEquityFeederStatus &&
      data.getParent == "individual-investor"
    ) {
      return "assets/data/prices/individual-global-equity-price.csv";
    }
    else if (
      data.topFortyTrackerStatus &&
      data.getParent == "individual-investor"
    ) {
      return "assets/data/prices/Individual-Kagiso-Top-40-Tracker.csv";
    }
      else if (
      data.individualStableFundStatus &&
      data.getParent == "individual-investor"
    ) {
      return "assets/data/prices/Individual-Kagiso-Stable.csv";
    }
    //sharia investors  
    else if (data.islamicEquityStatus && data.getParent == "sharia-investor") {
      return "assets/data/prices/Sharia-Islamic-Equity-Fund.csv";
    } else if (
      data.islamicbalancedStatus &&
      data.getParent == "sharia-investor"
    ) {
      return "assets/data/prices/Sharia-Islamic-Balanced-Fund.csv";
    } else if (
      data.islamicHighYieldStatus &&
      data.getParent == "sharia-investor"
    ) {
      return "assets/data/prices/Sharia-Islamic-High-Yield-Fund.csv";
    } else if (
      data.islamicGlobalEquityStatus &&
      data.getParent == "sharia-investor"
    ) {
      return "assets/data/prices/Sharia-Global-Islamic-Equity-Fund.csv";
    } else if (
      data.islamicGlobalEquityFeederStatus &&
      data.getParent == "sharia-investor"
    ) {
      return "assets/data/prices/Sharia-Islamic-Global Feeder-Fund.csv";
    }
    // Institutional fund
    else if (
      data.isInstitutionalEquityStatus &&
      data.getParent == "institutional-investor"
    ) {
      return "assets/data/prices/institutional-equity-price.csv";
    } else if (
      data.isInstitutionalBondStatus &&
      data.getParent == "institutional-investor"
    ) {
      return "assets/data/prices/institutional-bond-font-price.csv";
    } else if (
      data.isInstitutionalMoneyStatus &&
      data.getParent == "institutional-investor"
    ) {
      return "assets/data/prices/institutional-money-price.csv";
    } else if (
      data.isInstitutionalProtectorStatus &&
      data.getParent == "institutional-investor"
    ) {
      return "assets/data/prices/institutional-protected-price.csv";
    } else if (
      data.isStableStatus &&
      data.getParent == "institutional-investor"
    ) {
      return "assets/data/prices/institutional-stable-fund-price.csv";
    } else if (
      data.topFortyTrackerStatus &&
      data.getParent == "individual-investor"
    ) {
      return "assets/data/prices/institutional-stable-fund-price.csv";
    } else if (
      data.isdomesticFundStatus &&
      data.getParent == "institutional-investor"
    ) {
      return "assets/data/prices/institutional-stable-fund-price.csv";
    } else if (
      data.isGlobalFundInstitutionalStatus &&
      data.getParent == "institutional-investor"
    ) {
      return "assets/data/prices/institutional-stable-fund-price.csv";
    }

    // console.log(data);
  }
}
