function formatedDate(date = new Date()): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
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
    Title: 'Fullstack Developer',
    FirstName: 'Nguyễn',
    LastName: 'Văn A',
    Address: 'Đường số ABC',
    Email: 'abc@gmail.com',
    Phone: '0999777888',
    ImageProfile:
      'https://res.cloudinary.com/duxhpwegs/image/upload/v1760258356/CV_szb6he.jpg',
    AccountId: crypto.randomUUID(),
    CreatedAt: formatedDate(new Date()),
    Education: [
      {
        Id: crypto.randomUUID(),
        Institution: 'Đại học XYZ',
        Degree: 'Chuyên nghành: công nghệ thông tin',
        StartDate: formatedDate(new Date(2020, 1, 1)),
        EndDate: formatedDate(new Date(2025, 1, 1)),
      },
    ],
    Skill: [
      {
        Id: crypto.randomUUID(),
        SkillName: 'React',
        ProficiencyLevel: 'Good',
      },
      {
        Id: crypto.randomUUID(),
        SkillName: 'HTML',
        ProficiencyLevel: 'Excellent',
      },
      {
        Id: crypto.randomUUID(),
        SkillName: 'MySQL',
        ProficiencyLevel: 'Excellent',
      },
      {
        Id: crypto.randomUUID(),
        SkillName: 'Postman',
        ProficiencyLevel: 'Excellent',
      },
    ],
    Project: [
      {
        Id: crypto.randomUUID(),
        ProjectName: 'Project A',
        Description:
          'uilt a scalable e-commerce platform using Next.js, Express.js, and PostgreSQL. Implemented features such as product listing, shopping cart, and secure payment gateway integration. Enhanced user experience with responsive design and optimized performance using caching strategies.',
        StartDate: formatedDate(new Date(2025, 1, 1)),
        EndDate: formatedDate(new Date(2025, 1, 1)),
      },
      {
        Id: crypto.randomUUID(),
        ProjectName: 'Project B',
        Description:
          'Built a scalable e-commerce platform using Next.js, Express.js, and PostgreSQL. Implemented features such as product listing, shopping cart, and secure payment gateway integration. Enhanced user experience with responsive design and optimized performance using caching strategies.',
        StartDate: formatedDate(new Date(2025, 1, 1)),
        EndDate: formatedDate(new Date(2025, 1, 1)),
      },
    ],
    SocialLink: [
      {
        Id: crypto.randomUUID(),
        Platform: 'Youtube',
        Url: 'https://youtube.com',
      },
    ],
  },
];
