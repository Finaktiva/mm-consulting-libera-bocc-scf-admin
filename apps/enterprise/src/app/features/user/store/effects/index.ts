import { CreateUserEffects } from './create.effects';
import { UserListEffects } from './list.effects';
import { UserEffects } from './user.effects';

export const userEffects = [UserListEffects, UserEffects, CreateUserEffects];
