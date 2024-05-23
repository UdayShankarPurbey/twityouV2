import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService {

  constructor() { }

  errorMsgDisp( data : string ) : string {
    console.log(data);
    const match = /<pre>(.*?)<\/pre>/s.exec(data);
    
    if (match && match[1]) {
        const preContent = match[1];
        const errorMessageRegex = /Error:\s*(.*?)<br>/;
        const errorMatch = errorMessageRegex.exec(preContent);
        
        if (errorMatch && errorMatch[1]) {
            const errorMessage = errorMatch[1];
            return errorMessage;
        }
    }
    
    return "Error message not found";
  }
}