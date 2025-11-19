import defaultImage from "@/../public/default_cv_img.png";

function formatedDate(date = new Date()): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export type Education = {
  Id: string;
  Institution: string;
  Degree: string;
  StartDate: string;
  EndDate: string;
};

export type Skill = {
  Id: string;
  SkillName: string;
  ProficiencyLevel: string;
};

export type Project = {
  Id: string;
  ProjectName: string;
  Description: string;
  StartDate: string;
  EndDate: string;
};

export type SocialLink = {
  Id: string;
  Platform: string;
  Url: string;
};

export type Resume = {
  Id: string;
  Title: string;
  FirstName: string;
  LastName: string;
  Address: string;
  ImageProfile: string;
  AccountId: string;
  CreatedAt: string;
  Education: Education[];
  Skill: Skill[];
  Project: Project[];
  SocialLink: SocialLink[];
};

export const mockResume = [
  {
    Id: crypto.randomUUID(),
    Title: "Fullstack Developer",
    FirstName: "Nguyễn",
    LastName: "Văn A",
    Address: "Đường số ABC",
    Email: "abc@gmail.com",
    Phone: "0999777888",
    ImageProfile: defaultImage.src,
    AccountId: crypto.randomUUID(),
    CreatedAt: formatedDate(new Date()),
    Education: [
      {
        Id: crypto.randomUUID(),
        Institution: "Đại học XYZ",
        Degree: "Chuyên nghành: công nghệ thông tin",
        StartDate: formatedDate(new Date(2020, 1, 1)),
        EndDate: formatedDate(new Date(2025, 1, 1)),
      },
    ],
    Skill: [
      {
        Id: crypto.randomUUID(),
        SkillName: "Kĩ năng mềm",
        ProficiencyLevel: "Biết giao tiếp và hỗ trợ khi làm việc nhóm",
      },
      {
        Id: crypto.randomUUID(),
        SkillName: "Lập trình",
        ProficiencyLevel:
          "Biết lập trình web và mobile bằng Java, React, Node.js",
      },
      {
        Id: crypto.randomUUID(),
        SkillName: "Công cụ",
        ProficiencyLevel:
          "Biết sử dụng các công cụ như Git, Jira, Trello, Postman",
      },
    ],
    Project: [
      {
        Id: crypto.randomUUID(),
        ProjectName: "Project TruyenDex",
        Description:
          "Xây dựng web đọc truyện sử dụng Java, React, và PostgreSQL. Tính năng quản lý danh sách truyện, đánh dấu truyện đã đọc, và theo dõi tiến độ đọc. Tích hợp các tính năng như tìm kiếm nâng cao, sử dụng Nginx để cân bằng tải, và sử dụng Redis để lưu trữ session.",
        StartDate: formatedDate(new Date(2025, 1, 1)),
        EndDate: formatedDate(new Date(2025, 1, 1)),
      },
      {
        Id: crypto.randomUUID(),
        ProjectName: "Project Nguyen Duc Hai",
        Description: "Xây dựng engine để thiết kế map cho game vô hạn",
        StartDate: formatedDate(new Date(2025, 1, 1)),
        EndDate: formatedDate(new Date(2025, 1, 1)),
      },
    ],
    SocialLink: [
      {
        Id: crypto.randomUUID(),
        Platform: "Youtube",
        Url: "https://youtube.com",
      },
    ],
  },
];
