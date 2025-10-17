import React from "react";
import { useScaleContext } from "@/context/ScaleContext";
import { PhoneIconFA, HouseIconFA, MailIconFA } from "@/components/icons/Icons";

export function TemplateE({ data }: any) {
  const scale = useScaleContext();

  const size = {
    name: 32 * scale,
    title: 18 * scale,
    sectionTitle: 16 * scale,
    paragraph: 14 * scale,
    icon: 14 * scale,
    image: 120 * scale,
  };

  return (
    <div
      className="template_E bg-white text-gray-900 border rounded-2xl shadow-lg overflow-hidden mx-auto"
      style={{
        maxWidth: "800px",
        height: "100%",
        maxHeight: "1050px",
        overflowY: "auto",
      }}
    >
      {/* HEADER */}
      <div className="bg-purple-700 text-white flex items-center p-6">
        <img
          src={data.ImageProfile}
          alt="profile"
          className="rounded-full object-cover border-4 border-white shadow-md"
          style={{ width: size.image, height: size.image }}
        />
        <div className="ml-5">
          <h1
            className="font-bold"
            style={{ fontSize: size.name }}
          >
            {!data ? "Họ và tên" : `${data.LastName} ${data.FirstName}`}
          </h1>
          <p
            className="italic"
            style={{ fontSize: size.title }}
          >
            {data.Title}
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-col md:flex-row">
        {/* LEFT COLUMN */}
        <div className="md:w-1/3 bg-purple-50 p-5 flex flex-col gap-5 border-r border-gray-200">
          {/* CONTACT */}
          <section>
            <h2
              className="font-semibold text-purple-700 border-b border-purple-400 pb-1 uppercase"
              style={{ fontSize: size.sectionTitle }}
            >
              Liên hệ
            </h2>
            <ul className="mt-2 flex flex-col gap-1" style={{ fontSize: size.paragraph }}>
              {data.Address && (
                <li className="flex items-start gap-2">
                  <HouseIconFA size={size.icon} />
                  <span>{data.Address}</span>
                </li>
              )}
              {data.Phone && (
                <li className="flex items-start gap-2">
                  <PhoneIconFA size={size.icon} />
                  <span>{data.Phone}</span>
                </li>
              )}
              {data.Email && (
                <li className="flex items-start gap-2 break-all">
                  <MailIconFA size={size.icon} />
                  <span>{data.Email}</span>
                </li>
              )}
            </ul>
          </section>

          {/* SKILLS */}
          {data.Skill && (
            <section>
              <h2
                className="font-semibold text-purple-700 border-b border-purple-400 pb-1 uppercase"
                style={{ fontSize: size.sectionTitle }}
              >
                Kỹ năng
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-1 text-gray-800" style={{ fontSize: size.paragraph }}>
                {data.Skill.map((sk: any) => (
                  <li key={sk.Id}>{sk.SkillName}</li>
                ))}
              </ul>
            </section>
          )}

          {/* EDUCATION */}
          {data.Education && (
            <section>
              <h2
                className="font-semibold text-purple-700 border-b border-purple-400 pb-1 uppercase"
                style={{ fontSize: size.sectionTitle }}
              >
                Học vấn
              </h2>
              {data.Education.map((edu: any) => (
                <div key={edu.Id} className="mt-2">
                  <p className="font-semibold" style={{ fontSize: size.paragraph + 2 }}>
                    {edu.Institution}
                  </p>
                  <p style={{ fontSize: size.paragraph }}>{edu.Degree}</p>
                  <p className="text-gray-500" style={{ fontSize: size.paragraph - 2 }}>
                    {edu.StartDate} - {edu.EndDate}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* SOCIAL */}
          {data.SocialLink && (
            <section>
              <h2
                className="font-semibold text-purple-700 border-b border-purple-400 pb-1 uppercase"
                style={{ fontSize: size.sectionTitle }}
              >
                Mạng xã hội
              </h2>
              <ul className="mt-2 flex flex-col gap-1" style={{ fontSize: size.paragraph }}>
                {data.SocialLink.map((link: any) => (
                  <li key={link.Id}>
                    <span className="font-semibold">{link.Platform}: </span>
                    <a
                      href={link.Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline break-words"
                    >
                      {link.Url}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:w-2/3 p-6 flex flex-col gap-6 overflow-hidden">
          {/* ABOUT */}
          {data.About && (
            <section>
              <h2
                className="font-semibold text-purple-700 border-b border-purple-400 pb-1 uppercase"
                style={{ fontSize: size.sectionTitle }}
              >
                Giới thiệu
              </h2>
              <p className="text-gray-700 text-justify mt-2 leading-relaxed" style={{ fontSize: size.paragraph }}>
                {data.About}
              </p>
            </section>
          )}

          {/* PROJECTS */}
          {data.Project && (
            <section>
              <h2
                className="font-semibold text-purple-700 border-b border-purple-400 pb-1 uppercase"
                style={{ fontSize: size.sectionTitle }}
              >
                Dự án
              </h2>
              {data.Project.map((project: any) => (
                <div key={project.Id} className="mt-3">
                  <p className="font-semibold text-gray-900" style={{ fontSize: size.paragraph + 2 }}>
                    {project.ProjectName}
                  </p>
                  <p className="text-gray-500" style={{ fontSize: size.paragraph }}>
                    {project.StartDate} – {project.EndDate}
                  </p>
                  <p className="text-gray-700 mt-1 text-justify leading-relaxed" style={{ fontSize: size.paragraph }}>
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
