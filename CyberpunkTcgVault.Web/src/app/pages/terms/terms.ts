import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terms.html',
  // Reuse the approved Privacy document structure rather than creating a
  // second legal-page layout system for a single public trust document.
  styleUrls: [
    '../privacy/privacy.scss',
    './terms.scss'
  ]
})
export class Terms {}
