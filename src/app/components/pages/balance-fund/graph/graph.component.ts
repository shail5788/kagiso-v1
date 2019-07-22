import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  AfterViewInit
} from "@angular/core";
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
declare var $: JQueryStatic;

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"]
})
export class GraphComponent implements OnInit, OnDestroy {
  @Input() dataSet;
  graphData = [];
  innerdata = [];
  // data = [];
  dataObj = {
    month: null as string,
    value: null as number,
    value1: null as number
  };

  public options: any;
  private chart2: AmChart;
  private timer: any;

  constructor(private AmCharts: AmChartsService) {}
  makeDataSet() {
    const data = [];
    for (var i = 0; i < this.dataSet.dates.length; i++) {
      data.push({
        month: new Date(this.dataSet.dates[i]),
        value: +this.dataSet.benchMark[i],
        value1: +this.dataSet.fundReturn[i]
      });
    }
    data.sort(function(_a, _b) {
      const a: any = _a.month;
      const b: any = _b.month;
      return b - a;
    });
    return data;
  }

  makeOptions(dataProvider) {
    function getMonthNameByNum(pNum) {
      switch (pNum) {
        case 0:
          return "Jan";
          break;
        case 1:
          return "Feb";
          break;
        case 2:
          return "Mar";
          break;
        case 3:
          return "Apr";
          break;
        case 4:
          return "May";
          break;
        case 5:
          return "Jun";
          break;
        case 6:
          return "Jul";
          break;
        case 7:
          return "Aug";
          break;
        case 8:
          return "Sep";
          break;
        case 9:
          return "Oct";
          break;
        case 10:
          return "Nov";
          break;
        case 11:
          return "Dec";
          break;
        default:
          return "";
          break;
      }
    }
    return {
      type: "serial",
      theme: "light",
      marginTop: 0,
      marginRight: 0,
      dataProvider: dataProvider,
      valueAxes: [
        {
          id: "v1",
          position: "left"
        }
      ],
      graphs: [
        {
          id: "g1",
          balloonText:
            "<div style='font-size:14px; color:#333;'><strong><span style='color:#e2161a'>Fund Range</span> [[value]]</strong></div>",
          bullet: "round",
          bulletBorderAlpha: 1,
          bulletColor: "#FFFFFF",
          bulletSize: 5,
          hideBulletsCount: 50,
          lineThickness: 2,
          useLineColorForBulletBorder: true,
          valueField: "value"
        },
        {
          id: "g2",
          bullet: "round",
          balloonText:
            "<div style='font-size:14px; color:#333;'><strong><span style='color:#e2161a'>Bench Mark</span> [[value]]</strong></div>",
          bulletBorderAlpha: 1,
          bulletColor: "#a11c0d",
          bulletSize: 5,
          lineColor: "#e84835",
          hideBulletsCount: 50,
          lineThickness: 2,
          useLineColorForBulletBorder: true,
          valueField: "value1"
        }
      ],

      chartCursor: {
        cursorAlpha: 1,
        cursorColor: "#258cbb",
        valueLineAlpha: 0.1
      },
      categoryField: "month",
      categoryAxis: {
        parseDates: false,
        categoryFunction: function(category, dataItem, categoryAxis) {
          const m = getMonthNameByNum(dataItem.month.getMonth());
          return (
            "" +
            m +
            " " +
            dataItem.month.getDate() +
            ", " +
            dataItem.month.getFullYear()
          );
        },
        labelFunction: function(valueText, serialDataItem, categoryAxis) {
          return (
            "" + parseInt(serialDataItem.dataContext.month.getFullYear(), 10)
          );
        },
        showFirstLabel: false,
        startOnAxis: false,
        equalSpacing: true
      },
      /*
	  categoryAxesSettings: {
		minPeriod: "yyyy",
		autoGridCount: false,
		equalSpacing: true,
		gridCount: 1000,
		labelRotation: 90, //recommended if you have a lot of labels
		axisHeight: 50  //recommended to avoid overlap with the scrollbar
	  },*/
      export: {
        enabled: true
      }
    };
  }
  ngOnInit() {
    // Create chartdiv1

    if (this.makeDataSet()) {
      this.options = this.makeOptions(this.makeDataSet());

      // Create chartdiv2
      this.chart2 = this.AmCharts.makeChart(
        "chartdiv2",
        this.makeOptions(this.makeDataSet())
      );
    }
  }

  ngOnDestroy() {
    if (this.chart2) {
      this.AmCharts.destroyChart(this.chart2);
    }
  }
}
