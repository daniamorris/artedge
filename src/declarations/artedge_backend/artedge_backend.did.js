export const idlFactory = ({ IDL }) => {
  const Profile = IDL.Record({
    'username' : IDL.Text,
    'alias' : IDL.Text,
    'interests' : IDL.Text,
    'email' : IDL.Text,
    'genre' : IDL.Text,
    'userPrincipal' : IDL.Principal,
    'artState' : IDL.Text,
  });
  const Image = IDL.Record({
    'key' : IDL.Text,
    'pid' : IDL.Text,
    'title' : IDL.Text,
    'tags' : IDL.Text,
    'description' : IDL.Text,
    'likes' : IDL.Text,
    'image' : IDL.Text,
  });
  return IDL.Service({
    'createCounter' : IDL.Func([], [], []),
    'createProfile' : IDL.Func([Profile], [IDL.Text], []),
    'createUpload' : IDL.Func([], [], []),
    'deleteProPrinc' : IDL.Func([IDL.Text], [], []),
    'deleteProfile' : IDL.Func([IDL.Text], [IDL.Opt(Profile)], []),
    'getCaller' : IDL.Func([], [IDL.Text], ['query']),
    'greet' : IDL.Func([], [IDL.Text], ['query']),
    'hasProfile' : IDL.Func([IDL.Principal], [IDL.Text], ['query']),
    'listProfiles' : IDL.Func([], [IDL.Text], []),
    'readImages' : IDL.Func([IDL.Text], [IDL.Opt(Image)], ['query']),
    'readProfile' : IDL.Func([IDL.Text], [IDL.Opt(Profile)], ['query']),
    'saveBatchUpload' : IDL.Func([Image], [], []),
    'updateProfile' : IDL.Func([IDL.Text, Profile], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
