import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface OutputWindowProps {
  output: string;
  onClose: () => void;
}

const OutputWindow = ({ output, onClose }: OutputWindowProps) => {
  return (
    <div className='h-1/3 min-h-0'>
      <div className='relative h-full w-full bg-secondary text-secondary-foreground'>
        <Button
          variant='ghost'
          size='icon'
          className='absolute right-2 top-2 z-10'
          onClick={onClose}
        >
          <X className='h-4 w-4' />
        </Button>
        <ScrollArea className='h-full w-full p-4'>
          <pre>{output}</pre>
        </ScrollArea>
      </div>
    </div>
  );
};

export default OutputWindow
