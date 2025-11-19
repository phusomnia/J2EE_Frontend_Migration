import { useScaleContext } from "@/context/ScaleContext";
import { PhoneIconFA, HouseIconFA, MailIconFA } from "@/components/icons/Icons";
import Metadata from "@/utils/Metadata";
import DOMPurify from "dompurify";
import {
  NameSection,
  TitleSection,
  ImageSection,
  ContactSection,
  EducationSection,
  SkillSection,
  SocialLinkSection,
  ProjectSection,
} from "./SectionLayout";

export default function TemplateA({ resume }: any) {
  const scale = useScaleContext();
  const size = Metadata.styling(scale);

  return (
    <>
      <div className="template_A p-2">
        <div className="header-resume flex justify-between items-start border-gray-500 border-b mb-2">
          {/* NAME */}
          <div className="text-left">
            <NameSection resume={resume} size={size} />
            <TitleSection resume={resume} size={size} />
          </div>
          {/* IMAGE PROFILE */}
          <div className="p-2">
            <ImageSection resume={resume} size={size} />
          </div>
        </div>
        <div className="information grid grid-cols-3">
          {/* Left column (contact, education, skills, social) */}
          <div className="left-column pr-2 border-r border-gray-300 col-span-1">
            {/* CONTATCT */}
            <ContactSection resume={resume} size={size} />
            {/* EDUCATION */}
            <EducationSection resume={resume} size={size} />
            {/* SKILLS */}
            <SkillSection resume={resume} size={size} />
            {/* SOCIAL LINK */}
            <SocialLinkSection resume={resume} scale={scale} size={size} />
          </div>
          <div className="right-column ml-2 col-span-2">
            {/* PROJECT */}
            <ProjectSection resume={resume} scale={scale} size={size} />
          </div>
        </div>
      </div>
    </>
  );
}

/**
                          <style>
                            ul { 
                              list-style-type: disc !important; 
                              padding-left: 1.5rem !important;
                            }
                            li { display: list-item !important; }
                          </style>
 */
