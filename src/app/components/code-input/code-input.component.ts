import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { labels } from '../../../core/constants/labels.constants';
import { messages } from '../../../core/constants/messages.constants';
import { JSON_EXAMPLE_EXTREMO } from '../../../core/constants/json-examples.constants';

@Component({
  selector: 'app-code-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss']
})
export class CodeInputComponent {

  @Input() code: string = '';
  @Output() codeChange = new EventEmitter<string>();
  @Output() limpiarPanel = new EventEmitter<string>();

  label = labels;
  message = messages;

  constructor() { }

  organizarCodigo() {
    this.codeChange.emit(this.code);
  }

  limpiarFormulario() {
    this.code = "";
    this.limpiarPanel.emit();
  }

  cargarEjemplo() {
    this.code = JSON_EXAMPLE_EXTREMO;
  }
}