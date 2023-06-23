import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Modal } from "@shared/ui";

export interface CodeTextAreaFieldProps extends React.ComponentPropsWithoutRef<"textarea"> {
  value?: string;
  onChangeValue?: (value: string) => void;
}

export const CodeTextAreaField = ({
  value,
  lang = "javascript",
  onChangeValue,
  ...props
}: CodeTextAreaFieldProps) => {
  const [currValue, setCurrValue] = useState("");
  const [listVisible, setListVisible] = useState(false);

  useEffect(() => {
    if (value) {
      setCurrValue(value);
    }
  }, [value]);

  function changeValue(v: string) {
    setCurrValue(v);
    onChangeValue && onChangeValue(v);
  }

  return (
    <div className='relative flex items-center'>
      <textarea
        value={currValue}
        onChange={(e) => changeValue(e.target.value)}
        className='bg-gray-900 border border-white border-solid resize-none w-[220px] h-[140px]'
        {...props}
      />
      <FullscreenIcon
        className='cursor-pointer absolute right-[10px] bottom-[10px]'
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
          theme='vs-dark'
          height='calc(90vh - 80px)'
          language={lang}
          value={currValue}
          onChange={(v) => changeValue(v ?? "")}
        />
      </Modal>
    </div>
  );
};
