import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct',
  standalone: true,
  pure: false
})
export class FilterProductPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '' || propName === '') {
      return value;
    }
    filterString = filterString.toLowerCase(); // make filter lowercase
  return value.filter((item:any) =>
    item && item[propName] &&
    item[propName].toLowerCase().includes(filterString) // partial match
  );
    // const resultArray = [];
    // for (const item of value) {
    //   if(item !== undefined){
    //     if (item[propName] === filterString) {
    //       resultArray.push(item);
    //     }
    //   }
    // }
    // return resultArray;
  }
}
