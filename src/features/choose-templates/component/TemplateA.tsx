import { useScaleContext } from "@/context/ScaleContext";
import { PhoneIconFA, HouseIconFA, MailIconFA } from "@/components/icons/Icons";

export function TemplateA({ data }: any) {
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
            size: 200 * scale,
        },
    };

    const border = {
        width: `${1 * scale}px`,
        margin: `${20 * scale}px`,
    };

    console.log(data);

    return (
        <>
            <div className="template_A border h-full overflow-hidden p-2 bg-white">
                <div className="header-resume flex justify-between items-start">
                    {/* NAME */}
                    <div className="text-left">
                        <div
                            className="name font-bold"
                            style={{ fontSize: `${size.name}px` }}
                        >{`${
                            !data
                                ? "Ho va ten"
                                : `${data.LastName} ${data.FirstName}`
                        }`}</div>
                        <div
                            className="title"
                            style={{ fontSize: `${size.title}px` }}
                        >
                            {!data ? "" : data.Title}
                        </div>
                    </div>
                    {/* IMAGE PROFILE */}
                    <img
                        src={data.ImageProfile}
                        className="rounded-full border-4 border-gray-500 object-contain shadow-lg"
                        style={{
                            width: `${size.image.size}px`,
                            height: `${size.image.size}px`,
                        }}
                    />
                </div>

                <div
                    className="border-gray-500"
                    style={{
                        borderWidth: border.width,
                        marginTop: border.margin,
                        marginBottom: border.margin,
                    }}
                ></div>

                <div className="information flex">
                    {/* Left column (contact, education, skills, social) */}
                    <div
                        style={{
                            width: `${300 * scale}px`,
                        }}
                    >
                        {/* CONTATCT */}
                        <section className="contact">
                            <div
                                className="font-bold"
                                style={{ fontSize: size.sectionTitle }}
                            >
                                Liên hệ
                            </div>
                            {/* ADDRESS */}
                            <div
                                className=""
                                style={{
                                    fontSize: size.paragraph,
                                }}
                            >
                                {!data.Address ? (
                                    ""
                                ) : (
                                    <>
                                        <div
                                            className="flex"
                                            style={{
                                                gap: `${size.icon.gap}px`,
                                            }}
                                        >
                                            <HouseIconFA
                                                size={size.icon.size}
                                            />
                                            <div className="break-words max-w-[100px]">
                                                {data.Address}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            {/* PHONE */}
                            <div
                                className=""
                                style={{
                                    fontSize: size.paragraph,
                                }}
                            >
                                {!data.Phone ? (
                                    ""
                                ) : (
                                    <>
                                        <div
                                            className="flex"
                                            style={{
                                                gap: `${size.icon.gap}px`,
                                            }}
                                        >
                                            <PhoneIconFA
                                                size={size.icon.size}
                                            />
                                            <div className="break-words max-w-[100px]">
                                                {data.Phone}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            {/* GMAIL */}
                            <div
                                className=""
                                style={{
                                    fontSize: size.paragraph,
                                }}
                            >
                                {!data.Email ? (
                                    ""
                                ) : (
                                    <>
                                        <div
                                            className="flex"
                                            style={{
                                                gap: `${size.icon.gap}px`,
                                            }}
                                        >
                                            <MailIconFA size={size.icon.size} />
                                            <div className="break-words max-w-[100px]">
                                                {data.Email}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>

                        <section className="education">
                            <div
                                className="font-bold"
                                style={{ fontSize: size.sectionTitle }}
                            >
                                Học vấn
                            </div>
                            {!data.Education
                                ? ""
                                : data.Education.map((edu: any) => (
                                      <div key={edu.Id} className="">
                                          <p
                                              className=""
                                              style={{
                                                  fontSize: size.paragraph,
                                              }}
                                          >
                                              {edu.StartDate} – {edu.EndDate}
                                          </p>
                                          <p
                                              className=""
                                              style={{
                                                  fontSize: size.paragraph,
                                              }}
                                          >
                                              {edu.Institution}
                                          </p>
                                          <p
                                              className=""
                                              style={{
                                                  fontSize: size.paragraph,
                                              }}
                                          >
                                              {edu.Degree}
                                          </p>
                                      </div>
                                  ))}
                        </section>

                        <section className="skills">
                            <div
                                className="font-bold"
                                style={{ fontSize: size.sectionTitle }}
                            >
                                Kĩ năng
                            </div>
                            <ul className="list-disc list-inside">
                                {!data.Skill
                                    ? ""
                                    : data.Skill.map((sk: any) => (
                                          <li
                                              key={sk.Id}
                                              style={{
                                                  fontSize: size.paragraph,
                                              }}
                                          >
                                              {sk.SkillName}
                                          </li>
                                      ))}
                            </ul>
                        </section>

                        <section className="social-link">
                            <div
                                className="font-bold"
                                style={{ fontSize: size.sectionTitle }}
                            >
                                Liên kết mạng xã hội
                            </div>

                            <ul className="">
                                {!data.SocialLink
                                    ? ""
                                    : data.SocialLink.map((link: any) => (
                                          <li
                                              key={link.Id}
                                              className="break-words flex"
                                              style={{
                                                  fontSize: size.paragraph,
                                              }}
                                          >
                                              <div className="mr-[2px]">
                                                  {link.Platform
                                                      ? `${link.Platform}: `
                                                      : null}
                                              </div>
                                              <a
                                                  href={link.Url}
                                                  className="text-blue-600 hover:underline"
                                              >
                                                  {link.Url}
                                              </a>
                                          </li>
                                      ))}
                            </ul>
                        </section>
                    </div>

                    <div
                        className="border-gray-500"
                        style={{
                            borderWidth: border.width,
                            height: `${800 * scale}px`,
                            marginRight: border.margin,
                            marginLeft: border.margin,
                        }}
                    ></div>

                    <div className="w-full">
                        <section className="">
                            <div
                                className="font-bold"
                                style={{ fontSize: size.sectionTitle }}
                            >
                                Dự án
                            </div>

                            <ul className="">
                                {!data
                                    ? ""
                                    : data.Project.map((project: any) => (
                                          <div
                                              key={project.Id}
                                              style={{
                                                  fontSize: size.paragraph,
                                              }}
                                          >
                                              <div className="font-bold">
                                                  - {project.ProjectName} (
                                                  {project.StartDate} – {" "}
                                                  {project.EndDate})
                                              </div>
                                              <p className="break-words overflow-x-auto">
                                                  {project.Description}
                                              </p>
                                          </div>
                                      ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
