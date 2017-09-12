import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Range} from "./editor.state";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  editorForm : FormGroup;

  constructor(private fb: FormBuilder){
    this.createForm();
  }

  createForm(){
    this.editorForm = this.fb.group({
      editor: '',
      selection: this.fb.group(new Range(0,0)) // <-- the child FormGroup
    });
  }

  onButtonSelect(textArea : HTMLTextAreaElement) {
    let start = this.editorForm.get('selection.start').value;
    let end = this.editorForm.get('selection.end').value;
    setTimeout(() => {
      textArea.focus();
      textArea.selectionStart = start;
      textArea.selectionEnd = end;
    });
  }

  onEditorSelect(event : UIEvent) {
    this.updateSelectionFormGroup(event);
  }

  onEditorClick(event : MouseEvent) {
   this.updateSelectionFormGroup(event);
  }

  onEditorKeyup(event : MouseEvent){
    this.updateSelectionFormGroup(event);
  }

  updateSelectionFormGroup(event : Event) {
    if(event.srcElement instanceof HTMLTextAreaElement) {
      let textAreaElement = event.srcElement as HTMLTextAreaElement;
      this.editorForm.patchValue({
        selection : new Range(textAreaElement.selectionStart, textAreaElement.selectionEnd)
      })
    }
  }

}
