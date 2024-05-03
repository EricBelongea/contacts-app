import { Component } from '@angular/core';
import { profileIconNames } from './profile-icon-names';

@Component({
  selector: 'con-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.css']
})
export class ProfileIconComponent {
  profileIcons = profileIconNames;
  showAllIcons: boolean = true;
  selectedIcon!: string | null

  iconSelected(icon: string) {
    this.showAllIcons = false;
    this.selectedIcon = icon;
  }
}
