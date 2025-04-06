import type { IRegexController } from '@shared/models/controllers/RegexController';

//
// Class definition for PhoneRegex
//
export class EmailRegex implements IRegexController {
  //
  // Regexp for email validation
  //
  private regExp: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //
  // Validates an email
  // - text: string
  // - returns: boolean
  //
  validate(text: string): boolean {
    return this.regExp.test(text);
  }
}
