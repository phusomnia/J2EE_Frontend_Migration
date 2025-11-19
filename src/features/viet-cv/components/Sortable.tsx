import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable Item Component
const SortableItem = ({ id, children }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

// Editable Section Component với CRUD
const EditableSection = ({ section, onUpdate, onDelete }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(section.title || "");
  const [items, setItems] = useState(section.items || []);
  const [newItem, setNewItem] = useState("");

  const handleSaveTitle = () => {
    onUpdate({
      ...section,
      title,
      items,
    });
    setIsEditingTitle(false);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...items, newItem.trim()];
      setItems(updatedItems);
      setNewItem("");
      onUpdate({
        ...section,
        title,
        items: updatedItems,
      });
    }
  };

  const handleUpdateItem = (index: number, newValue: string) => {
    const updatedItems = items.map((item: string, i: number) =>
      i === index ? newValue : item
    );
    setItems(updatedItems);
    onUpdate({
      ...section,
      title,
      items: updatedItems,
    });
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_: string, i: number) => i !== index);
    setItems(updatedItems);
    onUpdate({
      ...section,
      title,
      items: updatedItems,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, callback: Function) => {
    if (e.key === "Enter") {
      callback();
    }
  };

  const renderContent = () => {
    if (section.id === "contact") {
      return section.content;
    }

    if (section.id === "career-objective") {
      return (
        <div className="space-y-2 text-sm">
          {isEditing ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddItem)}
                  placeholder="Thêm mục tiêu nghề nghiệp..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Thêm
                </button>
              </div>
              {items.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                >
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateItem(index, e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {items.map((item: string, index: number) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2 text-sm">
        {isEditing ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddItem)}
                placeholder="Thêm mục mới..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Thêm
              </button>
            </div>
            {items.map((item: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded"
              >
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleUpdateItem(index, e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item: string, index: number) => (
              <div key={index} className="text-gray-700">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="break-inside-avoid p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
      <div className="flex items-center justify-between mb-3 border-b border-gray-300 pb-1">
        {isEditingTitle || !section.title ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleSaveTitle)}
              placeholder="Nhập tiêu đề section..."
              className="flex-1 px-2 py-1 text-lg font-bold border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSaveTitle}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Lưu
            </button>
          </div>
        ) : (
          <h2 className="font-bold text-lg text-gray-800 flex-1">
            {section.title}
          </h2>
        )}

        {section.id !== "contact" && (
          <div className="flex gap-2">
            {!isEditingTitle && section.title && (
              <button
                onClick={() => setIsEditingTitle(true)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
              >
                Sửa tiêu đề
              </button>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                isEditing
                  ? "bg-gray-500 text-white hover:bg-gray-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isEditing ? "Xong" : "Sửa nội dung"}
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Xóa
            </button>
          </div>
        )}
      </div>

      {renderContent()}
    </div>
  );
};

// Component để thêm section mới
const AddSectionButton = ({ onAdd }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      const newSection = {
        id: `section-${Date.now()}`,
        title: title.trim(),
        items: [],
      };
      onAdd(newSection);
      setTitle("");
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="text-center mt-6">
      {isAdding ? (
        <div className="flex gap-2 justify-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tiêu đề section mới..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Thêm
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Hủy
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
        >
          + Thêm Section Mới
        </button>
      )}
    </div>
  );
};

// Main CV Template Component
export const CVTemplate = () => {
  const cvRef = useRef<HTMLDivElement>(null);

  // Initial sections data theo template hình ảnh
  const initialSections = [
    {
      id: "contact",
      title: "",
      content: (
        <div className="text-sm leading-tight space-y-1">
          <p className="font-bold text-base">NGUYỄN VĂN A</p>
          <p>Vị trí ứng tuyển: Lập trình viên Frontend</p>
          <p>Ngày sinh: 01/01/1990</p>
          <p>Giới tính: Nam</p>
          <p>Số điện thoại: 0123 456 789</p>
          <p>Email: tuanhphu004thcs@gmail.com</p>
          <p>Website: example.com</p>
          <p>Địa chỉ: 29 - 12A4 Từ Anh Phú, Hà Nội</p>
        </div>
      ),
    },
    {
      id: "career-objective",
      title: "MỤC TIÊU NGHỀ NGHIỆP",
      items: [
        "Trở thành Senior Frontend Developer trong 2 năm tới",
        "Phát triển kỹ năng quản lý dự án và team leadership",
        "Ứng dụng các công nghệ mới vào sản phẩm thực tế",
      ],
    },
    {
      id: "education",
      title: "HỌC VẤN",
      items: [
        "2018 - 2022: Đại học Công nghệ Thông tin - Đại học Quốc gia TP.HCM",
        "Chuyên ngành: Kỹ thuật Phần mềm",
        "Xếp loại: Giỏi",
      ],
    },
    {
      id: "experience",
      title: "KINH NGHIỆM LÀM VIỆC",
      items: [
        "06/2022 - Hiện tại: Công ty Cổ phần Công nghệ ABC - Lập trình viên Frontend",
        "Phát triển ứng dụng web với ReactJS, TypeScript",
        "Tối ưu hóa hiệu suất và trải nghiệm người dùng",
        "Phối hợp với team Backend để phát triển tính năng mới",
      ],
    },
    {
      id: "certificates",
      title: "CHỨNG CHỈ",
      items: [
        "2023: Chứng chỉ ReactJS Developer - TechMaster",
        "2022: Chứng chỉ JavaScript Advanced - F8",
        "2021: Chứng chỉ TOEIC 800 - ETS",
      ],
    },
    {
      id: "skills",
      title: "KỸ NĂNG",
      items: [
        "Frontend: ReactJS, TypeScript, HTML5, CSS3, Tailwind",
        "Tools: Git, Docker, Webpack",
        "Soft Skills: Giao tiếp, làm việc nhóm, giải quyết vấn đề",
        "Ngoại ngữ: Tiếng Anh (TOEIC 800)",
      ],
    },
  ];

  const [sections, setSections] = useState(initialSections);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleUpdateSection = (updatedSection: any) => {
    setSections(
      sections.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const handleAddSection = (newSection: any) => {
    setSections([...sections, newSection]);
  };

  const exportToPDF = async () => {
    if (!cvRef.current) return;

    try {
      const originalWidth = cvRef.current.style.width;
      cvRef.current.style.width = "210mm";

      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: 794,
        height: cvRef.current.scrollHeight,
        windowWidth: 794,
        windowHeight: cvRef.current.scrollHeight,
      });

      cvRef.current.style.width = originalWidth;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("CV_Nguyen_Van_A.pdf");
    } catch (error) {
      console.error("Lỗi khi xuất PDF:", error);
      alert("Có lỗi xảy ra khi xuất PDF. Vui lòng thử lại.");
    }
  };

  const printCV = () => {
    window.print();
  };

  const resetOrder = () => {
    setSections(initialSections);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 print:py-0 print:bg-white">
      <div className="w-[210mm] mx-auto mb-4 flex justify-between items-center print:hidden">
        <div className="flex space-x-2">
          <button
            onClick={resetOrder}
            className="px-4 py-2 rounded-md font-medium text-white bg-gray-600 hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={exportToPDF}
            className="px-6 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Xuất PDF
          </button>
          <button
            onClick={printCV}
            className="px-6 py-2 rounded-md font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            In CV
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div
          ref={cvRef}
          className="cv-template w-[210mm] min-h-[297mm] mx-auto bg-white p-10 shadow-lg print:shadow-none print:mx-0 print:p-6 print:w-full"
          style={{
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.5",
            fontSize: "14px",
          }}
        >
          {/* Header với tên và vị trí ứng tuyển */}
          <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 uppercase">
              NGUYỄN VĂN A
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              Lập trình viên Frontend
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {sections.map((section) => (
                <SortableItem key={section.id} id={section.id}>
                  <EditableSection
                    section={section}
                    onUpdate={handleUpdateSection}
                    onDelete={() => handleDeleteSection(section.id)}
                  />
                </SortableItem>
              ))}
            </SortableContext>
          </div>

          <AddSectionButton onAdd={handleAddSection} />
        </div>
      </DndContext>

      <style>{`
        @media print {
          @page {
            margin: 0;
            size: A4;
          }
          
          body {
            margin: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: white;
          }
          
          .cv-template {
            margin: 0 !important;
            padding: 12mm !important;
            box-shadow: none !important;
            width: 100% !important;
            min-height: 297mm !important;
            background: white;
          }
          
          .print-hidden {
            display: none !important;
          }
        }
        
        .break-inside-avoid {
          break-inside: avoid;
        }
        
        .cv-template h2 {
          color: #2d3748;
          border-bottom: 2px solid #4a5568;
        }
      `}</style>
    </div>
  );
};
