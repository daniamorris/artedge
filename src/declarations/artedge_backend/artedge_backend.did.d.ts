import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Image {
  'key' : string,
  'pid' : string,
  'title' : string,
  'tags' : string,
  'description' : string,
  'likes' : string,
  'image' : string,
}
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
  'readImages' : ActorMethod<[string], [] | [Image]>,
  'readProfile' : ActorMethod<[string], [] | [Profile]>,
  'saveBatchUpload' : ActorMethod<[Image], undefined>,
  'updateProfile' : ActorMethod<[string, Profile], undefined>,
}
