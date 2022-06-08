export const notify = (text, type) => {
    const notifyEvent = new CustomEvent("pushNotification", {detail: {text, type}});
    document.dispatchEvent(notifyEvent);
}