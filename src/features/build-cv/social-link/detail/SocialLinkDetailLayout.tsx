import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ScaleProvider } from "@/context/ScaleContext";
import { TemplateLayout } from "@/features/choose-templates/ChooseTemplate";
import { TemplateA } from "@/features/choose-templates/component/TemplateA";
import { FormStore } from "@/stores/FormStore";
import { UrlHandler } from "@/utils/Handler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
    Platform: z.string().min(1, { error: "Tên nền tảng không được để trống" }),
    Url: z.string().min(1, { error: "Tên đường dẫn không được để trống" }),
});

type FormData = z.infer<typeof formSchema>;

export default function SocialLinkDetailLayout(props: any) {
    return (
        <>
            <SocialLinkDetail Id={props.SocialLinkId} />
        </>
    );
}

function SocialLinkDetail(props: any) {
    const { formValue, setFormValue, setFormArrayValue } = FormStore();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Platform:
                formValue.SocialLink.find((e: any) => e.Id === props.Id)
                    .Platform || "",
            Url:
                formValue.SocialLink.find((e: any) => e.Id === props.Id).Url ||
                "",
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const { handleSubmit, control, clearErrors, trigger } = form;

    function onSubmit(data: FormData) {
        console.log("Validate data: ", data);
    }

    function onBackSubmit(data: FormData) {
        console.log("Validate data: ", data);
        UrlHandler.navigate("/build-cv/social-link/");
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        const arrayName = "SocialLink";
        setFormArrayValue(arrayName, props.Id, id, value);
    }

    return (
        <>
            <div className="flex">
                <div>Cách liên với bạn</div>

                <div className="p-30">
                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-2 gap-6"
                        >
                            <FormInput
                                control={control}
                                name="Platform"
                                placeHolder="Nền tảng"
                                handleChange={handleChange}
                                clearErrors={clearErrors}
                            />
                            <FormInput
                                control={control}
                                name="Url"
                                placeHolder="Đường dẫn"
                                handleChange={handleChange}
                                clearErrors={clearErrors}
                            />
                            <div className="col-span-2 flex gap-4 mt-4">
                                <Button
                                    type="button"
                                    onClick={handleSubmit(onBackSubmit)}
                                >
                                    Back
                                </Button>
                                <Button type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
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
