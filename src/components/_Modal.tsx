import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDialogStore } from '@/stores/DialogStore';
import React from 'react';

export default function Modal(props: any) {
  const { isOpen, toggleModal } = useDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogTitle className="sr-only"></DialogTitle>
      <DialogDescription className="sr-only"></DialogDescription>
      <DialogContent className="!max-w-6xl">
        <div>{props.children}</div>
      </DialogContent>
    </Dialog>
  );
}
