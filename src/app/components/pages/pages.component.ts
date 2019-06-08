import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { WPAPIService } from "../../../services/wpapi.service";
import { Observable } from "rxjs";
@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.css"]
})
export class PagesComponent implements OnInit {
  page = null;
  contactUs = false;
  faq;
  annualReportUrl;
  selectedYear;
  balaceFundStatus;
  fundRangeTestStatus;
  getHowToInvestSlider;
  getHomeSlider;

  activeClickedTab;

  //textFreeInvesting = false;
  taxFreeInvestment;

  constructor(
    private wpservice: WPAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private santiser: DomSanitizer
  ) {
    route.params.subscribe(val => {
      // console.log(val);
      //console.log(this.router.url);
      var urlArr = this.router.url.split("/");
      // console.log(urlArr);
      var currentUrl = {
        parent: urlArr.length > 2 ? urlArr[1] : "",
        child: urlArr.length > 2 ? urlArr[2] : urlArr[1],
        schild: urlArr.length > 3 ? urlArr[3] : ""
      };
      if (val.ID || currentUrl.child) {
        var slug = val.ID
          ? val.ID
          : currentUrl.schild != ""
          ? currentUrl.schild
          : currentUrl.child;

        // console.log(slug);
        this.wpservice.pages(`?slug=${slug}`).subscribe(page => {
          this.page = page[0];

          if (slug == "meet-our-leaders") {
            this.page.ourteamStatus = true;
            this.page.acf.meet_our_leaders.forEach(leader => {
              leader.video_url = this.santiser.bypassSecurityTrustHtml(
                leader.video_url
              );
            });
          }
          if (slug == "faq") {
            this.page.faqStatus = true;
          }
          if (slug == "insights") {
            this.page.insightStatus = true;
          }
          if (slug == "unit-trusts-annual-report") {
            this.page.annualReport = true;
            this.annualReportUrl = this.page.acf.annual_report[0].report_url;
          }
          if (slug == "april-2018-quarterly") {
            this.page.quaterlyStatus = true;
          }
          if (slug == "our-sharia-board") {
            this.page.shariaBoardStatus = true;
          }
          if (slug == "up-quarterly-library") {
            this.page.quaterlyLibraryStatus = true;
          }
          if (slug == "podcast-archive") {
            this.page.podcastArchiveStatus = true;
          }
          if (slug == "glossary") {
            this.page.glossaryStatus = true;
          }
          if (slug == "fund-range-test") {
            this.fundRangeTestStatus = true;
          }
          if (slug == "meet-the-fund-manager") {
            this.page.meetFundManager = true;
            // this.wpservice.getPost("11267").subscribe(silder => {
            //   this.getHomeSlider = silder;
            // });
          }
          if (slug == "tax-free-investing") {
            this.page.textFreeInvesting = true;
            // this.wpservice.getPost("11272").subscribe(taxFrees => {
            //   this.taxFreeInvestment = taxFrees;
            //   console.log(this.taxFreeInvestment);
            // });
          }
          if (slug == "new-to-investing") {
            this.page.newToInvestingStatus = true;
            this.activeClickedTab = "unitTrust";
            this.getHowToInvestSlider = this.page.acf.what_is_a_unit_trust;
          }
          if (slug == "forms-documents") {
            this.page.formDocumentStatus = true;
          }

          // if (slug == "balanced-fund") {
          //   this.page.balaceFundStatus = true;
          // }
          if (slug == "fact-sheets-archive") {
            this.page.factsheetStatus = true;
          }
          // if (slug == "equity-alpha-fund") {
          //   this.page.equityAlphaStatus = true;
          // }

          console.log(this.page);
          if (this.page) {
            if (this.page.id == 10) {
              //this.page.formStatus = true;
              this.wpservice.getPages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.aboutStatus = true;
                this.contactUs = true;
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "sharia-investor" &&
              this.page.slug == "our-funds"
            ) {
              this.page.id = 8;

              this.wpservice.getPages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.ourfunds = true;
                this.faq = this.page.acf["qa-ans"];
                // console.log(this.page);
                // console.log(this.faq);
              });
            } else if (
              currentUrl.parent == "sharia-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "islamic-equity-fund"
            ) {
              this.page.id = 11786;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.islamicEquityStatus = true;
                this.page.getParent = "sharia-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "sharia-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "islamic-balanced-fund"
            ) {
              this.page.id = 11788;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.islamicbalancedStatus = true;
                this.page.getParent = "sharia-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "sharia-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "islamic-high-yield-fund"
            ) {
              this.page.id = 11790;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.islamicHighYieldStatus = true;
                this.page.getParent = "sharia-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "sharia-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "islamic-global-equity-fund"
            ) {
              this.page.id = 11794;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.islamicGlobalEquityStatus = true;
                this.page.getParent = "sharia-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "sharia-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "islamic-global-equity-feeder-fund"
            ) {
              this.page.id = 11792;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.islamicGlobalEquityFeederStatus = true;
                this.page.getParent = "sharia-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "individual-investor" &&
              this.page.slug == "our-funds"
            ) {
              this.page.id = 355;

              this.wpservice.getPages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.ourfunds = true;
                this.faq = this.page.acf["qa-ans"];
              });
            } else if (
              currentUrl.parent == "individual-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "equity-alpha-fund"
            ) {
              this.page.id = 11777;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.equityAlphaStatus = true;
                this.page.getParent = "individual-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "individual-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "balanced-fund"
            ) {
              this.page.id = 544;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.balaceFundStatus = true;
                this.page.getParent = "individual-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "individual-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "protector-fund"
            ) {
              this.page.id = 11779;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.protectorStatus = true;
                this.page.getParent = "individual-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "individual-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "global-equity-fund"
            ) {
              this.page.id = 11781;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.globalEquityStatus = true;
                this.page.getParent = "individual-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "institutional-investor" &&
              this.page.slug == "our-funds"
            ) {
              this.page.id = 351;

              this.wpservice.getPages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.ourfunds = true;
                this.faq = this.page.acf["qa-ans"];
              });
            } else if (
              currentUrl.parent == "institutional-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "equity-alpha-fund"
            ) {
              this.page.id = 11800;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.isInstitutionalEquityStatus = true;
                this.page.getParent = "institutional-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "institutional-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "bond-fund"
            ) {
              this.page.id = 11802;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.isInstitutionalBondStatus = true;
                this.page.getParent = "institutional-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "institutional-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "money-market-fund"
            ) {
              this.page.id = 11804;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.isInstitutionalMoneyStatus = true;
                this.page.getParent = "institutional-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "institutional-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "protector-fund"
            ) {
              this.page.id = 11798;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.isInstitutionalProtectorStatus = true;
                this.page.getParent = "institutional-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "institutional-investor" &&
              currentUrl.child == "our-funds" &&
              currentUrl.schild == "stable-fund"
            ) {
              this.page.id = 11796;
              this.wpservice.pages(`${this.page.id}`).subscribe(page => {
                this.page = page;
                this.page.isInstitutionalStableStatus = true;
                this.page.getParent = "institutional-investor";
                console.log(this.page);
              });
            } else if (
              currentUrl.parent == "sharia-investor" &&
              slug == "invest-with-us"
            ) {
              this.wpservice.getPages("89").subscribe(page => {
                this.page = page;
                this.page.saria = true;
                console.log(this.page);
              });
            }
          }

          // } else if (this.page.slug == "our-funds") {
          //   this.wpservice.getPages(`${this.page.id}`).subscribe(page => {
          //     this.page = page;
          //     this.page.ourfunds = true;
          //     console.log(this.page);
          //   });
          // }

          // console.log(typeof this.page.formStatus);
        });
      }
    });
  }

  getAnnualReport(event, year) {
    this.annualReportUrl = year.report_url;
    this.selectedYear = year;
  }
  ngOnInit() {}

  changeSliderData(data, clickedTab) {
    this.getHowToInvestSlider = data;
    this.activeClickedTab = clickedTab;
    console.log(this.getHowToInvestSlider);
  }
}
