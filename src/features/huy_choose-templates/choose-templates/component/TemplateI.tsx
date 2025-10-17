import React from "react";
import { useScaleContext } from "@/context/ScaleContext";
import { PhoneIconFA, HouseIconFA, MailIconFA } from "@/components/icons/Icons";

export function TemplateI({ data }: any) {
  const scale = useScaleContext();

  const size = {
    name: 28 * scale,
    title: 16 * scale,
    sectionTitle: 16 * scale,
    paragraph: 14 * scale,
    icon: 14 * scale,
    image: {
      width: 80 * scale,
      height: 80 * scale,
    },
  };

  return (
    <div className="template_I bg-white text-gray-900 h-full rounded-xl shadow-lg overflow-hidden flex">
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-gray-50 p-6 flex flex-col items-center gap-4">
        <img
          src={data.ImageProfile}
          className="rounded-full border-2 border-gray-200 object-cover"
          style={{
            width: size.image.width,
            height: size.image.height,
          }}
        />
        <div className="text-center">
          <div
            className="font-bold text-gray-900"
            style={{ fontSize: size.name }}
          >
            {!data ? "Họ và tên" : `${data.LastName} ${data.FirstName}`}
          </div>
          <div
            className="italic text-gray-600"
            style={{ fontSize: size.title }}
          >
            {!data ? "Chức danh" : data.Title}
          </div>
        </div>

        {/* CONTACT */}
        <div className="w-full mt-4">
          <h2
            className="font-semibold mb-2 text-gray-700 uppercase"
            style={{ fontSize: size.sectionTitle }}
          >
            Liên hệ
          </h2>
          <ul className="space-y-2" style={{ fontSize: size.paragraph }}>
            {data.Address && (
              <li className="flex items-center gap-2">
                <HouseIconFA size={size.icon} />
                <span>{data.Address}</span>
              </li>
            )}
            {data.Phone && (
              <li className="flex items-center gap-2">
                <PhoneIconFA size={size.icon} />
                <span>{data.Phone}</span>
              </li>
            )}
            {data.Email && (
              <li className="flex items-center gap-2">
                <MailIconFA size={size.icon} />
                <span>{data.Email}</span>
              </li>
            )}
          </ul>
        </div>

        {/* SKILLS */}
        {data.Skill?.length > 0 && (
          <div className="w-full mt-4">
            <h2
              className="font-semibold mb-2 text-gray-700 uppercase"
              style={{ fontSize: size.sectionTitle }}
            >
              Kĩ năng
            </h2>
            <ul
              className="list-disc list-inside space-y-1"
              style={{ fontSize: size.paragraph }}
            >
              {data.Skill.map((sk: any) => (
                <li key={sk.Id}>{sk.SkillName}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-2/3 p-6 flex flex-col gap-6">
        {/* EDUCATION */}
        {data.Education?.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2
              className="font-semibold mb-2 text-gray-700 uppercase"
              style={{ fontSize: size.sectionTitle }}
            >
              Học vấn
            </h2>
            <div className="space-y-2">
              {data.Education.map((edu: any) => (
                <div key={edu.Id}>
                  <div
                    className="font-medium text-gray-900"
                    style={{ fontSize: size.paragraph }}
                  >
                    {edu.Institution}
                  </div>
                  <div style={{ fontSize: size.paragraph }}>{edu.Degree}</div>
                  <div className="text-gray-500" style={{ fontSize: size.paragraph }}>
                    {edu.StartDate} – {edu.EndDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {data.Project?.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2
              className="font-semibold mb-2 text-gray-700 uppercase"
              style={{ fontSize: size.sectionTitle }}
            >
              Dự án
            </h2>
            {data.Project.map((project: any) => (
              <div
                key={project.Id}
                className="mb-3"
                style={{ fontSize: size.paragraph }}
              >
                <div className="font-semibold text-gray-900" style={{ fontSize: size.paragraph + 2 }}>
                  {project.ProjectName}
                </div>
                <div className="text-gray-500" style={{ fontSize: size.paragraph }}>
                  {project.StartDate} – {project.EndDate}
                </div>
                <p className="text-gray-700 mt-1" style={{ fontSize: size.paragraph }}>
                  {project.Description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
