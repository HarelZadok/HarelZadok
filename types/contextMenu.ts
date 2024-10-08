export interface Item {
  name: string;
  callback: () => void;
}

export interface ContextMenuProps {
  show: boolean;
  setShow: (show: boolean) => void;
  items: Item[];
  customItems: Item[];
  x: number;
  y: number;
}
