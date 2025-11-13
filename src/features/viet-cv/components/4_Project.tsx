import { Button } from "@/components/ui/button";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";

function MyEditor(props: any) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    const html = stateToHTML(newState.getCurrentContent());
    const e = {
      target: {
        id: props.id,
        value: html,
      },
    };
    e.target.value = e.target.value.replace(/\s{2,}/g, " ");
    console.log(e);
    props.handleChange("EDIT", props.item.Id, e);
  };

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={(newState) => {
          onEditorStateChange(newState);
        }}
        wrapperClassName="border border-gray-300 rounded-md shadow-sm"
        editorClassName="min-h-[150px] p-4 focus:outline-none"
        toolbar={{
          options: ["inline", "list", "textAlign"],
          inline: {
            options: ["bold", "italic", "underline", "strikethrough"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
          textAlign: {
            options: [],
          },
        }}
        toolbarClassName="border-b border-gray-300 p-2 flex space-x-2"
        placeholder="Hãy viết mô tả chi tiết..."
      />
    </>
  );
}

export default function Project({
  resume,
  fields,
  addItem,
  handleDeleteValue,
  setFormArrayValue,
}: any) {
  const handleProject = (type: string, id: string = "", e: any = null) => {
    if (type === "ADD") {
      console.log("Add project");
      addItem("Project", {
        Id: crypto.randomUUID(),
        ProjectName: "",
        ProjectDescription: "",
        StartDate: null,
        EndDate: null,
      });
    }

    if (type === "EDIT") {
      console.log("Edit skill", id, e.target.id, e.target.value);

      setFormArrayValue("Project", id, e.target.id, e.target.value);
    }

    if (type === "DELETE") {
      console.log("Delete education", id);
      handleDeleteValue("Project", id);
    }
  };

  console.log(fields);

  const fieldsProject = (id: string) => {
    return fields.Project.find((item: any) => item.Id === id);
  };

  return (
    <div>
      <label>Dự án</label>
      <div className="add-project">
        <Button type="button" onClick={() => handleProject("ADD")}>
          Thêm
        </Button>
      </div>
      {resume &&
        resume.Project.map((item: any) => (
          <div
            key={item.Id}
            className="project-container border p-2 relative grid grid-cols-1"
          >
            <Button
              type="button"
              onClick={() => handleProject("DELETE", item.Id)}
              className="absolute right-0"
            >
              X
            </Button>
            <div className="grid grid-cols-1">
              <div className="project-container" key={item.Id}>
                <label>Thời gian (bắt đầu - kết thúc)</label>
                <div className="flex">
                  <input
                    id="StartDate"
                    value={fieldsProject(item.Id).StartDate}
                    onChange={(e) => handleProject("EDIT", item.Id, e)}
                    className="mb-2 w-[90px]"
                    placeholder="(DD/MM/YYYY)"
                    style={{
                      fontSize: 15,
                    }}
                  />
                  <input
                    type="text"
                    value="-"
                    className="mb-2 w-[10px] focus:outline-none"
                    readOnly
                  />
                  <input
                    id="EndDate"
                    value={fieldsProject(item.Id).EndDate}
                    onChange={(e) => handleProject("EDIT", item.Id, e)}
                    className="mb-2 w-[100px]"
                    placeholder="(DD/MM/YYYY)"
                    style={{
                      fontSize: 15,
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Mô tả</label>
                <MyEditor
                  id="Description"
                  item={item}
                  handleChange={handleProject}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
