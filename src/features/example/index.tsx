import React, {useRef, useEffect, useState} from "react";
import "./responsive.css"

export default function PostsLayout() {
    const items = [1, 2, 3, 4, 5];
    const scale = 1

    const originalWidthMm = 210;
    const originalHeightMm = 297;

    const widthScaledMm = originalWidthMm * scale;    
    const heightScaledMm = originalHeightMm * scale;

    return (
        <div className="container flex justify-center items-start gap-6 mx-auto"
        >
            {items.map((item) => (
            <div
                key={item}
                className="flex justify-center"
                style={{
                    width: `${widthScaledMm}mm`,
                    height: `${heightScaledMm}mm`,
                }}
            >
                <TestCV scale={scale}/>
            </div>
            ))}
        </div>
    );
}

const TestCV = ({ scale }: any) => {
    scale += 0.2;

    const fontSize = {
        name: `${40 * scale}px`, 
        title: `${30 * scale}px`, 
        sectionTitle: `${10 * scale}px`, // Tiêu đề section
        paragraph: `${8 * scale}px`, // Đoạn văn
    };

  return (
    <div className="p-2 border overflow-hidden rounded-2xl">
        <div className="name font-bold text-center" style={{ fontSize: fontSize.name }}>
            John Doe
        </div>
        {/* <p className="title text-center" style={{ fontSize: fontSize.title }}>
            Web Developer
        </p> */}
        <hr className="my-2 border-gray-300" />

        <div className="flex">
            <section className="">
            <h2
                className="font-semibold"
                style={{ fontSize: fontSize.sectionTitle }}
            >
                Summary
            </h2>
            <p
                className="text-sm text-gray-700"
                style={{ fontSize: fontSize.paragraph }}
            >
                Experienced web developer with a passion for creating responsive and
                user-friendly websites. ...
            </p>
            </section>

            <section className="">
            <h2
                className="font-semibold"
                style={{ fontSize: fontSize.sectionTitle }}
            >
                Experience
            </h2>
            <p
                className="text-sm text-gray-700"
                style={{ fontSize: fontSize.paragraph }}
            >
                Worked at XYZ Company as a Frontend Developer. ...
            </p>
            </section>
        </div>
    </div>
  );
};
