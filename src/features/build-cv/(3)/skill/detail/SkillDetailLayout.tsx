import { FormDate, FormInput } from '@/components/_Form';
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

const formSchema = z.object({
  SkillName: z.string().min(1, { error: 'Tên kĩ năng không được để trống' }),
  ProficiencyLevel: z
    .string()
    .min(1, { error: 'Mức độ chuyên môn không được để trống' }),
});

type FormData = z.infer<typeof formSchema>;

export default function SkillDetailLayout(props: any) {
  console.log(props.SkillId);

  return (
    <>
      <SkillDetail SkillId={props.SkillId} />
    </>
  );
}

function SkillDetail(props: any) {
  const { formValue, setFormValue, setFormArrayValue } = FormStore();

  const skill = formValue.Skill.find((e: any) => e.Id === props.SkillId);
  console.log(skill);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      SkillName:
        formValue.Skill.find((e: any) => e.Id === props.SkillId).SkillName ||
        '',
      ProficiencyLevel:
        formValue.Skill.find((e: any) => e.Id === props.SkillId)
          .ProficiencyLevel || '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { handleSubmit, control, clearErrors } = form;

  const handleNavigatePrev = () => {
    UrlHandler.navigate('/build-cv/skill');
  };

  function onSubmit(data: FormData) {
    console.log('Validate data: ', data);
    UrlHandler.navigateNext(formValue, setFormValue, 'Project', {
      ProjectName: '',
      Description: '',
      StartDate: null,
      EndDate: null,
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    console.log(id, value);
    setFormArrayValue('Skill', props.SkillId, id, value);
  }

  return (
    <>
      <div className="flex">
        {/* Side bar */}
        <ProgressStepSidebar currentStep={3} />
        
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
                  name="SkillName"
                  placeHolder="Tên kỹ năng"
                  handleChange={handleChange}
                  clearErrors={clearErrors}
                />
                {/* Degree */}
                <FormInput
                  className="mb-4"
                  control={control}
                  name="ProficiencyLevel"
                  placeHolder="Mức độ thành thạo"
                  handleChange={handleChange}
                  clearErrors={clearErrors}
                />
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
