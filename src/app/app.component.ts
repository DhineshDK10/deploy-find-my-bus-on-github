import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";
import { SelectItem } from "primeng/api";
import { SelectItemGroup } from "primeng/api";
import { FilterService } from "primeng/api";
import { CountryService } from "./countryservice";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CountryService, FilterService]
})

export class AppComponent {
  selectedCountryforsource: any;
  selectedCountryfordestination: any;
  selectedCountryforsourcechage: any;
  selectedCountryfordestinationchage: any;
  date9: Date | undefined;

  countries: any[] | []=[];

  filteredCountries1: any[] | []=[];
  filteredCountries2: any[] | []=[];

  selectedCountries: any[] | []=[];

  selectedCountryAdvanced: any[] | []=[];

  filteredBrands: any[] | []=[];

  groupedCities: SelectItemGroup[] | []=[];

  filteredGroups: any[] | []=[];
  showButtonBar: boolean = true;
  invalidDates: Array<Date> | undefined;
  minDate: Date | undefined;

    maxDate: Date | undefined;

    es: any;

  constructor(
    private countryService: CountryService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.countryService.getCountries().then(countries => {
      this.countries = countries;
    });

    this.groupedCities = [
      {
        label: "Germany",
        value: "de",
        items: [
          { label: "Berlin", value: "Berlin" },
          { label: "Frankfurt", value: "Frankfurt" },
          { label: "Hamburg", value: "Hamburg" },
          { label: "Munich", value: "Munich" }
        ]
      },
      {
        label: "USA",
        value: "us",
        items: [
          { label: "Chicago", value: "Chicago" },
          { label: "Los Angeles", value: "Los Angeles" },
          { label: "New York", value: "New York" },
          { label: "San Francisco", value: "San Francisco" }
        ]
      },
      {
        label: "Japan",
        value: "jp",
        items: [
          { label: "Kyoto", value: "Kyoto" },
          { label: "Osaka", value: "Osaka" },
          { label: "Tokyo", value: "Tokyo" },
          { label: "Yokohama", value: "Yokohama" }
        ]
      }
    ];
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = (month === 0) ? 11 : month -1;
  let prevYear = (prevMonth === 11) ? year - 1 : year;
  let nextMonth = (month === 11) ? 0 : month + 1;
  let nextYear = (nextMonth === 0) ? year + 1 : year;
  this.minDate = new Date();
  this.minDate.setMonth(prevMonth);
  this.minDate.setFullYear(prevYear);
  this.maxDate = new Date();
  this.maxDate.setMonth(nextMonth);
  this.maxDate.setFullYear(nextYear);

  let invalidDate = new Date();
  invalidDate.setDate(today.getDate() - 1);
  this.invalidDates = [today,invalidDate];
  }

  filterCountry(event: { query: any; }) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries1 = filtered;
    this.filteredCountries2 = filtered;
  }

  filterGroupedCity(event: { query: any; }) {
    let query = event.query;
    let filteredGroups = [];

    for (let optgroup of this.groupedCities) {
      let filteredSubOptions = this.filterService.filter(
        optgroup.items,
        ["label"],
        query,
        "contains"
      );
      if (filteredSubOptions && filteredSubOptions.length) {
        filteredGroups.push({
          label: optgroup.label,
          value: optgroup.value,
          items: filteredSubOptions
        });
      }
    }

    this.filteredGroups = filteredGroups;
  }
  selectedCountrychage(){
  //   selectedCountryforsource: any;
  // selectedCountryfordestination: any;
  // selectedCountryforsourcechage: any;
  // selectedCountryfordestinationchage: any;
  this.selectedCountryforsourcechage=this.selectedCountryforsource;
  this.selectedCountryfordestinationchage=this.selectedCountryfordestination;
  this.selectedCountryforsource=this.selectedCountryfordestinationchage;
  this.selectedCountryfordestination=this.selectedCountryforsourcechage;
  }
}
