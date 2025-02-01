import { create } from "zustand";

interface FileStore {
  selectedFileId: string | null;
  selectedFileName: string | null;
  isFileSystemUpdated: boolean;
  setSelectedFileId: (fileId: string | null) => void;
  setSelectedFileName: (fileName: string | null) => void;
  setIsFileSystemUpdated: () => void;
}

export const useFileStore = create<FileStore>((set) => ({
  selectedFileId: null,
  selectedFileName: null,
  isFileSystemUpdated: false,
  setSelectedFileId: (fileId) => set({ selectedFileId: fileId }),
  setSelectedFileName: (fileName) => set({ selectedFileName: fileName }),
  setIsFileSystemUpdated: () =>
    set((state) => ({ isFileSystemUpdated: !state.isFileSystemUpdated })),
}));
