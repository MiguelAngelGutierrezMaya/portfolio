import type { IRegexController } from '@shared/models/controllers/RegexController';

//
// Use cases Regex
//
export class RegexUseCases {
  //
  // Use case: Validate
  // @params controller: IRegexController
  // @params text: string
  // @return boolean
  //
  static validate(controller: IRegexController, text: string): boolean {
    return controller.validate(text);
  }
}
