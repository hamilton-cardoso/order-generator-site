import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from './layout/menu/menu.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MenuComponent) menuComponent!: MenuComponent;

  toggleSidenav(): void {
    this.menuComponent.sidenav.toggle();
  }
}
