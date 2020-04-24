import {Questionary} from "../questions/questionContainer";

export interface FormDefinition {
  questionary: Questionary;
  pdfFormName: string,
  mapping: {
    [key: string]: ((context: any) => string) | string
  }
}


export class Form {
  public constructor(private definition: FormDefinition) {
  }

  public build() {
    // buf =

    // const filledPdf = pdfform().transform(buf, fields);
  }

  private download(data, filename, type) {
    const file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
    {
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
      const a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }
}
