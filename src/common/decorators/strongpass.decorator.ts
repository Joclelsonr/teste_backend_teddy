import { Matches, MinLength } from 'class-validator';

export function IsStrongPassword(): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    MinLength(8)(target, propertyKey as string);
    Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
      message:
        'Password is too weak, it must contain at least one number, one capital letter, one lowercase letter and one special character.',
    })(target, propertyKey);
  };
}
