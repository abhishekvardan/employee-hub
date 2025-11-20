import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }: ConfirmDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <AlertTriangle className="text-destructive" size={24} />
          <p className="text-foreground">{message}</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={onConfirm} variant="destructive" className="flex-1">
            Delete
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
