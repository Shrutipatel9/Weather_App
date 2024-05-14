import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, filter, map, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-weather-report',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './weather-report.component.html',
  styleUrl: './weather-report.component.scss',
})
export class WeatherReportComponent implements OnInit {
  data$: Observable<any>;
  today: Date = new Date();
  loading: boolean;
  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      map((params) => params['locationName']),
      filter((name) => !!name),
      tap(() => (this.loading = true)),
      concatMap((name) => this.weatherService.getWeatherForCity(name)),
      tap(() => {
        this.loading = false;
      })
    );
  }
}
