import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { CodeInputComponent } from "../../components/code-input/code-input.component";
import { CodeOutputComponent } from "../../components/code-output/code-output.component";
import { Toast } from "primeng/toast";
import { MessageService } from "primeng/api";
import { JavaValidatorService } from "../../../core/services/java-validator.service";
import { labels } from "../../../core/constants/labels.constants";
import { messages } from "../../../core/constants/messages.constants";
import { JsonNodeComponent } from "../../components/json-node/json-node.component";

@Component({
  selector: "app-organizer-page",
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    CodeInputComponent,
    CodeOutputComponent,
    Toast,
  ],
  templateUrl: "./organizer-page.component.html",
  styleUrls: ["./organizer-page.component.scss"],
})
export class OrganizerPageComponent {
  result: any;
  isProcessing: boolean = false;
  inputCode: string = "";

  delimitadores = [
    { inicio: '"""', fin: '"""', tipo: "triple" },
    { inicio: "'", fin: "'", tipo: "char" },
    { inicio: '"', fin: '"', tipo: "string" },
    { inicio: "//", fin: "\n", tipo: "comentario_linea" },
    { inicio: "/*", fin: "*/", tipo: "comentario_bloque" },
  ];

  label = labels;
  message = messages;

  constructor(
    private messageService: MessageService,
    private javaValidatorService: JavaValidatorService
  ) {}

  onCodeChange(codigo: string) {
    this.inputCode = codigo;
    this.organizeCode();
  }

  limpiarPanel() {
    this.result = null;
  }

  organizeCode() {
    console.log(this.inputCode);
    if (!this.isValidJson(this.inputCode)) {
      this.viewMessage("error", "Error de Compilación", messages.invalidCode);
      this.result = null;
      return;
    }
    
    if (!this.inputCode.trim()) {
      this.result = null;
      this.viewMessage("error", "Código vacío", messages.emptyCode);
      return;
    }

    this.isProcessing = true;

    this.result = {
      organizedCode: this.inputCode,
      stats: {
        processingTime: 450,
        linesReduced: 5,
      },
    };
    this.viewMessage("success", messages.codeOrganized, "");
  }

  isValidJson(jsonString: string): boolean {
    if (!jsonString || jsonString.trim() === '') {
      return false;
    }
    
    try {
      const parsed = JSON.parse(jsonString);
      return parsed !== undefined;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  viewMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000,
    });
  }
}
