export type ChangelogVersion = {
    version: string,
    description?: string,
    changes?: string[]
};

export const changelog: ChangelogVersion[] = [
    {
        version: "0.3.1",
        changes: [
            "Fixed a bug which prevented the link editor to load your data",
            "Added some more default data",
        ]
    },
    {
        version: "0.3.0",
        description: "This update was hell for me, fucking themes took me way too long and I needed to restructure all the internal design data.Also oof, had so many bugs caused by the not existing peresistence of my data. Hope you enjoy it!",
        changes: [
            "Added theme management",
        ]
    },
    {
        version: "0.2.1",
        changes: [
            "Optimized keyboard control",
            "Restructured settings",
        ]
    },
    {
        version: "0.2.0",
        changes: [
            "Added this changelog",
            "Added tabs in settings",
            "Added design preview",
            'Added "Discard Changes" button in settings',
            "Added project logo",
            "Changed structure of settings",
            "I think I enhanced stability overall a bit"
        ]
    },
    {
        version: "0.1.0",
        description: "The initial state of this project."
    }
];