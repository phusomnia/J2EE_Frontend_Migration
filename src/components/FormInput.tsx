import { Controller } from "react-hook-form";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function FormInput({
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
                    console.log(field.value);
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
