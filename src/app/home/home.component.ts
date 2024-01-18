import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  public messageEnum = 0;

  ngOnInit(): void {
    this.obtenerId();
  }

  obtenerId() {
    this.route.queryParams.subscribe(params => {
      const messageEnum = params['messageEnum'];
      if (messageEnum) {
        // Hacer algo con el ID recibido
        this.messageEnum = messageEnum;
        console.log('ID recibido:', this.messageEnum);

        this.router.navigate([], { relativeTo: this.route, queryParams: { messageEnum: null }, queryParamsHandling: 'merge' });
      }
    });
  }

}
