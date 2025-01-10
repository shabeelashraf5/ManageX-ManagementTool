import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() customClass: string = '';
  @Input() type: string = '';
  @Input() disabled: boolean = false;
}
