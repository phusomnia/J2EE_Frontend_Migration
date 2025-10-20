import { PencilIconFA, TrashIconFA } from '@/components/icons/Icons';
import { ProgressStepSidebar } from '@/components/ProgressStep';
import { SideBarForm } from '@/components/SideBarForm';
import { Button } from '@/components/ui/button';
import { ScaleProvider } from '@/context/ScaleContext';
import { TemplateLayout } from '@/features/choose-templates/ChooseTemplate';
import { TemplateA } from '@/features/choose-templates/component/TemplateA';
import { FormStore } from '@/stores/FormStore';
import { UrlHandler } from '@/utils/Handler';

export default function SkillLayout() {
  return (
    <>
      <Skill />
    </>
  );
}

function Skill(props: any) {
  const { formValue, setFormValue, handleDeleteValue, addItem } = FormStore();

  if (formValue.Skill.length === 0) {
    let skillId = '';
    skillId = crypto.randomUUID();
    setFormValue('Skill', [
      {
        Id: skillId,
        SkillName: '',
        ProficiencyLevel: '',
      },
    ]);
    UrlHandler.navigate('/build-cv/skill/detail/' + skillId);
  }

  function handleAddItem() {
    let skillId = '';
    skillId = crypto.randomUUID();
    addItem('Skill', {
      Id: skillId,
      SkillName: '',
      ProficiencyLevel: '',
    });
    UrlHandler.navigate('/build-cv/skill/detail/' + skillId);
  }

  const handleNavigatePrevStep = () => {
    UrlHandler.navigate('/build-cv/education');
  };

  function handleNavigateNextStep() {
    UrlHandler.navigateNext(formValue, setFormValue, 'Project', {
      ProjectName: '',
      Description: '',
      StartDate: null,
      EndDate: null,
    });
  }

  return (
    <>
      <div className="flex">
        {/* Side bar */}
        <ProgressStepSidebar currentStep={3} />

        <div className="p-30">
          <div className="border-1 text-center">
            {formValue.Skill.map((item: any) => (
              <div key={item.Id} className="grid grid-cols-2 justify-center">
                <div className="flex my-auto">
                  <div className="mx-2">
                    {item.SkillName ? `${item.SkillName}` : null}
                  </div>
                </div>
                <div className="flex justify-center p-4 gap-4">
                  <Button
                    className="edit cursor-pointer"
                    onClick={() => {
                      UrlHandler.navigate('/build-cv/skill/detail/' + item.Id);
                    }}
                  >
                    <PencilIconFA />
                  </Button>
                  <Button
                    className="delete cursor-pointer"
                    onClick={() => {
                      console.log('Delete');
                      handleDeleteValue('Skill', item.Id);
                    }}
                  >
                    <TrashIconFA />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div
            className="underline border-1 text-center cursor-pointer"
            onClick={() => handleAddItem()}
          >
            Thêm liên kết
          </div>
          <div className="col-span-2 flex gap-4 mt-4">
            <Button
              className="cursor-pointer"
              type="button"
              onClick={() => handleNavigatePrevStep()}
            >
              Back
            </Button>
            <Button type="button" onClick={() => handleNavigateNextStep()}>
              Continue
            </Button>
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
        </div>
      </div>
    </>
  );
}
