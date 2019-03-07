const BadOption = require('../ExceptionsHandler/BadOption');

class MaskHelper {

  static mapWithDefaultValues(options, defaultOptions) {
    for(let key of Object.keys(defaultOptions)) {
      if(!options[key] || options[key].toString().trim().length == 0) {
        options[key] = defaultOptions[key];
      }
    }
    return options;
  }

  static validatePasswordOptions(options) {
    let reasons = [];
    try{
      options.maxMaskedCharacters = parseInt(options.maxMaskedCharacters);
      if(isNaN(options.maxMaskedCharacters)){
        throw Error();
      };
    }catch(err) {
      reasons.push('maxMaskedCharacters must be positive integer');
    }
    if(options.maxMaskedCharacters < 0) {
      options.maxMaskedCharacters = 0;
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('Password mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }

  static validatePhoneOptions(options) {
    let reasons = [];
    try{
      options.unmaskedStartDigits = parseInt(options.unmaskedStartDigits);
      options.unmaskedEndDigits = parseInt(options.unmaskedEndDigits);
      if(isNaN(options.unmaskedStartDigits) || isNaN(options.unmaskedEndDigits)){
        throw Error();
      };
    }catch(err) {
      reasons.push('unmaskedStartDigits and unmaskedEndDigits must be positive integers');
    }
    if(options.unmaskedStartDigits < 0) {
      options.unmaskedStartDigits = 0;
    }
    if(options.unmaskedEndDigits < 0) {
      options.unmaskedEndDigits = 0;
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('Phone mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }

  static validateEmailOptions(email, options) {
    let reasons = [];
    if(!email || email.indexOf('@') < 0) {
      reasons.push(`Email must contain one '@'`);
    }
    try{
      options.unmaskedStartCharacters = parseInt(options.unmaskedStartCharacters);
      options.unmaskedEndCharacters = parseInt(options.unmaskedEndCharacters);
      options.maxMaskedCharactersBeforeAtTheRate = parseInt(options.maxMaskedCharactersBeforeAtTheRate);
      options.maxMaskedCharactersAfterAtTheRate = parseInt(options.maxMaskedCharactersAfterAtTheRate);
      if(isNaN(options.unmaskedStartCharacters) || isNaN(options.unmaskedEndCharacters) ||
        isNaN(options.maxMaskedCharactersBeforeAtTheRate) || isNaN(options.maxMaskedCharactersAfterAtTheRate)){
        throw Error();
      };
    }catch(err) {
      reasons.push('unmaskedStartCharacters, unmaskedEndCharacters, maxMaskedCharactersBeforeAtTheRate and maxMaskedCharactersAfterAtTheRate must be positive integers');
    }
    if(options.unmaskedStartCharacters < 0) {
      options.unmaskedStartCharacters = 0;
    }
    if(options.unmaskedEndCharacters < 0) {
      options.unmaskedEndCharacters = 0;
    }
    if(options.maxMaskedCharactersBeforeAtTheRate < 0) {
      options.maxMaskedCharactersBeforeAtTheRate = 20;
    }
    if(options.maxMaskedCharactersAfterAtTheRate < 0) {
      options.maxMaskedCharactersAfterAtTheRate = 20;
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(typeof(options.maskAtTheRate) !== 'boolean') {
      reasons.push('maskAtTheRate should be a boolean field');
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('Email mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }

  static validateJSONOptions(options) {
    let reasons = [];
    if(!(options.fields instanceof Array)) {
      reasons.push(`fields should be an Array`);
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('JSON mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }

  static validateStringOptions(options) {
    let reasons = [];
    if(!(options.values instanceof Array)) {
      reasons.push(`values should be an Array`);
    }
    if(typeof(options.maskOnlyFirstOccurance) !== 'boolean') {
      reasons.push('maskOnlyFirstOccurance should be a boolean field');
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('string mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }
}

module.exports = MaskHelper;