import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss'
})
export class SiteFooter {}