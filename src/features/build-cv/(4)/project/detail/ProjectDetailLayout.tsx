import { FormDate, FormInput } from '@/components/_Form';
import { DraftEditor } from '@/components/DraftEditor';
import { ProgressStepSidebar } from '@/components/ProgressStep';
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
    ProjectName: z.string().min(1, { error: 'Tên dự án không được để trống' }),
    Description: z
      .string()
      .min(1, { error: 'Mô tả dự án không được để trống' }),
    StartDate: z.string().min(1, { error: 'Ngày bắt đầu không được để trống' }),
    EndDate: z.string().min(1, { error: 'Ngày kết thúc không được để trống' }),
  })
  .refine(data => new Date(data.StartDate) <= new Date(data.EndDate), {
    message: 'Ngày bắt đầu không được lớn hơn ngày kết thúc',
    path: ['StartDate'],
  });

type FormData = z.infer<typeof formSchema>;

export default function ProjectDetailLayout(props: any) {
  console.log(props.ProjectId);

  return (
    <>
      <ProjectDetail ProjectId={props.ProjectId} />
    </>
  );
}

function ProjectDetail(props: any) {
  const { formValue, setFormValue, setFormArrayValue } = FormStore();

  const project = formValue.Project.find((e: any) => e.Id === props.ProjectId);
  console.log(project);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ProjectName:
        formValue.Project.find((e: any) => e.Id === props.ProjectId)
          .ProjectName || '',
      Description:
        formValue.Project.find((e: any) => e.Id === props.ProjectId)
          .Description || '',
      StartDate:
        formValue.Project.find((e: any) => e.Id === props.ProjectId)
          .StartDate || '',
      EndDate:
        formValue.Project.find((e: any) => e.Id === props.ProjectId).EndDate ||
        '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  console.log(formValue);

  const { handleSubmit, control, clearErrors } = form;

  function onSubmit(data: FormData) {
    console.log('Validate data: ', data);
    UrlHandler.navigateNext(formValue, setFormValue, 'SocialLink', {
      Platform: '',
      Url: '',
    });
  }

  const handleNavigatePrev = () => {
    UrlHandler.navigate('/build-cv/project');
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    console.log(id, value);
    const arrayName = 'Project';
    setFormArrayValue(arrayName, props.ProjectId, id, value);
  }

  return (
    <>
      <div className="flex">
        {/* Side bar */}
        <ProgressStepSidebar currentStep={4} />

        {/* Main Content */}
        <div className="p-30">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="gap-6 w-[500px]">
              <FormInput
                control={control}
                name="ProjectName"
                placeHolder="Tên dự án"
                handleChange={handleChange}
                clearErrors={clearErrors}
              />

              <DraftEditor
                control={control}
                name="Description"
                label="Mô tả dự án"
                handleChange={handleChange}
              />

              <div className="grid grid-cols-2 my-10 gap-10">
                <FormDate
                  control={control}
                  name="StartDate"
                  placeHolder="Ngày bắt đầu"
                  handleChange={handleChange}
                  clearErrors={clearErrors}
                />

                <FormDate
                  control={control}
                  name="EndDate"
                  placeHolder="Ngày kết thúc"
                  handleChange={handleChange}
                  clearErrors={clearErrors}
                />
              </div>

              <div className="col-span-2 flex gap-4 mt-4">
                <Button type="button" onClick={() => handleNavigatePrev()}>
                  Back
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
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
        </div>
      </div>
    </>
  );
}
