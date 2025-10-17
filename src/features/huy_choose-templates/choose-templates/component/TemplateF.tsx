import { useScaleContext } from "@/context/ScaleContext";
import { PhoneIconFA, HouseIconFA, MailIconFA } from "@/components/icons/Icons";

export function TemplateF({ data }: any) {
    const scale = useScaleContext();

    const size = {
        name: 35 * scale,
        title: 28 * scale,
        sectionTitle: 20 * scale,
        paragraph: 15 * scale,
        icon: { size: 15 * scale, gap: 8 * scale },
        image: { size: 180 * scale },
    };

    const border = { width: `${1 * scale}px`, margin: `${20 * scale}px` };

    return (
        <div className="template_F border h-full overflow-hidden p-4 bg-white">
            {/* HEADER */}
            <div className="header-resume flex justify-between items-start mb-4">
                <div className="text-left">
                    <div className="name font-bold" style={{ fontSize: size.name }}>
                        {data ? `${data.LastName} ${data.FirstName}` : "Ho va ten"}
                    </div>
                    <div className="title italic opacity-80" style={{ fontSize: size.title }}>
                        {data ? data.Title : ""}
                    </div>
                </div>
                {data?.ImageProfile && (
                    <img
                        src={data.ImageProfile}
                        className="rounded-full border-4 border-gray-500 object-contain shadow-lg"
                        style={{
                            width: size.image.size,
                            height: size.image.size,
                        }}
                    />
                )}
            </div>

            <div
                className="border-gray-500"
                style={{
                    borderWidth: border.width,
                    marginTop: border.margin,
                    marginBottom: border.margin,
                }}
            ></div>

            {/* INFORMATION */}
            <div className="information flex">
                {/* LEFT COLUMN */}
                <div style={{ width: `${300 * scale}px` }}>
                    {/* CONTACT */}
                    <section className="contact mb-4">
                        <div className="font-bold" style={{ fontSize: size.sectionTitle }}>
                            Liên hệ
                        </div>
                        {data?.Address && (
                            <div className="flex gap-2" style={{ fontSize: size.paragraph }}>
                                <HouseIconFA size={size.icon.size} />
                                <div className="break-words max-w-[100px]">{data.Address}</div>
                            </div>
                        )}
                        {data?.Phone && (
                            <div className="flex gap-2" style={{ fontSize: size.paragraph }}>
                                <PhoneIconFA size={size.icon.size} />
                                <div className="break-words max-w-[100px]">{data.Phone}</div>
                            </div>
                        )}
                        {data?.Email && (
                            <div className="flex gap-2" style={{ fontSize: size.paragraph }}>
                                <MailIconFA size={size.icon.size} />
                                <div className="break-words max-w-[100px]">{data.Email}</div>
                            </div>
                        )}
                    </section>

                    {/* EDUCATION */}
                    <section className="education mb-4">
                        <div className="font-bold" style={{ fontSize: size.sectionTitle }}>
                            Học vấn
                        </div>
                        {data?.Education?.map((edu: any) => (
                            <div key={edu.Id} style={{ fontSize: size.paragraph, marginBottom: 4 }}>
                                <p>{edu.StartDate} – {edu.EndDate}</p>
                                <p>{edu.Institution}</p>
                                <p>{edu.Degree}</p>
                            </div>
                        ))}
                    </section>

                    {/* SKILLS */}
                    <section className="skills mb-4">
                        <div className="font-bold" style={{ fontSize: size.sectionTitle }}>
                            Kĩ năng
                        </div>
                        <ul className="list-disc list-inside">
                            {data?.Skill?.map((sk: any) => (
                                <li key={sk.Id} style={{ fontSize: size.paragraph }}>{sk.SkillName}</li>
                            ))}
                        </ul>
                    </section>

                    {/* SOCIAL LINKS */}
                    <section className="social-link">
                        <div className="font-bold" style={{ fontSize: size.sectionTitle }}>
                            Liên kết mạng xã hội
                        </div>
                        <ul>
                            {data?.SocialLink?.map((link: any) => (
                                <li key={link.Id} className="break-words flex" style={{ fontSize: size.paragraph }}>
                                    <div className="mr-[2px]">{link.Platform ? `${link.Platform}: ` : null}</div>
                                    <a href={link.Url} className="text-blue-600 hover:underline">{link.Url}</a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* BORDER CỘT */}
                <div
                    className="border-gray-500 mx-4"
                    style={{
                        borderWidth: border.width,
                        height: `${800 * scale}px`,
                    }}
                ></div>

                {/* RIGHT COLUMN */}
                <div className="flex-1">
                    <section>
                        <div className="font-bold mb-2" style={{ fontSize: size.sectionTitle }}>
                            Dự án
                        </div>
                        {data?.Project?.map((project: any) => (
                            <div key={project.Id} style={{ fontSize: size.paragraph, marginBottom: 8 }}>
                                <div className="font-bold">- {project.ProjectName} ({project.StartDate} – {project.EndDate})</div>
                                <p className="break-words overflow-x-auto">{project.Description}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
}
