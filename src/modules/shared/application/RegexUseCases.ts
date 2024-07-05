import type {IRegexController} from "../models/controllers/RegexController.ts";

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
        return controller.validate(text)
    }
}