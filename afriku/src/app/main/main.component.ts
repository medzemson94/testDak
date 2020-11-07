import { Component, OnInit } from '@angular/core';
import {Langues } from '../models/langues';
import { LangueServicesService} from '../services/langue-services.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
   langue = new Langues();
   langues: any;
   idlangue: any;
   nombreLangue = 0;
   bloquer : boolean;
  constructor( private langueService: LangueServicesService) {
  }

  ngOnInit(): void {
    this.langueService.getAll()
    .subscribe((result: any) => {
    this.langues = result;
    console.log(this.langues);
    this.nombreLangue = this.langues.length;
    if ( this.langues.length === 3){
        this.bloquer = true;
     }
   });
  }

  getall(): void
  {
    this.langueService.getAll()
    .subscribe((result: any) => {
    this.langues = result;
    console.log(this.langues);
    this.nombreLangue = this.langues.length;
   });
  }
   createLanguage(): any{
     console.log(this.langue.nom);
     console.log(this.langue);
     this.langueService.createLangue(this.langue)
      .subscribe(
          (data: any) => {
             console.log(data);
             this.langueService.getAll()
              .subscribe((result: any) => {
              this.langues = result;
              console.log(this.langues);
              this.nombreLangue = this.langues.length;
              if (this.langues.length === 3)
              {
                  this.bloquer = true;
              }
             });
          });
   }

   getOneLanguage(langue: any): any{
       var langueCliquer = this.langues.filter( result => result._id === langue._id);
       console.log(langueCliquer);
       this.langue = langueCliquer[0];
       console.log(this.langue);
    }
  
   updateLanguage(): any{
          this.langueService.update(this.langue, this.idlangue).subscribe((result: any) => {
           console.log(result);
     });
   }
   deleteLanguage(identi: any): any{
     console.log(identi);
     this.idlangue = identi;
     swal({
      title: 'Supprimer Le langage?',
      icon: 'warning',
      buttons:  true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.bloquer = false;
        this.langueService.delete(this.idlangue).subscribe((result: any) => {
          console.log(result);
          swal('Poof! Supprimer', {
            icon: 'success',
          });
    });
        this.getall();
      } else {
        swal('Votre action a ete annuler!');
      }
    });
    /* this.langueService.delete(this.langue, this.idlangue).subscribe((result: any) => {
          console.log(result);
    });
  } */
}
}
