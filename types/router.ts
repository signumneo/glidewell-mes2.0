export interface Router {
  id: string;
  partNumber: string;
  version: string;
  routerId: string;
  iteration: number;
  currentProcess: {
    number: string;
    name: string;
    step: string;
  };
  quantity: number;
  status: 'Open' | 'Closed' | 'On Hold' | 'Completed';
  priorityLevel: 'Normal' | 'High' | 'Low' | 'Urgent';
  user: string;
  barcode: string;
}

export interface RouterFilters {
  partNumber?: string;
  routerId?: string;
  status?: string;
  priority?: string;
  searchQuery?: string;
}

export type ViewMode = 'list' | 'detail';
