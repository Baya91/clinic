import { Component } from '@angular/core';

import { Test02Component } from './test02/test02.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ Test02Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
