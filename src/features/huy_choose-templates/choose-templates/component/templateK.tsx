import React from "react";
import { useScaleContext } from "@/context/ScaleContext";
import { PhoneIconFA, HouseIconFA, MailIconFA } from "@/components/icons/Icons";

export function TemplateK({ data }: any) {
  const scale = useScaleContext();

  const size = {
    name: 30 * scale,
    title: 16 * scale,
    sectionTitle: 16 * scale,
    paragraph: 14 * scale,
    icon: 14 * scale,
    image: {
      width: 100 * scale,
      height: 100 * scale,
    },
  };

  return (
    <div className="template_INew bg-white text-gray-900 rounded-2xl shadow-xl flex overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div className="w-1/4 bg-blue-50 p-6 flex flex-col items-center gap-4">
        <img
          src={data.ImageProfile}
          className="rounded-full border-2 border-blue-200 object-cover shadow-md"
          style={{ width: size.image.width, height: size.image.height }}
        />
        <div className="text-center">
          <div className="font-bold text-blue-900" style={{ fontSize: size.name }}>
            {!data ? "Họ và tên" : `${data.LastName} ${data.FirstName}`}
          </div>
          <div className="italic text-blue-700" style={{ fontSize: size.title }}>
            {!data ? "Chức danh" : data.Title}
          </div>
        </div>

        {/* CONTACT */}
        <div className="w-full mt-4">
          <h2 className="font-semibold text-blue-800 mb-2 uppercase border-b border-blue-300" style={{ fontSize: size.sectionTitle }}>
            Liên hệ
          </h2>
          <ul className="space-y-2" style={{ fontSize: size.paragraph }}>
            {data.Address && <li className="flex items-center gap-2"><HouseIconFA size={size.icon} /><span>{data.Address}</span></li>}
            {data.Phone && <li className="flex items-center gap-2"><PhoneIconFA size={size.icon} /><span>{data.Phone}</span></li>}
            {data.Email && <li className="flex items-center gap-2"><MailIconFA size={size.icon} /><span>{data.Email}</span></li>}
          </ul>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-3/4 p-6 flex flex-col gap-6 overflow-y-auto">
        {/* SKILLS */}
        {data.Skill?.length > 0 && (
          <section>
            <h2 className="font-semibold text-blue-800 mb-2 uppercase border-b border-blue-300" style={{ fontSize: size.sectionTitle }}>
              Kĩ năng
            </h2>
            <ul className="list-disc list-inside flex flex-wrap gap-2" style={{ fontSize: size.paragraph }}>
              {data.Skill.map((sk: any) => (
                <li key={sk.Id} className="bg-blue-100 px-2 py-1 rounded-md">{sk.SkillName}</li>
              ))}
            </ul>
          </section>
        )}

        {/* EDUCATION TIMELINE */}
        {data.Education?.length > 0 && (
          <section>
            <h2 className="font-semibold text-blue-800 mb-4 uppercase border-b border-blue-300" style={{ fontSize: size.sectionTitle }}>
              Học vấn
            </h2>
            <div className="flex flex-col gap-4">
              {data.Education.map((edu: any) => (
                <div key={edu.Id} className="bg-blue-50 p-3 rounded-lg shadow-sm border-l-4 border-blue-400">
                  <div className="font-medium text-blue-900" style={{ fontSize: size.paragraph }}>{edu.Institution}</div>
                  <div style={{ fontSize: size.paragraph }}>{edu.Degree}</div>
                  <div className="text-blue-700" style={{ fontSize: size.paragraph }}>
                    {edu.StartDate} – {edu.EndDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS TIMELINE */}
        {data.Project?.length > 0 && (
          <section>
            <h2 className="font-semibold text-blue-800 mb-4 uppercase border-b border-blue-300" style={{ fontSize: size.sectionTitle }}>
              Dự án
            </h2>
            <div className="flex flex-col gap-4">
              {data.Project.map((project: any) => (
                <div key={project.Id} className="bg-blue-50 p-3 rounded-lg shadow-sm border-l-4 border-green-400">
                  <div className="font-semibold text-blue-900" style={{ fontSize: size.paragraph + 2 }}>{project.ProjectName}</div>
                  <div className="text-blue-700" style={{ fontSize: size.paragraph }}>
                    {project.StartDate} – {project.EndDate}
                  </div>
                  <p className="text-gray-700 mt-1" style={{ fontSize: size.paragraph }}>
                    {project.Description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
