import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  id = "";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    // this.id = this.cookieService.get('id');
    // let drawer: any = document.getElementById('drawer');

    // if (this.id == '' || this.id == null) {
    //   drawer.style.display = "none";
    // } else {
    //   drawer.style.display = "initial";
    // }
    // drawer.style.position = "absolute";
    // drawer.style.zIndex = "-50";
  }

  navigate(page: string): void {
    sessionStorage.setItem('page', page);
  }

  signOut() {
    this.cookieService.set('id', '');
    // location.reload();
  }
}
