import { createSlice } from "@reduxjs/toolkit";

const initialContextMenuSlice = {
  showContextMenu: {},
  contextMenuPosition: {},
  contextMenuData: { nodeId: null, nodeName: null },
};

console.log('menuslice')

// This is Context Menu Slice.
// It consist functions for manipulating, storing the Context Menu data.
const ContextMenuSlice = createSlice({
  name: "contextMenu",
  initialState: initialContextMenuSlice,
  reducers: {
    setVisibility(state, visibility) {
      state.showContextMenu = visibility.payload;
    },
    setPosition(state, position) {
      state.contextMenuPosition = position.payload;
    },
    setData(state, data) {
      state.contextMenuData = data.payload;
    },
  },
});

export const contextMenuActions = ContextMenuSlice.actions;
export default ContextMenuSlice.reducer;
