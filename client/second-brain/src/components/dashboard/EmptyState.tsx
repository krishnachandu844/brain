import { Inbox } from "lucide-react";
import AddDialog from "./AddDialog";

type Props = {};

const EmptyState = (props: Props) => {
  return (
    <div className='text-center py-20 bg-card border border-dashed border-border rounded-3xl'>
      <div className='size-14 mx-auto rounded-2xl bg-brand/10 text-brand grid place-items-center mb-4'>
        <Inbox className='size-6' />
      </div>
      <h3 className='font-display font-bold text-lg mb-1'>
        Your vault is empty
      </h3>
      <p className='text-sm text-muted-foreground mb-5'>
        Save your social post to get started.
      </p>

      <AddDialog />
    </div>
  );
};

export default EmptyState;
