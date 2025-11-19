import { useScaleContext } from "@/context/ScaleContext";
import DOMPurify from "dompurify";
import Metadata from "@/utils/Metadata";
import { useColorContext } from "@/context/ColorContext";
import {
  ImageSection,
  NameSection,
  TitleSection,
  ContactSection,
  ProjectSection,
  SocialLinkSection,
  SkillSection,
} from "./SectionLayout";
import SocialLink from "@/features/viet-cv/components/5_SocialLink";

export default function TemplateDefault({ resume }: any) {
  const scale = useScaleContext();
  const color = useColorContext();
  const size = Metadata.styling(scale);

  return (
    <div className="templateDefault p-2">
      {/* IMAGE_PROFILE */}
      <div>
        <ImageSection resume={resume} size={size} />
      </div>
      {/* NAME */}
      <div>
        <NameSection resume={resume} size={size} />
      </div>
      <div>
        <TitleSection resume={resume} size={size} />
      </div>
      {/* CONTACT */}
      <div>
        <ContactSection resume={resume} size={size} />
      </div>
      {/* SKILL */}
      <SkillSection resume={resume} scale={scale} size={size} />
      {/* PROJECT */}
      <ProjectSection resume={resume} scale={scale} size={size} />
      {/* SOCIAL LINK */}
      <SocialLinkSection resume={resume} scale={scale} size={size} />
    </div>
  );
}
