export class EditorState {
  content = '';
  selection = new Range(0,0);
  searchFor = '';
  matches : Range[];
}

export class Range {
  constructor(public start: number, public end : number){}
}
