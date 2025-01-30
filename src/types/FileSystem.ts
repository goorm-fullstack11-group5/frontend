export type FileSystemItem = File | Folder;

export interface File {
  type: "file";
  name: string;
  path: string;
}

export interface Folder {
  type: "folder";
  name: string;
  path: string;
  children: FileSystemItem[];
}
