import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

export function Modal({
    isOpen,
    toggleModal,
    children
}: any){ 
    return <>
        <Dialog 
            open={isOpen} 
            onOpenChange={toggleModal}
        >
            <DialogContent className="!max-w-200"> 
                {children} 
            </DialogContent>
        </Dialog>
    </>
}