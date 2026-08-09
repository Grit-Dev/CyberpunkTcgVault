import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss'
})
export class SiteHeader { }