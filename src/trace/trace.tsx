
let n: number = localStorage.getItem("__n")
export function trace(msg) {
    localStorage.setItem(`trace ${++n}`, msg)
    localStorage.setItem("__n", n)
}