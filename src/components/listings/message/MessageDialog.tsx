import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  recipientName: string | null;
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
}

const MessageDialog = ({
  isOpen,
  onOpenChange,
  recipientName,
  message,
  onMessageChange,
  onSend,
}: MessageDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900">
            Send Message to {recipientName}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Write your message here..."
            className="min-h-[100px] bg-white text-gray-900 border-gray-200"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSend}>Send Message</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;