import * as Joi from 'joi';
//import Joi from 'joi';
// tuve que cambiar la forma que se mostro en el curso, ya que daba
// error en la ejecucion de la terminal
export const joiValidationSchema = Joi.object({
MONGODB : Joi.string().required (),
PORT : Joi.number().default(3005),
DEFAULT_LIMIT : Joi.number().default(6),
});