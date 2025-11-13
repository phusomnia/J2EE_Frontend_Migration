import { useScaleContext } from "@/context/ScaleContext";
import ImageCroppingLayout from "@/features/build-cv/image-cropping/_layout";
import DOMPurify from "dompurify";

export default function TemplateDefault({ resume, style, mode }: any) {
  const scale = useScaleContext();

  const size = {
    name: 35 * scale,
    title: 30 * scale,
    sectionTitle: 20 * scale,
    paragraph: 15 * scale,
    icon: {
      size: 15 * scale,
      gap: 8 * scale,
    },
    image: {
      size: 150 * scale,
    },
  };

  return (
    <div>
      {/* IMAGE_PROFILE */}

      {/* Name */}
      <div className="" style={{ fontSize: `${size.name}px` }}>
        {resume ? resume.FirstName + " " + resume.LastName : ""}
      </div>
      <div className="" style={{ fontSize: `${size.title}px` }}>
        <div>{resume ? resume.Title : ""}</div>
      </div>
      {/*  */}
      <div className="my-2">
        <label
          className="font-bold"
          style={{ fontSize: `${size.sectionTitle}px` }}
        >
          Thông tin liên hệ
        </label>
        <div
          className="borderline-bottom"
          style={{ borderBottom: "1px solid black" }}
        ></div>
      </div>
      {/*  */}
      <div className="flex" style={{ fontSize: `${size.paragraph}px` }}>
        <label className="whitespace-nowrap mr-1">Địa chỉ: </label>
        <div>{resume ? resume.Address : ""}</div>
      </div>
      <div className="flex" style={{ fontSize: `${size.paragraph}px` }}>
        <label className="whitespace-nowrap mr-1">Email: </label>
        <div>{resume ? resume.Email : ""}</div>
      </div>
      {/* #Education */}
      <div className="my-2" style={{ fontSize: `${size.sectionTitle}px` }}>
        <label
          className="font-bold"
          style={{ fontSize: `${size.sectionTitle}px` }}
        >
          Học vấn
        </label>
        <div
          className="borderline-bottom"
          style={{ borderBottom: "1px solid black" }}
        ></div>
      </div>
      {resume &&
        resume.Education?.map((item: any) => (
          <div key={item.Id}>
            <div>
              {item.StartDate} - {item.EndDate}
            </div>
            <div className="flex mr-1">
              <label htmlFor="">Trường: </label>
              <div>{item.Institution}</div>
            </div>
            <div className="flex mr-1">
              <label htmlFor="">Bằng: </label>
              <div>{item.Degree}</div>
            </div>
          </div>
        ))}
      {/* #Skill */}
      <div className="my-2">
        <label className="font-bold">Kĩ năng</label>
        <div
          className="borderline-bottom"
          style={{ borderBottom: "1px solid black" }}
        ></div>
      </div>
      {resume &&
        resume.Skill?.map((item: any) => (
          <div key={item.Id}>
            <div className="flex mr-1">
              <div>
                {item.SkillName}: {item.ProficiencyLevel}
              </div>
            </div>
          </div>
        ))}
      {/* #Project */}
      <div className="my-2">
        <label className="font-bold">Dự án</label>
        <div
          className="borderline-bottom"
          style={{ borderBottom: "1px solid black" }}
        ></div>
      </div>
      <div>
        {resume &&
          resume.Project?.map((project: any) => (
            <div key={project.Id}>
              <div className="mr-1">
                <div>
                  {project.StartDate} - {project.EndDate}
                </div>
                <div>{project.ProjectName}</div>
                <div
                  className="list-disc"
                  dangerouslySetInnerHTML={{
                    __html: `
                        <style>
                          ul { 
                            list-style-type: disc !important; 
                            padding-left: 1.5rem !important;
                          }
                          li { display: list-item !important; }
                        </style>
                        ${DOMPurify.sanitize(project.Description)}
                      `,
                  }}
                ></div>
              </div>
            </div>
          ))}
      </div>
      {/* #SocialLink */}
      <div className="my-2">
        <label className="font-bold">Liên kết mạng xã hội</label>
        <div
          className="borderline-bottom"
          style={{ borderBottom: "1px solid black" }}
        ></div>
      </div>
      <div>
        {resume &&
          resume.SocialLink?.map((socialLink: any) => (
            <div key={socialLink.Id}>
              <div className="mr-1">
                <a target="_blank" href={socialLink.Url}>
                  {socialLink.Platform}
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
