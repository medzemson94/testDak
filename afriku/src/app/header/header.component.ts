import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Langues } from '../models/langues';
import { LangueServicesService } from '../services/langue-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private langueService: LangueServicesService) { }
  langues: any;
  langue = new Langues();
  ngOnInit(): void {
     this.langueService.getAll().subscribe((data: any) => {
          this.langues = data;
     });
    }
  buttonNamehange(): void{
    $('#clickModal').html('modal Opened');
    $('#open').removeClass('btn-dark');
    $('#open').addClass('btn-success');
  }
  setClick(langue: any): void{
    this.langue = langue;
    console.log(this.langue);
    $('#langue').html(langue.nom);
    }
  modalClosed(): void{
      $('#clickModal').html('Modal Closed');
      $('#open').removeClass('btn-success');
      $('#open').addClass('btn-dark');
  }
}
