export const menuInit = {
  menu: 'rooms',
  modal: null,
};

export const createMeunSlice = set => ({
  ...menuInit,
  setMenu: menu => set({ menu }),
  setModal: modal => set({ modal }),
  closeModal: () => set({ modal: null }),
});
