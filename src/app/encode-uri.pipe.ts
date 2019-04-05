import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeURI'
})
export class EncodeURIPipe implements PipeTransform {

  transform(input: string) {
    return encodeURI(input);
  }
}
