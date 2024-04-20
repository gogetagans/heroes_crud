import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalletter',
  standalone: true,
  pure: true,
})
export class CapitalLetterPipe implements PipeTransform {
  transform(input: string): string {
    return input.length
      ? input.replace(
          /\w\S*/g,
          (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase()
        )
      : '';
  }
}
