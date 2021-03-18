type Settings = {
    [key: string]: any;
}

const getSettings = () => JSON.parse(localStorage.getItem("settings") || "{}") as Settings;

export const getValue = (key: string) => {
    const settings = getSettings();
    return settings[key];
}

export const setValue = (key: string, value: string) => {
    const settings = getSettings();
    settings[key] = value;
    localStorage.setItem("settings", JSON.stringify(settings));
}
