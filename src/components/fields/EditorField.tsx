import { Controller, useFormContext } from 'react-hook-form';
import { IAllProps, Editor as ReactTinyEditor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { Editor as TinyEditor } from 'tinymce';
import { getFieldName } from '@/shared/form';

import { Field, FieldProps } from '@/components/fields/Field';
import { lineCount } from '@/shared/validation';

export const EditorField = (
  props: FieldProps &
    IAllProps & {
      setCount: (counts: { CHR: number; WRD: number; LIN: number }) => void;
    }
) => {
  const { name, group, setCount, ...rest } = props;

  const form = useFormContext();
  const fieldName = getFieldName(name, group);
  const editorRef = useRef<TinyEditor | null>(null);

  const updateCount = (value: string) => {
    if (editorRef.current) {
      const wordcount = editorRef.current.plugins.wordcount.body;
      setCount({
        CHR: wordcount.getCharacterCount(),
        WRD: wordcount.getWordCount(),
        LIN: lineCount(value)
      });
    }
  };

  const onInit = (evt: unknown, editor: TinyEditor) => {
    editorRef.current = editor;
    const temp: HTMLElement = document.getElementsByClassName(
      'tox-statusbar__wordcount'
    )[0] as HTMLElement;
    if (temp) temp.click();
    const content = editor.getContent();
    updateCount(content);
  };

  return (
    <Field
      {...props}
      content={
        <Controller
          name={fieldName}
          control={form.control}
          render={({ field: { onChange, ...field } }) => (
            <ReactTinyEditor
              onEditorChange={(value) => {
                onChange(value);
                updateCount(value);
              }}
              onInit={onInit}
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_APIKEY}
              {...field}
              init={{
                branding: false,
                height: 500,
                width: '100%',
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table powerpaste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style:
                  'body { font-family: "Inter", "sans-serif", font-size: 14px }'
              }}
              {...rest}
            />
          )}
        />
      }
    />
  );
};
