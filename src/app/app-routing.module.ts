import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./components/pages/pages.component";
import { HomeComponent } from "./components/home/home.component";
import { ContactUsComponent } from "./components/pages/contact-us/contact-us.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/individual-investor/invest-with-us",
    pathMatch: "full"
  },
  {
    path: "contact-us",
    pathMatch: "full",
    component: ContactUsComponent
  },

  {
    path: "individual-investor/invest-with-us",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "individual-investor/our-funds",
    pathMatch: "full",
    component: PagesComponent
  },
  {
    path: "sharia-investor/invest-with-us",
    pathMatch: "full",
    component: PagesComponent
  },
  {
    path: "sharia-investor/our-funds",
    pathMatch: "full",
    component: PagesComponent
  },
  {
    path: "sharia-investor/podcast-archive",
    pathMatch: "full",
    component: PagesComponent
  },
  {
    path: "institutional-investor/investment-approach",
    component: PagesComponent
  },
  {
    path: "institutional-investor/our-funds",
    component: PagesComponent
  },
  //child of child root for individual investor
  {
    path: "individual-investor/our-funds/equity-alpha-fund",
    component: PagesComponent
  },
  {
    path: "individual-investor/our-funds/balanced-fund",
    component: PagesComponent
  },
  {
    path: "individual-investor/our-funds/protector-fund",
    component: PagesComponent
  },
  {
    path: "individual-investor/our-funds/global-equity-fund",
    component: PagesComponent
  },
  {
    path: "individual-investor/our-funds/top-40-tracker-fund",
    component: PagesComponent
  },
  {
    path: "individual-investor/our-funds/stable-fund",
    component: PagesComponent
  },
  // end individual investor
  // sharia investor child of child
  {
    path: "sharia-investor/our-funds/islamic-balanced-fund",
    component: PagesComponent
  },
  {
    path: "sharia-investor/our-funds/islamic-equity-fund",
    component: PagesComponent
  },
  {
    path: "sharia-investor/our-funds/islamic-global-equity-fund",
    component: PagesComponent
  },
  {
    path: "sharia-investor/our-funds/islamic-global-equity-feeder-fund",
    component: PagesComponent
  },
  {
    path: "sharia-investor/our-funds/islamic-high-yield-fund",
    component: PagesComponent
  },
  // end
  {
    path: "institutional-investor/our-funds/equity-alpha-fund",
    component: PagesComponent
  },
  {
    path: "institutional-investor/our-funds/stable-fund",
    component: PagesComponent
  },
  {
    path: "institutional-investor/our-funds/managed-equity-fund",
    component: PagesComponent
  },
  {
    path: "institutional-investor/our-funds/protector-fund",
    component: PagesComponent
  },
  {
    path: "institutional-investor/our-funds/bond-fund",
    component: PagesComponent
  },
  {
    path: "institutional-investor/our-funds/money-market-fund",
    component: PagesComponent
  },
  {
    path: "institutional-investor/our-funds/balanced-fund",
    component: PagesComponent
  },
  {
    path: "institutional-investor/our-funds/domestic-balanced-fund",
    component: PagesComponent
  },
  {
    path: "institutional-investor/our-funds/complete-fund-range",
    component: PagesComponent
  },

  {
    path: "institutional-investor/our-funds/global-balanced-fund",
    component: PagesComponent
  },
  {
    path: "pages/:slug",
    pathMatch: "full",
    component: PagesComponent
  },

  // { path: ":parent/:slug", pathMatch: "full", component: PagesComponent },
  {
    path: ":ID",
    pathMatch: "full",
    component: PagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
