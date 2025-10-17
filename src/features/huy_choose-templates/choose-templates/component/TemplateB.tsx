import { useScaleContext } from "@/context/ScaleContext";
import { PhoneIconFA, HouseIconFA, MailIconFA } from "@/components/icons/Icons";

export function TemplateB({ data }: any) {
    const scale = useScaleContext();

    const size = {
        name: 32 * scale,          // Họ tên
        title: 16 * scale,         // Chức danh
        sectionTitle: 14 * scale,  // Tiêu đề section
        paragraph: 14 * scale,     // Nội dung, mô tả, ngày tháng
        icon: 14 * scale,          // Icon contact
        image: {
            width: 120 * scale,
            height: 120 * scale,
        },
    };

    return (
        <div className="template_B bg-white text-gray-900 h-full border border-gray-300 rounded-lg shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="header flex items-center gap-4 border-b border-gray-300 p-4">
                <img
                    src={data.ImageProfile}
                    className="rounded-full border object-cover"
                    style={{
                        width: `${size.image.width}px`,
                        height: `${size.image.height}px`,
                    }}
                />
                <div className="flex flex-col">
                    <div
                        className="font-bold text-gray-800"
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

            {/* BODY */}
            <div className="body flex mt-4 px-4 pb-4 gap-6">
                {/* LEFT COLUMN */}
                <div
                    className="w-1/3 flex flex-col gap-4 border-r border-gray-200 pr-4"
                    style={{ fontSize: `${size.paragraph}px` }}
                >
                    {/* CONTACT */}
                    <section>
                        <h2
                            className="font-semibold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-700"
                            style={{ fontSize: `${size.sectionTitle}px` }}
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

                    {/* EDUCATION */}
                    {data.Education?.length > 0 && (
                        <section>
                            <h2
                                className="font-semibold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-700"
                                style={{ fontSize: `${size.sectionTitle}px` }}
                            >
                                Học vấn
                            </h2>
                            <div className="space-y-2" style={{ fontSize: `${size.paragraph}px` }}>
                                {data.Education.map((edu: any) => (
                                    <div key={edu.Id}>
                                        <div className="font-medium">{edu.Institution}</div>
                                        <div className="text-gray-600">{edu.Degree}</div>
                                        <div className="text-gray-500">
                                            {edu.StartDate} - {edu.EndDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SKILLS */}
                    {data.Skill?.length > 0 && (
                        <section>
                            <h2
                                className="font-semibold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-700"
                                style={{ fontSize: `${size.sectionTitle}px` }}
                            >
                                Kĩ năng
                            </h2>
                            <ul className="list-disc list-inside space-y-1" style={{ fontSize: `${size.paragraph}px` }}>
                                {data.Skill.map((sk: any) => (
                                    <li key={sk.Id}>{sk.SkillName}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="w-2/3 flex flex-col gap-6" style={{ fontSize: `${size.paragraph}px` }}>
                    {/* PROJECTS */}
                    {data.Project?.length > 0 && (
                        <section>
                            <h2
                                className="font-semibold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-700"
                                style={{ fontSize: `${size.sectionTitle}px` }}
                            >
                                Dự án
                            </h2>
                            {data.Project.map((project: any) => (
                                <div key={project.Id} className="mb-3">
                                    <div className="font-semibold" style={{ fontSize: `${size.paragraph + 2}px` }}>
                                        {project.ProjectName}
                                    </div>
                                    <div className="text-gray-600" style={{ fontSize: `${size.paragraph}px` }}>
                                        {project.StartDate} – {project.EndDate}
                                    </div>
                                    <p className="text-gray-700 mt-1" style={{ fontSize: `${size.paragraph}px` }}>
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
