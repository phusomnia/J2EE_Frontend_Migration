import React from "react";
import { useScaleContext } from "@/context/ScaleContext";
import { PhoneIconFA, HouseIconFA, MailIconFA } from "@/components/icons/Icons";

export function TemplateG({ data }: any) {
  const scale = useScaleContext();

  const size = {
    name: 38 * scale,
    title: 20 * scale,
    sectionTitle: 16 * scale,
    paragraph: 14 * scale,
    icon: 16 * scale,
    image: {
      width: 140 * scale,
      height: 140 * scale,
    },
  };

  return (
    <div className="template_G bg-white text-gray-900 h-full rounded-xl shadow-lg overflow-hidden p-6">
      {/* HEADER */}
      <div className="header flex flex-col items-center gap-3 mb-6">
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
      </div>

      {/* BODY */}
      <div className="body flex gap-8">
        {/* CONTACT + SKILL */}
        <div
          className="flex-1 flex flex-col gap-4"
          style={{ fontSize: size.paragraph }}
        >
          <section>
            <h2
              className="font-semibold uppercase mb-2 text-gray-700"
              style={{ fontSize: size.sectionTitle }}
            >
              Liên hệ
            </h2>
            <ul className="space-y-2">
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
          </section>

          {data.Skill?.length > 0 && (
            <section>
              <h2
                className="font-semibold uppercase mb-2 text-gray-700"
                style={{ fontSize: size.sectionTitle }}
              >
                Kĩ năng
              </h2>
              <ul className="list-disc list-inside space-y-1">
                {data.Skill.map((sk: any) => (
                  <li key={sk.Id} style={{ fontSize: size.paragraph }}>
                    {sk.SkillName}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* EDUCATION */}
        <div
          className="flex-1 flex flex-col gap-4"
          style={{ fontSize: size.paragraph }}
        >
          {data.Education?.length > 0 && (
            <section>
              <h2
                className="font-semibold uppercase mb-2 text-gray-700"
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
            </section>
          )}
        </div>

        {/* PROJECTS */}
        <div
          className="flex-1 flex flex-col gap-4"
          style={{ fontSize: size.paragraph }}
        >
          {data.Project?.length > 0 && (
            <section>
              <h2
                className="font-semibold uppercase mb-2 text-gray-700"
                style={{ fontSize: size.sectionTitle }}
              >
                Dự án
              </h2>
              {data.Project.map((project: any) => (
                <div key={project.Id} className="mb-3">
                  <div
                    className="font-semibold text-gray-900"
                    style={{ fontSize: size.paragraph + 2 }}
                  >
                    {project.ProjectName}
                  </div>
                  <div className="text-gray-500" style={{ fontSize: size.paragraph }}>
                    {project.StartDate} – {project.EndDate}
                  </div>
                  <p
                    className="text-gray-700 mt-1"
                    style={{ fontSize: size.paragraph }}
                  >
                    {project.Description}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
