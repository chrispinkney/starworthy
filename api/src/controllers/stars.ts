import findAll from '~/services/db';
import stars from '~/services/stars';

export const starsController = (): Promise<string> => stars();

export const ping = () => findAll();
