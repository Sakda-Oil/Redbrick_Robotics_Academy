export interface ROSNode {
  name: string;
  package?: string;
  status: "active" | "inactive";
  publications: string[];
  subscriptions: string[];
  services?: string[];
  actions?: string[];
  description: string;
}

export interface ROSTopic {
  name: string;
  type: string;
  publishers: string[];
  subscribers: string[];
  rateHz: number;
  sampleMessage: Record<string, unknown> | string;
  description: string;
}

export interface ROSService {
  name: string;
  type: string;
  serverNode: string;
  requestType: string;
  responseType: string;
}

export interface ROSAction {
  name: string;
  type: string;
  serverNode: string;
  goalType: string;
  feedbackType: string;
  resultType: string;
}

export interface TFFrame {
  parent: string;
  child: string;
  translation: [number, number, number];
  rotation: [number, number, number, number];
}
