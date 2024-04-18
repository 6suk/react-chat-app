export const authInit = {
  authUser: null,
};

export const createAuthSlice = (set, get) => ({
  ...authInit,
  setAuthUser: authUser => set({ authUser }),
});
