import React, { useState } from "react";
import { mockResume } from "./data/mock";
import { Modal } from "@/components/_Modal";
import { ScaleProvider, useScaleContext } from "@/context/ScaleContext";
import { ColorProvider } from "@/context/ColorContext";
import { TemplateA } from "./component/TemplateA";
import { TemplateB } from "./component/TemplateB";
import { TemplateC } from "./component/TemplateC";
import { TemplateD } from "./component/TemplateD";
import { TemplateE } from "./component/TemplateE";
import { TemplateF } from "./component/TemplateF";
import { TemplateG } from "./component/TemplateG";
import { TemplateH } from "./component/TemplateH";
import { TemplateI } from "./component/TemplateI";
import { TemplateK } from "./component/templateK";
import "./css/responsive.css";
import { useDialogStore } from "@/stores/DialogStore";

export default function ChooseTemplateLayout() {
    return <TemplateSelector />;
}

// =========================
//   TEMPLATE SELECTOR
// =========================
export function TemplateSelector() {
    const templates = [
        { id: 1, component: TemplateA, name: "Mẫu A" },
        { id: 2, component: TemplateB, name: "Mẫu B" },
        { id: 3, component: TemplateC, name: "Mẫu C" },
        { id: 4, component: TemplateD, name: "Mẫu D" },
        { id: 5, component: TemplateE, name: "Mẫu E" },
        { id: 6, component: TemplateF, name: "Mẫu F" },
        { id: 7, component: TemplateG, name: "Mẫu G" },
        { id: 8, component: TemplateH, name: "Mẫu H" },
        { id: 9, component: TemplateI, name: "Mẫu I" },
        { id: 10, component: TemplateK, name: "Mẫu K" },
    ];

    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const { isOpen, toggleModal } = useDialogStore();

    return (
        <div className="bg-amber-50 min-h-screen py-8">
            <div className="mx-auto w-[50%] text-center mb-8">
                <div className="text-2xl font-semibold">
                    Chọn mẫu cho CV của bạn
                </div>
            </div>

            {/* Grid 5 cột */}
            <div className="container mx-auto grid grid-cols-5 gap-6">
                {templates.map((template) => {
                    const TemplateComponent = template.component;
                    return (
                        <div key={template.id} className="flex flex-col items-center">
                            <ScaleProvider scale={0.25}>
                                <TemplateLayout>
                                    <TemplateCard
                                        template={TemplateComponent}
                                        onEdit={() => {
                                            setSelectedTemplate(() => TemplateComponent);
                                            toggleModal();
                                        }}
                                    />
                                </TemplateLayout>
                            </ScaleProvider>
                            <div className="text-center mt-2 font-medium">
                                {template.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MODAL HIỂN THỊ CHI TIẾT TEMPLATE */}
            {isOpen && (
                <Modal>
                    <ScaleProvider scale={0.5}>
                        <TemplateDetail template={selectedTemplate || TemplateA} />
                    </ScaleProvider>
                </Modal>
            )}
        </div>
    );
}

// =========================
//   TEMPLATE DETAIL
// =========================
function TemplateDetail({ template: SelectedTemplate }: any) {
    const scale = useScaleContext();
    const [color, setColor] = useState("#ef4444");
    const colors = ["#ef4444", "#3b82f6", "#22c55e", "#f59e42", "#a855f7"];

    return (
        <div className="template-detail flex bg-white p-4 rounded-lg shadow-lg">
            <div className="template-preview flex flex-col items-center">
                <ScaleProvider scale={scale}>
                    <ColorProvider color={color}>
                        <TemplateLayout>
                            <SelectedTemplate data={mockResume[0]} />
                        </TemplateLayout>
                    </ColorProvider>
                </ScaleProvider>

                <div className="color-picker flex gap-2 items-center p-4 mx-auto">
                    {colors.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            style={{
                                background: c,
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                border: "1px solid #ddd",
                                cursor: "pointer",
                            }}
                            aria-label={c}
                        />
                    ))}
                </div>
            </div>

            <div className="template-information border w-full p-4 rounded-lg ml-4">
                <div className="flex gap-2 mb-2">
                    <div className="tag rounded border-2 px-2 py-1">Sáng tạo</div>
                    <div className="tag rounded border-2 px-2 py-1">Khuyến khích</div>
                </div>
                <div className="text-3xl font-semibold mb-4">Hiện đại</div>
                <ul className="space-y-1">
                    <li>
                        <span>&#10003;</span> Tối ưu hóa cho ATS (Hệ thống theo dõi ứng viên)
                    </li>
                    <li>
                        <span>&#10003;</span> CV 2 cột
                    </li>
                    <li>
                        <span>&#10003;</span> Nội dung mẫu có thể chỉnh sửa
                    </li>
                    <li>
                        <span>&#10003;</span> Tải xuống dưới định dạng PDF, Word DOCX hoặc TXT
                    </li>
                </ul>
                <button className="mt-4 bg-green-600 text-white rounded p-2 hover:bg-green-700">
                    Chọn mẫu này
                </button>
            </div>
        </div>
    );
}

// =========================
//   TEMPLATE LAYOUT
// =========================
export function TemplateLayout({ children }: any) {
    const scale = useScaleContext();

    const originalWidthMm = 210;
    const originalHeightMm = 297;

    const widthScaledMm = originalWidthMm * scale;
    const heightScaledMm = originalHeightMm * scale;

    return (
        <div
            style={{
                width: `${widthScaledMm}mm`,
                height: `${heightScaledMm}mm`,
                backgroundColor: "white",
                boxShadow: "0 0 4px rgba(0,0,0,0.1)",
            }}
        >
            {children}
        </div>
    );
}

// =========================
//   TEMPLATE CARD
// =========================
export function TemplateCard({ template: TemplateComponent, onEdit }: any) {
    return (
        <div className="template-card relative group h-full shadow-md rounded overflow-hidden bg-white">
            {/* Overlay */}
            <div
                className="
                    overlay border-2 border-gray-500 absolute 
                    inset-0 top-0 left-0 opacity-0 
                    flex flex-col justify-center items-center 
                    group-hover:opacity-100 z-10 bg-black/40 transition"
            >
                <button
                    className="edit-button bg-pink-600 text-white rounded absolute top-0 right-0 m-2 p-2"
                    onClick={onEdit}
                >
                    Xem chi tiết
                </button>
                <button
                    className="select-template bg-green-600 text-white rounded absolute bottom-0 m-2 p-2"
                >
                    Chọn mẫu
                </button>
            </div>

            {/* Nội dung template */}
            <TemplateComponent data={mockResume[0]} />
        </div>
    );
}
