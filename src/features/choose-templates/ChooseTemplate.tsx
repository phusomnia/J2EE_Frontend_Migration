import React, { useState } from "react";
import { useToggle } from "@/hooks/useToggle";
import { mockResume } from "./data/mock";
import { Modal } from "@/components/modal";
import { ScaleProvider, useScaleContext } from "@/context/ScaleContext";
import { ColorProvider } from "@/context/ColorContext";
import { TemplateA } from "./component/TemplateA";
import "./css/responsive.css";

export default function ChooseTemplateLayout() {
    return (
        <>
            {/* Header */}

            {/* Body */}
            <TemplateSelector />

            {/* Footer */}
        </>
    );
}

export function TemplateSelector() {
    const [isOpen, toggleModal] = useToggle(false);
    const items = [1, 2, 3, 4, 5];

    return (
        <>
            <div className="bg-amber-50">
                <div className="mx-auto w-[50%] text-center">
                    <div className="">Chọn mẫu cho cv của bạn</div>
                </div>

                <div className="container flex justify-center items-start gap-6 mx-auto">
                    {items.map((item) => (
                        <div key={item}>
                            <ScaleProvider scale={0.25}>
                                <TemplateLayout>
                                    <TemplateCard toggleModal={toggleModal} />
                                </TemplateLayout>
                            </ScaleProvider>
                        </div>
                    ))}
                </div>

                <Modal isOpen={isOpen} toggleModal={toggleModal}>
                    <ScaleProvider scale={0.5}>
                        <TemplateDetail />
                    </ScaleProvider>
                </Modal>
            </div>
        </>
    );
}

function TemplateDetail() {
    const scale = useScaleContext();
    const [color, setColor] = useState("#ef4444");
    const colors = ["#ef4444", "#3b82f6", "#22c55e", "#f59e42", "#a855f7"];

    return (
        <>
            <div className="template-detail flex">
                <div className="template-preview">
                    <ScaleProvider scale={scale}>
                        <ColorProvider color={color}>
                            <TemplateLayout>
                                <TemplateA data={mockResume[0]} />
                            </TemplateLayout>
                        </ColorProvider>
                    </ScaleProvider>
                    <div className="color-picker flex">
                        <div className="color-picker flex gap-2 items-center p-4 mx-auto">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setColor(color)}
                                    style={{
                                        background: color,
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",
                                        border: color,
                                        outline: "none",
                                        cursor: "pointer",
                                    }}
                                    aria-label={color}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="template-information border w-full p-4">
                    <div className="flex gap-2">
                        <div className="tag rounded border-2">Sáng tạo</div>
                        <div className="tag rounded border-2">Khuyến khích</div>
                    </div>
                    <div className="text-4xl">Hiện đại</div>
                    <ul>
                        <div>
                            <span>&#10003;</span> Tối ưu hóa cho ATS (Hệ thống theo dõi ứng viên)
                        </div>
                        <div>
                            <span>&#10003;</span> CV 2 cột
                        </div>
                        <div>
                            <span>&#10003;</span> Nội dung mẫu có thể chỉnh sửa
                        </div>
                        <div>
                            <span>&#10003;</span> Tải xuống dưới định dạng PDF,
                            Word DOCX hoặc TXT
                        </div>
                    </ul>
                    <button
                        className="
                    select-template bg-green-600 text-white 
                    rounded p-2"
                    >
                        Select template
                    </button>
                </div>
            </div>
        </>
    );
}

export function TemplateLayout({ children }: any) {
    const scale = useScaleContext();

    const originalWidthMm = 210;
    const originalHeightMm = 297;

    const widthScaledMm = originalWidthMm * scale;
    const heightScaledMm = originalHeightMm * scale;

    return (
        <>
            <div
                style={{
                    width: `${widthScaledMm}mm`,
                    height: `${heightScaledMm}mm`,
                }}
            >
                {children}
            </div>
        </>
    );
}

export function TemplateCard({ toggleModal }: any) {
    const scale = useScaleContext();

    return (
        <>
            <div className="template-card relative group h-full">
                {/* Overlay */}
                <div
                    className="
                overlay border-2 border-gray-500 absolute 
                inset-0 top-0 left-0 opacity-0 
                flex flex-col justify-center items-center 
                group-hover:opacity-100 z-10"
                >
                    <button
                        className="edit-button 
                    bg-pink-600 text-white
                    rounded absolute top-0 right-0 
                    m-2 p-2"
                        onClick={() => toggleModal()}
                    >
                        Edit
                    </button>
                    <button
                        className="
                    select-template bg-green-600 text-white 
                    rounded absolute bottom-0 m-2 p-2"
                    >
                        Select template
                    </button>
                </div>
                <TemplateA data={mockResume[0]} />
            </div>
        </>
    );
}
