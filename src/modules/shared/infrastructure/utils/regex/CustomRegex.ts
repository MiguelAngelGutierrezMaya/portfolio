import type { IRegexController } from '@shared/models/controllers/RegexController';

//
// Class definition for OnlyNumberLettersSpaceAndMin3Lenght
//
export class OnlyNumberLettersSpaceAndMin3Lenght implements IRegexController {
  //
  // Regexp for only numbers, letters, space and min 3 length
  //
  private regExp: RegExp = /^[a-zA-Z0-9\s]{3,}$/;

  //
  // Validates the text
  // - text: string
  // - returns: boolean
  //
  validate(text: string): boolean {
    return this.regExp.test(text);
  }
}

export class NotEmpty implements IRegexController {
  //
  // Regexp for not empty
  //
  private regExp: RegExp = /^.+/;

  //
  // Validates the text
  // - text: string
  // - returns: boolean
  //
  validate(text: string): boolean {
    return this.regExp.test(text);
  }
}
