import type { AttemptSummary } from "../api/CrosswordApi";
import CollapsibleSidebar from "./CollapsibleSidebar";
import AttemptPanel from "./AttemptPanel";

interface Props {
  defaultOpen: boolean;
  attempts: AttemptSummary[];
  selectedAttemptId?: string;
  onSelect: (id: string) => void;
  drawerWidth?: number;
  railWidth?: number;
  onWidthChange: (width: number) => void;
}

export default function AttemptSidebar({
  defaultOpen,
  attempts,
  selectedAttemptId,
  onSelect,
  drawerWidth = 260,
  railWidth = 44,
  onWidthChange,
}: Props) {
  return (
    <CollapsibleSidebar
      defaultOpen={defaultOpen}
      drawerWidth={drawerWidth}
      railWidth={railWidth}
      onWidthChange={onWidthChange}
    >
      <AttemptPanel
        attempts={attempts}
        selectedAttemptId={selectedAttemptId}
        onSelect={onSelect}
      />
    </CollapsibleSidebar>
  );
}
