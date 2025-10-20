import { FormDate, FormInput } from '@/components/_Form';
import { DraftEditor } from '@/components/DraftEditor';
import { ProgressStepSidebar } from '@/components/ProgressStep';
import { SideBarForm } from '@/components/SideBarForm';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ScaleProvider } from '@/context/ScaleContext';
import { TemplateLayout } from '@/features/choose-templates/ChooseTemplate';
import { TemplateA } from '@/features/choose-templates/component/TemplateA';
import { FormStore } from '@/stores/FormStore';
import { UrlHandler } from '@/utils/Handler';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z
  .object({
    Institution: z
      .string()
      .min(1, { error: 'Tên trường học không được để trống' }),
    Degree: z.string().min(1, { error: 'Chứng chỉ không được để trống' }),
    StartDate: z.string().min(1, { error: 'Ngày bắt đầu không được để trống' }),
    EndDate: z.string().min(1, { error: 'Ngày kết thúc không được để trống' }),
  })
  .refine(data => new Date(data.StartDate) <= new Date(data.EndDate), {
    message: 'Ngày bắt đầu không được lớn hơn ngày kết thúc',
    path: ['StartDate'],
  });

type FormData = z.infer<typeof formSchema>;

export default function ProjectDetailLayout(props: any) {
  return (
    <>
      <ProjectDetail EducationId={props.EducationId} />
    </>
  );
}

function ProjectDetail(props: any) {
  const { formValue, setFormValue, setFormArrayValue } = FormStore();

  const education = formValue.Education.find(
    (e: any) => e.Id === props.EducationId,
  );
  console.log(education);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Institution:
        formValue.Education.find((e: any) => e.Id === props.EducationId)
          .Institution || '',
      Degree:
        formValue.Education.find((e: any) => e.Id === props.EducationId)
          .Degree || '',
      StartDate:
        formValue.Education.find((e: any) => e.Id === props.EducationId)
          .StartDate || '',
      EndDate:
        formValue.Education.find((e: any) => e.Id === props.EducationId)
          .EndDate || '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { handleSubmit, control, clearErrors } = form;

  function onSubmit(data: FormData) {
    console.log('Validate data: ', data);
    UrlHandler.navigateNext(formValue, setFormValue, 'Skill', {
      SkillName: '',
      ProficiencyLevel: '',
    });
  }

  const handleNavigatePrev = () => {
    UrlHandler.navigate('/build-cv/education');
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    console.log(id, value);
    setFormArrayValue('Education', props.EducationId, id, value);
  }

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <ProgressStepSidebar currentStep={2} />
        {/* Main Content */}
        <div className="w-full h-full">
          <div className="text-center">
            <p>Bạn muốn nhà tuyển dụng liên hệ với bạn như thế nào?</p>
          </div>
          {/* Form */}
          <div className="p-30">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="">
                {/* Institution */}
                <FormInput
                  className="mb-4"
                  control={control}
                  name="Institution"
                  placeHolder="Tên trường học"
                  handleChange={handleChange}
                  clearErrors={clearErrors}
                />
                {/* Degree */}
                <FormInput
                  className="mb-4"
                  control={control}
                  name="Degree"
                  placeHolder="Bằng cấp"
                  handleChange={handleChange}
                  clearErrors={clearErrors}
                />
                <div className="grid grid-cols-2 gap-10">
                  {/* Start Date */}
                  <FormDate
                    control={control}
                    name="StartDate"
                    placeHolder="Ngày bắt đầu"
                    handleChange={handleChange}
                    clearErrors={clearErrors}
                  />
                  {/* End Date */}
                  <FormDate
                    control={control}
                    name="EndDate"
                    placeHolder="Ngày kết thúc"
                    handleChange={handleChange}
                    clearErrors={clearErrors}
                  />
                </div>
                {/* Buttons */}
                <div className="col-span-2 flex gap-4 mt-4">
                  <Button type="button" onClick={() => handleNavigatePrev()}>
                    Back
                  </Button>
                  <Button type="submit">Continue</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        {/* Template Review */}
        <div className="bg-gray-100">
          <div className="template-review mx-auto">
            <ScaleProvider scale={0.7}>
              <TemplateLayout>
                <TemplateA data={formValue} />
              </TemplateLayout>
            </ScaleProvider>
          </div>
          {/* */}
          <div className="text-center">
            <a
              className="underline"
              onClick={e => {
                e.preventDefault();
                UrlHandler.navigate('/choose-templates');
              }}
            >
              Change template
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
