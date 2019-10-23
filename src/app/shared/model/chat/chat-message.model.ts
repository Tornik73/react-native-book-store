export interface ChatMessageModel {
    id: number | null;
    uuid?: string | null;
    name: string;
    messageText: string;
    time: string; // TODO: Change on Date type
    isRead?: boolean;
    isReceived?: boolean;
    date: string; // TODO: Change on Date type
}

export interface SendedChatMessage {
    id: number | null;
    uuid: string | null;
    name: string;
    messageText: string;
    isRead: boolean;
    isReceived: boolean;
    time: string; // TODO: Change on Date type
    date: string; // TODO: Change on Date type
}

export interface ChatMessageResponse {
    messageId: number;
    uuid?: string;
    success: boolean;
    message: string;
    statusCode: number;
}
