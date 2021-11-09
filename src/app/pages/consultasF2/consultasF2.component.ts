import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'consultasF2-cmp',
    moduleId: module.id,
    templateUrl: 'consultasF2.component.html'
})

export class ConsultasF2 implements OnInit{
    
    appId: any;
    encrypt: any;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit(): void {
        this.spinner.show();
        this.appId = localStorage.getItem('appId');
        this.encrypt = localStorage.getItem('encrypt');

        this.http.get<any>('https://fcportaldes.femcom.net:8443//userapi/api/user/keys?appId=' + this.appId + '&encrypt=' + this.encrypt + '').subscribe(response => {
            console.log("todo ok")
            this.spinner.hide();
        }, err => {
            console.log("Error: ", err);
            //const dialogRef = this.dialog.open(DialogContentExampleDialog);
            this.spinner.hide();
            this.router.navigate(['/login']);
        });
    }

}
