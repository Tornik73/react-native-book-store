export interface ChatMessageModel {
    id: number | null;
    uuid: string | null;
    name: string;
    messageText: string;
    time: string; 
    isRead: boolean;
    isReceived: boolean;
    date: string;
}

export interface SendedChatMessage {
    id: number | null;
    uuid: string | null;
    name: string;
    messageText: string;
    isRead: boolean;
    isReceived: boolean;
    time: string; 
    date: string;
}

export interface ChatMessageResponse {
    messageId: number;
    uuid: string;
    success: boolean;
    message: string;
    statusCode: number;
}