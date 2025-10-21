import React, { useState } from "react";
import { mockResume } from "./data/mock";
import { Modal } from "@/components/_Modal";
import { ScaleProvider, useScaleContext } from "@/context/ScaleContext";
import { ColorProvider } from "@/context/ColorContext";
import { TemplateA } from "./component/TemplateA";
import "./css/responsive.css";
import { useDialogStore } from "@/stores/DialogStore";
import Header from "@/components/header/header";

export default function ChooseTemplateLayout() {
    return (
        <>
            {/* Header */}
            <Header />

            {/* Body */}
            <main className="py-8">
                <div className="max-w-6xl mx-auto px-4 mb-6">
                    <h1 className="text-2xl font-semibold">Chọn mẫu cho CV của bạn</h1>
                    <p className="text-sm text-gray-600 mt-1">Xem trước các mẫu, thay đổi màu sắc và chọn mẫu phù hợp.</p>
                </div>
                <TemplateSelector />
            </main>

            {/* Footer */}
        </>
    );
}

export function TemplateSelector() {
    const items = [1, 2, 3, 4, 5];
    return (
        <>
            <div className="bg-amber-50">
                <div className="max-w-6xl mx-auto p-4">
                    <section>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
                            {items.map((item) => (
                                <div key={item} className="w-full flex justify-center">
                                    <div className="w-64">
                                        <ScaleProvider scale={0.25}>
                                            <TemplateLayout>
                                                <TemplateCard />
                                            </TemplateLayout>
                                        </ScaleProvider>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <Modal>
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
            <div className="template-detail flex flex-col lg:flex-row gap-6">
                <div className="template-preview bg-white rounded-lg shadow p-4">
                    <div className="preview-inner mx-auto">
                        <ScaleProvider scale={scale}>
                            <ColorProvider color={color}>
                                <TemplateLayout>
                                    <TemplateA data={mockResume[0]} />
                                </TemplateLayout>
                            </ColorProvider>
                        </ScaleProvider>
                    </div>
                    <div className="color-picker mt-4">
                        <div className="flex gap-3 items-center justify-center">
                            {colors.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`w-7 h-7 rounded-full border-2 ${c === color ? 'ring-2 ring-offset-2' : ''}`}
                                    style={{ background: c }}
                                    aria-label={`Chọn màu ${c}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="template-information border rounded-lg p-6 bg-white shadow-sm">
                    <div className="flex gap-2 mb-3">
                        <div className="tag rounded border px-2 py-1 text-sm">Sáng tạo</div>
                        <div className="tag rounded border px-2 py-1 text-sm">Khuyến khích</div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3">Hiện đại</h2>
                    <ul className="list-none space-y-2 text-gray-700 mb-4">
                        <li><span className="text-green-600 mr-2">✓</span>Tối ưu hóa cho ATS (Hệ thống theo dõi ứng viên)</li>
                        <li><span className="text-green-600 mr-2">✓</span>CV 2 cột</li>
                        <li><span className="text-green-600 mr-2">✓</span>Nội dung mẫu có thể chỉnh sửa</li>
                        <li><span className="text-green-600 mr-2">✓</span>Tải xuống dưới định dạng PDF, Word DOCX hoặc TXT</li>
                    </ul>
                    <div className="flex gap-3">
                        <button className="select-template bg-green-600 text-white rounded px-4 py-2">Chọn mẫu</button>
                        <button className="bg-gray-100 rounded px-4 py-2">Hủy</button>
                    </div>
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
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    borderRadius: 6,
                    overflow: 'hidden',
                    background: '#fff'
                }}
                className="mx-auto"
            >
                {children}
            </div>
        </>
    );
}

export function TemplateCard() {
    const { toggleModal } = useDialogStore();

    return (
        <>
            <div className="template-card relative group h-full w-full rounded-lg shadow-md overflow-hidden border border-gray-200 bg-white">
                {/* Overlay buttons (no background) */}
                <div className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none z-10">
                    <div className="w-full flex justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            className="edit-button bg-pink-600 text-white rounded px-3 py-1 text-sm pointer-events-auto"
                            onClick={() => toggleModal()}
                            aria-label="Chỉnh sửa mẫu"
                        >
                            Chỉnh sửa
                        </button>
                    </div>
                    <div className="w-full flex justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            className={`select-template text-white rounded px-3 py-1 text-sm pointer-events-auto bg-green-600`}
                        >
                            Chọn Mẫu
                        </button>
                    </div>
                </div>
                <div className="p-3">
                    <TemplateA data={mockResume[0]} />
                </div>
            </div>
        </>
    );
}
