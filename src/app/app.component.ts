import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WeatherService } from './weather.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [WeatherService],
})
export class AppComponent implements OnInit, OnDestroy {
  countries = [
    {
      name: 'United Kingdom',
      cities: ['London', 'Warwick', 'Birmingham'],
    },
    {
      name: 'United States',
      cities: ['New York', 'Chicago', 'Washington'],
    },
    {
      name: 'Australia',
      cities: ['Sydney', 'Adelaide', 'Melbourne'],
    },
    {
      name: 'Pakistan',
      cities: ['Lahore', 'Karachi', 'Islamabad'],
    },
  ];
  countrycontrol: FormControl;
  cityControl: FormControl;
  cities$: Observable<string>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cityControl = new FormControl('');
    this.cityControl.valueChanges.subscribe((value) => {
      this.router.navigate([value]);
    });
    this.countrycontrol = new FormControl('');

    this.cities$ = this.countrycontrol.valueChanges.pipe(
      map((country: { cities: any }) => country.cities)
    );
  }
  ngOnDestroy() {}
}
