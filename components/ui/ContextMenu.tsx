'client side';

import { ContextMenuProps } from '@/types/contextMenu';
import React from 'react';

export default function ContextMenu(props: ContextMenuProps) {
  if (!props.show) {
    return null;
  }

  const { x, y } = props;

  function getSelectionText() {
    let text = '';

    if (window.getSelection()) {
      text = window.getSelection()!.toString();
    }

    return text;
  }

  return (
    <div
      className={`absolute z-[999] rounded-lg py-1 backdrop-blur-3xl backdrop-brightness-75`}
      style={{ top: y, left: x }}
    >
      <ul className="flex flex-col">
        {props.items.map((item, index) => (
          <button
            onClick={() => {
              item.callback();
              props.setShow(false);
            }}
            key={index}
            className="w-full px-4 py-1 text-start text-xs"
          >
            {item.name}
          </button>
        ))}
        {getSelectionText().length > 0 && (
          <>
            <div className="mx-1 my-1 h-px bg-gray-600" />
            <button
              onClick={() => {
                navigator.clipboard.writeText(getSelectionText());
                props.setShow(false);
              }}
              className="w-full px-4 py-1 text-start text-xs"
            >
              Copy
            </button>
          </>
        )}
        {(document.activeElement instanceof HTMLInputElement ||
          document.activeElement instanceof HTMLTextAreaElement) && (
          <>
            <div className="mx-1 my-1 h-px bg-gray-600" />
            <button
              onClick={() => {
                (document.activeElement as HTMLInputElement | HTMLTextAreaElement).select();
                props.setShow(false);
              }}
              className="w-full px-4 py-1 text-start text-xs"
            >
              Select All
            </button>
          </>
        )}
      </ul>
    </div>
  );
}
