import { HouseIconFA, MailIconFA, PhoneIconFA } from "../icons/Icons";
import DOMPurify from "dompurify";

const NameSection = ({ resume, size }: any) => {
  return (
    <section className="name font-bold" style={{ fontSize: `${size.name}px` }}>
      {resume && resume.LastName} {resume && resume.FirstName}
    </section>
  );
};

const TitleSection = ({ resume, size }: any) => {
  return (
    <section
      className="title font-bold"
      style={{ fontSize: `${size.title}px` }}
    >
      {resume && resume.Title}
    </section>
  );
};

const ImageSection = ({ resume, size }: any) => {
  return (
    <img
      className="image"
      src={`${resume && resume.ImageProfile}`}
      style={{
        width: `${size.image.width}px`,
        height: `${size.image.height}px`,
      }}
    />
  );
};

const ContactSection = ({ resume, size }: any) => {
  return (
    <section className="contact">
      <div className="font-bold" style={{ fontSize: size.sectionTitle }}>
        Liên hệ
      </div>
      {/* ADDRESS */}
      <div
        className=""
        style={{
          fontSize: size.paragraph,
        }}
      >
        <div
          className="flex"
          style={{
            gap: `${size.icon.gap}px`,
          }}
        >
          <HouseIconFA size={size.icon.size} />
          <div className="break-words max-w-[200px]">
            {resume && resume.Address}
          </div>
        </div>
      </div>
      {/* PHONE */}
      <div
        className=""
        style={{
          fontSize: size.paragraph,
        }}
      >
        <div
          className="flex"
          style={{
            gap: `${size.icon.gap}px`,
          }}
        >
          <PhoneIconFA size={size.icon.size} />
          <div className="max-w-[100px]">{resume && resume.Phone}</div>
        </div>
      </div>
      {/* GMAIL */}
      <div
        className="gmail"
        style={{
          fontSize: size.paragraph,
        }}
      >
        <div
          className="flex"
          style={{
            gap: `${size.icon.gap}px`,
          }}
        >
          <MailIconFA size={size.icon.size} />
          <div className="break-words max-w-[220px]">
            {resume && resume.Email}
          </div>
        </div>
      </div>
    </section>
  );
};

const EducationSection = ({ resume, size }: any) => {
  return (
    <section className="education">
      <div className="font-bold" style={{ fontSize: size.sectionTitle }}>
        Học vấn
      </div>
      {resume &&
        resume.Education.map((edu: any) => (
          <div key={edu.Id} className="">
            <div
              className=""
              style={{
                fontSize: size.paragraph,
              }}
            >
              {edu.StartDate} – {edu.EndDate}
            </div>
            {/* INSTITUTION */}
            <div
              className=""
              style={{
                fontSize: size.paragraph,
              }}
            >
              {edu.Institution}
            </div>
            {/* DEGREE */}
            <div
              className=""
              style={{
                fontSize: size.paragraph,
              }}
            >
              {edu.Degree}
            </div>
          </div>
        ))}
    </section>
  );
};

const SkillSection = ({ resume, size }: any) => {
  return (
    <section className="skill">
      <div
        className="skill-title font-bold"
        style={{ fontSize: size.sectionTitle }}
      >
        Kĩ năng
      </div>
      {resume &&
        resume.Skill.map((sk: any) => (
          <div
            key={sk.Id}
            style={{
              fontSize: size.paragraph,
            }}
          >
            {sk.SkillName} : {sk.ProficiencyLevel}
          </div>
        ))}
    </section>
  );
};

const SocialLinkSection = ({ resume, scale, size }: any) => {
  return (
    <section className="social-link">
      <div className="font-bold" style={{ fontSize: size.sectionTitle }}>
        Liên kết mạng xã hội
      </div>

      <ol style={{ fontSize: size.paragraph }}>
        {resume &&
          resume.SocialLink.map((link: any) => (
            <li
              key={link.Id}
              className="break-words flex"
              data-list="bullet"
              style={{ "--scale": scale } as React.CSSProperties}
            >
              <div className="">
                {link.Platform ? `${link.Platform}: ` : null}
                <a href={link.Url} target="_blank" className="text-gray-600">
                  {link.Url}
                </a>
              </div>
            </li>
          ))}
      </ol>
    </section>
  );
};

const ProjectSection = ({ resume, scale, size }: any) => {
  return (
    <section className="resume">
      <div
        className="resume-title font-bold"
        style={{ fontSize: size.sectionTitle }}
      >
        Dự án
      </div>

      <div className="">
        {resume &&
          resume.Project.map((project: any) => {
            const processedDescription = project.Description.replace(
              /<ul\b[^>]*>/g,
              '<ul data-list="bullet" style="--scale: ' + scale + '">'
            ).replace(/<li\b/g, '<li data-list="bullet"');

            return (
              <div
                key={project.Id}
                style={{
                  fontSize: size.paragraph,
                }}
              >
                <div className="font-bold">
                  ({project.StartDate} – {project.EndDate})
                </div>
                <div
                  className="font-bold"
                  style={{
                    fontSize: size.paragraph,
                  }}
                >
                  {project.ProjectName}
                </div>
                <div
                  className="list-disc"
                  dangerouslySetInnerHTML={{
                    __html: `
                    <style>
                    .public-DraftStyleDefault-ul,
                    .public-DraftStyleDefault-ul ul {
                        list-style-type: disc !important;
                        padding-left: 1em !important;
                        margin: 0;
                    }
                    </style>
                    ${DOMPurify.sanitize(processedDescription)}
                    `,
                  }}
                ></div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export {
  NameSection,
  TitleSection,
  ImageSection,
  ContactSection,
  EducationSection,
  SkillSection,
  SocialLinkSection,
  ProjectSection,
};
