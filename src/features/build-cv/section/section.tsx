import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScaleProvider } from "@/context/ScaleContext";
import { TemplateLayout } from "@/features/choose-templates/ChooseTemplate";
import { TemplateA } from "@/features/choose-templates/component/TemplateA";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    FirstName: z.string().min(1, { error: "Tên không được để trống" }),
    LastName: z.string().min(1, { error: "Họ không được để trống" }),
    Email: z.email({ error: "Email không hợp lệ" }),
    Address: z.string().optional(),
    Phone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function Section() {
    const [formValue, setFormValue] = useState({
        Id: crypto.randomUUID(),
        Title: "",
        FirstName: "",
        LastName: "",
        Address: "",
        Phone: "",
        Email: "",
        ImageProfile: "",
        Education: [],
        Skill: [],
        Project: [],
        SocialLink: [],
    });

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
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setFormValue((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <div className="sidebar w-[250px] bg-amber-200">
                    <div>
                        <a href="/build-cv/section">Thông tin cá nhân</a>
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
                <div className="bg-amber-100 flex top-4 pt-[100px] w-[50%] h-[940px]">
                    <div className="template-review mx-auto z-10">
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

function FormInput({
    className,
    control,
    name,
    type = "text",
    placeHolder,
    handleChange,
    clearErrors,
    maxLength = 100,
}: any) {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => {
                    return (
                        <FormItem className={"relative " + className}>
                            <FormLabel>{placeHolder}</FormLabel>
                            <FormControl>
                                <Input
                                    type={type}
                                    className={
                                        fieldState.error?.message &&
                                        "border-red-500"
                                    }
                                    id={name}
                                    placeholder={placeHolder}
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleChange(e);
                                        clearErrors(name);
                                    }}
                                    onFocus={() => {
                                        clearErrors(name);
                                    }}
                                    maxLength={maxLength}
                                />
                            </FormControl>
                            {
                                <FormMessage className="absolute top-full">
                                    {fieldState.error?.message}
                                </FormMessage>
                            }
                        </FormItem>
                    );
                }}
            />
        </>
    );
}
