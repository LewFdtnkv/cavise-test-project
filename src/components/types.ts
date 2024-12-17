export interface Button {
    text: string;
    link: string;
  }
  
  export interface Row {
    id: number;  
    buttons: Button[];
  }
  
  export interface PostData {
    title: string;
    content: string[];
    rows: Row[];
  }