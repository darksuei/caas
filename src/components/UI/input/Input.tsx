import React, { useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./Input.module.scss";

interface formDataType {
  name: string;
  email: string;
  password: string;
}

interface Props {
  id: string;
  type: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  classes?: string;
  value?: string;
  ref?: HTMLInputElement;
  readonly?: boolean;
  autocomplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  isRequired?: boolean;
  setFormData?: React.Dispatch<React.SetStateAction<formDataType>>;
}

interface IImperativeHandler {
  focus: () => void;
  value?: string;
}
const Input = React.forwardRef<IImperativeHandler, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(props.value || "");

  function inputChangeHandler(e: any) {
    setValue(e.currentTarget.value);
    if (props.setFormData) {
      props.setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  }

  function inputFocused() {
    inputRef.current?.focus();
    inputRef.current?.setAttribute("style", "border:2px solid red");
  }

  useImperativeHandle(ref, () => {
    return {
      focus: inputFocused,
      value: value,
    };
  });

  const { t } = useTranslation();
  return (
    <div className={`${classes.form__control} ${props.classes}`}>
      <label htmlFor={props.id}>{t(`${props.id}`)}</label>
      <input
        ref={inputRef}
        id={props.id}
        minLength={props.minLength}
        maxLength={props.maxLength}
        type={props.type}
        placeholder={props.placeholder}
        value={value}
        readOnly={props.readonly || false}
        onChange={props.onChange || inputChangeHandler}
        autoComplete={props.autocomplete || "off"}
        name={props.name}
        {...(props.isRequired ? { required: true } : {})}
      />
    </div>
  );
});

export default Input;
