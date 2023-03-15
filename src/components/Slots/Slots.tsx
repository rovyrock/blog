import React, { useContext, useMemo, ReactNode, ReactPropTypes } from 'react'
import { mergeProps } from '@react-aria/utils';

// import {jsx as _jsx} from 'react/jsx-runtime';

export type HTMLTag = keyof JSX.IntrinsicElements & keyof HTMLElementTagNameMap;
export type SlotProps = {
  slot?: string;
};
export type OmitNonPrimitive<P> = Pick<P, {
  [K in keyof P]: P[K] extends boolean | number | string | undefined ? K : never;
}[keyof P]>;
export type ToSlotProps<P> = Partial<P> & {
  elementType?: HTMLTag;
};
export type SlotContextType = {
  [key: string]: any;
};
export type ProviderProps<P = unknown> = {
  children: ReactNode;
} & P;
export type SlotProviderProps = ProviderProps<{
  slots: SlotContextType;
}>;

let SlotContext = React.createContext({})

function useSlotProps<P extends {
  id?: string;
}>(props: P, defaultSlot: string): SlotProviderProps {
  let slot = props.slot || defaultSlot;
  let {
    [slot]: slotProps = {}
  } = useContext(SlotContext);
  return mergeProps(props, mergeProps(slotProps, {
    id: props.id
  }));
}

const SlotProvider = (props: SlotProviderProps) => {
  let {
    children,
    slots
  } = props;
  let parentSlots: SlotContextType = useContext(SlotContext);

  // Merge props for each slot from parent context and props
  let value = useMemo(() => Object.keys(parentSlots).concat(Object.keys(slots)).reduce((obj, key) => ({
    ...obj,
    [key]: mergeProps(parentSlots[key], slots[key])
  }), {}), [parentSlots, slots]);
  return /*#__PURE__*/React.createElement(SlotContext.Provider, {
    value: value,
    children: children
  });
};

export default function Slots() {
  return <div>Slots is a awesome component</div>
}


export { SlotProvider, useSlotProps }