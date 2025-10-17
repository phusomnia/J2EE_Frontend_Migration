import { useScaleContext } from "@/context/ScaleContext";
import { PhoneIconFA, HouseIconFA, MailIconFA } from "@/components/icons/Icons";

export function TemplateH({ data }: any) {
    const scale = useScaleContext();

    const size = {
        name: 32 * scale,
        title: 18 * scale,
        sectionTitle: 16 * scale,
        paragraph: 14 * scale,
        icon: {
            size: 14 * scale,
        },
        image: {
            width: 100 * scale,
            height: 100 * scale,
        },
    };

    return (
        <div className="template_H bg-white text-gray-900 h-full rounded-xl shadow-md overflow-hidden p-6 space-y-6">
            {/* HEADER */}
            <div className="flex items-center gap-4">
                <img
                    src={data.ImageProfile}
                    className="rounded-full border-2 border-gray-200 object-cover"
                    style={{
                        width: `${size.image.width}px`,
                        height: `${size.image.height}px`,
                    }}
                />
                <div>
                    <div
                        className="font-bold text-gray-900"
                        style={{ fontSize: `${size.name}px` }}
                    >
                        {!data ? "Họ và tên" : `${data.LastName} ${data.FirstName}`}
                    </div>
                    <div
                        className="italic text-gray-600"
                        style={{ fontSize: `${size.title}px` }}
                    >
                        {!data ? "Chức danh" : data.Title}
                    </div>
                </div>
            </div>

            {/* CONTACT CARD */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2
                    className="font-semibold mb-2 text-gray-700"
                    style={{ fontSize: `${size.sectionTitle}px` }}
                >
                    Liên hệ
                </h2>
                <ul className="space-y-2" style={{ fontSize: `${size.paragraph}px` }}>
                    {data.Address && (
                        <li className="flex items-center gap-2">
                            <HouseIconFA size={size.icon.size} />
                            <span>{data.Address}</span>
                        </li>
                    )}
                    {data.Phone && (
                        <li className="flex items-center gap-2">
                            <PhoneIconFA size={size.icon.size} />
                            <span>{data.Phone}</span>
                        </li>
                    )}
                    {data.Email && (
                        <li className="flex items-center gap-2">
                            <MailIconFA size={size.icon.size} />
                            <span>{data.Email}</span>
                        </li>
                    )}
                </ul>
            </div>

            {/* SKILLS CARD */}
            {data.Skill?.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h2
                        className="font-semibold mb-2 text-gray-700"
                        style={{ fontSize: `${size.sectionTitle}px` }}
                    >
                        Kĩ năng
                    </h2>
                    <ul className="list-disc list-inside space-y-1" style={{ fontSize: `${size.paragraph}px` }}>
                        {data.Skill.map((sk: any) => (
                            <li key={sk.Id}>{sk.SkillName}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* EDUCATION CARD */}
            {data.Education?.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h2
                        className="font-semibold mb-2 text-gray-700"
                        style={{ fontSize: `${size.sectionTitle}px` }}
                    >
                        Học vấn
                    </h2>
                    <div className="space-y-2" style={{ fontSize: `${size.paragraph}px` }}>
                        {data.Education.map((edu: any) => (
                            <div key={edu.Id}>
                                <div className="font-medium">{edu.Institution}</div>
                                <div className="text-gray-600">{edu.Degree}</div>
                                <div className="text-gray-500 text-sm">
                                    {edu.StartDate} - {edu.EndDate}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* PROJECTS CARD */}
            {data.Project?.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h2
                        className="font-semibold mb-2 text-gray-700"
                        style={{ fontSize: `${size.sectionTitle}px` }}
                    >
                        Dự án
                    </h2>
                    {data.Project.map((project: any) => (
                        <div key={project.Id} className="mb-3" style={{ fontSize: `${size.paragraph}px` }}>
                            <div className="font-semibold">{project.ProjectName}</div>
                            <div className="text-gray-600 text-sm">
                                {project.StartDate} – {project.EndDate}
                            </div>
                            <p className="text-gray-700 mt-1">{project.Description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
    