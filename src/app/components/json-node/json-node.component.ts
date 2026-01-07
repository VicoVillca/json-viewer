import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonNode } from '../../../core/models/code-block.model';

@Component({
  selector: 'app-json-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './json-node.component.html',
  styleUrls: ['./json-node.component.scss']
})
export class JsonNodeComponent {
  @Input() node!: JsonNode;
  @Output() toggle = new EventEmitter<void>();

  toggleNode() {
    if (this.node.type === 'object' || this.node.type === 'array') {
      this.toggle.emit();
    }
  }

  onChildToggle(child: JsonNode) {
    this.toggle.emit();
  }
}