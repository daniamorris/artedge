export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'greet' : IDL.Func([], [IDL.Text], ['query']),
    'greet2' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
