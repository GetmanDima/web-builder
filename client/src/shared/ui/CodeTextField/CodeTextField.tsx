import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Modal, TextField, TextFieldProps } from "@shared/ui";

export interface CodeTextFieldProps extends TextFieldProps {
  lang?: string
}

export const CodeTextField = ({
  value,
  lang = 'javascript',
  onChangeValue,
  ...props
}: CodeTextFieldProps) => {
  const [currValue, setCurrValue] = useState("");
  const [listVisible, setListVisible] = useState(false);

  useEffect(() => {
    if (value) {
      setCurrValue(value);
    }
  }, [value])

  function changeValue(v: string) {
    setCurrValue(v);
    onChangeValue && onChangeValue(v);
  }

  return (
    <div className='relative flex items-center'>
      <TextField
        value={currValue}
        className='pr-[40px]'
        onChangeValue={changeValue}
        {...props}
      />
      <FullscreenIcon
        className='cursor-pointer absolute right-[10px]'
        style={{ fill: "white" }}
        onClick={() => setListVisible(true)}
      />
      <Modal
        visible={listVisible}
        title='Редактирование'
        className='w-[800px] h-[90vh]'
        closeModal={() => setListVisible(false)}
      >
        <Editor
          theme="vs-dark"
          height='calc(90vh - 80px)'
          language={lang}
          value={currValue}
          onChange={(v) => changeValue(v ?? '')}
        />
      </Modal>
    </div>
  );
};
