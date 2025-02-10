'client side';

import { ContextMenuProps } from '@/types/contextMenu';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';

export default function ContextMenu(props: ContextMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth: menuWidth, offsetHeight: menuHeight } = containerRef.current;
      const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;

      let newX = props.x;
      let newY = props.y;

      if (props.x + menuWidth > viewportWidth) {
        newX = props.x - menuWidth;
      }

      if (props.y + menuHeight > viewportHeight) {
        newY = props.y - menuHeight;
      }

      containerRef.current.style.left = `${newX}px`;
      containerRef.current.style.top = `${newY}px`;
    }
  }, [props.x, props.y, props.show]);

  const activeElement = document.activeElement;

  const { theme } = useTheme();

  if (!props.show) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute z-[999] rounded-lg py-1 backdrop-blur-[60px] backdrop-brightness-90"
      style={{
        border: `1px solid ${theme === 'dark' ? '#666' : '#999'}`,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '5px',
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <ul className="flex flex-col">
        {props.items.map((item, index) => (
          <MenuButton
            onClick={() => {
              item.callback();
            }}
            setShow={props.setShow}
            key={index}
          >
            {item.name}
          </MenuButton>
        ))}
        <TextManipulationMenu menuProps={props} activeElement={activeElement} />
        <CustomItems menuProps={props} activeElement={activeElement} />
      </ul>
    </div>
  );
}

const TextManipulationMenu = ({
  menuProps,
  activeElement,
}: {
  menuProps: ContextMenuProps;
  activeElement: Element | null;
}) => {
  function getSelectionText() {
    let text = '';

    if (window.getSelection()) {
      text = window.getSelection()!.toString();
    }

    return text;
  }

  function isTextInput() {
    return !(
      !activeElement ||
      (activeElement as HTMLInputElement | HTMLTextAreaElement) === document.body ||
      (activeElement as HTMLInputElement | HTMLTextAreaElement).select === undefined
    );
  }

  return (
    <>
      <div className="mx-1 my-1 h-px bg-gray-600" />
      <MenuButton
        disabled={!isTextInput()}
        onClick={() => {
          (activeElement as HTMLInputElement | HTMLTextAreaElement).select();
        }}
        setShow={menuProps.setShow}
      >
        Select All
      </MenuButton>
      <MenuButton
        onClick={() => {
          document.execCommand('cut');
        }}
        setShow={menuProps.setShow}
        disabled={getSelectionText() === ''}
      >
        Cut
      </MenuButton>
      <MenuButton
        onClick={() => {
          navigator.clipboard.writeText(getSelectionText());
        }}
        setShow={menuProps.setShow}
        disabled={getSelectionText() === ''}
      >
        Copy
      </MenuButton>
      <MenuButton
        onClick={() => {
          navigator.clipboard.readText().then((text) => {
            const inputElement = activeElement as HTMLInputElement | HTMLTextAreaElement;

            if (inputElement) {
              document.execCommand('insertText', false, text);
            }
          });
        }}
        setShow={menuProps.setShow}
        disabled={!isTextInput()}
      >
        Paste
      </MenuButton>
    </>
  );
};

const CustomItems = ({
  menuProps,
}: {
  menuProps: ContextMenuProps;
  activeElement: Element | null;
}) => {
  if (menuProps.customItems.length === 0) {
    return null;
  }

  console.log(menuProps.customItems);

  return (
    <>
      <div className="mx-1 my-1 h-px bg-gray-600" />
      {menuProps.customItems.map((item) => (
        <MenuButton key={item.name} setShow={menuProps.setShow} onClick={item.callback}>
          {item.name}
        </MenuButton>
      ))}
    </>
  );
};

const MenuButton = (props: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  setShow: (show: boolean) => void;
}) => {
  const { theme } = useTheme();

  return (
    <button
      className="w-full px-4 py-1 text-start text-xs font-medium text-gray-700 disabled:font-light"
      onClick={() => {
        props.onClick();
        props.setShow(false);
      }}
      disabled={props.disabled}
      style={{
        color: props.disabled
          ? theme === 'dark'
            ? '#666'
            : '#999'
          : theme === 'dark'
            ? '#BBB'
            : '#666',
      }}
      onMouseEnter={(e) => {
        if (props.disabled) return;
        (e.target as HTMLButtonElement).style.color = theme === 'dark' ? 'white' : 'black';
      }}
      onMouseLeave={(e) => {
        if (props.disabled) return;
        (e.target as HTMLButtonElement).style.color = theme === 'dark' ? '#BBB' : '#666';
      }}
    >
      {props.children}
    </button>
  );
};
