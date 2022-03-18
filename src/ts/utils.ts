/**
 * Throttle execution of a function
 *
 * @param func Function to throttle execution of, the last arguments given
 * will be applied. Resolves all calls with the value.
 * @param delay Delay to wait before execution.
 * @param resetTimerOnCall Reset the time to wait before execution on each call.
 */
export function throttle<T>(
    func: (...a) => T,
    delay: number,
    resetTimerOnCall?: boolean
) {
    let firstCall: Date,
        timeout: number,
        resolvers: ((val) => void)[] = [];
    return function (...args) {
        const now = new Date();
        if (timeout) {
            clearTimeout(timeout);
        }
        const prom = new Promise<T>((resolve) => {
            resolvers.push(resolve);
        });
        if (!firstCall || resetTimerOnCall) {
            firstCall = new Date();
        }
        const finish = () => {
            const value = func(...args);
            firstCall = null;
            timeout = null;
            resolvers.forEach((resolve) => resolve(value));
        };
        const diff = now.getTime() - firstCall.getTime();
        // @ts-ignore
        timeout = setTimeout(finish, delay - diff);

        return prom;
    };
}
