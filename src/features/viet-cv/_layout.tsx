import React, { useEffect, useRef, useState } from "react";
import { FormStore } from "@/stores/FormStore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Education from "./components/2_Education";
import Project from "./components/4_Project";
import Skill from "./components/3_Skill";
import SocialLink from "./components/5_SocialLink";
import { ScaleProvider } from "@/context/ScaleContext";
import TemplateDefault from "@/features/choose-templates/component/TemplateDefault";
import ImageCroppingLayout from "../build-cv/image-cropping/_layout";
import no_image from "@/../public/no_image.png";

function formatedDate(date = new Date()): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function CVTemplate() {
  const {
    formValue,
    setFormValue,
    addItem,
    handleDeleteValue,
    setFormArrayValue,
  } = FormStore();

  const style = {
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.5",
    fontSize: 18,
  };

  //
  // HANDLER
  //
  const handleContact = (e: any) => {
    console.log(e.target.id, e.target.value);
    setFormValue(e.target.id, e.target.value);
  };

  const fields = localStorage.getItem("form-storage")
    ? JSON.parse(localStorage.getItem("form-storage")!).state.formValue
    : "";

  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!cvRef.current) {
      return alert("Không tìm thấy element để in");
    }

    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        throw new Error("Không thể mở cửa sổ in. Vui lòng cho phép popup.");
      }

      // Clone the entire document
      const doc = printWindow.document;
      doc.open();
      doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print CV</title>
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div id="print-root"></div>
        </body>
      </html>
    `);
      doc.close();

      // Clone the CV element and append to print window
      const printRoot = doc.getElementById("print-root");
      if (printRoot) {
        // Clone the CV element
        const cvClone = cvRef.current.cloneNode(true) as HTMLElement;

        // Reset any unwanted styles
        cvClone.style.width = "210mm";
        cvClone.style.margin = "0 auto";

        printRoot.appendChild(cvClone);

        // Trigger print after content is loaded
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
            printWindow.onafterprint = () => {
              printWindow.close();
            };
          }, 500);
        };
      }
    } catch (error) {
      console.error("Lỗi khi in:", error);
      alert("Có lỗi xảy ra khi mở cửa sổ in. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-8 print:py-0 print:bg-white grid grid-cols-2">
        <div className="form w-[210mm] max-h-[210mm] overflow-y-auto mx-auto bg-white p-10 shadow-lg print:shadow-none print:mx-0 print:p-6 print:w-full">
          <div>
            {/* Contact */}
            <div className="education">
              <label htmlFor="">Ảnh</label>
              <div
                className="relative group"
                style={{ width: "150px", height: "150px" }}
              >
                <img
                  src={no_image.src}
                  className="border-2 border-gray-500 object-contain shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 invisible group-hover:visible transition-opacity duration-300">
                  <ImageCroppingLayout />
                </div>
              </div>
              <div className="education-containers">
                <label>Liên hệ</label>
                <div className="border p-2 grid grid-cols-1">
                  <label>Họ</label>
                  <input
                    id="FirstName"
                    value={fields.FirstName}
                    className="mb-2 w-[500px]"
                    onChange={(e) => handleContact(e)}
                    placeholder="Nguyễn"
                    style={{
                      fontSize: 15,
                    }}
                  />
                  <label>Tên</label>
                  <input
                    id="LastName"
                    value={fields.LastName}
                    className="mb-2 w-[500px]"
                    onChange={(e) => handleContact(e)}
                    placeholder="Tên"
                    style={{
                      fontSize: 15,
                    }}
                  />
                  <label>Vị trí tuyển dụng</label>
                  <input
                    id="Title"
                    value={fields.Title}
                    className="mb-2 w-[500px]"
                    onChange={(e) => handleContact(e)}
                    placeholder="Nhân viên bán hàng, ..."
                    style={{
                      fontSize: 15,
                    }}
                  />
                  <label>Địa chỉ</label>
                  <input
                    id="Address"
                    value={fields.Address}
                    className="mb-2 w-[500px]"
                    onChange={(e) => handleContact(e)}
                    placeholder="Đường A, Phường B, Quận C, TP. D"
                    style={{
                      fontSize: 15,
                    }}
                  />
                  <label>Email</label>
                  <input
                    id="Email"
                    value={fields.Email}
                    className="mb-2 w-[500px]"
                    onChange={(e) => handleContact(e)}
                    placeholder="nguyenvana@vidu.com"
                    style={{
                      fontSize: 15,
                    }}
                  />
                  <label>Số điện thoại</label>
                  <input
                    id="Phone"
                    value={fields.Phone}
                    type="number"
                    onChange={(e) => handleContact(e)}
                    className="mb-2 w-[200px]"
                    placeholder="0123456789"
                    style={{
                      fontSize: 15,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Education
            resume={formValue}
            fields={fields}
            addItem={addItem}
            handleDeleteValue={handleDeleteValue}
            setFormArrayValue={setFormArrayValue}
          />
          {/* #Skill */}
          <Skill
            resume={formValue}
            fields={fields}
            addItem={addItem}
            handleDeleteValue={handleDeleteValue}
            setFormArrayValue={setFormArrayValue}
          />
          {/* #Project */}
          <Project
            resume={formValue}
            fields={fields}
            addItem={addItem}
            handleDeleteValue={handleDeleteValue}
            setFormArrayValue={setFormArrayValue}
          />
          {/* #SocialLink */}
          <SocialLink
            resume={formValue}
            fields={fields}
            addItem={addItem}
            handleDeleteValue={handleDeleteValue}
            setFormArrayValue={setFormArrayValue}
          />
        </div>
        <div className="mb-4 items-center print:hidden">
          <div
            ref={cvRef}
            className="cv-template w-[210mm] min-h-[297mm] mx-auto bg-white p-10 shadow-lg print:shadow-none print:mx-0 print:p-6 print:w-full"
            style={{
              fontFamily: "Arial, sans-serif",
              lineHeight: "1.5",
              fontSize: `${style.fontSize}px`,
            }}
          >
            <ScaleProvider scale={1}>
              <TemplateDefault resume={formValue} style={style} mode="Edit" />
            </ScaleProvider>
          </div>
          <div className="flex justify-center">
            <button
              className="px-10 py-2 rounded-md font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
              onClick={() => {
                handlePrint();
              }}
            >
              In CV
            </button>
          </div>
        </div>

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
    </>
  );
}
