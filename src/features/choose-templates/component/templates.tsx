import { ScaleProvider, useScaleContext } from "@/context/ScaleContext";

export function TemplateA({data}: any)
{
    const scale = useScaleContext();
    // const color = 

    const fontSize = {
        name: `${40 * scale}px`, 
        title: `${25 * scale}px`, 
        sectionTitle: `${30 * scale}px`, 
        paragraph: `${20 * scale}px`, 
    };

    return <>
        <div className="template_A border h-full overflow-hidden p-2 bg-white">
            {/* Header: name + image */}
            <div className="header-resume flex flex-col">
                <div className="text-left">
                    <div 
                        className="name font-bold"
                        style={{ fontSize: fontSize.name }}
                    >{`${data.FirstName} ${data.LastName}`}</div>
                    <div 
                        className="title"
                        style={{ fontSize: fontSize.title }}   
                    >{data.Title}</div>
                </div>
                {/* <img
                src={data.ImageProfile}
                alt={`${data.FirstName} ${data.LastName}`}
                className="rounded-full border-4 border-gray-500 object-contain shadow-lg h-24 w-24 sm:h-32 sm:w-32"
                /> */}
            </div>

            <div className="border-t-2 border-gray-500 my-4"></div>


            <div className="information flex gap-6">
                {/* Left column (education, skills, social) */}
                <div className="space-y-6 border-r-2 border-gray-500 pr-4">
                    <section className="education">
                        <div className="font-bold"
                        style={{ fontSize: fontSize.sectionTitle }}
                    >Education</div>
                        {data.Education.map((edu: any) => (
                            <div key={edu.Id} className="mb-2">
                                <p  
                                    className=""
                                    style={{ fontSize: fontSize.paragraph }}
                                >{edu.StartDate} – {edu.EndDate}</p>
                                <p 
                                    className=""
                                    style={{ fontSize: fontSize.paragraph }}
                                >{edu.Institution}</p>
                                <p
                                    className=""
                                    style={{ fontSize: fontSize.paragraph }}
                                >{edu.Degree}</p>
                            </div>
                        ))}
                    </section>

                    <section className="skills">
                        <div 
                            className="font-bold"
                            style={{ fontSize: fontSize.sectionTitle }}
                        >Skills</div>
                        <ul className="list-disc list-inside space-y-1">
                        {data.Skill.map((sk: any) => (
                            <li 
                                key={sk.Id}
                                style={{ fontSize: fontSize.paragraph }}
                            >
                                {sk.SkillName}
                            </li>
                        ))}
                        </ul>
                    </section>

                    <section className="social-link">
                        <div 
                            className="font-bold"
                            style={{ fontSize: fontSize.sectionTitle }}
                        >Social Links</div>

                        <ul className="space-y-1">
                            {data.SocialLink.map((link: any) => (
                                <li 
                                    key={link.Id} 
                                    className="break-words"
                                    style={{ fontSize: fontSize.paragraph }}
                                    >
                                    <span>{link.Platform}</span>:{" "}
                                    <a href={link.Url} className="text-blue-600 hover:underline">
                                        {link.Url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="w-full">
                    <section className="">
                        <div 
                            className="font-bold"
                            style={{ fontSize: fontSize.sectionTitle }}
                        >Projects</div>

                        <ul className="space-y-3">
                            {data.Project.map((project: any) => (
                                <div 
                                    key={project.Id}
                                    style={{ fontSize: fontSize.paragraph }}
                                >
                                    <div className="">
                                        {project.ProjectName} ({project.StartDate} – {project.EndDate})
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
}
