import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'get' : ActorMethod<[], bigint>,
  'greet' : ActorMethod<[], string>,
  'greet2' : ActorMethod<[], string>,
  'inc' : ActorMethod<[], undefined>,
  'set' : ActorMethod<[bigint], undefined>,
}
