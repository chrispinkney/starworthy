import findAll from '../services/db';
import stars from '../services/stars';

export const starsController = (): Promise<string | undefined> => stars();

export const ping = () => findAll();
