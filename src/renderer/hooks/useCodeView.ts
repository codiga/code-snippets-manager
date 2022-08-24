import { useState, Dispatch, SetStateAction } from 'react';

export type CodeViewsType = 'raw' | 'preview';
export type CodeViewDispatch = Dispatch<SetStateAction<CodeViewsType>>;
/**
 * Used to switch between presentable and raw code snippets
 */
const useCodeView = (
  view: CodeViewsType
): [CodeViewsType, CodeViewDispatch] => {
  const [codeView, setCodeView] = useState<CodeViewsType>(view);

  return [codeView, setCodeView];
};

export default useCodeView;
