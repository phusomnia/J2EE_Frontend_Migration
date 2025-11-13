import { Button } from "@/components/ui/button";

export default function SocialLink({
  resume,
  fields,
  addItem,
  handleDeleteValue,
  setFormArrayValue,
}: any) {
  function handleSocialLink(type: string, id: string = "", e: any = null) {
    if (type === "ADD") {
      console.log("Add social link");
      addItem("SocialLink", {
        Id: crypto.randomUUID(),
        Platform: "",
        Url: "",
      });
    }

    if (type === "EDIT") {
      console.log("Edit social link", id, e.target.id, e.target.value);
      setFormArrayValue("SocialLink", id, e.target.id, e.target.value);
    }

    if (type === "DELETE") {
      console.log("Delete social link", id);
      handleDeleteValue("SocialLink", id);
    }
  }

  const fieldsSocialLink = (id: string) => {
    return fields.SocialLink.find((item: any) => item.Id === id);
  };

  return (
    <div>
      <label>Liên kết mạng xã hội</label>
      <div className="add-social-link">
        <Button type="button" onClick={() => handleSocialLink("ADD")}>
          Thêm
        </Button>
      </div>
      {resume &&
        resume.SocialLink.map((item: any) => (
          <div key={item.Id} className="social-link-container">
            <div className="relative border">
              <Button
                type="button"
                onClick={() => handleSocialLink("DELETE", item.Id)}
                className="absolute right-0"
              >
                X
              </Button>
              <div className="grid grid-cols-2 p-2 w-[550px]">
                <div className="grid grid-cols-1 whitespace-nowrap">
                  <label className="mr-2">Nền tảng</label>
                  <input
                    id="Platform"
                    value={fieldsSocialLink(item.Id).Platform}
                    className="mb-2 w-[200px]"
                    onChange={(e) => handleSocialLink("EDIT", item.Id, e)}
                    placeholder="Facebook, Instagram, ..."
                  />
                </div>
                <div className="">
                  <label
                    className="mr-2"
                    style={{
                      fontSize: 15,
                    }}
                  >
                    Đường link
                  </label>
                  <input
                    id="Url"
                    value={fieldsSocialLink(item.Id).Url}
                    className="mb-2 w-[200px]"
                    placeholder="youtube.com/username"
                    onChange={(e) => handleSocialLink("EDIT", item.Id, e)}
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
