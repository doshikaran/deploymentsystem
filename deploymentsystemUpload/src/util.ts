const MAX_LEN = 8;
export function generate() {
    let ans = "";
    const subset = "123456789abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < MAX_LEN; i++) {
        ans += subset.charAt(Math.floor(Math.random() * subset.length));
    }
    return ans;

}