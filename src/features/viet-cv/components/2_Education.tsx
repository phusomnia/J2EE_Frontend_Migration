import { Button } from "@/components/ui/button";

export default function Education({
  resume,
  addItem,
  handleDeleteValue,
  setFormArrayValue,
}: any) {
  function handleEducation(type: string, id: string = "", e: any = null) {
    if (type === "ADD") {
      console.log("Add education");
      addItem("Education", {
        Id: crypto.randomUUID(),
        Institution: "",
        Degree: "",
        StartDate: null,
        EndDate: null,
      });
    }

    if (type === "EDIT") {
      if (e.target.id === "Date") {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const [startDate, endDate] = e.target.value
          .split(" - ")
          .map((date: string) => date.trim());

        if ((startDate && dateRegex.test(startDate)) || startDate === "") {
          setFormArrayValue("Education", id, "StartDate", startDate);
        }

        if ((endDate && dateRegex.test(endDate)) || endDate === "") {
          setFormArrayValue("Education", id, "EndDate", endDate);
        }
      } else {
        console.log("Edit education", id, e.target.id, e.target.value);
        setFormArrayValue("Education", id, e.target.id, e.target.value);
      }
    }

    if (type === "DELETE") {
      console.log("Delete education", id);
      handleDeleteValue("Education", id);
    }
  }

  return (
    <div className="education">
      <label>Học vấn</label>
      <div>
        <Button type="button" onClick={() => handleEducation("ADD")}>
          Thêm
        </Button>
      </div>
      {resume &&
        resume.Education.map((item: any) => (
          <div key={item.Id} className="education-containers">
            <div className="border p-2 grid grid-cols-2 relative">
              <Button
                type="button"
                onClick={() => handleEducation("DELETE", item.Id)}
                className="absolute right-0"
              >
                X
              </Button>
              <div>
                <label>Thời gian (bắt đầu - kết thúc)</label>
                <div className="flex">
                  <input
                    id="StartDate"
                    value={item.StartDate}
                    onChange={(e) => handleEducation("EDIT", item.Id, e)}
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
                    value={item.EndDate || ""}
                    onChange={(e) => handleEducation("EDIT", item.Id, e)}
                    className="mb-2 w-[100px]"
                    placeholder="(DD/MM/YYYY)"
                    style={{
                      fontSize: 15,
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1">
                <label>Trường</label>
                <input
                  id="Institution"
                  value={item.Institution || ""}
                  className="mb-2 w-[200px]"
                  placeholder="Đại học, cao đẳng, ..."
                  onChange={(e) => handleEducation("EDIT", item.Id, e)}
                  style={{
                    fontSize: 15,
                  }}
                />
                <label>Chuyên ngành</label>
                <input
                  id="Degree"
                  value={item.Degree || ""}
                  className="mb-2 w-[200px]"
                  onChange={(e) => handleEducation("EDIT", item.Id, e)}
                  placeholder="quản trị kinh doanh, ..."
                  style={{
                    fontSize: 15,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
