import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteFooter } from '../../shared/layout/site-footer/site-footer';
import { SiteHeader } from '../../shared/layout/site-header/site-header';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    SiteHeader,
    SiteFooter
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About { }