import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  public transform(value: any): any {
    const res = Object.keys(value).map(
      (key: string) => ({ key, value: value[key]})
    );
    return res;
  }

}
