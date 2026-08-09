import { Component } from '@angular/core';
import { SiteFooter } from '../../shared/layout/site-footer/site-footer';
import { SiteHeader } from '../../shared/layout/site-header/site-header';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    SiteHeader,
    SiteFooter
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact { }