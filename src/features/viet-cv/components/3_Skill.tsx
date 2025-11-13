import { Button } from "@/components/ui/button";

export default function Education({
  resume,
  addItem,
  handleDeleteValue,
  setFormArrayValue,
}: any) {
  const handleSkill = (type: string, id: string = "", e: any = null) => {
    if (type === "ADD") {
      console.log("Add skill");
      addItem("Skill", {
        Id: crypto.randomUUID(),
        SkillName: "",
        ProficiencyLevel: "",
      });
    }

    if (type === "EDIT") {
      console.log("Edit skill", id, e.target.id, e.target.value);
      setFormArrayValue("Skill", id, e.target.id, e.target.value);
    }

    if (type === "DELETE") {
      console.log("Delete skill", id);
      handleDeleteValue("Skill", id);
    }
  };

  return (
    <div>
      <label>Kĩ năng</label>
      <div className="add-skill">
        <Button type="button" onClick={() => handleSkill("ADD")}>
          Thêm
        </Button>
      </div>
      {resume &&
        resume.Skill.map((item: any) => (
          <div key={item.Id} className="education-containers">
            <div className="relative border p-2">
              <Button
                type="button"
                onClick={() => handleSkill("DELETE", item.Id)}
                className="absolute right-0"
              >
                X
              </Button>
              <div className="grid grid-cols-2 p-2 w-[550px]">
                <div className="grid grid-cols-1 whitespace-nowrap">
                  <label className="mr-2">Tên kĩ năng</label>
                  <input
                    id="SkillName"
                    value={item.SkillName || ""}
                    className="mb-2 w-[200px]"
                    onChange={(e) => handleSkill("EDIT", item.Id, e)}
                    placeholder="Tin học, CNTT, ..."
                  />
                </div>
                <div className="">
                  <label
                    className="mr-2"
                    style={{
                      fontSize: 15,
                    }}
                  >
                    Mức độ thành thạo
                  </label>
                  <input
                    id="ProficiencyLevel"
                    value={item.ProficiencyLevel || ""}
                    className="mb-2 w-[200px]"
                    placeholder="Xuất sắc, Trung bình, ..."
                    onChange={(e) => handleSkill("EDIT", item.Id, e)}
                    style={{
                      fontSize: 15,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
