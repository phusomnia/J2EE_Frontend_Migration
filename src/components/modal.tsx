import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/stores/DialogStore";

export function Modal(props: any) {
    const { isOpen, toggleModal } = useDialogStore();

    return (
        <Dialog open={isOpen} onOpenChange={toggleModal}>
            <DialogContent className="!max-w-6xl">
                <div>{props.children}</div>
            </DialogContent>
        </Dialog>
    );
}
