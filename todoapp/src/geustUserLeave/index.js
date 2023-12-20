const usegeustPreventLeave = () => {
    const listener = (event) => {
        event.preventDefault();
        event.returnValue = "";
    };

    const enableLeave = () => window.addEventListener("beforeunload", listener);
    const disableLeave = () => window.removeEventListener("beforeunload", listener);

    return {enableLeave, disableLeave};
};

export default usegeustPreventLeave;