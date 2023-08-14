export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'get' : IDL.Func([], [IDL.Nat], ['query']),
    'greet' : IDL.Func([], [IDL.Text], ['query']),
    'greet2' : IDL.Func([], [IDL.Text], ['query']),
    'inc' : IDL.Func([], [], []),
    'set' : IDL.Func([IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
