import React, { forwardRef } from "react";
export type Ref = HTMLTextAreaElement|HTMLInputElement|null;

const TextInput = forwardRef<Ref, { value: string, onChange(v: string): void, textArea?: boolean }>((props, ref) => {

  // function TextInput(props: { value: string, onChange(v: string): void, textArea?: boolean, ref?: }) {
  if (props.textArea) {
    return <textarea
      ref={ref}
      value={props.value}
      className="w-full p-2 border-2 border-gray-100 h-64
     hover:border-gray-300 focus:border-gray-500 rounded-lg my-2 outline-none
     transition-all"
      onChange={(e) => props.onChange(e.target.value)} />;
  }
  return <input
    ref={ref}
    className="w-full p-2 border-2 border-gray-100
     hover:border-gray-300 focus:border-gray-500 rounded-lg my-2 outline-none
     transition-all"
    value={props.value}
    onChange={e => props.onChange(e.target.value)}
  />
});

export default TextInput;