import { Component, Provider, forwardRef } from '@angular/core';
import { profileIconNames } from './profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PROFILE_ICON_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconComponent),
  multi: true,
}

@Component({
  selector: 'con-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.css'],
  providers: [PROFILE_ICON_VALUE_ACCESSOR],
})
export class ProfileIconComponent implements ControlValueAccessor{
  profileIcons = profileIconNames;
  showAllIcons: boolean = true;
  selectedIcon!: string | null

  private onChange!: Function;
  private onTouched!: Function;

  writeValue(icon: string | null) {
    this.selectedIcon = icon;
    if (icon && icon !== '')
      this.showAllIcons = false;
    else
    this.showAllIcons = true;
  }

  registerOnChange(fn: Function){
    this.onChange = (icon: string) => { fn(icon); };
  }

  registerOnTouched(fn: Function){
    this.onTouched = fn;
  }

  iconSelected(icon: string) {
    this.showAllIcons = false;
    this.selectedIcon = icon;
    this.onChange(icon);
  }
}
