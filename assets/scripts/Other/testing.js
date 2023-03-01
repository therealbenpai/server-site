//@ts-nocheck
/**
 * @description Attempts To Login
 */
let check = (x) => {
    const passwordField = document.getElementById("psw").value
    const md5hash = "5729bd72fab93f0e443b0dcbc8186c60";
    const pswfieldhash = CryptoJS.MD5(passwordField)
    if (pswfieldhash == md5hash || x) {
        document.getElementById("login").remove()
        document.getElementById("blocker").remove()
        document.onkeydown = () => { }
        document.oncontextmenu = () => { }
        setup = () => { }
        check = () => { }
        return;
    }
    document.getElementById('pswCheck').removeAttribute('ch')
}

let setup = () => {
    if (sessionStorage.getItem('key') == "passwordKey-020281ytraps:6169209715") return check(true);
    document.onkeydown = (e) => {
        const { ctrlKey: ctrl, shiftKey: shift, keyCode: kc, preventDefault: pd } = e
        if (ctrl && shift && kc == 73) {
            pd()
        }
    }
    document.getElementById("psw").onkeydown = (e) => {
        if (e.keyCode == 13) return check()
        if (!document.getElementById("pswCheck").hasAttribute('ch')) return document.getElementById("pswCheck").setAttribute('ch', "");
    }
    document.oncontextmenu = () => { }
}

/* ========== SPLITER ========== */

class cFunction {
    static isDST(d) {
        const jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset()
        const jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset()
        return Math.max(jan, jul) !== d.getTimezoneOffset()
    }
    static getTime() {
        let datemod = new Date()
        const cdate = Date.now()
        let dst = isDST(datemod)
        if (dst === true) {
            datemod = new Date(cdate + (3600 * 1000))
            const time = datemod.toLocaleTimeString('en-US', { timeZone: 'EST', hour: '2-digit', minute: '2-digit', second: '2-digit' })
            return time
        } else {
            const time = datemod.toLocaleTimeString('en-US', { timeZone: 'EST', hour: '2-digit', minute: '2-digit', second: '2-digit' })
            return time
        }
    }
    static getDate() {
        let datemod = new Date()
        const cdate = Date.now()
        let dst = isDST(datemod)
        if (dst === true) {
            datemod = new Date(cdate + (3600 * 1000))
            const date = datemod.toLocaleDateString('en-US', { timeZone: 'EST', year: "2-digit", month: "2-digit", day: "2-digit" })
            return date;
        } else {
            const date = datemod.toLocaleDateString('en-US', { timeZone: 'EST', year: "2-digit", month: "2-digit", day: "2-digit" })
            return date;
        }
    }
    static getFullDate() {
        const date = this.getDate()
        const time = this.getTime()
        return `${date} ${time}`
    }
    static keyGen(length) {
        if (length < 1 || isNaN(length)) return console.error(TypeError('length isn\'t valid'))
        let key = 0
        for (let i = length; i > 0; i--) {
            key += (Math.round(Math.random() * 8) + 1) * Math.pow(10, i)
        }
        return key / 10
    }
    /** 
    * @description Runs the collatz conjecture using only vanilla Javascript code
    * @param {Number} sn Starting Number
    * @param {Number} mi Max Iterations
    * @author Sparty182020
    * @returns {void}
    **/
    static collatz(sn, mi = 100) {
        if (sn <= 0) throw new Error('Starting Number must be greater than 0');
        // fmi = Formated Max Iterations
        // it = Iterations
        // f = Finished
        // mn = Max Number
        // mnp = Max Number Index
        let [fmi, it, f, mn, mnp] = [mi, 0, undefined, sn, 1]
        for (let i = 1; i <= fmi; i++) {
            // Runs if max iterations have been reached
            if (i == fmi) {
                it = i
                f = false
                break
            }
            // Main Section
            if (sn % 2 == 1) {
                sn = (sn * 3) + 1;
            } else {
                sn = sn / 2;
            }
            // Statitistics
            if (sn > mn) {
                mn = sn
                mnp++
            }
            // Stops the script once the program has reached the number 4 (Loop begins here)
            if (sn == 4) {
                it = i;
                f = true;
                break;
            }
        }
        const results = {
            iterations: it,
            maxNumber: mn,
            maxNumberIndex: mnp,
            completed: f
        };
        results.completed ? console.log(
            `%cResults:\nIterations = ${results.iterations}\nHighest Number Reached = ${results.maxNumber}\nHighest Number Reached at Step #${results.maxNumberIndex}\nConjecture proven before function terminated = %cTrue`
            ,
            'font-size:16px;text-decoration:underline;font-weight:700;color:blue'
            ,
            'font-size:16px;text-decoration:underline;font-weight:700;color:green'
        ) : console.log(
            `%cResults:\nIterations = ${results.iterations}\nHighest Number Reached = ${results.maxNumber}\nHighest Number Reached at Step #${results.maxNumberIndex}\nConjecture proven before function terminated = %cFalse`
            ,
            'font-size:16px;text-decoration:underline;font-weight:700;color:blue'
            ,
            'font-size:16px;text-decoration:underline;font-weight:700;color:red'
        )
    }
}

/* ========== SPLITER ========== */

class cLogs {
    constructor() {
        this.cmethods = []
    }
    static error(msg="") {
        return console.error(
            `%cERROR%c ${msg}`,
            'color:red;border:1px solid red;border-radius:12px;font-size:11px;font-family:arial;background-color:rgba(220,0,0,0.2);padding: 0px 3px 0px 3px',
            ''
        )
    }
    static warn(msg="") {
        return console.warn(
            `%cWARNING%c ${msg}`,
            'color:darkorange;border:1px solid darkorange;border-radius:12px;font-size:11px;font-family:arial;background-color:rgba(240,130,0,0.2);padding: 0px 3px 0px 3px',
            ''
        )
    }
    static success(msg="") {
        return console.log(
            `%cLOG%c ${msg}`,
            'color:green;border:1px solid green;border-radius:12px;font-size:11px;font-family:arial;background-color:rgba(0,220,0,0.2);padding: 0px 3px 0px 3px',
            ''
        )
    }
    static customTag(tagData) {
        if (typeof tagData !== "object" && tagData !== undefined) throw new SyntaxError("Invalid Data")
        // Default Values DO NOT TOUCH
        const defaults = {
            color: ["0", "0", "0", "1"],
            borderColor: ["0", "0", "0", "1"],
            background: ["0", "0", "0", "0.2"],
            text: "Filler Text",
            logType: "log"
        }
        // Formated Values DO NOT TOUCH
        const fvalues = {
            color: (tagData?.color || defaults.color),
            borderColor: (tagData?.borderColor || tagData?.color || defaults.borderColor),
            background: (tagData?.background || defaults.background),
            text: (tagData?.text || defaults.text),
            logType: (tagData?.logType || defaults.logType),
        }
        // RGBA testing DO NOT TOUCH
        if (typeof fvalues.color !== "object" || fvalues.color.length !== 4) return console.error(new TypeError("Please enter a valid rgba array"))
        if (typeof fvalues.borderColor !== "object" || fvalues.borderColor.length !== 4) return console.error(new TypeError("Please enter a valid rgba array"))
        if (typeof fvalues.background !== "object" || fvalues.background.length !== 4) return console.error(new TypeError("Please enter a valid rgba array"))
        const tagCSS = `color:rgba(${fvalues.color[0]},${fvalues.color[1]},${fvalues.color[2]},${fvalues.color[3]});border:1px solid rgba(${fvalues.borderColor[0]},${fvalues.borderColor[1]},${fvalues.borderColor[2]},${fvalues.borderColor[3]});border-radius:12px;font-size:11px;font-family:arial;background-color:rgba(${fvalues.background[0]},${fvalues.background[1]},${fvalues.background[2]},${fvalues.background[3]});padding: 0px 3px 0px 3px;`
        console.log(`Your method:\n%cconsole.${fvalues.logType}('%c${fvalues.text.toUpperCase()}%c ','${tagCSS}','')`, 'font-weight:bolder;font-family:arial;')
        console.log('%cPreview: ', 'font-weight:bolder;font-family:arial;text-decoration:underline')
        const preview = new Function(`console.${fvalues.logType}('%c${fvalues.text.toUpperCase()}%c ','${tagCSS}','')`)
        preview()
    }
    error(msg="") {
        return cLogs.error(msg)
    }
    warn(msg="") {
        return cLogs.warn(msg)
    }
    success(msg="") {
        return cLogs.success(msg)
    }
    makeTag(tagData) {
        if (typeof tagData !== "object" && typeof tagData !== "undefined") return console.error("Invalid Data")
        // Default Values DO NOT TOUCH
        const defaults = {
            color: ["0", "0", "0", "1"],
            borderColor: ["0", "0", "0", "1"],
            background: ["0", "0", "0", "0.2"],
            text: "Filler Text",
            logType: "log"
        }
        // Formated Values DO NOT TOUCH
        const fvalues = {
            color: (tagData?.color || defaults.color),
            borderColor: (tagData?.borderColor || tagData?.color || defaults.borderColor),
            background: (tagData?.background || defaults.background),
            text: (tagData?.text || defaults.text),
            logType: (tagData?.logType || defaults.logType),
        }
        // RGBA testing DO NOT TOUCH
        if (typeof fvalues.color !== "object" || fvalues.color.length !== 4)
            throw new TypeError("Please enter a valid rgba array for 'color' value");
        if (typeof fvalues.borderColor !== "object" || fvalues.borderColor.length !== 4)
            throw new TypeError("Please enter a valid rgba array for 'borderColor' value");
        if (typeof fvalues.background !== "object" || fvalues.background.length !== 4)
            throw new TypeError("Please enter a valid rgba array for 'background' value");
        const tagCSS = `color:rgba(${fvalues.color[0]},${fvalues.color[1]},${fvalues.color[2]},${fvalues.color[3]});border:1px solid rgba(${fvalues.borderColor[0]},${fvalues.borderColor[1]},${fvalues.borderColor[2]},${fvalues.borderColor[3]});border-radius:12px;font-size:11px;font-family:arial;background-color:rgba(${fvalues.background[0]},${fvalues.background[1]},${fvalues.background[2]},${fvalues.background[3]});padding: 0px 3px 0px 3px;`
        const method = new Function(`console.${fvalues.logType}('%c${fvalues.text.toUpperCase()}%c ','${tagCSS}',''); return`)
        this.cmethods.push(method)
        console.log(`Your method:\n%cconsole.${fvalues.logType}('%c${fvalues.text.toUpperCase()}%c ','${tagCSS}','')`, 'font-weight:bolder;font-family:arial;')
        cLogs.success("Saved")
    }
    run(index) {
        try {
            this.cmethods.at(index).call()
        } catch (err) {
            if (err instanceof TypeError) {
                return console.error("Invalid Index")
            }
            return console.error(err)
        }
    }
}