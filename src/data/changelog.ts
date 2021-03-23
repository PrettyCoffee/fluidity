export type ChangelogVersion = {
    version: string,
    description?: string,
    changes?: string[]
};

export const changelog: ChangelogVersion[] = [
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