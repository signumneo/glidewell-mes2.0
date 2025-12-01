/**
 * MES Message Format Types - V3
 * Based on Confluence documentation: MES Message Format and APIs - V3
 */

/**
 * MES Message Header
 */
export interface MESHeader {
  SenderId: string;
  ClientId: string;
  Location: string;
  MessageType: 'Cmd' | 'Fb';
  MessageId: string;
  TimeStamp: string;
  MessageVersion: string;
  DataEncoding: string;
  Feedback: boolean;
  ResponseTopic: string;
  Control: string; // Format: "{CommunicationProtocol},{CmdType}" e.g., "IoT,Scan"
}

/**
 * MES Message structure
 */
export interface MESMessage<T = any> {
  Header: MESHeader;
  Data: T;
}

/**
 * Router data from IoT Scan response
 */
export interface RouterData {
  PartNumber: string;
  RouterId: string;
  Version: string;
  CurrentProcess: string;
  Quantity: string;
  Status: 'Open' | 'Closed' | 'Rejected' | 'Cancelled';
  Description: string;
  Useremail: string;
  PriorityLevel: string;
  [processId: string]: any; // Dynamic process fields like "1000": { Description: "..." }
}

/**
 * IoT Scan request data
 */
export interface ScanRequestData {
  PartNumber?: string; // Optional filter
  CurrentProcess?: string; // Optional filter
}

/**
 * IoT Scan response (array of routers)
 */
export type ScanResponseData = RouterData[];

/**
 * Helper to create MES Header
 */
export function createMESHeader(control: string, feedback = true): MESHeader {
  return {
    SenderId: '',
    ClientId: '',
    Location: '',
    MessageType: 'Cmd',
    MessageId: generateMessageId(),
    TimeStamp: new Date().toISOString(),
    MessageVersion: '10.0.0',
    DataEncoding: 'Json',
    Feedback: feedback,
    ResponseTopic: '',
    Control: control,
  };
}

/**
 * Generate unique message ID
 */
function generateMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
