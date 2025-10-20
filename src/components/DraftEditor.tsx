import { convertToRaw, EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Controller } from 'react-hook-form';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FormLabel } from './ui/form';
import { stateToHTML } from 'draft-js-export-html';

export function DraftEditor({ control, name, label, handleChange }: any) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    const htmlLmao = stateToHTML(newState.getCurrentContent());
    const target = { id: name, value: htmlLmao };
    target.value = target.value.replace(/\s{2,}/g, ' ');
    handleChange({ target });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <div id={name} className="flex flex-col space-y-2">
            <FormLabel>{label}</FormLabel>
            <Editor
              editorState={editorState}
              onEditorStateChange={newState => {
                onEditorStateChange(newState);
                field.onChange(
                  JSON.stringify(convertToRaw(newState.getCurrentContent())),
                );
              }}
              wrapperClassName="border border-gray-300 rounded-md shadow-sm"
              editorClassName="min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              toolbar={{
                options: ['inline', 'list', 'textAlign'],
                inline: {
                  options: ['bold', 'italic', 'underline'],
                },
                list: {
                  options: ['unordered', 'ordered'],
                },
                textAlign: {
                  options: ['left', 'center', 'right'],
                },
              }}
              toolbarClassName="border-b border-gray-300 p-2 flex space-x-2"
            />
          </div>
        </>
      )}
    />
  );
}
