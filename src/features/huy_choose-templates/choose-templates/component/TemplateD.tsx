import React from "react";
import { useScaleContext } from "@/context/ScaleContext";
import { PhoneIconFA, HouseIconFA, MailIconFA } from "@/components/icons/Icons";

export function TemplateD({ data }: any) {
  const scale = useScaleContext();

  const size = {
    name: 36 * scale,
    title: 20 * scale,
    sectionTitle: 18 * scale,
    paragraph: 14 * scale,
    icon: 16 * scale,
    image: 150 * scale,
  };

  return (
    <div className="template_D w-full h-full flex bg-white text-gray-900 border rounded-2xl shadow-lg overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-blue-700 text-white flex flex-col items-center py-8 px-6">
        {/* PROFILE IMAGE */}
        <img
          src={data.ImageProfile}
          alt="profile"
          className="rounded-full border-4 border-white shadow-lg mb-4"
          style={{ width: size.image, height: size.image }}
        />

        {/* NAME */}
        <h1
          className="font-bold text-center"
          style={{ fontSize: size.name }}
        >
          {!data ? "Họ và tên" : `${data.LastName} ${data.FirstName}`}
        </h1>
        <p
          className="italic mt-1 text-center text-blue-100"
          style={{ fontSize: size.title }}
        >
          {data.Title}
        </p>

        {/* CONTACT */}
        <section className="mt-8 w-full">
          <h2
            className="font-semibold border-b border-blue-300 pb-1 mb-3 uppercase"
            style={{ fontSize: size.sectionTitle }}
          >
            Liên hệ
          </h2>
          <ul className="flex flex-col gap-2" style={{ fontSize: size.paragraph }}>
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
          <section className="mt-6 w-full">
            <h2
              className="font-semibold border-b border-blue-300 pb-1 mb-3 uppercase"
              style={{ fontSize: size.sectionTitle }}
            >
              Kỹ năng
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ fontSize: size.paragraph }}>
              {data.Skill.map((sk: any) => (
                <li key={sk.Id}>{sk.SkillName}</li>
              ))}
            </ul>
          </section>
        )}

        {/* SOCIAL LINKS */}
        {data.SocialLink && (
          <section className="mt-6 w-full">
            <h2
              className="font-semibold border-b border-blue-300 pb-1 mb-3 uppercase"
              style={{ fontSize: size.sectionTitle }}
            >
              Mạng xã hội
            </h2>
            <ul className="flex flex-col gap-1" style={{ fontSize: size.paragraph }}>
              {data.SocialLink.map((link: any) => (
                <li key={link.Id}>
                  <span className="font-semibold">{link.Platform}: </span>
                  <a
                    href={link.Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 hover:underline break-words"
                  >
                    {link.Url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-2/3 p-8 flex flex-col gap-8 overflow-y-auto">
        {/* ABOUT */}
        {data.About && (
          <section>
            <h2
              className="font-semibold text-blue-700 border-b-2 border-blue-700 pb-1 mb-3 uppercase"
              style={{ fontSize: size.sectionTitle }}
            >
              Giới thiệu
            </h2>
            <p className="text-gray-700 leading-relaxed" style={{ fontSize: size.paragraph }}>
              {data.About}
            </p>
          </section>
        )}

        {/* EDUCATION */}
        {data.Education && (
          <section>
            <h2
              className="font-semibold text-blue-700 border-b-2 border-blue-700 pb-1 mb-3 uppercase"
              style={{ fontSize: size.sectionTitle }}
            >
              Học vấn
            </h2>
            {data.Education.map((edu: any) => (
              <div key={edu.Id} className="mb-4">
                <h3 className="font-semibold text-gray-900" style={{ fontSize: size.paragraph + 2 }}>
                  {edu.Institution}
                </h3>
                <p style={{ fontSize: size.paragraph }}>{edu.Degree}</p>
                <p className="text-gray-500" style={{ fontSize: size.paragraph - 2 }}>
                  {edu.StartDate} - {edu.EndDate}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* PROJECTS */}
        {data.Project && (
          <section>
            <h2
              className="font-semibold text-blue-700 border-b-2 border-blue-700 pb-1 mb-3 uppercase"
              style={{ fontSize: size.sectionTitle }}
            >
              Dự án
            </h2>
            {data.Project.map((project: any) => (
              <div key={project.Id} className="mb-4">
                <h3 className="font-semibold text-gray-900" style={{ fontSize: size.paragraph + 2 }}>
                  {project.ProjectName}
                </h3>
                <p className="text-gray-500" style={{ fontSize: size.paragraph }}>
                  {project.StartDate} – {project.EndDate}
                </p>
                <p className="text-gray-700 mt-1 text-justify" style={{ fontSize: size.paragraph }}>
                  {project.Description}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
