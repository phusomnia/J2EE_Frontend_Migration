import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useState } from "react";

export function Section()
{
    const [formValue, setFormValue] = useState({
        FirstName: "",
        LastName: "",
        Address: "",
        ImageProfile: "",
        CreatedAt: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) { 
        const { id , value } = e.target;
        console.log(id, value); 
        setFormValue(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    return <>
        <div>
            <label htmlFor="FirstName">First Name</label>
            <Input
                id="LastName"
                name="LastName"
                placeholder="Họ"
                value={formValue.LastName}
                onChange={handleChange}
            />

            <label htmlFor="FirstName">First Name</label>
            <Input
                id="FirstName"
                name="FirstName"
                placeholder="Tên"
                value={formValue.FirstName}
                onChange={handleChange}
            />

            <label htmlFor="FirstName">First Name</label>
            <Input
                id="Address"
                name="Address"
                placeholder="Địa chỉ"
                value={formValue.Address}
                onChange={handleChange}
            />
        </div>
    </>
}