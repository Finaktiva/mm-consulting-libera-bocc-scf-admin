export interface economicActivity {
    ciiuCode: string;
    description: string;
    economicSector: {
        id: number,
        description: string
    };
}