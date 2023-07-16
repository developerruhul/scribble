import { create } from 'zustand';

interface PageLoadStore {
  pageLoading?: boolean;
  changePageLoadState: (value: boolean) => void;
}

export const usePageLoadStore = create<PageLoadStore>()((set) => ({
  pageLoading: true,
  changePageLoadState: (value: boolean) => set({ pageLoading: value }),
}));
