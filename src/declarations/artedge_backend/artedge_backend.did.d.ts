import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Profile {
  'username' : string,
  'alias' : string,
  'interests' : string,
  'email' : string,
  'genre' : string,
  'userPrincipal' : Principal,
  'artState' : string,
}
export interface _SERVICE {
  'createCounter' : ActorMethod<[], undefined>,
  'createProfile' : ActorMethod<[Profile], string>,
  'createUpload' : ActorMethod<[], undefined>,
  'deleteProPrinc' : ActorMethod<[string], undefined>,
  'deleteProfile' : ActorMethod<[string], [] | [Profile]>,
  'getCaller' : ActorMethod<[], string>,
  'greet' : ActorMethod<[], string>,
  'hasProfile' : ActorMethod<[Principal], string>,
  'listProfiles' : ActorMethod<[], string>,
  'readProfile' : ActorMethod<[string], [] | [Profile]>,
  'updateProfile' : ActorMethod<[string, Profile], undefined>,
}
