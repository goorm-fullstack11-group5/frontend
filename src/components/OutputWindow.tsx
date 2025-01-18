import { ScrollArea } from "@radix-ui/react-scroll-area";

interface OutputWindowProps {
  output: string;
}

const OutputWindow = ({ output}: OutputWindowProps) => {
  return (
    <ScrollArea className='h-full w-full p-4 bg-secondary text-secondary-foreground'>
      <pre>{output}</pre>
    </ScrollArea>
  );
}

export default OutputWindow
