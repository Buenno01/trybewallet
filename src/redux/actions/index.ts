const actionCreator = (type:string, payload:any) => {
  return {
    type,
    payload,
  };
};

export const loginAction = (email:string) => actionCreator('LOGIN', email);
