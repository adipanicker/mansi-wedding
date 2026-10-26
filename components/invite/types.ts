export type EventRow = {
    id: string;
    title: string;
    description: string | null;
    event_date: string | null;
    start_time: string | null;
    venue: string | null;
    display_order: number;
    is_active: boolean;
};

export type RsvpStatus = "yes" | "no" | null;

export type Wish = { id: string; author: string; message: string };