import { PencilIconFA, TrashIconFA } from '@/components/icons/Icons';
import { ProgressStepSidebar } from '@/components/ProgressStep';
import { Button } from '@/components/ui/button';
import { ScaleProvider } from '@/context/ScaleContext';
import { TemplateLayout } from '@/features/choose-templates/ChooseTemplate';
import { TemplateA } from '@/features/choose-templates/component/TemplateA';
import { FormStore } from '@/stores/FormStore';
import { UrlHandler } from '@/utils/Handler';

export default function EducationLayout() {
  const { formValue, setFormValue, handleDeleteValue, addItem } = FormStore();

  if (formValue.Education.length === 0) {
    let educationId = '';
    educationId = crypto.randomUUID();
    setFormValue('Skill', [
      {
        Id: educationId,
        Institution: '',
        Degree: '',
        StartDate: null,
        EndDate: null,
      },
    ]);
    UrlHandler.navigate('/build-cv/education/detail/' + educationId);
  }

  function handleAddItem() {
    let educationId = '';
    educationId = crypto.randomUUID();
    addItem('Education', {
      Id: educationId,
      Institution: '',
      Degree: '',
      StartDate: null,
      EndDate: null,
    });
    UrlHandler.navigate('/build-cv/education/detail/' + educationId);
  }

  const handleNavigatePrevStep = () => {
    UrlHandler.navigate('/build-cv/cntc');
  };

  function handleNavigateNextStep() {
    UrlHandler.navigateNext(formValue, setFormValue, 'Skill', {
      SkillName: '',
      ProficiencyLevel: '',
    });
  }

  return (
    <>
      <div className="flex">
        {/* Side bar */}
        <ProgressStepSidebar currentStep={2} />

        {/* Main content */}
        <div className="p-30">
          <div className="border-1 text-center">
            {formValue.Education.map((item: any) => (
              <div key={item.Id} className="grid grid-cols-2 justify-center">
                <div className="flex my-auto">
                  <div className="mx-2">
                    {item.Institution ? `${item.Institution}` : null}
                  </div>
                </div>
                <div className="flex justify-center p-4 gap-4">
                  <Button
                    className="edit"
                    onClick={() => {
                      UrlHandler.navigate(
                        '/build-cv/education/detail/' + item.Id,
                      );
                    }}
                  >
                    <PencilIconFA />
                  </Button>
                  <Button
                    className="delete"
                    onClick={() => {
                      console.log('Delete');
                      handleDeleteValue('Education', item.Id);
                    }}
                  >
                    <TrashIconFA />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div
            className="underline border-1 text-center"
            onClick={handleAddItem}
          >
            Thêm liên kết
          </div>
          <div className="col-span-2 flex gap-4 mt-4">
            <Button type="button" onClick={() => handleNavigatePrevStep()}>
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
