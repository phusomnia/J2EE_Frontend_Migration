import { Input } from "@/components/ui/input";
import { ScaleProvider } from "@/context/ScaleContext";
import { TemplateLayout } from "@/features/choose-templates/ChooseTemplate";
import { TemplateA } from "@/features/choose-templates/component/TemplateA";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStore } from "@/stores/FormStore";
import { FormInput } from "@/components/FormInput";
import { Form } from "@/components/ui/form";
import { UrlHandler } from "@/utils/Handler";

const formSchema = z.object({
    FirstName: z.string().min(1, { error: "Tên không được để trống" }),
    LastName: z.string().min(1, { error: "Họ không được để trống" }),
    Email: z.email({ error: "Email không hợp lệ" }),
    Address: z.string().optional(),
    Phone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ResumeLayout() {
    return (
        <>
            <Resume />
        </>
    );
}

export function Resume() {
    const { formValue, setFormValue } = FormStore();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            FirstName: formValue.FirstName,
            LastName: formValue.LastName,
            Email: formValue.Email,
            Address: formValue.Address,
            Phone: formValue.Phone,
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const { handleSubmit, control, clearErrors } = form;

    function onSubmit(data: FormData) {
        console.log("Validate data: ", data);
        let socialLinkId = "";
        if (!formValue.SocialLink || formValue.SocialLink.length === 0) {
            socialLinkId = crypto.randomUUID();
            setFormValue("SocialLink", [
                {
                    Id: socialLinkId,
                    Platform: "",
                    Url: "",
                },
            ]);
        } else {
            socialLinkId = formValue.SocialLink[0].Id;
        }
        UrlHandler.navigate("/build-cv/social-link/detail/" + socialLinkId);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setFormValue(id, value);
    }

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <div className="sidebar w-[250px] bg-gray-100 text-center">
                    <div>
                        <a href="/build-cv/cntc">Thông tin cá nhân</a>
                    </div>
                    <div>
                        <a href="/build-cv/social-link">Thông tin liên kết</a>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full h-full">
                    <div className="text-center">
                        <p>
                            Bạn muốn nhà tuyển dụng liên hệ với bạn như thế nào?
                        </p>
                    </div>

                    <div className="p-30">
                        <Form {...form}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="grid grid-cols-2 gap-6"
                            >
                                {/* LAST NAME */}
                                <FormInput
                                    control={control}
                                    name="LastName"
                                    placeHolder="Họ"
                                    handleChange={handleChange}
                                    clearErrors={clearErrors}
                                />
                                {/* FIRST NAME */}
                                <FormInput
                                    control={control}
                                    name="FirstName"
                                    placeHolder="Tên"
                                    handleChange={handleChange}
                                    clearErrors={clearErrors}
                                />
                                {/* ADDRESS */}
                                <FormInput
                                    className="col-span-2"
                                    control={control}
                                    name="Address"
                                    placeHolder="Địa chỉ"
                                    handleChange={handleChange}
                                    clearErrors={clearErrors}
                                />
                                {/*  */}
                                <FormInput
                                    className="col-span-2"
                                    control={control}
                                    type="number"
                                    name="Phone"
                                    placeHolder="Số điện thoại"
                                    handleChange={handleChange}
                                    clearErrors={clearErrors}
                                />
                                {/*  */}
                                <FormInput
                                    className="col-span-2"
                                    control={control}
                                    name="Email"
                                    placeHolder="Email"
                                    handleChange={handleChange}
                                    clearErrors={clearErrors}
                                />
                                {/* BUTTONS */}
                                <div className="col-span-2 flex gap-4 mt-4">
                                    <Button type="button">Back</Button>
                                    <Button type="submit">Continue</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
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

                    <div className="text-center">
                        <a
                            className="underline"
                            onClick={(e) => {
                                e.preventDefault();
                                UrlHandler.navigate("/choose-template");
                            }}
                        >
                            Change template
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
