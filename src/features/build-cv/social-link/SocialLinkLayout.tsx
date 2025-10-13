import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ScaleProvider } from "@/context/ScaleContext";
import { TemplateLayout } from "@/features/choose-templates/ChooseTemplate";
import { TemplateA } from "@/features/choose-templates/component/TemplateA";
import { FormStore } from "@/stores/FormStore";
import { UrlHandler } from "@/utils/Handler";
import { Icon } from "@radix-ui/react-select";
import { useEffect } from "react";

export default function SocialLinkLayout(props: any) {
    const { formValue, setFormValue, handleDeleteValue, addItem } = FormStore();

    if (formValue.SocialLink.length === 0) {
        let socialLinkId = "";
        socialLinkId = crypto.randomUUID();
        setFormValue("SocialLink", [
            {
                Id: socialLinkId,
                Platform: "",
                Url: "",
            },
        ]);
        UrlHandler.navigate("/build-cv/social-link/detail/" + socialLinkId);
    }

    return (
        <>
            <div className="flex">
                <div>Cách liên với bạn</div>

                <div className="p-30">
                    <>
                        <div className="border-1 text-center">
                            {formValue.SocialLink.map((item: any) => (
                                <div
                                    key={item.Id}
                                    className="grid grid-cols-2 justify-center"
                                >
                                    <div className="flex my-auto">
                                        <div className="mx-2">
                                            {item.Platform
                                                ? `${item.Platform}:`
                                                : null}
                                        </div>
                                        <div>{item.Url}</div>
                                    </div>
                                    <div className="flex justify-center p-4 gap-4">
                                        <Button
                                            className="edit"
                                            onClick={() => {
                                                UrlHandler.navigate(
                                                    "/build-cv/social-link/detail/" +
                                                        item.Id
                                                );
                                            }}
                                        >
                                            <Icon />
                                        </Button>
                                        <Button
                                            className="delete"
                                            onClick={() => {
                                                console.log("Delete");
                                                handleDeleteValue(
                                                    "SocialLink",
                                                    item.Id
                                                );
                                            }}
                                        >
                                            <Icon />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className="underline border-1 text-center"
                            onClick={() => {
                                let id = "";
                                id = crypto.randomUUID();
                                addItem("SocialLink", {
                                    Id: id,
                                    Platform: "",
                                    Url: "",
                                });
                                UrlHandler.navigate(
                                    "/build-cv/social-link/detail/" + id
                                );
                            }}
                        >
                            Thêm liên kết
                        </div>
                        <div className="col-span-2 flex gap-4 mt-4">
                            <Button type="button">Back</Button>
                            <Button type="submit">Continue</Button>
                        </div>
                    </>
                </div>

                {/* Template Review */}
                <div className="bg-gray-100">
                    <div className="template-review mx-auto">
                        <ScaleProvider scale={0.7}>
                            <TemplateLayout>
                                <TemplateA data={formValue} />
                            </TemplateLayout>
                        </ScaleProvider>
                    </div>
                </div>
            </div>
        </>
    );
}
