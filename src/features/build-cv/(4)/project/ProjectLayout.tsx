import { PencilIconFA, TrashIconFA } from '@/components/icons/Icons';
import { ProgressStepSidebar } from '@/components/ProgressStep';
import { Button } from '@/components/ui/button';
import { ScaleProvider } from '@/context/ScaleContext';
import { TemplateLayout } from '@/features/choose-templates/ChooseTemplate';
import { TemplateA } from '@/features/choose-templates/component/TemplateA';
import { FormStore } from '@/stores/FormStore';
import { UrlHandler } from '@/utils/Handler';

export default function ProjectLayout() {
  const { formValue, setFormValue, handleDeleteValue, addItem } = FormStore();

  if (formValue.Project.length === 0) {
    let projectId = '';
    projectId = crypto.randomUUID();
    setFormValue('Project', [
      {
        Id: projectId,
        ProjectName: '',
        Description: '',
        StartDate: null,
        EndDate: null,
      },
    ]);
    UrlHandler.navigate('/build-cv/project/detail/' + projectId);
  }

  function handleAddItem() {
    let projectId = '';
    projectId = crypto.randomUUID();
    addItem('Project', {
      Id: projectId,
      ProjectName: '',
      Description: '',
      StartDate: null,
      EndDate: null,
    });
    UrlHandler.navigate('/build-cv/project/detail/' + projectId);
  }

  const handleNavigatePrevStep = () => {
    UrlHandler.navigate('/build-cv/skill');
  };

  function handleNavigateNextStep() {
    UrlHandler.navigateNext(formValue, setFormValue, 'SocialLink', {
      Platform: '',
      Url: '',
    });
  }

  return (
    <>
      <div className="flex">
        {/* Side bar */}
        <ProgressStepSidebar currentStep={4} />

        <div className="p-30">
          <div className="border-1 text-center">
            {formValue.Project.map((item: any) => (
              <div key={item.Id} className="grid grid-cols-2 justify-center">
                <div className="flex my-auto">
                  <div className="mx-2">
                    {item.ProjectName ? `${item.ProjectName}` : null}
                  </div>
                </div>
                <div className="flex justify-center p-4 gap-4">
                  <Button
                    className="edit"
                    onClick={() => {
                      UrlHandler.navigate(
                        '/build-cv/project/detail/' + item.Id,
                      );
                    }}
                  >
                    <PencilIconFA />
                  </Button>
                  <Button
                    className="delete"
                    onClick={() => {
                      console.log('Delete');
                      handleDeleteValue('Project', item.Id);
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
            onClick={() => handleAddItem()}
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
