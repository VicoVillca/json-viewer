import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonNode, OrganizedResult } from '../../../core/models/code-block.model';
import { messages } from '../../../core/constants/messages.constants';
import { JsonNodeComponent } from '../json-node/json-node.component';

@Component({
  selector: 'app-code-output',
  standalone: true,
  imports: [CommonModule, JsonNodeComponent],
  templateUrl: './code-output.component.html',
  styleUrls: ['./code-output.component.scss']
})
export class CodeOutputComponent implements OnChanges {
  @Input() result: OrganizedResult | null = null;
  
  parsedJson: any = null;
  jsonTree: JsonNode[] = [];
  message = messages;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['result'] && this.result?.organizedCode) {
      this.processJson();
    }
  }

  processJson() {
    if (!this.result?.organizedCode) return;

    try {
      this.parsedJson = JSON.parse(this.result.organizedCode);
      this.jsonTree = this.buildJsonTree(this.parsedJson);
    } catch (error) {
      this.parsedJson = null;
      this.jsonTree = [];
    }
  }

  buildJsonTree(obj: any, key: string = '', level: number = 0): JsonNode[] {
    const nodes: JsonNode[] = [];
    
    if (typeof obj === 'object' && obj !== null) {
      const isArray = Array.isArray(obj);
      const keys = Object.keys(obj);
      
      keys.forEach((k, index) => {
        const value = obj[k];
        const type = this.getType(value);
        
        const node: JsonNode = {
          key: isArray ? index.toString() : k,
          value: value,
          type: type,
          expanded: level < 2,
          level: level,
          children: undefined
        };

        if (type === 'object' || type === 'array') {
          node.children = this.buildJsonTree(value, k, level + 1);
        }
        
        nodes.push(node);
      });
    }
    
    return nodes;
  }

  getType(value: any): JsonNode['type'] {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return typeof value as any;
  }

  toggleNode(node: JsonNode) {
    if (node.type === 'object' || node.type === 'array') {
      node.expanded = !node.expanded;
    }
  }
}