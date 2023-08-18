import { NextFunction, Request, Response } from 'express';
import { CreateGroupDto } from '../dto/groups.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

const TEMP_USER_ID = '64dc65801ded8e6a83b9d760';

export const handleDtoValidate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createGruopDto = plainToClass(CreateGroupDto, req.body);
  validate(createGruopDto).then((errors) => {
    if (errors.length > 0) {
      console.error(errors);
    } else {
      console.log('Validation passed');
    }
  });

  req.body = createGruopDto;

  next();
};
