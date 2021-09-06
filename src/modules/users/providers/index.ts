import { container } from 'tsyringe';

import IHashProvider from './hashProvider/models/IHasProvider';
import BCryptHashProvider from './hashProvider/implementations/BCryptHashProvider';

container.registerInstance<IHashProvider>(
  'HashProvider',
  new BCryptHashProvider()
);
